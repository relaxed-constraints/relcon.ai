---
title: "{{ replace .Name "-" " " | title }}"
type: "research"
draft: true
date: {{ .Date }}

# Project chrome
code: "XX-00"                # e.g. ORG-01, AB-02
glyph: "◆"                   # single unicode char
accent: "#b8421e"            # brand/accent for this project (light)
accent_dark: "#ff8c5a"       # accent in dark mode (optional)
status: "active"             # active | exploratory | shipped | paused
association: "solo"          # mongodb | sydney | solo (free-form ok)
started: "YYYY-MM"
last_touched: "Mon D, YYYY"
tags: []

hypothesis: >
  One-line hypothesis the project is testing.

summary: "One-sentence elevator pitch."

collaborators:
  - { who: "Name", aff: "Affiliation", role: "lab" }    # role: lab | collab | advisor

papers: []
  # - title: "..."
  #   authors: "..."
  #   venue: "..."
  #   date: "..."
  #   links:
  #     - { l: "PDF",   u: "/papers/…" }
  #     - { l: "arXiv", u: "https://…" }

results: []
  # - { n: "+14%", v: "benchmark X" }

post_slugs: []               # slugs under content/blog/
deck_slugs: []               # slugs under content/slides/

repos: []
  # - { label: "relcon/slug", url: "https://github.com/…" }

changelog: []
  # - { d: "Apr 9, 2026", t: "Event." }

related: []                  # other research slugs
---

Overview prose. Use regular markdown. Any images (`![](demo.gif)`) included
here render inline above the hypothesis&mdash;keep the file alongside
index.md in the page bundle.
