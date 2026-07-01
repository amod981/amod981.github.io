---
title: "Knowing What Happened to a Message You Sent"
description: "Sending a message is easy. Knowing whether it actually arrived is a distributed-systems problem in disguise — the answer shows up asynchronously, out of order, sometimes hours later, sometimes never. Here's why I treat the message log as the source of truth."
date: "2026-06-14"
readTime: "6 min read"
tags: ["System Design", "Observability", "Eventual Consistency", "Distributed Systems", "Messaging"]
---

# Knowing What Happened to a Message You Sent

"Send a message" sounds like a single action with a yes-or-no answer. It isn't. It's the start of a small story that unfolds over time, and if you don't write the story down as it happens, you end up unable to answer the most basic question a support ticket will ever ask: *did the message actually get there?*

## Sending is not arriving

When you hand a message to a provider, a successful API call means one thing only: the provider *accepted* it. It has not been delivered. It might be delivered in two seconds, or after the recipient's phone comes back online tomorrow, or never. The truth about delivery comes back **later and separately**, as a delivery receipt — an asynchronous callback that arrives on its own schedule, long after the original request's code has finished and moved on.

So the lifecycle of one message is really a sequence of events, arriving at different times from different directions:

```
queued  →  accepted by provider  →  delivered   (or: failed / expired / no receipt ever)
   |               |                     |
  us            the send            an async receipt, minutes-to-hours later
```

The failure mode of the naive design is that the send path and the receipt path don't know about each other. You send, you forget. The receipt shows up and has nothing to attach itself to. You've thrown away the ability to correlate cause and effect.

## The idea: one durable record per message, updated as news arrives

The fix is to treat a **message log** as the system's source of truth — a durable record, one per message, created the instant you attempt a send and updated every time new information about that message arrives.

```ts
// On send: write the record before you rely on anything else knowing about it.
await messageLog.put({
  messageId,                 // your id — the thread that ties events together
  status: "accepted",
  provider: "provider-a",
  providerRef: result.ref,   // their id, so their receipt can find this row
  createdAt: now(),
});

// Later, when a receipt arrives out of the blue:
await messageLog.update(messageId, {
  status: receipt.delivered ? "delivered" : "failed",
  deliveredAt: now(),
});
```

The quiet, load-bearing detail is `providerRef`. The delivery receipt won't know your `messageId` — it only knows the provider's own reference. If you didn't record the mapping between your id and theirs at send time, an incoming receipt is an orphan you can't match to anything. That one field is the difference between "we know what happened" and "a stranger just told us a message was delivered and we have no idea which one."

## Designing for the receipt that never comes

Here's the part that separates a log that looks fine in the demo from one that survives production: **some receipts never arrive.** The provider drops it, the callback fails, the message quietly expires. If "delivered" only ever gets set by an incoming receipt, those messages sit at "accepted" forever, and you can't tell the genuinely-in-flight ones from the silently-lost ones.

So the log has to account for the absence of news, not just its presence. A message that's been sitting at "accepted" well past any reasonable delivery window gets swept into a "stale / unknown" state by a periodic check. Now the state means something honest: a small backlog of genuinely recent sends, and everything older resolved to delivered, failed, or explicitly unknown. **Absence of a receipt is information too**, and the log is only trustworthy if it captures that.

## Why this pays for itself

Once every message has a durable, evolving record, capabilities you didn't explicitly build start falling out of it:

- **Support answers.** "Did my message arrive?" becomes a lookup, not a shrug.
- **Safe retries.** You can find what was accepted but never delivered and act on it — precisely because you can tell those apart.
- **Reality-based metrics.** Delivery rates measured from receipts, not from "the API didn't throw."
- **Debugging.** A timeline per message beats correlating three services' logs by hand at 2 a.m.

The reframe that stuck with me: in any system that hands work to something asynchronous, **the log of what happened is a feature, not exhaust.** Sending was never the hard part. Knowing — durably, correlatably, honestly — what became of what you sent is the actual system, and it's worth designing on purpose rather than reconstructing from logs after something's already gone wrong.
