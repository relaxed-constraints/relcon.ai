---
title: "Brand & Style Guide"
date: 2026-03-09T00:00:00
draft: false
type: "blog"
build:
  list: never
description: "Color palette, typography, and component reference for the Relaxed Constraints visual identity across light and dark themes."
tags: ["brand", "design"]
categories: ["Design"]
---

This page documents the visual identity of Relaxed Constraints. All colors, typography, and components adapt automatically between light and dark themes. Toggle the theme using the sun/moon icon in the header to see both versions.

## Color Palette

### Core Colors

Each swatch shows light (left half) and dark (right half) values.

{{< swatchrow >}}
{{< swatch name="Background" light="#f0f4f3" dark="#080c14" >}}
{{< swatch name="Surface" light="#ffffff" dark="#12181e" >}}
{{< swatch name="Border" light="#c8d4d2" dark="#275959" >}}
{{< swatch name="Text" light="#1a1a2e" dark="#d0d0dc" >}}
{{< /swatchrow >}}

| Role | Light | Dark | CSS Variable |
|---|---|---|---|
| Background | `#f0f4f3` | `#080c14` | `--c-bg` |
| Surface | `#ffffff` | `#12181e` | `--c-surface` |
| Border | `#c8d4d2` | `#275959` | `--c-border` |
| Text (primary) | `#1a1a2e` | `#d0d0dc` | `--c-text` |

### Accent Colors

{{< swatchrow >}}
{{< swatch name="Accent" light="#0d9488" dark="#14b8a6" >}}
{{< swatch name="Accent Light" light="#14b8a6" dark="#2dd4bf" >}}
{{< swatch name="Accent Dark" light="#0a7a70" dark="#0d9488" >}}
{{< swatch name="Amber" light="#F2A74B" dark="#F2A74B" >}}
{{< /swatchrow >}}

| Role | Light | Dark | CSS Variable |
|---|---|---|---|
| Accent | `#0d9488` | `#14b8a6` | `--c-accent` |
| Accent Light | `#14b8a6` | `#2dd4bf` | `--c-accent-light` |
| Accent Dark | `#0a7a70` | `#0d9488` | `--c-accent-dark` |
| Amber (static) | `#F2A74B` | `#F2A74B` | — |

### Gray Scale

{{< swatchrow >}}
{{< swatch name="Gray 200" light="#3a3a4e" dark="#d8d8e0" >}}
{{< swatch name="Gray 300" light="#555568" dark="#b0b0be" >}}
{{< swatch name="Gray 400" light="#6e6e82" dark="#8888a0" >}}
{{< swatch name="Gray 500" light="#9898a8" dark="#606078" >}}
{{< swatch name="Gray 600" light="#c8c8d4" dark="#404058" >}}
{{< /swatchrow >}}

| Role | Light | Dark | CSS Variable |
|---|---|---|---|
| Gray 200 | `#3a3a4e` | `#d8d8e0` | `--c-gray-200` |
| Gray 300 | `#555568` | `#b0b0be` | `--c-gray-300` |
| Gray 400 | `#6e6e82` | `#8888a0` | `--c-gray-400` |
| Gray 500 | `#9898a8` | `#606078` | `--c-gray-500` |
| Gray 600 | `#c8c8d4` | `#404058` | `--c-gray-600` |

### Code Block Colors

{{< swatchrow >}}
{{< swatch name="Code BG" light="#e8efed" dark="#060a12" >}}
{{< swatch name="Code Border" light="#c8d4d2" dark="#275959" >}}
{{< swatch name="Code Text" light="#0A2326" dark="#D2D9D8" >}}
{{< swatch name="Line Numbers" light="#7a9e9c" dark="#4a7a7a" >}}
{{< /swatchrow >}}

| Role | Light | Dark | CSS Variable |
|---|---|---|---|
| Code BG | `#e8efed` | `#060a12` | `--c-code-bg` |
| Code Border | `#c8d4d2` | `#275959` | `--c-code-border` |
| Code Text | `#0A2326` | `#D2D9D8` | `--c-code-text` |
| Line Numbers | `#7a9e9c` | `#4a7a7a` | `--c-code-line-nr` |

## Typography

### Heading Hierarchy

# Heading 1 — Geist, Semibold

## Heading 2 — Geist, Semibold

### Heading 3 — Geist, Semibold

#### Heading 4 — Geist, Semibold

