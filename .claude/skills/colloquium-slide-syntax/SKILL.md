---
name: colloquium-slide-syntax
description: Use this skill when writing or modifying slide-deck markdown under content/slides/ on the relcon.ai Hugo site, editing the slide-syntax preprocessor at themes/relcon-theme/assets/js/colloquium-syntax.js or the slide layouts in themes/relcon-theme/layouts/slides/, or answering questions about supported slide syntax. Covers colloquium-style directives (columns, rows, row-columns, animate, step, align, valign, size, padding, layout, footnote, footnote-right, footnotes, img-align, img-valign, img-fill, img-overflow), inline markers (|||, ===, ^[..] footnotes, <!-- step --> fragment groups), fenced ```box callouts with YAML, alt-text figure captions, text size and spacer utility classes, and how colloquium markdown maps onto reveal.js v5 behavior.
---

# Colloquium slide syntax on relcon.ai

Slide decks live at `content/slides/<YYYY-MM-DD-slug>/index.md` and render at `/slides/<slug>/` via reveal.js v5 + a client-side preprocessor that accepts colloquium-flavoured markdown. The same file can also be built by the upstream `colloquium` CLI — keep syntax colloquium-compatible.

The title slide (logo + teal panel + dots) is auto-generated from Hugo front-matter. Author slides start **after** it.

## Where things live

- `themes/relcon-theme/assets/js/colloquium-syntax.js` — the preprocessor: directive parsing, HTML rewriting, post-render DOM passes (figure captions, animate classes).
- `themes/relcon-theme/layouts/slides/baseof.html` — all slide CSS (inlined `<style>` block) including directive-driven classes.
- `themes/relcon-theme/layouts/slides/single.html` — wiring: math placeholder pass → `preprocessColloquiumSyntax` → `Reveal.initialize` → `applyColloquiumFigureCaptions` + `applyColloquiumAnimations`.
- `content/slides/2026-04-17-colloquium-spike/index.md` — the visual regression deck. **Treat as the gold reference when unsure how a directive renders.** It exercises every feature in this skill.

## Authoring essentials

```markdown
---
title: "Talk title"
date: 2026-05-01
draft: false
type: "slides"
description: "Subtitle / short description"
event: "Venue name"
author: "Thomas Rückstieß"
transition: "slide"
---

## First author slide

Content here. `---` on its own line starts a new slide.
```

`transition` and `event` are optional. Set `draft: true` while iterating. Do **not** put a `# Title` slide at the top — the title slide is auto-inserted.

## Syntax reference

### Slide-level directives

Placed anywhere in the slide body as `<!-- key: value -->` on their own line. All are colloquium-compatible.

```markdown
<!-- columns: 40/60 -->      # grid spec; use ||| between cells
<!-- rows: 35/65 -->         # grid spec; use === between cells
<!-- align: center -->       # text-align: left | center | right
<!-- valign: center -->      # top | center | bottom
<!-- size: large -->         # small | normal | large
<!-- padding: compact -->    # compact | normal | wide
<!-- layout: section-break --># passes through as slide--<name> class
<!-- class: smaller foo -->  # extra classes on the <section>
<!-- style: background: #000 -->  # inline CSS
<!-- title: hidden -->       # hide the slide heading
<!-- animate: bullets -->    # bullets | items | blocks
<!-- footnotes: left -->     # default side for ^[..] inline footnotes
<!-- footnote: left prose -->     # slide-level prose, bottom-left
<!-- footnote-right: right prose --> # slide-level prose, bottom-right
<!-- img-align: center -->   # left | center | right (for plain images on slide)
<!-- img-valign: bottom -->  # top | center | bottom (inside row/col cells)
<!-- img-fill: true -->      # image fills cell (object-fit: cover — crops)
<!-- img-overflow: true -->  # cell allows overflow: visible
```

Grid spec rules: `N` (integer) → `repeat(N, 1fr)`. `a/b/c` → fr-weighted columns/rows (`minmax(0, a fr) …`). Used by both `columns:` and `rows:`.

### Inline markers

