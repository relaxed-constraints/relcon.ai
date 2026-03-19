---
title: "Breaking Through Tabular Constraints for Synthetic Data Generation"
date: 2026-03-09
draft: true
type: "blog"
description: "Every synthetic data generation tool assumes flat tables. Real-world application data is often nested JSON with optional fields and variable-length arrays. The Origami architecture is the first to handle semi-structured data natively."
tags: ["research", "synthetic-data", "origami"]
categories: ["Research", "Synthetic Data", "JSON"]
---

Synthetic data lets you provision realistic QA environments, train ML models, and share data across teams, all without exposing real user records. It preserves the statistical properties of production data, which is particularly important for database optimization and machine learning. The problem is that every tool in the space, whether it's based on GANs, VAEs, diffusion, or language models, assumes the input is a flat table with fixed columns, one type per column. 

That works if your data is a single, dense spreadsheet. But for semi-structured data without fixed schema, with nested objects, variable-length arrays, and missing keys, there's nothing that handles it natively.

## Application data looks different

Here's a simplified business listing from Yelp:

```json
{
  "name": "Joe's Pizza",
  "stars": 4.5,
  "is_open": true,
  "categories": ["Pizza", "Italian", "Restaurants"],
  "hours": {
    "Monday": "11:00-22:00",
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

Nested objects, variable-length arrays, keys that show up in some records but not others. If you've worked with document databases, REST APIs, or event streams, this is familiar. It's how most application-layer data is shaped.

To use any existing synthesizer on data like this, you first have to flatten it into a table. `categories` becomes `categories.0`, `categories.1`, `categories.2`, one column per array slot. `hours.Monday` and `attributes.WiFi` become top-level columns. Records missing a key get a blank cell. This process is lossy and creates
wide sparse tables, which many ML algorithms struggle with.

We flattened 150,000 Yelp business records this way. The result was a table with **266 columns and 38% empty cells**. What started as a reasonably small dataset about businesses turned into a sparse matrix where over a third of the values are missing.

## The problem with mixed types

Even on flat tables, there's a fundamental tension in how synthesizers handle different data types. GAN, VAE, and diffusion-based methods work in continuous space, so they handle numbers naturally but need to encode categories as one-hot vectors. That's fine for a column with 5 distinct values, but falls apart when you have thousands of distinct categories. Flattened semi-structured data makes this worse: array expansion turns a single `categories` field into dozens of columns, each with its own set of values.

Autoregressive and LLM-based methods have the opposite problem. They treat everything as tokens, so categories are easy. But numeric values with high precision (prices, coordinates, timestamps) would need enormous vocabularies to represent exactly, so they get discretized into bins, losing precision and ordinal structure in the process.

Both camps compromise. Origami sidesteps this by using a dual-head architecture: one head predicts discrete tokens (keys, categories, structural markers), and a separate head models numeric values as continuous distributions. Each data type stays in its native representation.

## What breaks with sparsity

We benchmarked six synthesizers from all the major architecture families on five datasets, ranging from standard dense benchmarks to large-scale JSON collections. As the data gets less tabular and sparser, three things go wrong.

First, many methods simply can't run. TVAE and CTGAN one-hot encode categorical values. On Yelp, that's 27,000 unique values across 261 categorical columns, and they run out of memory. GReaT and Tabby default to GPT-2 under the hood, which has a 1,024-token context window. Flattened Yelp records need around 2,900 tokens with standard sub-word tokenizers. On our largest dataset (1 million medical records, 230 columns after flattening), only two of six baselines could even start training on a single V100 GPU with 16GB of memory.

Second, imputation corrupts sparse columns. The standard approach to fill missing numeric values is to replace them with the column mean. But if 95% of a column's values are missing, the model learns a distribution dominated by that artificial spike rather than the actual data. A classifier trained to detect synthetic data picks this up immediately.

{{< figure src="kde_electric_vehicles.png" caption="Density visualisations comparing real vs. synthetic data distributions for electric vehicle records." >}}

Third, discretizing continuous values into bins introduces its own artifacts. In one case, a single bin spanned 71,000 units, and a few clustered outliers got smeared into a uniform distribution. Again, trivial to detect.

## Working with the structure

The Origami architecture is designed to skip flattening altogether. It reads JSON records directly and generates JSON records directly. A few things make this work.

Each record is tokenized into a sequence of keys, values, and structural markers (things like "object starts here" or "array ends here"). Nesting and optional keys are just part of the sequence, so there's nothing to flatten or pad.

The trickier problem is position encoding. Language models usually number their tokens sequentially: in simple terms, they see tokens in order, token 1, token 2, and so on. But in JSON, `{"name": "Alice", "age": 30}` and `{"age": 30, "name": "Alice"}` are the same record. The key order doesn't matter. So instead of sequential positions, Origami encodes each token's *path* through the document tree. The value `30` gets tagged as "the value at position `age`," not "the fifth token." We call this Key-Value Position Encoding (KVPE), and it's what lets the model tell apart identically named fields at different locations — `user.name` versus `company.name`, for instance.

Origami handles high-cardinality numbers as continuous values by predicting the parameters of a Gaussian mixture distribution. Categories and strings go through a standard token prediction head. Both work in their native representation.

To make sure every generated record is actually valid JSON, a pushdown automaton tracks the grammar state during generation. At each step, any token that would break the syntax gets masked out. A second layer of constraints, compiled from the training data's schema, restricts which keys can appear and what values are legal for each key. The output is guaranteed to be valid, well-typed JSON. Not because of post-processing, but because the model literally cannot produce anything else.

One last piece that makes this work even for small datasets: since JSON keys have no defined order, we shuffle them randomly every time a training record is seen. This is a surprisingly effective regularizer. Without it, the model starts memorizing training records. With shuffling, we can
effectively scale up the dataset to the point where the model
never sees the same record twice, and it learns to generalize the structure and relationships rather than memorizing specific examples.

## Results

We evaluated on five datasets with increasing complexity: Adult and Diabetes (standard dense benchmarks), Electric Vehicles (11% sparsity), and two JSON datasets — Yelp (38% sparsity, 150K records) and DDXPlus (35% sparsity, over 1 million records).

The first thing to look at is which methods could run at all:

| | TVAE | CTGAN | Tabby | REaLTab | TabularARGN | TabDiff | Origami |
|---|---|---|---|---|---|---|---|
| Adult | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Diabetes | ✓ | ✓ | OOM | ✓ | ✓ | ✓ | ✓ |
| Electric | OOM | OOM | OOM | ✓ | ✓ | ✓ | ✓ |
| Yelp | OOM | OOM | OOM | ✓ | ✓ | ✓ | ✓ |
| DDXPlus | OOM | OOM | OOM | OOM | ✓ | ✓ | ✓ |

By the third dataset, half the baselines are out.

For the methods that did run, we measured how easy it is for an XGBoost classifier to tell real records apart from generated ones. A ROC AUC of 0.5 means the classifier can't tell the difference (ideal). A value near 1.0 means it's trivial.

<!-- | Dataset (sparsity) | TabularARGN | TabDiff | Origami |
|---|---|---|---|
| Adult (0%) | 0.634 | 0.567 | **0.520** |
| Diabetes (0%) | 0.606 | 0.677 | **0.473** |
| Electric (11%) | 0.849 | 0.947 | **0.794** |
| Yelp (38%) | 0.941 | 0.996 | **0.638** |
| DDXPlus (35%) | 0.969 | 0.999 | **0.812** | -->

{{< chart height="350px" caption="Detection ROC AUC by dataset — lower is better (0.5 = indistinguishable from real data)" >}}
{
  type: 'bar',
  data: {
    labels: ['Adult (0%)', 'Diabetes (0%)', 'Electric (11%)', 'Yelp (38%)', 'DDXPlus (35%)'],
    datasets: [
      {
        label: 'TabularARGN',
        data: [0.634, 0.606, 0.849, 0.941, 0.969],
        backgroundColor: 'rgba(156, 163, 175, 0.7)'
      },
      {
        label: 'TabDiff',
        data: [0.567, 0.677, 0.947, 0.996, 0.999],
        backgroundColor: 'rgba(107, 114, 128, 0.7)'
      },
      {
        label: 'Origami',
        data: [0.520, 0.473, 0.794, 0.638, 0.812],
        backgroundColor: 'rgba(20, 184, 166, 0.85)'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      annotation: {
        annotations: {
          baseline: {
            type: 'line',
            yMin: 0.5,
            yMax: 0.5,
            borderColor: '#ffffff',
            borderWidth: 1.5,
            borderDash: [6, 4],
            label: {
              display: true,
              content: 'random guessing',
              position: 'end',
              yAdjust: 18,
              xAdjust: -10,
              color: '#ffffff',
              font: { size: 10 },
              backgroundColor: 'rgba(255,255,255, 0.5)',
            }
          }
        }
      }
    },
    scales: {
      y: { min: 0.4, max: 1.0, title: { display: true, text: 'ROC AUC', color: '#9ca3af' } },
      x: { title: { display: true, text: 'Dataset (sparsity)', color: '#9ca3af' } }
    }
  }
}
{{< /chart >}}

On the dense benchmarks, the numbers are all in a reasonable range. But as sparsity goes up, the picture changes. TabDiff's output becomes almost perfectly separable from real data on the sparse datasets (0.996 and 0.999). TabularARGN follows a similar trajectory. Origami stays the hardest to distinguish throughout.

The same pattern shows up in fidelity and utility scores. Origami has the highest fidelity on all five datasets and the best ML utility on four of five (REaLTabFormer edges it out on Yelp utility). Details are in [the paper]().

Worth noting: Origami is also the smallest model at 1.7M parameters, 5x smaller than TabularARGN (9M) and 35x smaller than REaLTabFormer (59M). It trained on the Yelp dataset in 8.6 hours on a single V100.

## Why it matters

Teams need realistic data for testing, development environments, and ML training — without exposing actual user records. For simple tabular data, there are decent tools. But if your data has nested objects, optional fields, or variable-length arrays (which covers most document database and API data), the current playbook is to flatten everything, run a tabular synthesizer, and then patch up the output by hand.

Origami skips that entire pipeline. It's the first synthesizer, to our knowledge, that handles semi-structured data end-to-end — learning the structure, the sparsity patterns, and the statistical relationships directly from the JSON.

The paper is available on [arXiv]() and the code is on [GitHub](https://github.com/rueckstiess/origami-jsynth). Origami is published as a Python package ([`origami-ml`](https://pypi.org/project/origami-ml/)) with a Python SDK and CLI.

---

*Thomas Rückstieß is the founder of Relaxed Constraints and former head of ML Research at MongoDB. This work was done in collaboration with Robin Vujanic at MongoDB.*
