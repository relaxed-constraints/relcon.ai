---
title: "ORiGAMi"
type: "research"
draft: false
date: 2024-09-01

# Project chrome
code: "ORiG-01"
accent: "#b8421e"
accent_dark: "#ff8c5a"
status: "active"             # active | exploratory | shipped | paused
association: "mongodb"       # mongodb | sydney | solo
started: "2024-09"
last_touched: "2026-04-09"
tags: [ML, synthetic-data, density-estimation]

hypothesis: >
  Neural architectures can operate natively on nested JSON — density
  estimation, synthetic data, and predictive modelling over semi-structured
  data without flattening.

summary: "A modified transformer that models nested JSON documents directly."

collaborators:
  - { who: "Thomas Rückstieß",   affiliation: "Relaxed Constraints (formerly MongoDB)",  role: "PI" }
  - { who: "Alana Huang",        affiliation: "MongoDB",  role: "Contributor" }
  - { who: "Robin Vujanic",      affiliation: "MongoDB",  role: "Contributor" }

papers:
  - title: "ORiGAMi: Object representation via generative autoregressive modelling"
    authors: "T. Rückstieß, A. Huang, R. Vujanic"
    venue: "Preprint"
    date: "Dec 2024"
    links:
      - { label: "PDF",    url: "https://arxiv.org/pdf/2412.17348" }
      - { label: "arXiv",  url: "https://arxiv.org/abs/2412.17348" }

  - title: "Autoregressive Synthesis of Sparse and Semi-Structured Mixed-Type Data"
    authors: "T. Rückstieß, R. Vujanic"
    venue: "Submitted to PVLDB 2027"
    date: "Mar 2026"
    links:
      - { label: "PDF", url: "https://arxiv.org/pdf/2603.01444" }
      - { label: "arXiv", url: "https://arxiv.org/abs/2603.01444" }


# results:
#   - { value: "−42%", caption: "KL-divergence vs. flatten-GAN" }
#   - { value: "1.8×", caption: "faster training than baseline" }
#   - { value: "6/6",  caption: "nested benchmarks won" }

post_slugs:
  - "origami-synthetic-data-generation"

deck_slugs:
  - "2026-04-01-usyd-vldb-paper"

repos:
  - { label: "rueckstiess/origami", url: "https://github.com/rueckstiess/origami" }
  - { label: "rueckstiess/origami-jsynth", url: "https://github.com/rueckstiess/origami-jsynth" }

changelog:
  - { date: "Apr 9, 2026",  text: "Preprint v2 — stronger baselines on nested benchmarks" }
  - { date: "Mar 30, 2026", text: "Blog post: \"Breaking through tabular constraints\"" }
  - { date: "Dec 12, 2025", text: "NeurIPS 2025 talk — Vancouver" }
  - { date: "Sep 2, 2025",  text: "Paper accepted at NeurIPS 2025" }

related: []                  # slugs of other projects (e.g. ["app-bridges"])
---

Most synthetic data generation tools assume flat tables. Real-world
application data is often nested JSON with optional fields and variable-length
arrays. **ORiGAMi** is a modified transformer that operates on JSON
directly — no flattening required.

The project began as an attempt to make predictions from JSON data without lossy flattening into tabular form. 
It grew into a general architecture for semi-structured density estimation, with applications in cardinality estimation, learned
indexes, and privacy-preserving synthetic data.