```markdown
<!-- columns: 2 -->

### Left column

- item

|||                       <!-- on its own line, splits columns -->

### Right column

Autoregressive text^[This is a numbered inline footnote.] composes
with slide-level footnotes on the same side.

<!-- step -->             <!-- splits content into reveal fragments -->

This appears on next click.
```

- `|||` — column splitter (inside a `columns:` slide)
- `===` — row splitter (inside a `rows:` slide). Must be handled pre-marked because CommonMark treats it as setext H1.
- `^[text]` — inline numbered footnote (bracket-depth counted, so `^[\left[..\right]]` is fine)
- `<!-- step -->` — fragment-group marker; splits a slide body or a cell body into sequential reveal fragments

### Row-columns (nested)

```markdown
<!-- rows: 40/60 -->

<!-- row-columns: 40/60 -->   <!-- only valid inside a row block -->

Left note

|||

- Right bullets

===

Bottom row, full width.
```

### Fenced `box` callouts

```markdown
```box
title: Core idea
tone: accent
content: |
  - Bullet
  - Bullet
```
```

Fields: `title` (inline-markdown rendered), `content` (block markdown), `tone` (`accent` | `muted` | `surface`), `align` (`left` | `center` | `right`), `size` (numeric em scale like `0.9`), `compact` (bool).

Title-only box is valid: omit `content`. The single-line title vertically centers.

### Figure captions

Alt text becomes the caption automatically — no frontmatter flag needed.

```markdown
![](./img.png)                        # no caption
![An image caption](./img.png)        # alt text rendered as <figcaption>
```

Empty alt → plain `<img>`. Non-empty alt → `<figure>` + `<figcaption>`. No numbering ("Figure 1:" is not added).

### Utility classes

```markdown
<span class="text-2xl">Hero</span>
<span class="text-sm">Dense</span>
<span class="text-xs">Aside</span>

<div class="colloquium-spacer-lg"></div>

<div class="colloquium-footnote">
Italic muted block for in-flow secondary text.
</div>
```

Sizes: `text-xs` (0.65em) · `text-sm` · `text-base` · `text-lg` · `text-xl` · `text-2xl` · `text-3xl` · `text-4xl` (2.8em).
Spacers: `colloquium-spacer-sm` · `colloquium-spacer-md` · `colloquium-spacer-lg`.
`colloquium-footnote` is a block-level secondary-text class (not to be confused with slide-level footnote directives).

## Coexisting with reveal-native syntax

Pre-spike decks use reveal-specific syntax that still renders — don't rewrite unless asked:

