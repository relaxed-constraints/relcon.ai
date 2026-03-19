---
title: "About"
---

## What is Relaxed Constraints?

Relaxed Constraints is an experimental independent research lab working at the intersection of machine learning, data systems, and agentic reasoning. We focus on problems that sit between the cracks: semi-structured data that doesn't fit neatly into tables, AI agents that reason over structured and graph data, and the question of how research itself can be automated.

Machine learning has mature tools for flat tabular data (scikit-learn, pandas, XGBoost) and foundation models for unstructured text and images. But the data that most applications actually operate on (nested data, relational data, sparse data, connected data) falls between these two worlds. We study how to learn from this data directly, preserving its structure rather than discarding it.

## Research Areas

**Generative models for semi-structured data.** We develop neural network architectures for density estimation and representation learning over hierarchical data: predicting missing fields, generating synthetic documents, and producing embeddings, all without flattening the input. This foundational work enables applications like cardinality estimation for query planning, synthetic data generation for privacy-preserving analytics, and workload simulation for database testing.

**Agentic reasoning over structured data.** We build AI agent systems that can reason over structured and graph data, plan multi-step workflows, and operate autonomously on real codebases and data systems. This includes event-driven architectures where agents triage, route, and execute tasks with minimal human intervention.

**Automated research methods.** We believe that in a few years, essentially no research code will be written without AI assistance. We build infrastructure for this future: experiment tracking systems designed for AI agents, reproducible workflows, and tools that let researchers and AI collaborate effectively. This isn't about training LLMs, it's about using them as research tools to iterate faster without sacrificing code quality or reproducibility.

## Background

Relaxed Constraints was founded by [Thomas Rückstieß](https://www.linkedin.com/in/rueckstiess/), who holds a PhD in Machine Learning from the Technical University of Munich and spent 13 years at MongoDB, most recently as Head of Machine Learning Research.

We have an ongoing collaboration with the [University of Sydney](https://www.sydney.edu.au), where Thomas supervises PhD and Honours students working on learned query optimization, index recommendation, and AI-assisted experimentation.

## Principles

**Small models, real constraints.** We work with models that train on a single GPU from data you actually have, not internet-scale pretraining. Enterprise and scientific databases are isolated, proprietary, and unique. Our architectures are designed to learn locally.

**Everything is observable.** In an AI-first lab, every agent action, every experiment run, every routing decision produces a trace. These traces are themselves data: analyzed by other agents, used to improve processes, and fed back into the system. When the organization runs on code and text files in a git repo, you get full history, diffs, and rollback for free. Nothing is a black box.

**Research code should be production code.** Most research code is written to be thrown away: no tests, no documentation, no structure. We take the opposite approach. Every project has test coverage, CI, linting, and clear documentation. This isn't slower. It's faster, because AI agents can only make changes autonomously when the codebase is well-tested and well-documented. Sloppy code requires constant human supervision. Clean code lets agents move independently.

## Get Involved

While we're not currently hiring, we're always looking to connect with researchers, students, and engineers who share these interests. We value people who want to exchange ideas, challenge assumptions, and learn from each other. If that sounds like you, [get in touch](/contact/).
