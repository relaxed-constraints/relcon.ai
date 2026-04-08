---
title: "Latent Application Bridges"
date: 2026-04-08
draft: false
build:
  list: never
type: "blog"
description: "Project proposal for a collaboration between Sydney University (Prof. Uwe Roehm, Sooraj Vijay), MongoDB (Robin Vujanic) and Relaxed Constraints (Thomas Rückstieß) for LLM-based query generation and application backend migrations."
tags: ["benchmarking", "app modernization", "LLMs", "SQL", "MongoDB"]
categories: []
author: Thomas Rückstieß and Claude Opus 4.6
---

This is a collaboration proposal. Two research problems that look unrelated on the surface actually share the same missing piece, and I think solving them together is more interesting than tackling either one alone.

## The Benchmark Generation Problem

[SQLStorm](https://www.vldb.org/pvldb/vol18/p4144-schmidt.pdf) showed that LLMs can generate SQL query workloads for database benchmarking. The idea is simple: give an LLM a relational dataset and its schema, get back a query workload.

{{< figure src="rel-benchmark.svg" width="55%">}}

An interesting next step is doing the same for document databases. Give an LLM a MongoDB dataset, get MQL queries:

{{< figure src="doc-benchmark.svg" width="55%">}}

But two problems come up quickly:

1. **Realistic multi-collection document datasets are scarce.** Single-collection datasets are often trivial and uninteresting for benchmarking. The rich multi-table relational datasets that fuel SQL benchmarks don't have an equivalent in the document world.
2. **LLM-generated queries aren't grounded in the data.** The LLM produces realistic-_looking_ queries, but they don't actually match documents. (SQLStorm hasn't satisfactorily addressed this either.) Thomas built an early prototype applying the SQLStorm idea to MongoDB queries and found that none of the generated queries with more than one filter predicate returned any results. Syntactically plausible, semantically empty.

One fix for the first problem: migrate relational data to MongoDB and piggyback on existing relational datasets.

{{< figure src="rel-doc-benchmark.svg" width="100%">}}

But this migration isn't straightforward. Relational schemas follow strict normalization rules. MongoDB schemas don't. A good document schema depends on the application's workload and access patterns. That's a chicken-and-egg problem: you need the workload to design the schema, and you need the schema to generate the workload.

We could just pick a fixed mapping from tables to collections, making some informed choices on what to embed vs. reference. But designing a schema in a vacuum, without an actual application in mind, feels arbitrary. And it raises questions about how general the resulting benchmarks really are.

## The App Modernization Problem

There's a separate question that MongoDB cares a lot about: how do you migrate legacy applications from relational backends to document databases?

Migrating between relational databases (say, Oracle to Postgres) is already non-trivial, but at least the mental model stays the same. SQL dialects differ, but the concepts carry over: tables, joins, foreign keys, normalization. DBAs who've spent their careers in the relational world can make that jump without rethinking how the data layer works.

Moving to MongoDB is a much bigger step. The document model requires unlearning relational assumptions. There's no standard normalization. Embedding vs. referencing is a design choice that depends on access patterns. Joins exist (`$lookup`) but they're expensive and used differently. The query language is completely different. For many teams and DBAs, the perceived lift of a relational-to-document migration is so high that they default to staying in the SQL family, even when a document model would be a better fit for their workload. 

This makes it an active research area for MongoDB, but it's underrepresented in academic work, mostly because real migration case studies are hard to come by. MongoDB's internal PRISM datasets (15+ relational schemas with manually designed MongoDB variants) are one of the few structured resources, but they only cover the data layer. They lack the application context that drives schema design decisions in practice.

## Where These Two Problems Meet

Both problems point at the same gap: **the application layer**.

For benchmarks, the application is what makes schema design decisions motivated and workloads grounded. For modernization, the application is the thing being migrated, and understanding its structure is how you do it safely.

So instead of treating the application as an expensive prerequisite, what if we treat it as a lightweight, generatable bridge between relational and document worlds?

## Applications as Bridges

LLM-based coding agents (Claude Code, Codex, etc.) have changed what's possible here. Building a full-stack CRUD application used to take a team weeks or months. Now one person equipped with an AI agent can do it in hours (not an exaggeration, see below). That makes the following idea practical: generate throwaway applications as bridges between data models, where the app isn't the goal, but a means to ground query generation in actual data.

For a SQL-only benchmark (extending the SQLStorm approach), it looks like this:

{{< figure src="rel-app-benchmark.svg" width="80%">}}

The application design is guided by the dataset schema, and the feature requirements (e-commerce app, social media platform, etc.) dictate what kind of workload we want: read-heavy, write-heavy, complex search queries, transactional vs. analytics, etc.

Take it one step further and include MongoDB. The same application becomes a fixture that generates workloads for both backends:

{{< figure src="dual-backend.svg" width="100%">}}


### Strict Layered Separation

For this to work, the application needs a clean separation between layers:

{{< figure src="arch-layers.svg" width="50%">}}

- **API contract**: Defined once, shared across all backends. Endpoints return the same shapes regardless of which database is behind them.
- **Repository interface**: An abstract interface that both SQL and MongoDB implementations conform to. This is the seam for swapping backends.
- **No ORM**: Raw SQL and raw pymongo calls, so the captured queries are transparent and analyzable. ORMs hide the actual query patterns, and those patterns are what we want to study.

### Deriving Workloads from User Journeys

With the application in place, we need a way to exercise it systematically. This is where another crucial piece comes in: [Playwright](https://playwright.dev/) for scripted orchestration of the frontend. 

Playwright is Microsoft's browser automation framework. It scripts interactions with web apps: clicking buttons, filling forms, navigating pages, asserting on visible content. It runs a real browser (Chromium, Firefox, or WebKit) headlessly, which makes it good for both end-to-end testing and simulating user behavior.

When Playwright drives the app through its UI, every user action triggers real API calls, which execute real database queries, all captured by the instrumentation layer. The resulting workloads are grounded by construction. They're not synthetic queries invented by an LLM or hand-crafted by a researcher. They're the actual queries a real application issues when real users interact with it.

We define **user journeys** that model distinct usage patterns:

- **Browsing customer**: browse the catalog, filter by criteria, view a product detail page, read reviews
- **Purchaser**: search for a specific product, select a store location, complete a transaction
- **Reviewer**: view purchase history, submit a review for a previously purchased item
- **Staff member**: check inventory by location, process a sale, view the analytics dashboard

Each journey is parameterized (different users, products, locations) and can run with configurable concurrency and repetition counts. The same journeys run against both backends. Playwright talks to the frontend, which doesn't know or care which database is behind it. The instrumentation layer captures the resulting SQL or MQL queries separately, producing paired workload logs from identical user behavior.

## What This Gets Us

**Semantic query equivalence.** A single SQL query doesn't necessarily map to a single MQL query. A SQL JOIN across two tables might become two separate queries against two MongoDB collections, or disappear entirely if the data is embedded. Query-level equivalence breaks down. But if we define equivalence at the application level (same user journey, same observable outcome on both backends), the problem goes away. We verify this programmatically through Playwright assertions on the UI state.

**Grounded workloads.** Every query in the workload log exists because a user action required it. The workloads are realistic because they come from a real application, and they're grounded because they execute against actual data. This addresses both issues from earlier.

**Schema-aware benchmarking.** Different MongoDB schema designs (normalized, embedded, denormalized) produce different query patterns for the same user behavior. Run the same Playwright journeys against different schema variants and you get workloads that show how schema choices affect query complexity, count, and performance. The instrumentation layer captures timing, query count, and result sizes for every operation, so we can directly compare embedding vs. referencing vs. denormalization on the same workload.

**Reproducible and publishable.** Dataset, application, migration scripts, user journeys, captured query logs: all version-controlled, all self-contained. Anyone can re-run the same journeys against the same data and get the same workload logs. We can publish the entire stack, not just queries and data. Researchers can use it for migration studies, schema design evaluations, or as training data for SQL-to-MQL translation models. Repeat across multiple datasets and you build up a corpus of paired relational/document workloads grounded in real applications.

**Generalizability.** The pattern (build a layered app, swap the data layer, drive it with scripted journeys, capture queries) isn't specific to SQL-to-MongoDB. It works for SQL to graph databases, MongoDB to DynamoDB, or comparisons between SQL engines.

## Proof of Concept: Beer Factory

This sounds like a lot of moving parts. It isn't. The whole premise depends on letting go of the assumption that writing application code is expensive and slow. With current coding agents, it's neither.

We built a proof of concept on the [Beer Factory dataset](https://www.kaggle.com/datasets/ankurnapa/brewery-operations-and-market-analysis-dataset), a root beer retail operation with 7 relational tables: brands, customers, inventory, reviews, transactions, locations, and geolocations, **in under 2 hours**. 

{{< figure src="beer-factory-app.gif" caption="Beer Factory: a full-stack application with swappable SQL and MongoDB backends." >}}

The app has 20 API endpoints and 10 pages:

- **Brand catalog**: search, filter by ingredients and availability, sort by name/price/rating, paginated (touches `rootbeerbrand`, `rootbeerreview`)
- **Brand detail**: full product info, rating distribution, paginated reviews, availability across stores (touches `rootbeerbrand`, `rootbeerreview`, `rootbeer`, `location`)
- **Customer profiles**: purchase history, reviews authored, spending summary with favorite brand (touches `customers`, `transaction`, `rootbeer`, `rootbeerbrand`, `location`, `rootbeerreview`)
- **Store locator**: locations with inventory by brand and container type (touches `location`, `geolocation`, `rootbeer`, `rootbeerbrand`)
- **Point of sale**: record transactions against a customer, brand, and location (touches `transaction`, `rootbeer`)
- **Review submission**: star ratings and text reviews with duplicate detection (touches `rootbeerreview`)
- **Analytics dashboard**: revenue by brand, by location, over time; top customers; popular brands (touches all 7 tables)

Query patterns range from simple single-table lookups to multi-table joins with aggregations. Here's a concrete example: the "popular brands" analytics operation. On the SQL side, it's a 3-table join with a correlated subquery:

```sql
SELECT rbb.BrandID, rbb.BrandName,
       COUNT(t.TransactionID) AS transaction_count,
       (SELECT AVG(StarRating) FROM rootbeerreview rv
        WHERE rv.BrandID = rbb.BrandID) AS avg_rating
FROM "transaction" t
JOIN rootbeer rb ON t.RootBeerID = rb.RootBeerID
JOIN rootbeerbrand rbb ON rb.BrandID = rbb.BrandID
GROUP BY rbb.BrandID
ORDER BY transaction_count DESC
LIMIT 10
```

The same user action on the MongoDB backend produces a 9-stage aggregation pipeline with three `$lookup` joins:

```javascript
[
  {"$lookup": {"from": "root_beers", "localField": "root_beer_id",
               "foreignField": "_id", "as": "root_beer"}},
  {"$unwind": "$root_beer"},
  {"$group": {"_id": "$root_beer.brand_id",
              "transaction_count": {"$sum": 1}}},
  {"$sort": {"transaction_count": -1}},
  {"$limit": 10},
  {"$lookup": {"from": "brands", "localField": "_id",
               "foreignField": "_id", "as": "brand"}},
  {"$unwind": "$brand"},
  {"$lookup": {"from": "reviews", "localField": "_id",
               "foreignField": "brand_id", "as": "reviews"}},
  {"$addFields": {"avg_rating": {
      "$cond": {"if": {"$gt": [{"$size": "$reviews"}, 0]},
                "then": {"$avg": "$reviews.star_rating"},
                "else": null}}}}
]
```

These aren't hand-crafted. They're the actual queries captured by the instrumentation layer while a user clicks through the analytics dashboard. This kind of paired SQL/MQL data is hard to produce synthetically but falls out naturally from the app bridge approach.

Both backends implement the same 19-method repository interface with raw queries, no ORM. Every database operation gets logged to JSONL with timing, raw queries, and result counts. 19 equivalence tests verify both backends return identical results for the same inputs.

Build time: the SQL-only implementation (FastAPI, SQLite repository, Jinja2 frontend, query instrumentation) took just over **1 hour** with Claude Code, most of which was spent during the planning phase. Adding the MongoDB backend (migration script, MongoDB repository, equivalence tests) took another **15 minutes**. That's the layered architecture paying off. With modern coding agents, the application isn't the bottleneck anymore. It's cheap enough to treat as disposable.

## Implications for App Modernization

The architecture we built for benchmark generation turns out to be the same target architecture for safe database migrations. Just approached from the other direction.

For benchmarks, we start from a dataset and *generate* a new application with clean layers. For modernization, the application already exists, but it usually lacks the separation between frontend, API, and data layer that makes backend swapping possible.

Getting from one to the other is a refactoring problem. The steps:

1. **Establish UI-level test coverage** with Playwright to capture current application behavior as a regression suite.
2. **Refactor the data layer** to introduce a repository interface, keeping the existing SQL backend as the first implementation. Playwright tests guarantee the refactoring preserves behavior.
3. **Implement the new backend** (MongoDB) against the same repository interface.
4. **Run the same test suite** against the new backend to verify semantic equivalence.

We're not claiming this fully solves legacy migration automation. Real-world applications carry decades of accumulated complexity, implicit dependencies, and undocumented behavior. But by repeatedly building and migrating applications across multiple datasets, we learn what can be automated, where human judgment is needed, and how coding agents can help. Each iteration sharpens the recipe.

The two lines of work feed each other. Benchmarks produce paired SQL/MQL datasets and migration case studies. Migration insights improve the realism of generated applications and schema designs. And the published artifacts serve both communities.

## What Each Collaborator Brings

**University of Sydney (Uwe, Sooraj)** brings academic rigour, expertise in existing literature (e.g. the SQLStorm lineage and related work), and a student who can drive this as an honours project: experimental design, evaluation methodology, comparison with existing benchmarks. 

**MongoDB (Robin)** brings migration expertise and the PRISM datasets: 15+ relational datasets with manually designed MongoDB schema variants. These are ground truth for evaluating automated schema migration and starting points for the benchmark pipeline. Robin's app modernization perspective keeps the research connected to what practitioners actually need.

**Relaxed Constraints (Thomas)** brings the AI-assisted engineering side: tooling and methodology for rapidly generating applications, instrumenting queries, and automating the pipeline. The Beer Factory prototype shows the approach works. The next step is scaling it across Robin's PRISM datasets.
