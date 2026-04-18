---
title: "ORiGAMi"
type: "research"
draft: false
date: 2024-09-01

# Project chrome
code: "ORG-01"
glyph: "◈"
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

summary: "A modified transformer that models JSON documents directly. Paper accepted at NeurIPS 2025."

collaborators:
  - { who: "Thomas Rückstieß",   aff: "Relaxed Constraints",   role: "lab" }
  - { who: "Kang Han",           aff: "University of Sydney",  role: "collab" }
  - { who: "MongoDB Research",   aff: "MongoDB",               role: "collab" }

papers:
  - title: "ORiGAMi: Object representation via generative autoregressive modelling"
    authors: "T. Rückstieß, K. Han, et al."
    venue: "NeurIPS 2025"
    date: "Dec 2025"
    links:
      - { l: "PDF",    u: "#" }
      - { l: "arXiv",  u: "#" }
      - { l: "BibTeX", u: "#" }
  - title: "Cardinality estimation on nested documents with ORiGAMi"
    authors: "T. Rückstieß, K. Han"
    venue: "Preprint"
    date: "Apr 2026"
    links:
      - { l: "arXiv", u: "#" }

results:
  - { n: "−42%", v: "KL-divergence vs. flatten-GAN" }
  - { n: "1.8×", v: "faster training than baseline" }
  - { n: "6/6",  v: "nested benchmarks won" }

post_slugs:
  - "origami-synthetic-data-generation"

deck_slugs:
  - "2026-04-01-usyd-vldb-paper"

repos:
  - { label: "relcon/origami", url: "https://github.com/relaxed-constraints/origami" }

changelog:
  - { d: "Apr 9, 2026",  t: "Preprint v2 — stronger baselines on nested benchmarks" }
  - { d: "Mar 30, 2026", t: "Residual post: \"Breaking through tabular constraints\"" }
  - { d: "Dec 12, 2025", t: "NeurIPS 2025 talk — Vancouver" }
  - { d: "Sep 2, 2025",  t: "Paper accepted at NeurIPS 2025" }

related: []                  # slugs of other projects (e.g. ["app-bridges"])
---

Most synthetic data generation tools assume flat tables. Real-world
application data is nested JSON with optional fields and variable-length
arrays. **ORiGAMi** is a modified transformer that operates on JSON
directly — no flattening required.

The project began as an attempt to beat CTGAN on the Yelp dataset without
preprocessing. It grew into a general architecture for semi-structured
density estimation, with applications in cardinality estimation, learned
indexes, and privacy-preserving synthetic data.
