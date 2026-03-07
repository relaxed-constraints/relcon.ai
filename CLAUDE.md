# Relaxed Constraints Website

Hugo static site for Relaxed Constraints AI research lab. Hosted on Netlify.

## Stack
- Hugo (static site generator)
- TailwindCSS v4 (via Hugo's `css.TailwindCSS` pipe)
- Netlify (hosting + forms)
- MathJax v3 (equations in blog posts)

## Commands
```
hugo server              # Dev server with live reload
hugo server --noHTTPCache # Dev server without browser caching
hugo                     # Production build (output: public/)
npm install              # Install Tailwind dependencies
```

## Structure
- `content/` — Markdown content (blog posts, pages)
- `themes/relcon-theme/layouts/` — All templates
- `assets/css/main.css` — Tailwind entry point + custom CSS
- `tailwind.config.js` — Color palette (edit here to retheme)
- `hugo.toml` — Site config, menus, markup settings

## Creating blog posts
```
hugo new content blog/YYYY-MM-DD-post-title.md
```
Set `draft: false` when ready to publish.

## Code style
- 2-space indentation in HTML templates
- Tailwind utility classes for all styling
- No custom CSS classes unless needed for animations
