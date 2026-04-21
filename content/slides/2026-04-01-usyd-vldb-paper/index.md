---
title: "Autoregressive Synthesis of Sparse and Semi-Structured Mixed-Type Data"
date: 2026-04-01T00:00:00+11:00
draft: false
type: "slides"
description: "To be submitted to VLDB 2027, joint work with Robin Vujanic (MongoDB)"
transition: "none"
event: "DBRG Seminar "
author: "Thomas Rückstieß"
---

# Why do we need synthetic data?

<!-- animate: bullets -->

> Synthetic data should be **statistically indistinguishable** from real data:
> same distributions, same correlations, same structure.

<div class="colloquium-spacer-md"></div>

- **Privacy & compliance** — share or publish sensitive datasets without exposing PII
  (e.g. GDPR, HIPAA compliance)
- **Dev & test environments** — realistic data for development and QA, without prod access
- **Benchmarking** — generate data at arbitrary scale with controlled properties
- **Database tuning** — index selection, physical design, workload simulation
- **ML training** — augment rare classes, bootstrap training data for downstream models

Notes:
- ML training example synthetic patient records to train disease classifier

---

# Synthetic Data Generation Methods


<!-- size: small -->
<!-- padding: compact -->

<!-- rows: 40/40/20 -->

<!-- row-columns: 50/50 -->

```box
title: Statistical
tone: surface
content: |
  Fit pair-wise column correlations parametrically.
  Fast but limited expressivity.

  *(Gaussian Copula)*
```

|||

```box
title: GANs
tone: surface
content: |
  Generator and discriminator trained adversarially.
  Good at realism, unstable to train.

  *(CTGAN)*
```

===

<!-- row-columns: 50/50 -->

```box
title: Diffusion
tone: surface
content: |
  Corrupt data with noise, learn to reverse it.
  State-of-the-art on dense tables.

  *(TabDiff, TabDDPM)*
```

|||

```box
title: Autoregressive
tone: surface
content: |
  Generate one variable at a time, conditioned on all previous.
  LLM-style sequence modelling.

  *(GReaT, REaLTabFormer, ORiGAMi)*
```

===

See also the Synthetic Data Vault at https://sdv.dev.


Notes:
- Autoregressive generation is also how LLMs generate text, one token at a time
- Some methods, e.g. GReaT and REaLTabFormer use transformer architectures (GPT-2)

---

# Prior methods assume tabular data

<!-- columns: 8/6 -->

<!-- padding: compact -->

- Interface usually Pandas `DataFrame` or CSV file
- Assumes a fixed set of columns, each with a primitive type
  (numbers, strings, booleans)
- Missing values (`NaN`) are often replaced during preprocessing
- None of the existing methods support nested data or complex types
  (arrays, objects)

|||

CTGAN (`sdv` package):

```python
from sdv.single_table import CTGANSynthesizer

data = load_csv("titanic.csv")
synthesizer = CTGANSynthesizer(metadata)
synthesizer.fit(data)
```

<div class="colloquium-spacer-md"></div>


TabularARGN (`mostly-ai` package):

```python
import pandas as pd
from mostlyai.sdk import MostlyAI

mostly = MostlyAI()
df = pd.read_csv("titanic.csv")
g = mostly.train(data=df)
```

---

# Data isn't always flat tables

<!-- columns: 12/10 -->
<!-- size: small -->
<!-- padding: compact -->

GitHub Issue Events

```json
{
  "created_at": 1772315390,
  "action": "opened",
  "active_lock_reason": null,
  "state_reason": null,
  "issue": {
    "state": "open",
    "locked": false,
    "comments": 12,
    "number": 89,
    "user": {
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {"color": ["a2", "ee", "ef"], "default": true, "name": "bug"},
      {"color": ["00", "75", "ca"], "default": false},
      ...
    ]
  },
  "sub_issues_summary": {"total": 12, "completed": 8, "percent": 66.7},
  "has_milestone": false
}


```

|||

MongoDB query on GitHub issue events

```json
[
  { "$match": {
      "action": "opened",
      "issue.state": "open"
  }},
  { "$addFields": {
      "issue.label_names": {
        "$map": {
          "input": "$issue.labels",
          "as": "l", "in": "$$l.name"
        }
      }
  }},
  { "$group": {
      "_id": "$issue.label_names",
      "avg_comments": { "$avg": "$issue.comments" },
      "bot_authored": { "$sum": {
        "$cond": [
          { "$eq": ["$issue.user.type", "Bot"] }, 1, 0
        ]
      }}
  }},
  { "$sort": { "open_issues": -1 }}
]
```

Notes:
- Application-layer data is overwhelmingly exchanged as JSON format (REST APIs)
  and often stored in document databases

---

