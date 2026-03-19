---
title: "Brand & Style Guide"
date: 2026-03-09T00:00:00
draft: false
type: "blog"
description: "Color palette, typography, and component reference for the Relaxed Constraints visual identity across light and dark themes."
tags: ["brand", "design"]
categories: ["Design"]
---

This page documents the visual identity of Relaxed Constraints. All colors, typography, and components adapt automatically between light and dark themes. Toggle the theme using the sun/moon icon in the header to see both versions.

## Color Palette

### Core Colors

Each swatch shows light (left half) and dark (right half) values.

{{< swatchrow >}}
{{< swatch name="Background" light="#f8f9fc" dark="#080c14" >}}
{{< swatch name="Surface" light="#ffffff" dark="#12121a" >}}
{{< swatch name="Border" light="#dfe1ea" dark="#1e1e2e" >}}
{{< swatch name="Text" light="#1a1a2e" dark="#d0d0dc" >}}
{{< /swatchrow >}}

| Role | Light | Dark | CSS Variable |
|---|---|---|---|
| Background | `#f8f9fc` | `#080c14` | `--c-bg` |
| Surface | `#ffffff` | `#12121a` | `--c-surface` |
| Border | `#dfe1ea` | `#1e1e2e` | `--c-border` |
| Text (primary) | `#1a1a2e` | `#d0d0dc` | `--c-text` |

### Accent Colors

{{< swatchrow >}}
{{< swatch name="Accent" light="#0d9488" dark="#14b8a6" >}}
{{< swatch name="Accent Light" light="#14b8a6" dark="#2dd4bf" >}}
{{< swatch name="Accent Dark" light="#0a7a70" dark="#0d9488" >}}
{{< swatch name="Cyan" light="#06b6d4" dark="#06b6d4" >}}
{{< swatch name="Violet" light="#8b5cf6" dark="#8b5cf6" >}}
{{< /swatchrow >}}

| Role | Light | Dark | CSS Variable |
|---|---|---|---|
| Accent | `#0d9488` | `#14b8a6` | `--c-accent` |
| Accent Light | `#14b8a6` | `#2dd4bf` | `--c-accent-light` |
| Accent Dark | `#0a7a70` | `#0d9488` | `--c-accent-dark` |
| Cyan (static) | `#06b6d4` | `#06b6d4` | — |
| Violet (static) | `#8b5cf6` | `#8b5cf6` | — |

### Gray Scale

{{< swatchrow >}}
{{< swatch name="Gray 200" light="#3a3a4e" dark="#d8d8e0" >}}
{{< swatch name="Gray 300" light="#444458" dark="#b0b0be" >}}
{{< swatch name="Gray 400" light="#5e5e72" dark="#8888a0" >}}
{{< swatch name="Gray 500" light="#8a8a9e" dark="#606078" >}}
{{< swatch name="Gray 600" light="#c8c8d4" dark="#404058" >}}
{{< /swatchrow >}}

| Role | Light | Dark | CSS Variable |
|---|---|---|---|
| Gray 200 | `#3a3a4e` | `#d8d8e0` | `--c-gray-200` |
| Gray 300 | `#444458` | `#b0b0be` | `--c-gray-300` |
| Gray 400 | `#5e5e72` | `#8888a0` | `--c-gray-400` |
| Gray 500 | `#8a8a9e` | `#606078` | `--c-gray-500` |
| Gray 600 | `#c8c8d4` | `#404058` | `--c-gray-600` |

### Code Block Colors

{{< swatchrow >}}
{{< swatch name="Code BG" light="#f4f4f8" dark="#0c0c14" >}}
{{< swatch name="Code Border" light="#e0e0e8" dark="#1e1e2e" >}}
{{< swatch name="Code Text" light="#1a1a2e" dark="#ffffff" >}}
{{< swatch name="Line Numbers" light="#9898a8" dark="#606078" >}}
{{< /swatchrow >}}

| Role | Light | Dark | CSS Variable |
|---|---|---|---|
| Code BG | `#f4f4f8` | `#0c0c14` | `--c-code-bg` |
| Code Border | `#e0e0e8` | `#1e1e2e` | `--c-code-border` |
| Code Text | `#1a1a2e` | `#ffffff` | `--c-code-text` |
| Line Numbers | `#9898a8` | `#606078` | `--c-code-line-nr` |

## Typography

### Heading Hierarchy

# Heading 1 — Outfit or Manrope, Bold

## Heading 2 — Manrope, Bold

### Heading 3 — Manrope, Semibold

#### Heading 4 — Inter, Semibold

Body text uses **Inter** at regular weight with relaxed line height. This is how standard paragraph content renders across the site — optimized for long-form reading on both light and dark backgrounds.

### Font Stack

| Usage | Font | Weights |
|---|---|---|
| Hero display | Outfit | 700–900 |
| Headings | Manrope | 600–800 |
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
        backgroundColor: 'rgba(139, 92, 246, 0.7)'
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
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
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
