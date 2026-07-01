---
title: "How to Check an LLM's SQL Before You Run It"
description: "Letting a language model write SQL against your warehouse is useful and a little terrifying. Here's a cheap trick for validating a generated query against the real schema — without executing it or touching a single row."
date: "2026-06-30"
readTime: "5 min read"
tags: ["MCP", "LLM", "Text-to-SQL", "AI Safety", "SQL"]
---

# How to Check an LLM's SQL Before You Run It

When you let a language model write SQL and run it against a real warehouse, you inherit a specific fear: the model produces a query that *looks* fine, references a column that doesn't exist, or — worse — does something you didn't intend. You want a gate between "the model wrote this" and "the database ran this."

The obvious gates are the wrong ones to start with. Regex the SQL? You'll never cover the cases. Ask a second LLM if the query is safe? Now you have two models to distrust instead of one. What I wanted was a check backed by the one component that actually knows the truth about my schema: the database itself.

## The trick: ask the database to plan, not to run

Every serious SQL engine has an `EXPLAIN` command. You hand it a query and it returns the *execution plan* — how it would run the query, if it ran it. The important part is what `EXPLAIN` does along the way: it **parses the SQL and resolves every table and column against the real schema**, then stops. It does not execute the query. It does not scan or return rows.

That's exactly the validation I wanted, for free:

- Syntax wrong? `EXPLAIN` fails.
- Referenced a column that doesn't exist? `EXPLAIN` fails.
- Typo'd a table name? `EXPLAIN` fails.
- Query is valid against the actual schema? `EXPLAIN` succeeds — without having touched the data.

So the guardrail is simply: prepend `EXPLAIN` to the model's query, run *that*, and let success or failure be your verdict.

```ts
async function validateQuery(sql: string): Promise<Validation> {
  try {
    // The database parses + plans the query against the real schema,
    // but never executes it. No rows read, no data returned.
    await db.run(`EXPLAIN ${sql}`);
    return { valid: true };
  } catch (err) {
    // Real, schema-aware feedback — often good enough to hand back
    // to the model so it can correct itself and try again.
    return { valid: false, reason: String(err) };
  }
}
```

There's a quietly useful side effect here. When `EXPLAIN` fails, the error is specific — *"column `ship_dt` does not exist"* — and that message is exactly the kind of feedback a model can act on. You can return it to the model and let it repair its own query. The database becomes the fact-checker in a correction loop, instead of you writing brittle rules to anticipate every mistake.

## What EXPLAIN does *not* do

I want to be precise, because it's tempting to oversell this. `EXPLAIN` tells you a query is **runnable**, not that it's **right**. A query can plan perfectly and still answer the wrong question — sum the wrong column, miss a `WHERE`, join at the wrong grain. Validation is not correctness. Getting the answer right is the job of good schema documentation and a model that understands your data; `EXPLAIN` only guarantees the query won't blow up on execution.

It's also not your security boundary. `EXPLAIN` will happily plan a `DELETE` or an `UPDATE`. So it sits *inside* a defense-in-depth setup, not in place of one:

- **A read-only database user.** This is the real guardrail. The account the server uses should be physically incapable of writing, dropping, or mutating anything. If the credentials can't do harm, a malformed or malicious query can't either.
- **`EXPLAIN` as the pre-flight check.** Catches the honest mistakes cheaply and gives the model a path to self-correct.
- **Sensible limits at execution.** Row caps and timeouts, so a valid-but-enormous query can't run away with your cluster.

The order matters. People reach for clever query-inspection logic first; the boring read-only user is what actually keeps you safe. `EXPLAIN` is the thing that makes the experience *good* — fast, specific feedback — on top of a foundation that makes it *safe*.

## Why I like this pattern

It delegates the hard part to the system best equipped to do it. I'm not trying to reimplement a SQL parser or predict every way a model can be wrong about my schema — I'm asking the database the one question it can answer authoritatively: *would this query run?* Everything else is a thin layer around that.

Letting an LLM write SQL will always carry a little risk. The goal isn't to pretend otherwise — it's to make the cheap, safe checks automatic, keep the dangerous capabilities out of reach entirely, and let the model fail loudly and correctably instead of quietly and expensively.
