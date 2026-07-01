---
title: "The Cron Job That Ran Five Times"
description: "The moment you run more than one copy of your app, every copy runs your cron jobs — so a job you meant to fire once fires once per instance. Here's the idea that fixes it: turn 'run this on a schedule' into 'run this on a schedule, once.'"
date: "2026-06-28"
readTime: "6 min read"
tags: ["System Design", "Idempotency", "Distributed Systems", "Cron", "Reliability"]
---

# The Cron Job That Ran Five Times

Here's a bug that doesn't exist on your laptop and absolutely exists in production.

You have a scheduled job — send the batch of outbound messages due this minute, say. On your machine it works perfectly. In production you run several copies of the app behind a load balancer for availability. Each copy has the same code, which means each copy has the same scheduler, which means when the clock ticks, **every instance runs the job.** Five instances, five sends. Your "send once" just became "send five times," and the people on the receiving end noticed before your monitoring did.

The instinct is to blame the scheduler. It's not the scheduler's fault. The scheduler did exactly what you told it on every box you told it to. The real problem is that "run on a schedule" and "run *once* on a schedule" are different requirements, and horizontal scaling is what exposes the gap.

## The idea: agree on a lock

What the instances lack is a way to agree that *one* of them owns this run. They don't share memory, so the agreement has to live somewhere they all see — a database. The pattern is a **distributed lock**: before doing the work, every instance races to claim a shared marker for this specific run. Exactly one wins. The winner does the work; everyone else sees the marker's already taken and quietly stands down.

Two details make it actually work, and both are easy to get subtly wrong.

**First, the instances have to agree on what "this run" means.** Each computes "now" a few milliseconds apart, so you can't key the lock on a raw timestamp — every instance would compute a slightly different one and they'd all think they're unique. Truncate to the granularity of the schedule. For a per-minute job, round down to the minute, so all five instances compute the *same* key and collide on purpose.

**Second, the claim has to be atomic.** The thing that makes this a lock and not a suggestion is a uniqueness constraint in the database. Everyone tries to insert a row for `(job_name, this_minute)`; the database guarantees only one insert succeeds and the rest fail. You're borrowing the database's atomicity instead of trying to coordinate it yourself.

```ts
async function runOnce(jobName: string, job: () => Promise<void>) {
  const slot = floorToMinute(new Date());        // all instances agree on this
  const lockId = `${jobName}:${slot.toISOString()}`;

  try {
    // Unique index on lockId makes exactly one insert win.
    await locks.insert({ _id: lockId, acquiredAt: new Date() });
  } catch {
    return; // someone else owns this run — stand down, no error
  }

  try {
    await job();
  } finally {
    await locks.remove({ _id: lockId });
  }
}
```

## The part everyone forgets: crashes

A lock you take and never release is a deadlock waiting to happen. If the instance holding the lock crashes mid-job, its marker is stranded — and now *next* minute's run might find a leftover and refuse to fire. You've traded "runs five times" for "stops running," which is worse because it's silent.

So the lock needs an expiry. Sweep away markers older than a sane threshold before trying to acquire, on the assumption that anything that old belongs to a dead instance:

```ts
await locks.removeMany({ acquiredAt: { $lt: minutesAgo(5) } });
```

This is the humble, honest version of a lock lease. A real lease renews itself while the work is ongoing; for a lot of batch jobs, "clean up anything suspiciously old" is enough and far simpler. The point is that **you have to plan for the holder dying**, or your safety mechanism becomes your outage.

## The deeper lesson

A lock is a guard, not a cure. The stronger move, where you can afford it, is to make the *work itself* idempotent — tag each message with a stable id and refuse to send one that's already marked sent, so even a double-run can't double-send. Then the lock is just an optimization that saves you from doing duplicate work, not the only thing standing between you and a bad day.

But the mental shift is the real takeaway, and it long outlasts any one job: **"on a schedule" says nothing about "how many times."** The instant your app runs in more than one place, every periodic action needs an answer to "what happens when this fires on all of them at once?" Answer it on purpose, or production will answer it for you.
