# Relaxed Constraints Website

Hugo static site for Relaxed Constraints AI research lab. Hosted on Netlify.

## Stack
- Hugo (static site generator)
- TailwindCSS v4 (via Hugo's `css.TailwindCSS` pipe)
- Netlify (hosting + forms)
- Reveal.js v5 for slide decks, with a bespoke Colloquium markdown preprocessor
- MathJax v3 (equations in blog posts and slide decks)
- GoatCounter for privacy-friendly analytics

## Commands
```
hugo server              # Dev server with live reload
hugo server --noHTTPCache # Dev server without browser caching
hugo                     # Production build (output: public/)
npm install              # Install Tailwind dependencies
```

Previewing social-media link cards locally (OG / Twitter / LinkedIn / Slack):
1. `hugo server` on any port (say 1313)
2. `cloudflared tunnel --url http://localhost:1313` (or `npx localtunnel --port 1313`)
3. Paste the tunnel URL into metatags.io or the Facebook / Twitter / LinkedIn
   validators, or drop it into Slack / Messages to see the in-app unfurl.

## Structure

### Content
- `content/_index.md` — home page
- `content/about/_index.md` — about page (rendered by `layouts/section.html`)
- `content/blog/<slug>.md` or `content/blog/<slug>/index.md` — blog posts
- `content/slides/<slug>/index.md` — slide decks (page bundles)
- `content/research/<slug>/index.md` — research project pages (page bundles)
- `content/contact.md` — contact form page

### Templates (`themes/relcon-theme/layouts/`)
- `baseof.html` — site-wide shell (nav + footer, excl. slides)
- `home.html` — landing page (hero with grid-walker canvas, Current Focus pillars, Blog preview)
- `section.html` — generic section/list layout (About uses this)
- `page.html` — generic single page fallback
- `blog/list.html`, `blog/single.html` — blog index and post reader
- `slides/list.html` — slides index (3-col card grid)
- `slides/baseof.html` — full reveal.js shell with inline slide theme
- `slides/single.html` — deck renderer (title slide + markdown via Reveal)
- `contact/single.html` — contact form (Netlify wiring preserved)
- `research/list.html`, `research/single.html` — research index (Register grid) and single project (sticky TOC)
- `_partials/header.html`, `_partials/footer.html` — site chrome
- `_partials/rc-logo.html` — shared inline L07 SVG mark (used in nav, slide title, slide footer)
- `_partials/theme-tokens.html` — single source of truth for the CSS color tokens (`:root` + `.dark`)
- `_partials/og-image.html` — per-page Open Graph card generator
- `_partials/research/*.html` — per-block partials for the research single page (overview, collaborators, papers, posts, slides, repos, results, changelog, related, status-pill, count-chips)

### Assets
- `assets/css/main.css` — Tailwind entry point, base styles, `.prose`, chroma syntax theme
- `themes/relcon-theme/assets/css/` — theme-scoped CSS (if any)
- `themes/relcon-theme/assets/js/main.js` — hero grid-walker animation (the only runtime JS on the main site)
- `themes/relcon-theme/assets/js/colloquium-syntax.js` — slide markdown preprocessor (colloquium directives, row/column/footnote/box primitives)
- `themes/relcon-theme/assets/fonts/` — Inter Tight TTFs (variable + static Bold and Light, used by `images.Text` for OG cards)
- `themes/relcon-theme/assets/images/og-base.png` — shared base for dynamic OG cards
- `themes/relcon-theme/static/images/og-home.png` — dedicated home-page OG card
- `themes/relcon-theme/static/favicon.svg` — theme-aware L07 favicon (flips on `prefers-color-scheme`)
- `scripts/build-og-base.py` — Python script that regenerates `og-base.png` from the SVG logo + Inter Tight SemiBold wordmark (rarely needed)

### Config
- `hugo.toml` — site config, menus (Research / Blog / Slides / About / Contact), markup settings
- `tailwind.config.js` — Tailwind color aliases that reference `--c-*` vars

## Design system

### Palette
Current palette is cool greys + coral accent (Flexoki-inspired). Tokens live
in `_partials/theme-tokens.html` and are emitted inside `<head>` via
`partialCached` so the same set drives the main site, the slide theme, and
anything else that reads `var(--c-*)`.

- Light: `--c-bg: #F4F4F6`, `--c-surface: #FFFFFF`, `--c-code-bg: #FFFFFF`, `--c-border: #D2D2D4`, `--c-text: #111114`, `--c-accent: #FF634A`
- Dark: `--c-bg: #111115`, `--c-surface: #1a1a20`, `--c-code-bg: #0b0b10`, `--c-border: #2a2a32`, `--c-text: #ebebf0`, `--c-accent: #FF7A65`
- Named colors (Flexoki-ish, flip with theme): `--c-red/orange/yellow/green/cyan/blue/purple/magenta`
- Grey text tiers: `--c-gray-200/300/400/500/600` (primary body is `--c-text`, muted body is `--c-gray-300`, faint is `--c-gray-500`)
- Muted surface: `--c-muted` (subtle grey fill for callout boxes etc.)
- Code highlight: `--c-code-hl` for line highlights

### Typography
- Display + body: **Inter Tight** (300, 400, 500, 600, 700 weights loaded via Google Fonts)
- Monospace: **IBM Plex Mono** (400, 500)
- Mono is used for eyebrows, meta lines, code, footer bar — display is used for everything else
- Section eyebrows use the uppercase ◢ glyph (`&#x25E2;`) in accent color, followed by `section · label`

### Chrome conventions
- Main headings (big section titles, page titles): `font-size: clamp(44px, 5.5vw, 72px); letter-spacing: -0.025em;`
- Primary/secondary buttons: `.btn-primary` (ink on bg) and `.btn-ghost` (transparent with border) — both pill-shaped
- Chips: `.chip` (lowercase, small) and `.chip-lg` (uppercase) for tags
- Card surfaces: `.card-surface` (surface bg + border)
- No custom CSS classes unless a pattern repeats across multiple templates

## Research projects

Projects are page bundles under `content/research/<slug>/`. Frontmatter schema
(see `archetypes/research/default.md` for the authoritative template):

- `code` — short project code shown on cards (e.g. `ORG-01`)
- `accent` — named color (`red/orange/yellow/green/cyan/blue/purple/magenta`) or
  a hex string. Named colors flip automatically between light/dark; hex stays fixed.
- `status` — `active | exploratory | shipped | paused`
- `association` — free-text array rendered on the index card joined by ` · `,
  e.g. `["USYD", "MongoDB", "RelCon"]`
- `started`, `last_touched` — freeform dates shown in chrome
- `tags` — array of strings rendered as chip-lg pills
- `hypothesis` — rendered as an accent-left-bordered pull-quote in the overview block
- `summary` — short one-liner shown on the index card AND as a lead under the title
- `collaborators` — `[{who, affiliation, role}]`, paper-style byline in the collaborators block
- `papers` — `[{title, authors, venue, date, links}]`, with `links: [{label, url}]`
- `results` — `[{value, caption}]`, big accent metric + small mono caption
- `repos` — `[{label, url}]`, rendered as github chips
- `changelog` — `[{date, text}]`, reverse-chronological timeline
- `post_slugs`, `deck_slugs` — slugs of related blog posts / slide decks (resolved via `site.GetPage`)
- `related` — project slugs (resolved the same way, rendered as chips under the Related block)

### Per-project accent wiring
The template emits `--proj-accent-color: <value>` inline on `.project-themed`.
A single CSS rule resolves `--proj-accent` from that value (falling back to
`--c-accent` when unset). Because named color tokens flip with the theme,
`accent: cyan` produces a project accent that follows light/dark
automatically — no separate `accent_dark` needed.

### Block partials
Each block on the single project page is a partial in
`_partials/research/block-<id>.html`. The single template renders them in a
fixed order (overview, results, collaborators, papers, posts, slides, code,
changelog, related) and filters out blocks whose frontmatter is empty. The
sticky TOC uses the same `show` predicates.

## Slides

Slide decks live under `content/slides/<slug>/` as page bundles and render
through `layouts/slides/baseof.html` + `layouts/slides/single.html`. The
deck theme:

- Reuses the shared `--c-*` tokens via alias vars (`--r-*` defined in
  `slides/baseof.html`) so palette changes propagate automatically
- Uses the same Inter Tight + IBM Plex Mono stack as the site
- Title slide: left-aligned, RC logo + wordmark top-left, big Inter Tight
  Bold title (max 30ch, text-wrap: balance), subtitle, accent eyebrow + rule,
  then author/affiliation/date. No grid background on the title.
- Content slides: no grid. H1 size 2.1em, H2 size 1.6em with generous
  margin-bottom.
- Footer bar: 76px tall, mono text, mono slide number on the right. Hidden
  on title slide.
- Callout boxes: 14px radius. Three variants — accent (coral fill), muted
  (grey `--c-muted` fill), surface (white with border).

### Colloquium preprocessor
`themes/relcon-theme/assets/js/colloquium-syntax.js` rewrites
colloquium-flavoured markdown into HTML before reveal.js parses it.
Supported directives: `columns`, `rows`, `row-columns`, `layout`, `align`,
`valign`, `size`, `padding`, `title`, `animate`, `step`, `footnote`,
`footnote-right`, `footnotes`, `img-*`. Inline `^[...]` footnotes render as
numbered superscripts linked to a bottom-of-slide stack. Fenced ```box blocks
become callouts. Don't edit this file casually — it's shared with the upstream
colloquium CLI and changes ripple through every existing deck.

## Open Graph cards

`_partials/og-image.html` generates per-page OG cards at build time using
Hugo's native `images.Text` filter (no Node / headless-browser runtime).
Pipeline:

- Home page → static `static/images/og-home.png` (big wordmark variant)
- Blog / slides / research pages → overlay the title on
  `assets/images/og-base.png`, plus a type-aware byline in Inter Tight Light
- Other pages (About, Contact, section indexes) → title only, no byline
- Any page with `image:` in frontmatter → that URL instead

Title word-wrap is greedy (target ~28 chars per line, max 3 lines, silent
truncation for longer titles). Bylines:
- blog: `— Blog post by <author>`
- slides: `— Slide Deck for <event>, <date>`
- research: `— Research Project · <code>`

`scripts/build-og-base.py` regenerates the base PNG using rsvg-convert +
Pillow + Inter Tight SemiBold. Run it if the logo changes.

## Theme switching

Three-state toggle (dark / auto / light) cycles via the header button. State
persists in `localStorage.theme`. Initial value resolves in a tiny inline
script in `baseof.html` before the page renders (prevents flash).
`prefers-color-scheme` is honoured in `auto` mode. The favicon is an SVG
that also listens to `prefers-color-scheme` via embedded `<style>` so the
browser tab icon flips too.

## Hero animation

`themes/relcon-theme/assets/js/main.js` drives the grid-walker canvas on
the home page. Walkers traverse an invisible 48px grid with a 40% chance
of turning at each intersection, respawn when they leave the canvas, and
read the accent color from `--c-accent` so they flip with the theme. The
canvas is masked top + bottom so walkers fade in and out instead of
appearing/disappearing at hard edges.

The 48px grid is no longer drawn on the page itself — only walkers remain
visible. If you want the grid back, uncomment the `background-image` on
the hero backdrop div in `home.html`.

## Hosting & Deployment
- Hosted on **Netlify**, auto-deploys from `main` branch on GitHub
- Domain: `relcon.ai` (registered on Cloudflare)
- DNS: Cloudflare with CNAME flattening → `apex-loadbalancer.netlify.com` (proxy off, DNS only)
- SSL: Auto-provisioned by Netlify via Let's Encrypt
- Email: iCloud custom domain (MX/TXT records managed in Cloudflare, separate from Netlify)

## Contact Form
- Uses Netlify Forms (`netlify` attribute on `<form>`)
- Spam protection via `netlify-honeypot="bot-field"`
- On submit, redirects to `/success` (no trailing slash — Netlify requires this)
- Form submissions visible in Netlify dashboard under Forms
- Email notifications configurable in Netlify: Site settings → Forms → Form notifications

## Analytics
- GoatCounter: `https://relconai.goatcounter.com`
- Script loaded in `baseof.html`, production only (`hugo.IsProduction`)
- Free, privacy-friendly, no cookie consent required

## Code style
- 2-space indentation in HTML templates
- Tailwind utility classes for most styling; inline `style="..."` OK for
  per-page or per-project overrides (e.g. `--proj-accent-color: …`)
- Reach for `var(--c-*)` over raw hex where possible so theme flipping works
- No new CSS classes unless a pattern repeats across multiple templates