# Just flatten it!

<!-- size: small -->
<!-- padding: compact -->

```json
{ "title": "Flash Gordon", "genres": [ "Action", "Adventure", "Sci-Fi" ], "awards": { "wins": 3, "nominations": 8 } }
{ "title": "Tron",         "genres": [ "Action", "Sci-Fi" ],              "awards": { "wins": "unknown" }           }
```

<!-- step -->

<div class="colloquium-spacer-sm"></div>

1. Flatten into a table:
<div class="colloquium-spacer-sm"></div>

| title | genres.0 | genres.1 | genres.2 | awards.wins | awards.nominations |
|---|---|---|---|---|---|
| Flash Gordon | Action | Adventure | Sci-Fi | 3 | 8 |
| Tron | Action | Sci-Fi | `NULL` | "unknown" | `NULL` |

<div class="colloquium-spacer-lg"></div>

<!-- step -->
 
2. Separate sparse and mixed-type columns: 
<div class="colloquium-spacer-sm"></div>

| title | gen.0 | gen.1 | gen.2.dtype | gen.2.str | aw.wins.dtype | aw.wins.str | aw.wins.num | ... |
|---|---|---|---|---|---|---|---|---|
| Flash Gordon | Action | Adventure | string | Sci-Fi | int | `NULL` |  3 | ... |
| Tron | Action | Sci-Fi | missing | `NULL` | string | "unknown" | `NULL` |  ... |


---

# Why flattening breaks down

<!-- size: small -->

Flattening JSON produces very wide tables with high sparsity (`NULL` values):

<div class="colloquium-spacer-md"></div>

| Dataset           | # records | # columns | # cat | # num | # bool | Sparsity |
|-------------------|-----------|-----------|-------|-------|--------|----------|
| Adult             | 48,842    | 15        | 9     | 6     | 0      | 0.0%     |
| Diabetes          | 81,413    | 37        | 24    | 13    | 0      | 0.0%     |
| Electric Vehicles | 210,011   | 18        | 13    | 6     | 0      | 11.1%    |
| DDXPlus           | 1,160,131 | 100       | 50    | 50    | 0      | 67.1%    |
| Yelp              | 150,346   | 142       | 53    | 6     | 73     | 77.8%    |
| GitHub Issues     | 642,099   | 461       | 330   | 18    | 113    | 93.0%    |


<!-- step -->

<div class="colloquium-spacer-lg"></div>
```box
tone: accent
align: center
size: 1.1
content: |
  We argue that this sparsity is a **property of the data** and should be \
  modelled faithfully instead of "fixed" during preprocessing.
```

---

# Tension between discrete and continuous representations

<!-- .slide: data-visibility="hidden" -->

- Mixed-type data contains both discrete (strings, booleans) and continuous (numerical) variables

- _GANs_ and _Diffusion models_ operate in continuous space
  - Require special handling for discrete variables
  - Column explosion: categorical columns -> one-hot encoding

- _Autoregressive models_ operate in discrete token space
  - Require special handling for continuous variables
  - Vocabulary explosion: numerical columns -> binning

- Both camps compromise

---

# ORiGAMi Architecture

<!-- animate: bullets -->

- **O**bject **R**epresentat**i**on via **G**enerative **A**utoregressive **M**odell**i**ng
- Models JSON as a sequence of tokens
- Uses the transformer architecture (same as LLMs) with modifications
  - Custom tokenisation scheme
  - Grammar and schema constraints
  - Dual-head architecture for joint token and continuous value prediction
- ORiGAMi models are ~1000x smaller than standard LLMs
  (millions vs. billions of parameters)
- Can be trained on commodity hardware
  (laptops, single GPUs) in hours to days

----

# Tokenisation


![](tokenization_light.png)

----

# Tokenisation

<!-- size: normal -->
<!-- padding: compact -->

```json
{
  "title": "Flash Gordon",
  "genres": [ "Action", "Adventure", "Sci-Fi" ],
  "awards": { "wins": 3, "nominations": 8 }
}
```

Standard tokenisation (GPT-5):
42 tokens, vocabulary size ~200k

`{` `"` `title` `":` ` "` `Flash` ` Gordon` `",` ` "` `genres` `":` ` [` ` "` `Action` `",` ` "` `Adventure` `",` ` "` `Sci` `-Fi` `"` ` ],` ` "` `aw` `ards` `":` ` {` ` "` `wins` `":` ` ` `3` `,` ` "` `n` `ominations` `":` ` ` `8` ` }` ` }`

<!-- step -->

ORiGAMi tokenisation:
19 tokens, vocabulary size ~1k-10k (dataset dependent)