- `----` (four dashes) → **vertical** sub-slides (colloquium is strictly linear; no replacement)
- `<!-- .slide: class="..." -->` / `<!-- .slide: data-foo="bar" -->` → reveal slide attribute directives (the preprocessor does **not** match these — only its own keyword allowlist)
- `<!-- .element: class="fragment" -->` → reveal fragment on the preceding element (lighter-weight than `<!-- animate: -->` when you need one fragment)
- `Notes:` line splits off speaker notes (reveal's `data-separator-notes="^Notes:"` in `single.html`)

## Common pitfalls

- **Slide sections need `box-sizing: border-box`** when `has-rows` / `has-columns` / `has-footnote` / `valign-*` is applied. Reveal's default is `content-box`, so `height: 100%` + `padding-bottom: 2em` overflows the deck by ~126px and footnotes land behind the fixed footer bar. Fixed in CSS; don't remove.
- **`valign:` requires `display: flex`** on the section. The CSS selector that enables flex-column includes `has-rows`, `has-columns`, `has-footnote`, **and** all three `valign-*` classes. If you add a new class that expects `justify-content` to work, include it in that selector.
- **`===` is CommonMark setext H1.** Row splitting must happen in the preprocessor before marked sees it. Adding another DOM pass after render won't work.
- **Images in rows need explicit height constraints.** `max-height: 100%` on an `<img>` resolves against its containing block's definite height. The `<p>` wrapper marked emits has content-sized height — circular. Our CSS uses `display: contents` on `<p>` / `<figure>` wrappers via `:has()` to pull the image up to be a direct child of the row cell. `:has()` is modern-browser-only (Chrome 105+, Safari 15.4+, Firefox 121+).
- **`animate: blocks` with columns/rows** — the post-render selector uses `:scope > p, ul, ol, pre, blockquote, table`; inside a columns/rows wrapper the direct children are `.col` / `.colloquium-row` divs, so the selector misses them. Untested edge case.
- **Fenced elements inside a slide that also has `<!-- columns -->`**: box processing happens BEFORE the slide split, so boxes always work. But the resulting HTML is block-level and needs blank lines around it inside a column cell or marked won't render surrounding markdown.
- **Directive allowlist is strict.** Adding a new directive keyword means updating both the `DIRECTIVE_RE` regex in `colloquium-syntax.js` AND a corresponding `classes.push(...)` (or other handling) in `processSlide`. Miss either and the directive becomes a silent no-op.
- **Code is protected during preprocessing.** `` `<!-- title: hidden -->` `` inside an inline span or ` ```…``` ` fence must not be stripped as a directive. The `protectCode` pass replaces code with `\x00CODEN\x00` placeholders before directive / footnote / step / split regexes run, and `restoreCode` puts it back before handing to Reveal. Any new regex-based transform belongs inside this protected window, not outside.

## Extending the preprocessor

Pipeline in `preprocessColloquiumSyntax(markdown)`:

1. `processFencedElements` — regex-replace ` ```box` blocks with rendered HTML (runs on whole deck before split)
2. `protectCode` — replace remaining ` ```…``` ` fences and `` `…` `` inline spans with opaque `\x00CODEN\x00` placeholders so nothing inside authored code examples gets matched by subsequent regexes
3. Split on `\n---\s*\n` into slides
4. Per slide in `processSlide`:
   - `extractDirectives` strips `<!-- key: value -->` comments into a `dirs` map
   - `extractInlineFootnotes` replaces `^[..]` with `<sup>` markers; bracket-depth counted
   - Lift leading `#` / `##` title out of the body if `columns:` or `rows:` is set (otherwise it gets trapped inside the first cell)
   - Wrap body with `wrapColumns` or `wrapRows` (each wrapper calls `processSteps` per cell)
   - Emit combined `<!-- .slide: class="..." data-animate="..." -->` directive at the top so reveal applies classes/attributes to the `<section>`
   - Append `<div class="colloquium-slide-footnotes-row">` if any footnote items collected
5. `restoreCode` — replace placeholders back to original code content before returning to Reveal

Post-render hooks (fire in `single.html` after `Reveal.initialize().then(...)`):
- `applyColloquiumFigureCaptions` — rewrites single-image `<p>` to `<figure>`
- `applyColloquiumAnimations` — adds `.fragment` class to `<li>` / block children on sections with `data-animate`

To add a new directive, update the allowlist in `DIRECTIVE_RE` (longer names before shorter in alternation), add the class/attr mapping in `processSlide`, and add the CSS in `baseof.html`. To add a fenced element (e.g. `conversation`), mirror the `BOX_BLOCK_RE` pattern and add a `render*` function that returns HTML.

## Out of scope

These colloquium features are **intentionally not ported** — do not add them without discussion:

- `` ```chart `` / `` ```conversation `` / `` ```builtwith `` fenced elements
- `[@key]` citations, bibliography frontmatter, References slides
- Frontmatter `theme` / `fonts` / `footer` / `custom_css` / `aspect_ratio` (relcon has its own fixed theme, footer, fonts, and 1728×1117 deck size)

## Upstream reference

When colloquium-specific semantics are unclear, check the upstream source:

- Repo: <https://github.com/natolambert/colloquium>
- Python parser/renderer: `colloquium/parse.py`, `colloquium/build.py`, `colloquium/elements/*.py`
- CSS token semantics: `colloquium/themes/default/theme.css`
- Fragment support (PR #25): `<!-- animate: bullets|items|blocks -->` and `<!-- step -->` — referenced when porting animations

Clone fresh to `/tmp` if re-reading; the working copy used during the spike was at `/tmp/colloquium-eval/colloquium` and may be stale.
