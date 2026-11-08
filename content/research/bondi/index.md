---
title: "BONDI"
type: "research"
draft: false
date: 2026-10-22

# Project chrome
code: "BND-04"
accent: "cyan"
status: "active"
association: ["RelCon", "USYD"]
started: "2026-10"
last_touched: "Nov 8, 2026"
tags: [databases, research-infrastructure, reproducibility, agents]

hypothesis: >
  Shared, tested infrastructure and guided workflows can reduce repeated
  engineering effort and make document-database experiments easier to
  reproduce, review, and extend across research projects.

summary: "A reusable toolkit and project foundation for reproducible document-database research."

collaborators:
  - { who: "Thomas Rückstieß", affiliation: "Relaxed Constraints", role: "Lead" }
  - { who: "Sooraj Vijayakrishnan", affiliation: "University of Sydney", role: "Honours Thesis" }
  - { who: "Uwe Röhm", affiliation: "University of Sydney", role: "Collaborator" }

papers: []
results: []
post_slugs: []
deck_slugs: []

repos:
  - { label: "relaxed-constraints/bondi", url: "https://github.com/relaxed-constraints/bondi" }
  - { label: "relaxed-constraints/bondi-empty-project", url: "https://github.com/relaxed-constraints/bondi-empty-project" }
  - { label: "relaxed-constraints/bondi-demo-project", url: "https://github.com/relaxed-constraints/bondi-demo-project" }
  - { label: "relaxed-constraints/bondi-json-storm", url: "https://github.com/relaxed-constraints/bondi-json-storm" }

changelog:
  - { date: "ongoing", text: "Setting up the BONDI JSON-Storm pipeline for LLM-based query generation and translation from MongoDB to Couchbase SQL++." }
  - { date: "Nov 2–4, 2026", text: "Established the companion project foundations: a minimal starter repository and a guided demo covering data preparation, workload generation, index benchmarking, analysis, and progress updates." }
  - { date: "Oct 22, 2026", text: "Project kickoff — first toolkit commits introduced MongoDB collection references, native find queries, BSON serialization, query fingerprints, and documentation." }
related: ["yanex", "mindexer"]
---

Database research projects share much of the same groundwork: deploying
databases, preparing datasets, constructing query workloads, collecting
measurements, and organising experimental results. **BONDI** brings these
recurring tasks into a documented, tested toolkit so researchers can spend
more time investigating their research questions and build on one another's
work.

The project combines a **Python library for MongoDB and Couchbase** with
starter repositories, guided examples, and coding-agent instructions.
BONDI provides the database components; [Yanex](/research/yanex/) records
experiment configurations, dependencies, metrics, and artefacts. Together,
they support a workflow from initial setup through workload execution and
analysis, while research algorithms and experiment pipelines remain in
their own project repositories.

A central aim is **continuity between projects**. Reusable components and
shared workload formats make it easier to inspect experiments, exchange
research artefacts, and extend earlier work. Improvements to the common
toolkit can benefit multiple projects, while a new research idea can be
developed independently against the same interfaces.

Current toolkit capabilities:

- **Database deployment** — manage named local MongoDB and Couchbase instances through Docker.
- **Native queries and workloads** — represent MongoDB find and aggregation queries and Couchbase SQL++, with persistent workload files and query identifiers.
- **Execution and diagnostics** — run queries and workloads, inspect execution plans, and collect profiling measurements with configurable concurrency.
- **Schema inspection** — examine nested fields, types, missing values, and observed values, and save schema snapshots for later use.
- **MongoDB workload generation and estimation** — generate find-query patterns and estimate filter selectivity using samples.
- **MongoDB query statistics** — measure query structure, including operator counts and expression and pipeline depth.

The surrounding repositories make these components concrete:

- **BONDI Empty Project** provides a minimal starting point with examples of reusable code, a tracked experiment, a test, and a notebook, plus a progress-update template.
- **BONDI Demo Project** walks through preparing an electric-vehicle registration dataset, generating a workload, benchmarking three indexing strategies, and analysing the results.
- **BONDI JSON-Storm** applies the toolkit to research on LLM-based query generation and cross-database benchmark translation. Its current focus is translating MongoDB workloads into Couchbase SQL++ and studying execution success, result agreement, and changes in structural coverage.

The tutorials and templates also give new researchers concrete examples of
how to structure, test, and explain their experiments. BONDI supports
**AI-assisted development** through explicit interfaces, documentation,
and an installable agent skill. The emphasis is on helping researchers
specify tasks, inspect generated code, and validate results while retaining
responsibility for the scientific reasoning.

The broader goal is a reusable foundation for document-database research:
one that supports individual investigations while allowing useful tools,
workloads, and methods to accumulate across projects.

Start with the [documentation](https://relaxed-constraints.github.io/bondi/),
the [quickstart](https://relaxed-constraints.github.io/bondi/quickstart/),
or the [guided demo project](https://github.com/relaxed-constraints/bondi-demo-project).
