---
title: "Putting OAuth in Front of an MCP Server"
description: "My MCP server ran happily over stdio with no auth at all. The moment I wanted a hosted client to connect to it, that stopped being okay. Here's what I learned wiring OAuth onto an MCP server for the first time — including the Auth0 gotcha that cost me most of a day."
date: "2026-07-01"
readTime: "6 min read"
tags: ["MCP", "OAuth", "Auth0", "Authentication", "LLM"]
---

# Putting OAuth in Front of an MCP Server

For a while my MCP server had no authentication whatsoever, and that was completely fine. It ran locally over **stdio** — the client launched it as a subprocess and talked to it over standard input and output. Nothing was listening on a port. There was no door to lock because there was no door.

Then I wanted a hosted client to connect to it. And everything changed.

## stdio is trusted; HTTP is not

The stdio transport is intimate by design. The process runs on your machine, started by a client you already trust, and no one else can reach it. Auth would be theater.

To let a remote, hosted client connect, though, I had to expose the server over **HTTP**. That's a different world. An HTTP endpoint is a public door — anyone who finds the URL can knock. The instant I switched transports, "no auth" went from *fine* to *reckless*. The transport change was the real forcing function; the auth work existed only because I'd gone from a private pipe to a public endpoint.

So the question became: how do you actually put authentication in front of an MCP server?

## The docs are thin, and OAuth was new to me

I'll be honest — this was my first time implementing OAuth end to end, and MCP's auth story is still young. There are plenty of "set up Auth0" tutorials, but very little on the specific shape of *an MCP server as an OAuth-protected resource*. I spent real time reading specs and provider docs just to assemble the mental model.

The model, once it clicked, is clean. Your server is a **resource server**. It doesn't log anyone in — it just refuses to do anything unless the incoming request carries a valid access token. An identity provider (I used Auth0) issues those tokens; your server's only job is to verify them on every request:

```ts
import { auth } from "express-oauth2-jwt-bearer";

// Validates `Authorization: Bearer <token>` on every request.
// 401s automatically if the token is missing, expired, or unverifiable.
const jwtCheck = auth({
  issuerBaseURL: "https://your-tenant.us.auth0.com/",
  audience: "https://your-mcp-api",
  tokenSigningAlg: "RS256",
});

app.use(jwtCheck); // guard the MCP HTTP transport behind this
```

That's genuinely most of it. The middleware fetches the provider's public signing keys, checks the token's signature, and validates the issuer, audience, and expiry. Conceptually simple.

Getting it to actually work was another matter.

## The 401 dance

If you've done this, you know the dance. Every request comes back `401 Unauthorized`, and the response tells you almost nothing about *why*. Wrong audience? Wrong issuer URL (trailing slash!)? Token not actually being sent? A signature the server can't verify? They all look identical from the outside. You end up decoding tokens by hand and diffing claims against what the middleware expects, one field at a time.

Most of my 401s were the boring kind — a mismatched audience string, an issuer URL off by a slash. But one of them was not boring at all, and it's the part worth writing down.

## The gotcha: no audience, no JWT

Here's the one that cost me most of a day.

When the hosted client requested a token from Auth0, it **didn't specify an audience**. And Auth0 has a subtle behavior: if a token request doesn't name an API audience, it doesn't issue a signed, verifiable JWT for your API. It issues an **opaque token** instead — an inscrutable blob meant for the provider's own userinfo endpoint, not something your resource server can crack open and validate against public keys.

So my middleware kept receiving a token that looked like nonsense to it and failing signature validation, while the token itself was perfectly "valid" — just the wrong *kind*. The error messages pointed at signatures and keys, which sent me hunting in exactly the wrong direction.

The fix wasn't in my code at all. In the Auth0 tenant settings there's a **Default Audience**. Set it to your API, and the provider will mint proper JWTs for that audience *even when the client doesn't ask for one explicitly*. The moment I set it, the opaque tokens became real JWTs, the signatures verified, and the 401s cleared.

If you're wiring a provider up to a client you don't control — and you often don't control how a hosted MCP client requests its token — this is the setting to check first, not last.

## Users, permissions, and what's next

With tokens verifying, I set up users and defined a set of permissions in the provider. Right now the server authenticates — it confirms *who* you are and that you're allowed in the door. What it doesn't yet do is fine-grained **authorization**: gating individual resources and tools by permission. That's deliberately the next piece of work, not something I'm going to claim is finished. Authentication first, resource-level authorization next.

## What I'd tell someone starting this

- **The transport decides whether you need auth.** stdio is a private pipe; HTTP is a public endpoint. Auth is the price of going remote, and it's worth paying properly.
- **Treat your server as a resource server**, nothing more. It verifies tokens; it doesn't do login flows. That framing simplifies everything.
- **When tokens won't validate, check what *kind* of token you're getting before you debug signatures.** An opaque token and a JWT fail in ways that look the same and aren't. The default-audience setting is the fix I wish I'd known on day one.

None of this was conceptually hard in hindsight. But the gap between "the middleware is four lines" and "requests actually succeed" was where all the real learning lived — and most of it wasn't in my code.
