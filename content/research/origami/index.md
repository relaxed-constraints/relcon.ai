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
tags: [ML, semi-structured, density-estimation]

hypothesis: >
  Neural architectures can operate natively on nested JSON with the right tokenised representation,
  unlocking new capabilities in density estimation, query optimization, synthetic data generation, 
  and predictive modelling for semi-structured data and document databases.

summary: "Object Representation via Generative Autoregressive Modelling"

collaborators:
  - { who: "Thomas Rückstieß",   affiliation: "Relaxed Constraints",  role: "Lead" }
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
  - { date: "Apr 1, 2026", text: "Presentation at USYD - Database Reading Group" }
  - { date: "Mar 30, 2026", text: "Blog post: \"Breaking through tabular constraints\"" }
  - { date: "Mar 2, 2026",  text: "Preprint Autoregressive Synthesis of Sparse and Semi-Structured Mixed-Type Data on arXiv" }
  - { date: "Dec 12, 2024", text: "Preprint ORiGAMi: Object representation via generative autoregressive modelling on arXiv" }

related: []                  # slugs of other projects (e.g. ["app-bridges"])
---

Most mixed-type Machine Learning models, tools and algorithms (e.g. Pandas, scikit-learn) operate on flat tables. 
Real-world application layer data is often nested JSON with optional fields and variable-length
arrays. This mismatch forces practitioners to flatten the data into tabular form, which is lossy, laborious, 
and doesn't scale as it creates very wide and sparse tables.

The project began at MongoDB Research as an attempt to make predictions from 
JSON data without lossy flattening into tabular form. It grew into a general 
architecture for semi-structured density estimation, with applications in 
cardinality estimation, learned indexes, and privacy-preserving synthetic data.

The key insights are:

1. Density estimation is a general primitive on which many downstream tasks can be built: 
sampling, conditional generation, outlier detection, imputation, and more. By focusing on density estimation rather than a specific task, we could design a more general architecture.
2. Transformers are general-purpose sequence models which can operate on any tokenised inputs. By designing a tokenisation scheme
for nested JSON, we could leverage the power of transformers without flattening the data.
