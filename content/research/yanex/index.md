---
title: "Yanex"
type: "research"
draft: false
date: 2025-04-11

# Project chrome
code: "YNX-02"
accent: "blue"
status: "active"             # active | exploratory | shipped | paused
association: ["RelCon", "USYD"]
started: "2025-04"
# last_touched: "Mar 23, 2026"
tags: [experiments, cli, agents, reproducibility]

hypothesis: >
  Experiment management should be as accessible to AI agents as it is to humans. 
  A CLI-first tracker with structured, machine-readable output lets
  agents run, inspect, and compare experiments as first-class participants
  in the research loop — not just passive observers of dashboards.

summary: "A lightweight CLI-based experiment tracker designed for both humans and AI agents."

collaborators:
  - { who: "Thomas Rückstieß", affiliation: "Relaxed Constraints", role: "Lead" }
  - { who: "Leon Lei", affiliation: "Sydney University", role: "Honours Thesis" }

papers: []

results: []

post_slugs: []

deck_slugs: []

repos:
  - { label: "rueckstiess/yanex", url: "https://github.com/rueckstiess/yanex" }

changelog:
  - { date: "Mar 23, 2026", text: "Web UI — experiment graph visualisation and run comparison" }
  - { date: "Feb 14, 2026", text: "Project-scoped experiments: every git repo gets its own experiment store" }
  - { date: "Dec 5, 2025",  text: "v0.5.0 beta — parallel sweeps, dependency slots, Results API" }
  - { date: "Nov 30, 2025", text: "Dependency tracking v3 — multi-stage workflows with named slots" }
  - { date: "Oct 25, 2025", text: "Results API — pandas-backed DataFrame access for post-hoc analysis" }
  - { date: "Apr 11, 2025", text: "Project kickoff — first tracked experiment" }

related: []
---

Research codebases accumulate faster than they get cleaned up. New
students spend months becoming productive because previous work is
poorly documented and hard to reproduce; experiments run manually with
patchy configuration tracking; people spend more time wrestling with
infrastructure than doing research. Mainstream trackers — Weights &
Biases, MLflow, Neptune — solve the dashboard problem for humans, but
the experimental record itself stays locked behind interactive UIs and
product-shaped SDKs.

**Yanex** encapsulates practices from industrial research into a tracker
built around **reproducibility by default**. Any Python script runs
under `yanex run` and picks up tracking without code changes; git state,
parameters, metrics, stdout, and artefacts are all captured, and all
queryable in structured, machine-readable form. Git state is saved as
a patch so runs are fully reproducible even from a dirty working tree.
Projects start from templates with tests, documentation, and examples —
best practices become the path of least resistance, not a checklist to
tick.

The CLI surface pays off for two audiences at once. **Humans** get
interactive comparisons, parameter sweeps, and pipeline dependencies.
**Agents** get a scriptable toolkit — a single `yanex get <field> <id>`
returns any value in JSON or comma-separated form suitable for bash
substitution. The bundled **Claude Code skill** wires this into a
concrete workflow: agents kick off experiments, poll for progress,
extract the best run, and summarise the results.

Yanex also supports teaching reproducible research practices. Students can
use its experiment records to inspect how configurations, code changes,
and dependencies affect their results. When working with AI agents, those
records provide a shared basis for checking what ran and why. The aim is
to help students specify experiments clearly, examine the implementation,
and explain the evidence behind their conclusions.

Current capabilities:

- **CLI-first execution** with automatic git, parameter, and environment capture
- **Parameter sweeps** (`range`, `linspace`, `logspace`, comma-separated) running in parallel
- **Dependency graph** — experiments depend on other experiments through named slots (`-D data=<exp_id>`), forming multi-stage pipelines with auto-resolved artefacts
- **Results API** — DataFrame-backed analysis (`yanex.results`) for comparisons and plots
- **Web UI** — experiment browser, diff view, and pipeline visualisation (FastAPI + Next.js)
- **Machine-readable everything** — JSON, CSV, Markdown, or `get <field>` for single-value extraction
- **Safe by default** — archive is reversible; delete requires confirmation; agents never destroy data unsupervised

Yanex is part of the lab’s work on reusable research infrastructure.
Alongside [BONDI’s database components](/research/bondi/), it helps connect
individual experiments into workflows that researchers and AI agents can
inspect and extend. Each project can leave a clearer starting point for
the next.
