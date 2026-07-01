---
title: "In a Warehouse, Physical Layout Is the Performance"
description: "Coming from transactional databases, I reached for indexes. In a columnar MPP warehouse there are no indexes to add — the lever is how rows are spread across machines and ordered on disk. Here's the mental model that made my Redshift tables fast."
date: "2026-06-18"
readTime: "6 min read"
tags: ["Data Engineering", "Redshift", "Data Modeling", "Distribution Keys", "Query Performance"]
---

# In a Warehouse, Physical Layout Is the Performance

When a warehouse query is slow, the instinct I brought from transactional databases was "add an index." In a columnar, massively-parallel warehouse like Redshift, that instinct is a dead end — there are no indexes to add. The performance lever is somewhere else entirely: **how your rows are physically arranged across the cluster.** Two decisions do most of the work — how data is *distributed* across machines, and how it's *sorted* on disk — and both are made when you design the table, not when you write the query.

## Distribution: where a row lives

A warehouse spreads one table's rows across many nodes so they can be scanned in parallel. The question that decides your performance is: **when two tables are joined, do the rows that need to meet already live on the same node?**

If they don't, the engine has to shuffle data across the network mid-query to bring matching rows together. On large tables that redistribution is the single most expensive thing that happens, and it's invisible in the SQL — the query looks fine and runs slowly. So the design goal is to arrange things so the important joins are *local*.

That gives three moves, and picking between them is most of the craft:

- **Co-locate the big join.** A large fact table and the thing it's most often joined on should be distributed on the *same key* — say, both on `customer_id`. Now matching rows sit together and the join happens node-local, no shuffle.

  ```sql
  -- conceptual: fact distributed on the key it's most joined by
  CREATE TABLE fact_orders (
    order_id      bigint,
    customer_id   bigint,   -- distribution key
    ordered_at    timestamp,
    amount        numeric(12,2)
  ) DISTKEY (customer_id);
  ```

- **Replicate the small tables.** A little lookup dimension — a few thousand rows of statuses or regions — doesn't want its own distribution. Keep a full copy on *every* node. Any query can join it without moving anything. The storage cost is trivial; the shuffle you avoid is not.

- **Spread evenly when nothing dominates.** If a table has no obvious join partner, distribute it evenly so at least the scan work is balanced across nodes and no single machine becomes the bottleneck.

The trap is distributing on something with few distinct values — you end up with most of the data piled onto a handful of nodes while the rest sit idle. Even parallelism beats clever parallelism that's lopsided.

## Sort: the order rows are stored in

The second lever is what order rows are physically written in. Choose a sort key that matches how the data is filtered, and you unlock **skipping**: the engine tracks the range of values in each block and, for a query with a `WHERE` on the sort column, reads only the blocks that could possibly match.

For the time-series data I work with, almost every query is bounded by a date range. So sorting the big tables by their timestamp means a "last 30 days" query physically skips the older blocks instead of scanning years to throw most of it away.

```sql
CREATE TABLE fact_orders ( ... )
  DISTKEY (customer_id)
  SORTKEY (ordered_at);   -- range-filtered queries skip irrelevant blocks
```

The rule of thumb that's held up: **distribute by what you join on, sort by what you filter on.** They target the two dominant costs — moving data between nodes, and reading data you didn't need.

## One more that quietly matters

Because storage is columnar, each column is compressed on its own, and picking a good encoding per column shrinks the table on disk. That's not just a storage win — less data on disk means less data read, and less read means faster. It's the same theme as everything else here: the fastest work is the work you skip.

## The honest caveat

Modern Redshift will make many of these choices automatically, and for plenty of tables that's genuinely fine — I don't hand-tune everything, and neither should you. Automation is a good default. But it optimizes for the general case, and it can't know that *this* fact table is almost always joined one specific way and filtered by date. On the tables that carry the load, understanding the layout — and setting it deliberately — is still where the biggest wins come from.

The reframe that stuck with me: in a warehouse you're not tuning queries so much as **designing where data sits before any query runs.** Get the physical layout right and the queries are fast because there was never much work to do. Get it wrong and no amount of query cleverness fully saves you.
