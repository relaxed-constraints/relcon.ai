---
title: "Mindexer"
type: "research"
draft: false
date: 2022-06-21

# Project chrome
code: "MDX-03"
accent: "yellow"
status: "active"             # active | exploratory | shipped | paused
association: ["USYD", "MongoDB", "RelCon"]
started: "2022-06"
# last_touched: "Jul 19, 2025"
tags: [databases, ml-for-systems, mongodb, indexing, honours-thesis]

hypothesis: >
  Index recommendation for document databases should be grounded in actual
  query workloads and real data distributions, not synthetic statistics.
  A greedy search over composite-index candidates, scored against sampled
  cardinalities and a simple cost model, produces practical recommendations
  without requiring manual tuning expertise.

summary: "An experimental index advisor for MongoDB — workload-driven, cost-based, and open-source."

collaborators:
  - { who: "Thomas Rückstieß",       affiliation: "MongoDB / Relaxed Constraints",  role: "Advisor" }
  - { who: "Prof. Alan Fekete",      affiliation: "University of Sydney", role: "Advisor" }
  - { who: "Dr. Michael Cahill",     affiliation: "MongoDB / University of Sydney", role: "Advisor" }
  - { who: "Yan Rong",               affiliation: "University of Sydney", role: "Honours Project, 2024" }
  - { who: "Avinash Thirukumaran",   affiliation: "University of Sydney", role: "Honours Project, 2023" }

papers:
  - title: "Improving Index Recommendation for MongoDB"
    authors: "Yan Rong — supervised by A. Fekete and T. Rückstieß"
    venue: "University of Sydney · Honours Thesis"
    date: "2024"
    links:
      - { label: "PDF", url: "/papers/mindexer/rong-2024.pdf" }
  - title: "Evaluating an Index Recommender on Real Workloads"
    authors: "Avinash Thirukumaran — supervised by A. Fekete, M. Cahill, T. Rückstieß"
    venue: "University of Sydney · Honours Thesis"
    date: "2023"
    links:
      - { label: "PDF", url: "/papers/mindexer/thirukumaran-2023.pdf" }

results: []

post_slugs: []

deck_slugs: []

repos:
  - { label: "mongodb-labs/mindexer", url: "https://github.com/mongodb-labs/mindexer" }

changelog:
  - { date: "ongoing", text: "Yan Rong, PhD project: Query optimisation for document databases, with focus on index and schema recommendation." }
  - { date: "Dec 6, 2024",  text: "Yan Rong's Honours thesis: improvements to candidate generation and cost model" }
  - { date: "Feb 22, 2024", text: "Cost model refinements — collscan cost and scoring tweaks" }
  - { date: "2023",         text: "Avinash Thirukumaran's Honours thesis: evaluation on real workloads" }
  - { date: "Jun 21, 2022", text: "Initial prototype — workload extraction from system.profile" }

related: []
---

Picking the right indexes for a document database is still largely a manual
job: an experienced engineer looks at the query patterns, weighs up cardinalities,
and guesses. MongoDB's Atlas Advisor helps on the cloud side, but there's no
open-source equivalent you can point at a self-hosted deployment or study as
a research artefact.

**Mindexer** is that artefact. It reads the query workload directly from MongoDB's
intrinsic `system.profile` collection, draws a small random sample of actual
data, enumerates composite-index candidates (up to 3 fields), and scores each
one against a simple cost model built from the sampled cardinalities. A greedy
selector ranks candidates by cumulative benefit and returns the top recommendations.
The scope is deliberately narrow — equality, ranges, `$in`, `$exists`, `$regex`,
`$size`, and negations — which keeps the algorithm tractable and the behaviour
easy to reason about.

Because the cost model, the sample ratio, and the candidate-generation strategy
are all exposed as tunable parameters, Mindexer is a natural vehicle for
research into ML-for-systems questions: *what does the advisor miss? can a
learned cost model do better than hand-rolled constants? how does performance
scale when the workload shifts?* Two Honours theses at the University of
Sydney, co-supervised with Prof. Alan Fekete, have already used the tool as
their experimental harness:

- **Avinash Thirukumaran (2023)** evaluated the recommender against real
  production-style workloads, stress-testing the assumptions in the original
  prototype.
- **Yan Rong (2024)** pushed the candidate-generation and cost-scoring logic,
  measuring sensitivity to cost-model constants and workload shape.

The recent addition of a **Yanex**-based experiment harness means every
benchmark run, parameter sweep, and baseline comparison is tracked and
reproducible — the next student or agent can pick up exactly where the last
one left off.

This project sits under the lab's broader thread of *ML & data systems*,
alongside ORiGAMi — both treat database internals as a substrate for learning
and measurement rather than a black box.
