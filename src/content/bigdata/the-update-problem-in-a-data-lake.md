---
title: "The Update Problem in a Data Lake"
description: "A data lake is great at appending and terrible at changing. But real records get updated — sometimes months later. Here's the problem that pushed me to Apache Hudi, and why partitioning turned out to matter just as much as the upserts."
date: "2026-06-22"
readTime: "6 min read"
tags: ["Data Engineering", "Apache Hudi", "Data Lake", "Upserts", "Partitioning"]
---

# The Update Problem in a Data Lake

A data lake is, at heart, files in object storage. That makes it wonderful at one thing — appending new data — and genuinely bad at another: changing data that's already there. For a while you can pretend that's fine. Then reality shows up.

## The problem: records don't stay still

The source I pull from is an operational store where records get **updated long after they were created**. Something recorded months ago gets corrected, enriched, or its status changes. That's normal for a live system. It's a nightmare for a lake built on immutable files, because the row I need to change is sitting in a file somewhere in last quarter's data, and object storage has no notion of "update this one record."

The approach I started with was the obvious one, and it's the one most people reach for: when anything in a time partition changes, **delete the whole partition and rewrite it** from source. It's simple and it's correct. It's also brutally wasteful — you rewrite thousands of unchanged records to fix one, you burn compute and I/O doing it, and it gets slower every month as the data grows. It doesn't scale, and worse, it scales *backwards*: the more history you accumulate, the more expensive each small change becomes.

What I actually wanted was boring and specific: **change the records that changed, and leave everything else alone.**

## Idea one: upserts as a first-class operation

That's the capability Apache Hudi adds on top of a plain lake. Instead of treating storage as write-once files, Hudi maintains tables that understand records — each has a key, and writing is an *upsert*: if the key exists, update it in place; if it doesn't, insert it.

The mental model shift is the whole point. I stopped thinking "which partitions do I need to blow away and rebuild" and started thinking "here's the batch of records that changed since last time — merge them in." A late update to a months-old record becomes a targeted merge into exactly the files that hold it, not a rewrite of the neighborhood around it.

```python
# conceptual — the idea, not a config dump
write_batch(
    changed_records,
    record_key   = "id",          # what identifies a row
    precombine   = "updated_at",  # if two versions collide, newest wins
    operation    = "upsert",       # update in place, or insert if new
)
```

The one part I'll flag because it bit me: when two versions of the same record show up, the system needs a rule for which one wins. That's the `precombine` field — usually an "updated at" timestamp. Without it, "latest version wins" isn't actually defined, and you get nondeterministic results that are maddening to debug. Deciding *what recency means* is a design decision, not a default.

## Idea two: partitioning is half the performance

Upserts solve correctness. Partitioning is what makes them — and every read afterward — efficient, and it's the part I underrated at first.

Partitioning is just how you physically group records into folders on disk, usually by something like date. It matters for two reasons that pull in the same direction:

- **On write**, a well-chosen partition scheme means an update only has to touch the handful of partitions the changed records live in. The engine can skip the rest entirely instead of scanning the whole table to find what to merge.
- **On read**, every downstream query that filters by the partition column — and for time-series data, almost all of them do — reads only the relevant folders. You're not paying to scan history you don't want.

Get the partition column wrong and you feel it from both sides: writes touch too much, and reads scan too much. Get it right — align it with how the data both *arrives* and *gets queried* — and the same choice makes ingestion cheaper and queries faster at once. That double payoff is why I now treat the partition strategy as a headline decision, not an afterthought you tack on at the end.

## The real lesson

It would be easy to frame this as "I adopted a tool." The honest version is that I hit a fundamental mismatch — a mutable source landing in immutable storage — and the fix was to stop fighting it. Give the lake real upserts so changes stay cheap no matter how old the record, and partition the data so both writing and reading only ever touch what they need.

The tool is incidental. The idea is that in a data lake, the expensive operations are the ones that touch data they didn't need to. Almost everything worth doing is about touching less.
