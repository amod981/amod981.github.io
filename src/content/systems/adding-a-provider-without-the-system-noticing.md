---
title: "Adding a Second Provider Without the System Noticing"
description: "Wiring your app directly to a third-party API feels fine until you need a second one — or the first one has an outage. The fix is an old idea worth relearning: put a thin translation layer at the edge so the rest of your system never learns the vendor's name."
date: "2026-06-20"
readTime: "5 min read"
tags: ["System Design", "Architecture", "Integration", "Abstraction", "Reliability"]
---

# Adding a Second Provider Without the System Noticing

I work on a system that sends and receives text messages through a third-party SMS provider. The first version did the obvious thing: call the provider's API where we needed to send, parse its responses where they came back. It worked, it shipped, everyone was happy.

Then we needed a second provider — for redundancy, for coverage, for the usual reasons you end up multi-vendor. And I found the first provider's fingerprints *everywhere*. Its request shape, its status codes, its particular way of formatting an inbound message and its own dialect of delivery receipt had quietly leaked into code that had no business knowing an SMS vendor existed. Adding a second one wasn't a feature; it was a search-and-replace across half the codebase.

## The idea: the vendor stops at the door

The fix is an old idea that goes by a few names — an adapter, an anti-corruption layer — and the one-line version is: **the vendor's shape is allowed to exist at the very edge of your system and nowhere else.**

You define one internal representation of the things you care about — an outbound message, an inbound message, a delivery result — in *your* terms. Then each provider gets a small adapter whose entire job is translation: turn your internal message into that vendor's request, and turn that vendor's responses back into your internal shape. Everything upstream talks only to the internal shape. It never learns which vendor is on the other side.

```ts
// Your terms — not any vendor's.
interface MessageProvider {
  send(msg: OutboundMessage): Promise<SendResult>;
  parseInbound(raw: unknown): InboundMessage;
  parseReceipt(raw: unknown): DeliveryReceipt;
}

// One small adapter per vendor. The quirks live in here and stop here.
class ProviderAAdapter implements MessageProvider { /* ... */ }
class ProviderBAdapter implements MessageProvider { /* ... */ }
```

Now the router that actually sends a message asks for *a* provider, not a specific one:

```ts
const provider = providers.pick();  // by config, routing rule, or failover
await provider.send(message);       // caller has no idea who that is
```

The win is that adding the second provider became writing one new adapter that satisfies the interface. Nothing upstream changed, because nothing upstream ever knew. The blast radius of "integrate a new vendor" shrank from the whole system to one file.

## Where the real work hides

The honest part: the interface is the easy bit. The work is in the translation, because providers disagree in ways that are quietly meaningful.

- One returns a rich delivery receipt with granular states; another gives you delivered-or-not and nothing more. Your internal `DeliveryReceipt` has to be an honest lowest-common-denominator, or a superset where absent detail is explicitly *unknown* rather than falsely `false`.
- Inbound messages arrive in different envelopes, with phone numbers formatted differently, with different ideas of what a message id is.
- Error taxonomies never line up. A "rejected" from one and a "failed" from another might mean the same thing, or importantly different things.

Designing the internal shape so it's faithful to *all* of them, without smuggling one vendor's assumptions in as "the default," is the actual craft. Get it wrong and your abstraction leaks anyway — you'll have an interface that only really fits the first provider, which is the thing you were trying to escape.

## Why it's worth it beyond "a second vendor"

Once the vendor stops at the door, a few things you didn't build for come almost free:

- **Failover.** If one provider is down, route to another — the caller never notices, because the caller never knew.
- **Testing.** A fake adapter that implements the interface lets you test all your message logic without touching a real provider or spending real money.
- **Migration.** Moving traffic between vendors becomes a routing decision, not a rewrite.

The reframe I'd hand my past self: **a third-party API is a detail, and details belong at the edges.** The moment a vendor's data shapes start appearing in your core logic, you haven't integrated a provider — you've married one. Keep the vendor at the door, translate on the way in and out, and the rest of your system gets to stay blissfully ignorant of who's actually carrying the messages.