`START` `OBJ_START` `Key(title)` `Flash Gordon` `Key(genres)` `ARR_START` `Action` `Adventure` `Sci-Fi` `ARR_END` `Key(awards)` `OBJ_START` `Key(wins)` `3` `Key(nominations)` `8` `OBJ_END` `OBJ_END` `END`

----

# Grammar & schema constraints

<!-- rows: 1/1 -->
<!-- size: small -->
<!-- padding: compact -->

```box
title: Grammar constraints
tone: surface
compact: false
content: |
  Enforce **correct syntax**.

  - `...` `OBJ_START` -> only `Key(*)` or `OBJ_END`
  - `...` `ARR_START` -> only `ARR_END`, `ARR_START`, `OBJ_START`, or primitive values
  - Implemented as a pushdown automaton tracking context and nesting level
```

===

<!-- step -->

```box
title: Schema constraints
tone: surface
compact: false
content: |
  Enforce **semantic validity**.

  - `...` `Key(genres)` -> only values from the genres vocabulary
  - `...` `Key(awards.wins)` -> only numeric tokens
  - Implemented by masking output probabilities based on the current context
```

Notes:
Model doesn't need to learn grammar and schema constraints and can focus on the
data distribution instead.
- Smaller models
- Faster training
- No invalid samples

---

# Dual-head architecture

<!-- columns: 3/5 -->
<!-- size: small -->
<!-- align: center -->

![Standard Transformer](transformer.png)

## Standard Transformer

|||

![ORiGAMi Architecture](architecture.png)

## ORiGAMi Architecture

---

# Experimental setup

<!-- align: center -->

![Training setup](training_setup_1.png)

---

# Experimental setup

<!-- align: center -->

![Training setup](training_setup_2.png)

---

# Experimental setup

<!-- align: center -->

![Training setup](training_setup_3.png)

---

# Experiment Protocol

- All models trained on a single NVIDIA V100 GPU with 16GB VRAM
- Model training time limited to 24 hours wall-clock time per model and dataset
- Generate 10 synthetic sample files from each model with different seeds and
  report mean and standard deviation

---

# Evaluation Metrics

<!-- animate: bullets -->

- **Fidelity** — how well does the synthetic data match the real data distribution?
  (single-column and pairwise statistics)
- **Detection** — how well can the synthetic data be distinguished from real data
  by a classifier? (C2ST protocol)
- **ML Utility** — how well does the synthetic data support machine learning tasks?
  (TSTR / TRTR protocol)
- **Privacy** — how well does the synthetic data protect sensitive information?
  (distance to closest record, exact match rate)
- For easier comparison, we normalise all metrics between 0 and 1 (higher is better).

---

# Results — Fidelity

<!-- size: small -->
<!-- padding: compact -->

| Dataset | TVAE | CTGAN | REaLTabF. | Tab.ARGN | TabDiff | ORiGAMi |
| --- | --- | --- | --- | --- | --- | --- |
| Adult | 0.895 | 0.885 | 0.964 | 0.983 | 0.989 | **0.993** |
| Diabetes | 0.859 | 0.952 | 0.963 | 0.982 | 0.983 | **0.992** |
| Elec. Vehicles | ❌ | ❌ | 0.864 | 0.972 | 0.976 | **0.987** |
| DDXPlus | ❌ | ❌ | ❌ | 0.790 | 0.827 | **0.918** |
| Yelp | ❌ | ❌ | 0.911 | 0.884 | 0.837 | **0.950** |
| GitHub Issues | ❌ | ❌ | ❌ | 0.909 | 0.738 | **0.919** |

---

# Results — Detection

<!-- size: small -->
<!-- padding: compact -->

| Dataset | TVAE | CTGAN | REaLTabF. | Tab.ARGN | TabDiff | ORiGAMi |
| --- | --- | --- | --- | --- | --- | --- |
| Adult | 0.255 | 0.220 | 0.825 | 0.882 | 0.957 | **0.972** |
| Diabetes | 0.002 | 0.564 | 0.692 | 0.904 | 0.880 | **1.000** |
| Elec. Vehicles | ❌ | ❌ | 0.394 | 0.783 | 0.940 | **1.000** |
| DDXPlus | ❌ | ❌ | ❌ | 0.411 | 0.082 | **0.587** |
| Yelp | ❌ | ❌ | 0.353 | 0.326 | 0.228 | **0.766** |
| GitHub Issues | ❌ | ❌ | ❌ | 0.630 | 0.265 | **0.665** |

---

# Results — ML Utility

<!-- size: small -->
<!-- padding: compact -->

