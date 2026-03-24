---
title: "Autoregressive Synthesis of Sparse and Semi-Structured Mixed-Type Data"
date: 2026-03-24
draft: true
type: "slides"
description: "Submitted to VLDB 2027, joint work with Robin Vujanic"
transition: "none"
event: "DBRG Seminar "
author: "Thomas Rückstieß"
autoshrink: true
---

# Why do we need synthetic data?

> Synthetic data should be **statistically indistinguishable** from real data — same distributions, same correlations, same structure.

- **Privacy & compliance** — share or publish sensitive datasets without exposing PII<br>(e.g. GDPR, HIPAA compliance)
- **Dev & test environments** — realistic data for development and QA, without prod access
- **Benchmarking** — generate data at arbitrary scale with controlled properties
- **Database tuning** — index selection, physical design, workload simulation, cardinality estimation
- **ML training** — augment rare classes, bootstrap training data for downstream models


Notes:
- ML training example synthetic patient records to train disease classifier

---

# Synthetic Data Generation Methods

Several different algorithm families exist:
<br><br>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5em; margin-top: 0.5em;">
<div style="border: 1px solid var(--r-accent); padding: 0.5em 1em;">

**Statistical**
Fit pair-wise column correlations parametrically. Fast but limited expressivity. *(Gaussian Copula)*

</div>
<div style="border: 1px solid var(--r-accent); padding: 0.5em 1em;">

**GANs**
Generator and discriminator trained adversarially. Good at realism, unstable to train. *(CTGAN)*

</div>
<div style="border: 1px solid var(--r-accent); padding: 0.5em 1em;">

**Diffusion**
Corrupt data with noise, learn to reverse it. State-of-the-art on dense tables. *(TabDiff, TabDDPM)*

</div>
<div style="border: 1px solid var(--r-accent); padding: 0.5em 1em;">

**Autoregressive**
Generate one variable at a time, conditioned on all previous -> LLMs <br> *(GReaT, REaLTabFormer, ORiGAMi)*

</div>
</div>

<br><br>
See also Synthetic Data Vault: <a href="http://sdv.dev/">http://sdv.dev/</a>

Notes:
- Autoregressive generation is also how LLMs generate text, one token at a time
- Some methods, e.g. GReaT and REaLTabFormer use a transformer architectures (GPT-2)

---

# Prior methods assume tabular data

<div style="display: grid; grid-template-columns: minmax(0, 800px) minmax(0, 800px); gap: 1.5em;">
<div>

- Interface is usually Pandas `DataFrame` or CSV file
- Assumes fixed set of columns with primitive types (numbers, strings, booleans)
- Missing values partially supported (`NaN`)
- None of the existing methods support nested data or complex types (arrays, objects)


</div>
<div>

CTGAN (`sdv` package):
```python
from sdv.single_table import CTGANSynthesizer

data = load_csv("titanic.csv")
synthesizer = CTGANSynthesizer(metadata)
synthesizer.fit(data)
```

TabularARGN (`mostly-ai` package)
```python
import pandas as pd
from mostlyai.sdk import MostlyAI
mostly = MostlyAI()
df = pd.read_csv("titanic.csv")
g = mostly.train(data=df)
```

REalTabFormer (`realtabformer` package)
```python
import pandas as pd
from realtabformer import REaLTabFormer
df = pd.read_csv("titanic.csv")
rtf_model = REaLTabFormer(logging_steps=100)
rtf_model.fit(df)
```

</div>
</div>

---

# Data isn't always flat tables

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5em;">
<div>

Github Issue Events

```json
{
  "created_at": 1772315390,
  "action": "opened",
  "issue": {
    "state": "open",
    "locked": false,
    "comments": 0,
    "number": 89,
    "user": {
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {"color": ["a2", "ee", "ef"], "default": true, "name": "bug"}, 
      {"color": ["00", "75", "ca"], "default": false}
    ],
  },
  "sub_issues_summary": {"total": 12, "completed": 8, "percent": 66.7}
}

```
</div>
<div>

Yelp

```json
{
  "name": "Joe's Pizza",
  "stars": 4.5,
  "is_open": true,
  "categories": ["Pizza", "Italian", "Restaurants"],
  "hours": {
    "Monday": "closedf",
    "Tuesday": "11:00-22:00",
    ...
    "Sunday": "11:00-23:00"
  },
  "attributes": {
    "WiFi": "free",
    "OutdoorSeating": true,
    "NoiseLevel": "average",
    ...
  },
  ...
}
```
</div>
</div>

Notes:
- Application-layer data is overwhelmingly exchanged as JSON format (REST APIs) and often stored (Document Databases)

---

# Just flatten it!


```json
{ "title": "Flash Gordon", "genres": [ "Action", "Adventure", "Sci-Fi" ], "awards": { "wins": 3, "nominations": 8 } }
{ "title": "Tron",         "genres": [ "Action", "Sci-Fi" ],              "awards": { "wins": "unknown" }           }
```
<br>

<div class="fragment">
Flatten into table:

<div style="padding-top: 1em;">

| title | genres.0 | genres.1 | genres.2 | awards.wins | awards.nominations |
|---|---|---|---|---|---|
| Flash Gordon | Action | Adventure | Sci-Fi | 3 | 8 |
| Tron | Action | Sci-Fi | `NULL` | "unknown" | `NULL` |
</div>
<div>

<br>

<div class="fragment" style="margin-top: 1em;">
Separate columns by type:

<div style="font-size: 0.72em; padding-top: 1em;">

| title | gen.0 | gen.1 | gen.2.dtype | gen.2.str | aw.wins.dtype | aw.wins.str | aw.wins.num | aw.noms.dtype | aw.noms.num |
|---|---|---|---|---|---|---|---|---|---|
| Flash Gordon | Action | Adventure | string | Sci-Fi | int | `NULL` |  3 | number | 8 |
| Tron | Action | Sci-Fi | missing | `NULL` | string | "unknown" | `NULL` |  missing | `NULL` |
</div>
</div>

---

# Why flattening breaks down

- Flattening and type separation produces very wide tables with many `NULL` values

  - Yelp -> 265 columns, 37% missing values
  - Github Issues -> 882 columns, 49% missing values

<div class="fragment" style="margin-top: 2em;">

- Models deal with missing values differently, some approaches: 

  - Replace missing categorical values with special category (e.g. "\_missing\_")
  - Impute missing numeric values (column mean, random sampling, set to 0, ...)
  - Drop rows with missing values
</div>

<div class="fragment" style="margin-top: 1em; border: 1px solid var(--r-accent); padding: 0.5em 1em 0em 1em; width: fit-content; background: var(--r-selection-bg);">

We argue that this sparsity is a **property of the data** and should be modelled instead of "fixed" during pre-processing.

</div>

---

# ORiGAMi Architecture

**O**bject **R**epresentat**i**on via **G**enerative **A**utoregressive **M**odell**i**ng
<br>


----

# Tokenisation


![Tokenisation](tokenization_light.png)

----

# Grammar & schema constraints

----

# Dual-head architecture

<div style="display: grid; grid-template-columns: 3fr 5fr; gap: 1em;">

<div style="text-align: center">

<br>

![Transformer Architecture](transformer.png)

## Standard Transformer
</div>
<div style="text-align: center">

![Model Architecture](architecture.png)

<br>

## ORiGAMi Architecture

</div>
</div>


---

# Experimental setup

---

# Results: dense benchmarks

---

# Results: semi-structured data

---

# Beyond generation

---

# Summary & open problems
