---
title: "Teaching a Healthcare Assistant to Say \"I Don't Know\""
description: "In consumer AI, a wrong answer is annoying. In healthcare, it can be a safety event. Here's why the most useful thing a clinical assistant does is decline to answer — and how I learned to design for that."
date: "2026-06-24"
readTime: "5 min read"
tags: ["LLM", "Healthcare", "AI Safety", "Abstention", "Production AI"]
---

# Teaching a Healthcare Assistant to Say "I Don't Know"

I work on an AI assistant that reads and replies to patient messages over SMS. Most of the interesting engineering isn't in getting it to answer. It's in getting it to *not* answer when it shouldn't.

That sounds backwards, so let me explain how I got there.

## A wrong answer isn't a bug — it's an incident

When you build a chatbot for, say, a shopping site, a wrong answer is a bad experience. The user shrugs, rephrases, moves on. The cost of being wrong is low, so you optimize for coverage: answer as much as you can.

Clinical messaging flips that math. A patient might write something vague, emotional, or half-typed:

> "stopped taking them, felt worse"

A confident, plausible, *wrong* interpretation of that message isn't a shrug. It can route someone down the wrong path at exactly the moment they need a human. So the design goal changes. You stop asking "how often is the model right?" and start asking "how often is it right *when it chooses to speak* — and does it stay quiet the rest of the time?"

## The metric that actually matters

Overall accuracy is a comforting number and a misleading one. If a model answers everything and is right 90% of the time, that 10% is spread across every patient, including the ambiguous cases where being wrong is most dangerous.

What I care about instead is two numbers held together:

- **Accuracy when we respond.** Of the messages the assistant chose to answer, how many were right? This should be very high — because we only answer when we're confident.
- **Deferral rate.** How often did we hand off to a human instead of answering?

A system that answers less but is almost never wrong when it does answer is, in this domain, *better* than one with a higher headline accuracy. Choosing to defer is not a failure mode. It's a feature, and it deserves to be measured as one.

## How the "I don't know" path works

The shape is simple: generate a candidate response, then run a separate check whose only job is to decide *answer or hand off*. That second step is deliberately conservative — it's allowed to be wrong in the safe direction (escalate something that was actually fine) but not in the unsafe one.

Here's a representative sketch of the idea — not my production code, just the pattern:

```ts
type Decision =
  | { action: "respond"; message: string }
  | { action: "escalate"; reason: string };

async function handlePatientMessage(msg: PatientMessage): Promise<Decision> {
  const candidate = await draftResponse(msg);

  // A separate, conservative gate. It does not trust the draft by default.
  const check = await validate(candidate, msg, {
    // e.g. is the intent unambiguous? is the answer grounded in
    // something we actually know? is there any risk signal?
    requireGrounding: true,
    escalateOnAmbiguity: true,
  });

  if (!check.confident) {
    return { action: "escalate", reason: check.reason };
  }
  return { action: "respond", message: candidate };
}
```

The important word is *separate*. If you ask the same model, in the same breath, to both answer and judge whether it should have, it will happily rationalize its own answer. Splitting generation from adjudication is what gives the gate teeth.

## Not all deferrals are equal

Once you start escalating, you learn something uncomfortable: a lot of the messages the assistant *couldn't* handle weren't the model's fault. The patient contradicted themselves, or replied to a two-week-old message with no context, or asked something no automated system should be answering in the first place.

That distinction turned out to matter more than I expected. When you review escalations, separate them into two buckets:

- **Fixable** — the assistant *should* have handled it and didn't. This is your actual model backlog.
- **Unfixable** — no reasonable system could have answered safely. This is the floor.

If you don't split them, every escalation looks like a shortcoming, and you'll chase accuracy gains that aren't really available. Most of my genuinely useful improvements came from correctly identifying that a large share of hand-offs were the *right call*, and then focusing only on the fixable remainder.

## The lesson

The hard part of clinical AI, for me, hasn't been the model. It's been the boundary — teaching the system where its competence ends and being honest, in the metrics, about how often it's standing at that edge.

An assistant that knows when to stay quiet and pass the conversation to a person isn't a less capable one. In this domain, it's the only kind worth shipping.
