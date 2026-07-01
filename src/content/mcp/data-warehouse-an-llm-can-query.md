---
title: "Giving an LLM a Data Warehouse It Can Actually Query"
description: "Point a language model at a raw database schema and it writes confident, wrong SQL. The fix isn't a bigger model — it's treating each table's documentation as a first-class resource. Here's the pattern I used with MCP."
date: "2026-06-30"
readTime: "6 min read"
tags: ["MCP", "LLM", "Text-to-SQL", "Data Warehouse", "Context Engineering"]
---

# Giving an LLM a Data Warehouse It Can Actually Query

I built a server that lets a language model answer questions against a data warehouse — the "how many orders shipped late last quarter?" kind of question, turned into SQL and run for you. The naive version of this is a weekend project. The version that gives *correct* answers is mostly about one thing: what you tell the model about your data.

## Why dumping the schema doesn't work

The obvious first move is to hand the model your schema. Paste in the `CREATE TABLE` statements, or a list of tables and columns, and let it figure out the rest.

It writes SQL immediately. The SQL is confident. And it's often subtly wrong, because a schema tells the model the *shape* of your data but nothing about its *meaning*:

- It sees a column called `status` but not that `3` means "cancelled."
- It joins `orders` to `customers` on the wrong key because two plausible keys exist.
- It sums a `line_total` column without knowing there's one row per line item, not per order — so every total is inflated.
- It doesn't know that `orders_v2` is the real table and `orders` is a deprecated view nobody cleaned up.

None of that is in the DDL. It lives in the heads of the people who built the warehouse. If you don't write it down, the model guesses — and a plausible guess in analytics is worse than an error, because no one notices.

## Treat each table as a documented resource

The pattern that worked: **every table gets a hand-written data dictionary, and each one is exposed as its own resource** the model can pull in on demand. I used the Model Context Protocol (MCP) for this, but the idea is portable — what matters is that schema *documentation* is a first-class thing you serve, not an afterthought.

Each table's doc reads less like DDL and more like an onboarding note for a new analyst:

```markdown
# orders

One row per **customer order** (not per line item — see `order_lines` for that).

## Grain
One row per `order_id`.

## Key columns
- `order_id` — primary key
- `customer_id` — join to `customers.customer_id`
- `status` — 1=placed, 2=shipped, 3=cancelled, 4=returned
- `placed_at` — UTC. Use this for "when was the order made" questions.

## Gotchas
- Cancelled orders (`status = 3`) still appear here. Exclude them for revenue.
- `order_total` already includes tax; don't re-add it from `order_lines`.

## Example questions this table answers
- "How many orders were placed last month?"
- "What's the cancellation rate by week?"
```

That "Gotchas" section is the whole game. It's the tribal knowledge that turns a plausible query into a correct one, and it's exactly what a raw schema can never carry.

## Why resources, and not one giant prompt

You might ask: why not concatenate all of this into the system prompt and be done?

Because a real warehouse has dozens of tables, and stuffing every table's documentation into every request is wasteful and, past a point, counterproductive — the model's attention gets diluted across tables irrelevant to the question. Exposing each table as a separate resource means the client can pull in only the handful relevant to the current question. The documentation for `orders` and `customers` shows up when someone asks about orders; the other forty tables stay out of the way.

The server side of this is deliberately boring. Each resource is just a name, a URI, and a function that returns its documentation:

```ts
// one entry per table — registered in a loop, not by hand
for (const resource of resources) {
  server.resource(resource.name, resource.uri, async () => resource.read());
}
```

Keeping it a flat, uniform list matters more than it looks. Adding a new table to the warehouse should mean adding one documentation file and one registration — not touching a 500-line prompt. The structure is what keeps it maintainable as the warehouse grows.

## The honest tradeoff

This approach has a real cost: **the docs are only as good as you keep them.** A data dictionary that drifts from the actual schema is worse than none, because now the model is confidently wrong *and* citing documentation. So the discipline is that a schema change isn't done until its doc is updated — the same way you'd treat a public API.

I think that's the right cost to pay. In analytics, the failure mode isn't a crash you'll catch — it's a number that looks reasonable, ends up in a dashboard, and quietly informs a decision. The work of writing down what your tables actually mean is the work of making that failure mode rare.

The model was never the bottleneck. The context was.
