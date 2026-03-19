---
title: "About"
---

## What is Relaxed Constraints?

Relaxed Constraints is an independent research lab where humans and AIs collaborate at the intersection of machine learning, data systems, and agentic reasoning. We focus on problems that sit between the cracks: semi-structured data that doesn't fit neatly into tables, AI agents that reason over structured and graph data, and the question of how research itself can be automated. 

The name _Relaxed Constraints_ reflects what we do. We relax the constraints of fixed schemas to work with data that is messy, nested, and inter-connected, blend rigid hard-coded rules with learned reasoning in our workflows, and operate as an independent lab free from the constraints of corporate research.

## Research Areas

Semi-structured data is everywhere: API payloads, abstract syntax trees, query execution plans, agent reasoning traces, tool call logs. None of it fits neatly into tables. Our research operates at multiple levels on this same substrate.

**Architectures.** At the foundation, we develop neural network architectures for density estimation and representation learning over JSON-structured data: predictive modelling, synthetic data generation and embeddings, all without flattening the input into tables.

**Data systems.** We apply these architectures to practical database problems: cardinality estimation for query planning, synthetic data generation for privacy-preserving analytics, learned indexes and workload simulation for document databases.

**Agentic systems.** Agent traces are trees. Tool calls are JSON. The same models that learn from database records can learn from agent behavior. We build AI agent systems that reason over this data, plan multi-step workflows, and operate autonomously, and we use our own architectures to analyze and improve how they work.

**Automated research.** We believe that in a few years, essentially no code will be written without AI assistance. We build infrastructure for this future: experiment tracking designed for AI agents, self-adaptive workflows, and tools that let researchers and AI collaborate effectively.

## Background

Relaxed Constraints was founded by [Thomas Rückstieß](https://www.linkedin.com/in/rueckstiess/), who holds a PhD in Machine Learning from the Technical University of Munich and spent 13 years at MongoDB, most recently as Head of Machine Learning Research.

We have an ongoing collaboration with the [University of Sydney](https://www.sydney.edu.au), where Thomas collaborates with the databases group and supervises PhD and Honours students working on learned query optimization, index recommendation, and AI-assisted experimentation.

## Principles

**Small models, real constraints.** We work with models that train on a single GPU from data you actually have, not internet-scale pretraining. Enterprise and scientific databases are isolated, proprietary, and unique. Our architectures are designed to learn locally.

**Everything is observable.** In an AI-first lab, every agent action, every experiment run, every routing decision produces a trace. These traces are themselves data: analyzed by other agents, used to improve processes, and fed back into the system. When the entire organization runs on code and text files in a git repo, you get full history, diffs, and rollback for free. Nothing is a black box.

**Research code should be production code.** Most research code is written to be thrown away: no tests, no documentation, no structure. We take the opposite approach. Every project has test coverage, CI, linting, and clear documentation. This doesn't slow us down, it let's us move faster, because AI agents can only make changes autonomously when the codebase is well-tested and well-documented. Sloppy code requires constant human supervision. Clean code lets agents move independently.

## Get Involved

While we're not currently hiring, we're always looking to connect with researchers, students, and engineers who share these interests. We value curious and self-motivated people who want to exchange ideas, challenge assumptions, and learn from each other. If that sounds like you, [get in touch](/contact/).
