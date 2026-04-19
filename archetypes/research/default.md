---
title: "{{ replace .Name "-" " " | title }}"
type: "research"
draft: true
date: {{ .Date }}

# Project chrome
code: "XX-00"                # e.g. ORG-01, AB-02
accent: "cyan"               # named color (red/orange/yellow/green/cyan/blue/purple/magenta) or a hex string — auto-flips with theme when named
status: "active"             # active | exploratory | shipped | paused
association: "solo"          # mongodb | sydney | solo (free-form ok)
started: "YYYY-MM"
last_touched: "Mon D, YYYY"
tags: []

hypothesis: >
  One-line hypothesis the project is testing.

summary: "One-sentence elevator pitch."

collaborators:
  - { who: "Name", affiliation: "Affiliation", role: "lab" }    # role: lab | collab | advisor

papers: []
  # - title: "..."
  #   authors: "..."
  #   venue: "..."
  #   date: "..."
  #   links:
  #     - { label: "PDF",   url: "/papers/…" }
  #     - { label: "arXiv", url: "https://…" }

results: []
  # - { value: "+14%", caption: "benchmark X" }

post_slugs: []               # slugs under content/blog/
deck_slugs: []               # slugs under content/slides/

repos: []
  # - { label: "relcon/slug", url: "https://github.com/…" }

changelog: []
  # - { date: "Apr 9, 2026", text: "Event." }

related: []                  # other research slugs
---

Overview prose. Use regular markdown. Any images (`![](demo.gif)`) included
here render inline above the hypothesis&mdash;keep the file alongside
index.md in the page bundle.
