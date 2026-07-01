---
title: "Making Retrieval Understand \"Where?\""
description: "Vector search assumes every query stands on its own. Real conversations don't work that way. Here's how I handle one-word follow-ups like \"Where?\" without rewriting every query through an LLM."
date: "2026-06-17"
readTime: "5 min read"
tags: ["RAG", "Vector Search", "LLM", "Retrieval", "Query Rewriting"]
---

# Making Retrieval Understand "Where?"

Here's a failure that took me a while to take seriously. A patient asks a knowledge-base question, gets an answer, and replies:

> "Where?"

To a person, that's obvious — they mean *where* is the thing we just talked about. To a vector search index, "Where?" is almost pure noise. It embeds to nothing in particular and retrieves nothing useful. The system had all the context it needed one message earlier and threw it away.

This is the quiet weakness of retrieval-augmented systems: **embedding search assumes every query is self-contained.** Standalone questions work beautifully. Conversational follow-ups — "why?", "how much?", "the other one?" — fall straight through the cracks, and those are exactly how people actually talk.

## The tempting wrong fix

The obvious move is to rewrite every incoming query through an LLM first: expand pronouns, fold in context, then search. It works, and I'd advise against it as a default.

Rewriting every message means an extra model call on the critical path for *all* traffic — including the majority of queries that were already perfectly clear. You pay latency and cost on the many to fix the few, and worse, an over-eager rewrite can corrupt a good standalone query. If retrieval already works for most messages, don't put a language model in front of all of them.

## Retrieve first, rewrite only if you have to

The approach I settled on treats rewriting as a *fallback*, not a first step:

1. Run normal embedding search on the raw message.
2. Check whether what came back actually makes sense as a reply, given the recent conversation.
3. Only if that check fails, rewrite the message into a self-contained query using the last few turns — then search again and re-check.

Most messages never reach step 3. The vague ones do, and for them the rewrite is worth every millisecond.

```ts
async function retrieveWithContext(message: string, history: Turn[]) {
  // Step 1: cheap path first
  let hit = await vectorSearch(message);

  // Step 2: does this result cohere with the conversation?
  if (await isCoherent(hit, message, history)) {
    return hit;
  }

  // Step 3: fallback — make the query self-contained, then retry
  const rewritten = await rewriteWithHistory(message, history);
  hit = await vectorSearch(rewritten);

  return (await isCoherent(hit, rewritten, history)) ? hit : null; // null => hand off
}
```

The `isCoherent` check is doing the real work. Similarity scores alone won't save you here — a vague query can confidently retrieve a confidently irrelevant chunk. What you want to know isn't "is this close in vector space?" but "does this answer actually follow from what the user just said?" That's a judgment call, and it's the one place a small model call earns its keep.

And notice the last line: if even the rewritten query doesn't cohere, we don't force an answer. We return nothing and let a human take it. Retrieval that knows when it has failed is worth more than retrieval that always produces *something*.

## This has a name

None of this is novel, and it helps to know that. What I'm describing is **conversational query reformulation** — rewriting a context-dependent utterance into a standalone one before retrieval. It's a cousin of query expansion and of techniques like HyDE, which generate a richer query representation to search against.

The part I'd argue is underrated in practice is the *gating*: not whether to rewrite, but *when*. The literature tends to assume you always reformulate. In a production system with real latency and cost budgets, deciding to skip the rewrite on 80% of traffic is the difference between a clever demo and something you can actually run.

## What I'd tell my past self

Vector search isn't broken. It's just literal — it answers the query you gave it, not the one you meant. The fix isn't a bigger model in front of everything. It's a cheap first attempt, an honest check on whether the result makes sense, and a willingness to do the expensive thing only when the cheap thing clearly failed.

People stop writing full sentences the moment they trust you to keep up. A retrieval system worth building should keep up too.