| Dataset | TVAE | CTGAN | REaLTabF. | Tab.ARGN | TabDiff | ORiGAMi |
| --- | --- | --- | --- | --- | --- | --- |
| Adult | 0.961 | 0.952 | 0.991 | 0.981 | 0.982 | **0.997** |
| Diabetes | 0.957 | 0.921 | 0.971 | 0.977 | 0.967 | **0.980** |
| Elec. Vehicles | ❌ | ❌ | 0.866 | 0.981 | 0.987 | **0.996** |
| DDXPlus | ❌ | ❌ | ❌ | **1.000** | **1.000** | **1.000** |
| Yelp | ❌ | ❌ | **0.987** | 0.974 | 0.950 | 0.971 |
| GitHub Issues | ❌ | ❌ | ❌ | 0.957 | 0.952 | **0.979** |

---

# Results — Privacy

<!-- size: small -->
<!-- padding: compact -->

| Dataset | TVAE | CTGAN | REaLTabF. | Tab.ARGN | TabDiff | ORiGAMi |
| --- | --- | --- | --- | --- | --- | --- |
| Adult | 0.987 | **0.995** | 0.915 | 0.985 | 0.914 | 0.992 |
| Diabetes | 0.978 | **0.991** | 0.870 | 0.973 | 0.966 | 0.975 |
| Elec. Vehicles | ❌ | ❌ | 0.417 | 0.996 | 0.949 | **1.000** |
| DDXPlus | ❌ | ❌ | ❌ | **1.000** | 0.984 | **1.000** |
| Yelp | ❌ | ❌ | 0.909 | 0.959 | 0.994 | **0.970** |
| GitHub Issues | ❌ | ❌ | ❌ | **1.000** | **1.000** | **1.000** |

---

# Results — Detection

<div style="height: 560px;">
  <canvas id="detection-chart"></canvas>
</div>
<div class="chart-config" data-chart="detection-chart" style="display:none">
{
  "type": "bar",
  "data": {
    "labels": ["Adult (0%)", "Diabetes (0%)", "Electric (11%)", "DDXPlus (67%)", "Yelp (78%)", "GitHub (93%)"],
    "datasets": [
      { "label": "TVAE",          "data": [0.255, 0.002, null, null, null, null], "backgroundColor": "rgba(148,103,189,0.75)" },
      { "label": "CTGAN",         "data": [0.220, 0.564, null, null, null, null], "backgroundColor": "rgba(140,86,75,0.75)"   },
      { "label": "REaLTabFormer", "data": [0.825, 0.692, 0.394, null, 0.353, null], "backgroundColor": "rgba(214,39,40,0.75)" },
      { "label": "TabularARGN",   "data": [0.882, 0.904, 0.783, 0.411, 0.326, 0.630], "backgroundColor": "rgba(44,160,44,0.75)" },
      { "label": "TabDiff",       "data": [0.957, 0.880, 0.940, 0.082, 0.228, 0.265], "backgroundColor": "rgba(255,127,14,0.75)" },
      { "label": "ORiGAMi",       "data": [0.972, 1.000, 1.000, 0.587, 0.766, 0.665], "backgroundColor": "rgba(31,119,180,0.85)" }
    ]
  },
  "options": {
    "responsive": true,
    "maintainAspectRatio": false,
    "plugins": { "legend": { "position": "top" } },
    "scales": {
      "y": { "min": 0, "max": 1.0, "title": { "display": true, "text": "Detection Score" } },
      "x": {                        "title": { "display": true, "text": "Dataset (sparsity)" } }
    }
  }
}
</div>

---

# Numerical columns on _Electric Vehicles_

<!-- align: center -->

![](kde_electric_vehicles.png)

---

<!-- .slide: data-visibility="hidden" -->

# Numerical columns on _Electric Vehicles_

- TabularARGN uses a binning approach for numerical columns
  - Intra-bin uniform sampling smoothes out spikes in the distribution

- TabDiff uses mean imputation for missing values
  - For sparse columns, this results in significant over-representation of the mean value

---

# Array lengths on _Yelp_ `categories`

<!-- rows: 3/2 -->
<!-- size: small -->
<!-- padding: compact -->
<!-- align: center -->

![](yelp_array_length_pmf.png)

===

<!-- row-columns: 3/2 -->

- Wasserstein distance between real and synthetic distributions of array lengths
- Due to flattening, baselines have no way to model array length directly

|||

![](yelp_array_length.png)

---

# Summary

<!-- animate: bullets -->

- Synthetic data generation is well-studied for tabular data, but not for nested,
  semi-structured data
- Flattening is possible, but leads to sparse, high-dimensional tables
- ORiGAMi addresses these challenges by directly modelling semi-structured data
- Strong results across all metrics and datasets, with gains becoming more
  pronounced as data gets more complex and sparse
- Contributions:
  - ORiGAMi as a semi-structured data synthesis architecture
  - Metric evaluation modifications that capture type and structural fidelity
  - Code and datasets released for reproducibility and future research
