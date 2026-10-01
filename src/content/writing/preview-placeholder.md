---
title: "Notes from an SRE On-Call Week"
description: "A field note on what actually breaks in production, what the runbooks miss, and three small habits that cut our MTTR in half."
pubDate: 2026-09-15
tier: field-note
tags: ["sre", "on-call", "incident-response"]
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## The pager doesn't care about your runbook

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
in culpa qui officia deserunt mollit anim id est laborum.

- Alert fatigue is a symptom, not a root cause
- Runbooks rot faster than the systems they describe
- The first five minutes decide the next fifty

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## What actually moved the needle

```bash
kubectl get pods -n prod --field-selector=status.phase!=Running
```

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.

> A dashboard nobody trusts is worse than no dashboard at all.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
laboriosam, nisi ut aliquid ex ea commodi consequatur.