Body text uses **Inter** at regular weight with relaxed line height. This is how standard paragraph content renders across the site — optimized for long-form reading on both light and dark backgrounds.

### Font Stack

| Usage | Font | Weights |
|---|---|---|
| Headings | Geist | 600–900 |
| Body text | Inter | 300–700 |

## Inline Elements

Regular text with **bold**, *italic*, and `inline code` formatting. Links look [like this](#) and change color on hover.

> Blockquotes use a left accent border with italic styling and muted text color.

## Code Blocks

```python
import json
from pathlib import Path

class DataLoader:
    """Load and validate structured datasets."""

    def __init__(self, path: str, strict: bool = True):
        self.path = Path(path)
        self.strict = strict
        self._cache = {}

    def load(self, limit: int = 1000) -> list[dict]:
        with open(self.path) as f:
            records = json.load(f)
        # Filter and validate
        valid = [r for r in records[:limit] if self._validate(r)]
        return valid

    def _validate(self, record: dict) -> bool:
        required = {"id", "name", "value"}
        return required.issubset(record.keys())

loader = DataLoader("/data/records.json")
results = loader.load(limit=500)
print(f"Loaded {len(results)} records")  # Loaded 347 records
```

## Tables

| Metric | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| Accuracy | 0.847 | 0.891 | 0.923 | 0.941 |
| Precision | 0.812 | 0.856 | 0.898 | 0.917 |
| Recall | 0.789 | 0.834 | 0.867 | 0.903 |
| F1 Score | 0.800 | 0.845 | 0.882 | 0.910 |

## Charts

{{< chart height="300px" caption="Quarterly performance metrics — a sample bar chart" >}}
{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Model A',
        data: [0.72, 0.81, 0.88, 0.92],
        backgroundColor: 'rgba(20, 184, 166, 0.8)'
      },
      {
        label: 'Model B',
        data: [0.65, 0.74, 0.79, 0.85],
        backgroundColor: 'rgba(242, 167, 75, 0.7)'
      },
      {
        label: 'Baseline',
        data: [0.58, 0.60, 0.62, 0.63],
        backgroundColor: 'rgba(156, 163, 175, 0.6)'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0.4, max: 1.0, title: { display: true, text: 'Score' } },
      x: { title: { display: true, text: 'Quarter' } }
    }
  }
}
{{< /chart >}}

{{< chart height="280px" caption="Training loss over time — a sample line chart" >}}
{
  type: 'line',
  data: {
    labels: ['0', '2k', '4k', '6k', '8k', '10k', '12k', '14k', '16k'],
    datasets: [
      {
        label: 'Training Loss',
        data: [2.4, 1.6, 1.1, 0.82, 0.64, 0.51, 0.43, 0.38, 0.35],
        borderColor: '#14b8a6',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Validation Loss',
        data: [2.5, 1.7, 1.25, 0.98, 0.82, 0.73, 0.68, 0.66, 0.65],
        borderColor: '#F2A74B',
        backgroundColor: 'rgba(242, 167, 75, 0.05)',
        fill: true,
        tension: 0.3
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 2.8, title: { display: true, text: 'Loss' } },
      x: { title: { display: true, text: 'Steps' } }
    }
  }
}
{{< /chart >}}

## Buttons & Interactive Elements

The site uses two button styles:

**Primary** (solid accent background):

<a href="#" class="px-8 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-colors inline-block text-sm mb-4">Primary Action</a>

**Secondary** (outlined):

<a href="#" class="px-8 py-3 border border-gray-600 hover:border-accent text-off-white rounded-lg transition-colors inline-block text-sm mb-4">Secondary Action</a>

## Lists

Unordered list:

- First item in the list
- Second item with more detail
- Third item completes the set

Ordered list:

1. Data ingestion and validation
2. Model training with cross-validation
3. Evaluation on held-out test set
4. Deployment and monitoring

## Math (KaTeX)

Inline math: the loss function is $\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N} \log p(x_i)$.

Display math:

$$\mathcal{L}_{\text{total}} = \underbrace{\mathcal{L}_{\text{CE}}}_{\text{discrete}} + \lambda \underbrace{\mathcal{L}_{\text{NLL}}}_{\text{continuous}} + \beta \underbrace{\mathcal{L}_{\text{schema}}}_{\text{structural}}$$

---

*This page serves as both a reference and a live test of all styled components. Toggle between light and dark mode to verify visual consistency.*
