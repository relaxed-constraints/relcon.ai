/**
 * colloquium-syntax.js
 *
 * Preprocessor that rewrites colloquium-flavoured markdown directives into
 * HTML scaffolding that reveal.js + marked.js render cleanly.
 *
 * Runs on the contents of <script type="text/template"> before Reveal
 * initializes, so the slide separator (---) is still in the text.
 *
 * Supported:
 *   <!-- columns: 2 | 40/60 | 3 -->        with ||| between columns
 *   <!-- rows: 2 | 35/65 | 3 -->           with === between rows
 *   <!-- row-columns: 40/60 -->            inside a row block
 *   <!-- layout: name -->                  → slide--name class
 *   <!-- class: a b -->, <!-- style: ... -->
 *   <!-- align: left|center|right -->      → align-*
 *   <!-- valign: top|center|bottom -->     → valign-*
 *   <!-- size: small|normal|large -->      → size-*
 *   <!-- padding: compact|normal|wide -->  → pad-*
 *   <!-- title: top|center|hidden -->      → title-*
 *   <!-- animate: bullets|items|blocks --> → fragments added post-render
 *   <!-- step -->                          → split body into fragment groups
 *   ^[text]                                → numbered floating footnote
 *   <!-- footnotes: left|right -->         → inline footnote side (default right)
 *   <!-- footnote: text -->                → slide-level left prose footnote
 *   <!-- footnote-right: text -->          → slide-level right prose footnote
 *   <!-- img-align: left|center|right -->  → img-align-*
 *   <!-- img-valign: top|center|bottom --> → img-valign-*
 *   <!-- img-fill: true -->                → img-fill
 *   <!-- img-overflow: true -->            → img-overflow
 *   ```box                                 → callout rendered via js-yaml
 *
 * Out of scope for spike: ```chart/conversation/builtwith fenced elements,
 * [@bib] citations.
 */
(function () {
  'use strict';

  var SLIDE_SEP = /\n---\s*\n/;
  var VERTICAL_SLIDE_SEP = /\n----\s*\n/;

  // Slide-level directives. `row-columns` is intentionally excluded — it's a
  // row-local directive, handled inside wrapRow(). Longer alternatives list
  // first so alternation picks them over prefixes (footnote-right before
  // footnotes before footnote; img-* before img).
  var DIRECTIVE_RE = /<!--\s*(layout|class|style|columns|rows|align|valign|padding|size|title|animate|footnote-right|footnotes|footnote|img-align|img-valign|img-fill|img-overflow)\s*:\s*([^\r\n]*?)\s*-->/g;

  // <!-- step --> marker (no value). Anchored to its own line.
  var STEP_MARKER_RE = /^[ \t]*<!--\s*step\s*-->[ \t]*$/gm;

  // Leading ATX title at the top of the slide body (#, ##). We lift it out
  // before wrapping so it spans the full slide width above columns/rows.
  var LEADING_TITLE_RE = /^\s*(#{1,2})\s+([^\r\n]+)\s*(?:\r?\n|$)/;

  // Fenced block elements. Matched on raw markdown before marked.js runs.
  // Using a non-greedy body with a closing fence anchored to line start.
  var BOX_BLOCK_RE = /(^|\n)```box[ \t]*\n([\s\S]*?)\n```[ \t]*(?=\n|$)/g;

  function gridTemplate(spec, axis) {
    spec = String(spec || '').trim();
    if (/^\d+$/.test(spec)) {
      var n = Math.max(parseInt(spec, 10), 1);
      return 'grid-template-' + axis + ': repeat(' + n + ', minmax(0, 1fr));';
    }
    if (/^\d+(\/\d+)+$/.test(spec)) {
      var tracks = spec.split('/').map(function (p) {
        return 'minmax(0, ' + parseInt(p, 10) + 'fr)';
      }).join(' ');
      return 'grid-template-' + axis + ': ' + tracks + ';';
    }
    return '';
  }

  /**
   * Minimal inline markdown for box/conversation titles. Handles the common
   * `code`, **bold**, *italic*, _italic_ patterns so titles can carry
   * emphasis without being run through marked (they're inside block HTML
   * that marked won't recurse into).
   */
  function inlineMd(text) {
    // Escape HTML first so user content can't inject markup.
    var escaped = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
      .replace(/_([^_\n]+)_/g, '<em>$1</em>');
  }

  function errorPara(message) {
    return '<p style="color:red">' + message + '</p>';
  }

  function renderBox(yamlStr) {
    if (typeof jsyaml === 'undefined') {
      return errorPara('js-yaml not loaded — cannot render ```box');
    }
    var spec;
    try {
      spec = jsyaml.load(yamlStr);
    } catch (e) {
      return errorPara('Invalid box YAML');
    }
    if (!spec || typeof spec !== 'object' || Array.isArray(spec)) {
      return errorPara('Box spec must be a YAML mapping');
    }

    var title = (spec.title == null ? '' : String(spec.title)).trim();
    var content = (typeof spec.content === 'string') ? spec.content.replace(/^\s+|\s+$/g, '') : '';
    if (!title && !content) return errorPara('Box requires title or content');

    var tone = String(spec.tone || 'accent').trim().toLowerCase() || 'accent';
    var align = String(spec.align || '').trim().toLowerCase();
    var compact = Boolean(spec.compact);

    var classes = ['colloquium-box', 'colloquium-box--' + tone];
    if (align === 'left' || align === 'center' || align === 'right') {
      classes.push('colloquium-box--align-' + align);
    }
    if (compact) classes.push('colloquium-box--compact');

    var style = '';
    if (spec.size != null && spec.size !== '') {
      var scale = parseFloat(spec.size);
      if (!isNaN(scale) && scale > 0) style = ' style="font-size: ' + scale + 'em"';
    }

    var parts = ['<div class="' + classes.join(' ') + '"' + style + '>'];
    if (title) {
      parts.push('<div class="colloquium-box-title">' + inlineMd(title) + '</div>');
    }
    if (content) {
      // Blank lines around the inner content so marked.js will parse the
      // body as markdown between block-level HTML fragments.
      parts.push('<div class="colloquium-box-content">\n\n' + content + '\n\n</div>');
    }
    parts.push('</div>');
    return parts.join('\n');
  }

  function processFencedElements(markdown) {
    return markdown.replace(BOX_BLOCK_RE, function (_, lead, body) {
      return lead + renderBox(body);
    });
  }

  /**
   * Replace remaining fenced code blocks and inline code spans with opaque
   * placeholders so our directive / footnote / step / slide-split regexes
   * can't reach into them. Call AFTER processFencedElements (so ```box
   * survives) and restore before handing back to Reveal.
   *
   * Uses \x00 as the sentinel character — it never appears in authored
   * markdown. Fences match first (greedy non-greedy) so triple-backtick
   * blocks are captured whole before inline-span scanning.
   */
  var CODE_PLACEHOLDER_RE = /\x00CODE(\d+)\x00/g;

  function protectCode(text, store) {
    // Fenced blocks (``` … ``` across lines)
    text = text.replace(/```[\s\S]*?```/g, function (m) {
      store.push(m);
      return '\x00CODE' + (store.length - 1) + '\x00';
    });
    // Inline spans (single-line `…`)
    text = text.replace(/`[^`\n]+?`/g, function (m) {
      store.push(m);
      return '\x00CODE' + (store.length - 1) + '\x00';
    });
    return text;
  }

  function restoreCode(text, store) {
    return text.replace(CODE_PLACEHOLDER_RE, function (_, i) {
      return store[parseInt(i, 10)];
    });
  }

  function extractDirectives(text) {
    var dirs = {};
    var rest = text.replace(DIRECTIVE_RE, function (_, key, value) {
      value = (value || '').trim();
      if (key === 'class' || key === 'style') {
        dirs[key] = ((dirs[key] || '') + ' ' + value).trim();
      } else {
        dirs[key] = value;
      }
      return '';
    });
    return { dirs: dirs, rest: rest };
  }

  /**
   * Replace ^[text] with a numbered <sup> marker, collecting the text.
   * Uses bracket-depth counting so footnotes may contain [ ... ] safely
   * (common in math like \left[ ... \right] and citations).
   */
  function extractInlineFootnotes(text, slideIdx) {
    var notes = [];
    var out = [];
    var i = 0;
    while (i < text.length) {
      if (text.charCodeAt(i) === 94 /* ^ */ && text.charCodeAt(i + 1) === 91 /* [ */) {
        var j = i + 2;
        var depth = 1;
        while (j < text.length && depth > 0) {
          var c = text.charCodeAt(j);
          if (c === 91) depth++;
          else if (c === 93) depth--;
          j++;
        }
        if (depth === 0) {
          var noteText = text.substring(i + 2, j - 1);
          var n = notes.length + 1;
          notes.push(noteText);
          out.push(
            '<sup class="colloquium-footnote-ref">' +
              '<a href="#fn-' + slideIdx + '-' + n + '" ' +
                 'id="fnref-' + slideIdx + '-' + n + '">' + n + '</a>' +
            '</sup>'
          );
          i = j;
          continue;
        }
      }
      out.push(text.charAt(i));
      i++;
    }
    return { text: out.join(''), notes: notes };
  }

  /**
   * Split content on <!-- step --> markers; wrap each chunk after the first
   * in <div class="fragment"> so reveal reveals them on sequential clicks.
   * Called per scope (whole slide, each column cell, each row cell) so step
   * markers never straddle a cell boundary.
   */
  function processSteps(text) {
    if (!text || text.indexOf('<!-- step -->') === -1) return text;
    var parts = text.split(STEP_MARKER_RE);
    if (parts.length === 1) return text;
    return parts.map(function (chunk, i) {
      chunk = chunk.replace(/^\s+|\s+$/g, '');
      if (!chunk) return '';
      if (i === 0) return chunk;
      return '<div class="fragment">\n\n' + chunk + '\n\n</div>';
    }).filter(Boolean).join('\n\n');
  }

  function wrapColumns(body, spec) {
    var chunks = body.split(/\n[ \t]*\|\|\|[ \t]*\n/);
    var inner = chunks.map(function (c) {
      return '<div class="col">\n\n' + processSteps(c.trim()) + '\n\n</div>';
    }).join('\n');
    var style = gridTemplate(spec, 'columns');
    var styleAttr = style ? ' style="' + style + '"' : '';
    return '<div class="colloquium-grid slide-content"' + styleAttr + '>\n' + inner + '\n</div>';
  }

  function wrapRow(block) {
    // Look for a row-local <!-- row-columns: ... --> directive
    var m = block.match(/<!--\s*row-columns\s*:\s*([^\r\n]*?)\s*-->/);
    if (m) {
      var rowSpec = m[1].trim();
      block = block.replace(m[0], '').trim();
      var chunks = block.split(/\n[ \t]*\|\|\|[ \t]*\n/);
      var inner = chunks.map(function (c) {
        return '<div class="col">\n\n' + processSteps(c.trim()) + '\n\n</div>';
      }).join('\n');
      var style = gridTemplate(rowSpec, 'columns');
      var styleAttr = style ? ' style="' + style + '"' : '';
      return '<div class="colloquium-row colloquium-grid"' + styleAttr + '>\n' + inner + '\n</div>';
    }
    return '<div class="colloquium-row">\n\n' + processSteps(block.trim()) + '\n\n</div>';
  }

  function wrapRows(body, spec) {
    var blocks = body.split(/\n[ \t]*===[ \t]*\n/);
    var html = blocks.map(wrapRow).join('\n');
    var style = gridTemplate(spec, 'rows');
    var styleAttr = style ? ' style="' + style + '"' : '';
    return '<div class="colloquium-rows slide-content"' + styleAttr + '>\n' + html + '\n</div>';
  }

  /**
   * Build the left- or right-side footnote stack. Items can be either:
   *   - { type: 'num', num, text }  (from inline ^[...] footnotes)
   *   - { type: 'prose', text }     (from <!-- footnote / footnote-right -->)
   * Numbered items render first, prose items below.
   */
  function buildFootnoteSide(items, slideIdx, side) {
    if (!items.length) return '';
    var html = items.map(function (item) {
      if (item.type === 'num') {
        return (
          '<div class="colloquium-slide-footnote-item" id="fn-' + slideIdx + '-' + item.num + '">' +
            '<span class="colloquium-slide-footnote-label">' + item.num + ':</span> ' +
            '<span class="colloquium-slide-footnote-text">' + item.text + '</span>' +
          '</div>'
        );
      }
      return (
        '<div class="colloquium-slide-footnote-item colloquium-slide-footnote-prose">' +
          inlineMd(item.text) +
        '</div>'
      );
    }).join('');
    return '<div class="colloquium-slide-footnote colloquium-slide-footnote--' + side + '">' + html + '</div>';
  }

  function processSlide(slideText, slideIdx) {
    var ex = extractDirectives(slideText);
    var dirs = ex.dirs;
    var body = ex.rest;

    var classes = [];
    if (dirs.layout) classes.push('slide--' + dirs.layout);
    if (dirs['class']) classes.push(dirs['class']);
    if (dirs.align) classes.push('align-' + dirs.align);
    if (dirs.valign) classes.push('valign-' + dirs.valign);
    if (dirs.padding) classes.push('pad-' + dirs.padding);
    if (dirs.size) classes.push('size-' + dirs.size);
    if (dirs.title) classes.push('title-' + dirs.title);
    if (dirs.columns) classes.push('has-columns');
    if (dirs.rows) classes.push('has-rows');
    if (dirs['img-align']) classes.push('img-align-' + dirs['img-align']);
    if (dirs['img-valign']) classes.push('img-valign-' + dirs['img-valign']);
    if (dirs['img-fill'] && dirs['img-fill'] !== 'false') classes.push('img-fill');
    if (dirs['img-overflow'] && dirs['img-overflow'] !== 'false') classes.push('img-overflow');

    // Inline footnotes are extracted from raw markdown so bracket counting
    // works on the author's source (before any HTML transformation).
    var fnSide = (dirs.footnotes === 'left') ? 'left' : 'right';
    var fnr = extractInlineFootnotes(body, slideIdx);
    body = fnr.text;

    // Collect footnote items per side (numbered inline + slide-level prose).
    var leftItems = [];
    var rightItems = [];
    fnr.notes.forEach(function (text, i) {
      var target = (fnSide === 'left') ? leftItems : rightItems;
      target.push({ type: 'num', num: i + 1, text: text });
    });
    if (dirs.footnote)        leftItems.push({ type: 'prose', text: dirs.footnote });
    if (dirs['footnote-right']) rightItems.push({ type: 'prose', text: dirs['footnote-right'] });

    if (leftItems.length || rightItems.length) classes.push('has-footnote');

    var sectionAttrs = [];
    if (classes.length) sectionAttrs.push('class="' + classes.join(' ').replace(/\s+/g, ' ').trim() + '"');
    if (dirs.animate) sectionAttrs.push('data-animate="' + dirs.animate + '"');

    // Lift a leading # / ## title so it sits above a columns/rows wrapper
    // instead of being trapped inside the first column/row.
    var title = '';
    if (dirs.columns || dirs.rows) {
      var titleMatch = body.match(LEADING_TITLE_RE);
      if (titleMatch) {
        title = titleMatch[1] + ' ' + titleMatch[2].trim();
        body = body.substring(titleMatch[0].length);
      }
    }

    if (dirs.rows) {
      body = wrapRows(body, dirs.rows);
    } else if (dirs.columns) {
      body = wrapColumns(body, dirs.columns);
    } else {
      // Step markers only apply at slide scope when there's no cells to
      // scope them to; wrapColumns/wrapRow process steps per-cell otherwise.
      body = processSteps(body);
    }

    if (title) body = title + '\n\n' + body;

    var leftHtml  = buildFootnoteSide(leftItems, slideIdx, 'left');
    var rightHtml = buildFootnoteSide(rightItems, slideIdx, 'right');
    if (leftHtml || rightHtml) {
      body += '\n\n<div class="colloquium-slide-footnotes-row">' + leftHtml + rightHtml + '</div>';
    }

    var prefix = sectionAttrs.length
      ? '<!-- .slide: ' + sectionAttrs.join(' ') + ' -->\n'
      : '';

    return prefix + body;
  }

  /**
   * Public: rewrite the full deck markdown. Returns a new string.
   *
   * Pipeline:
   *   1. Expand fenced colloquium elements (```box, …) into inline HTML
   *      so they survive the slide-split step without worrying about
   *      splitters hiding inside them.
   *   2. Protect remaining code (fences + inline spans) with placeholders
   *      so subsequent regexes (directive extraction, ^[..] footnotes,
   *      <!-- step --> splitting, slide ^---$ splitting, |||/=== cell
   *      splitting) can't reach inside authored code examples.
   *   3. Split into per-slide chunks on ^---$ and per-subslide chunks on
   *      ^----$ so colloquium directives stay local even inside reveal
   *      vertical stacks, then transform each chunk (directives,
   *      columns/rows, footnotes, steps).
   *   4. Restore code placeholders before handing back to Reveal.
   */
  window.preprocessColloquiumSyntax = function (markdown) {
    markdown = processFencedElements(markdown);
    var codeStore = [];
    markdown = protectCode(markdown, codeStore);
    var slideIdx = 0;
    var parts = markdown.split(SLIDE_SEP);
    var out = parts.map(function (slideGroup) {
      var verticalParts = slideGroup.split(VERTICAL_SLIDE_SEP);
      return verticalParts.map(function (slide) {
        return processSlide(slide, slideIdx++);
      }).join('\n\n----\n\n');
    }).join('\n\n---\n\n');
    return restoreCode(out, codeStore);
  };

  /**
   * Post-render: turn standalone images with non-empty alt text into
   * <figure><img><figcaption>…</figcaption></figure>. Empty alt stays a
   * plain image. No numbering.
   *
   * We operate on the rendered DOM rather than in the preprocessor because
   * marked already produces the <p><img></p> wrapping that we need to
   * rewrite — and this keeps the transform available anywhere images
   * appear, including inside columns, rows, or boxes.
   */
  window.applyColloquiumFigureCaptions = function () {
    var paras = document.querySelectorAll('.reveal .slides p');
    Array.prototype.forEach.call(paras, function (p) {
      if (p.children.length !== 1) return;
      var img = p.firstElementChild;
      if (!img || img.tagName !== 'IMG') return;
      // Bail on <p><img> mixed with trailing whitespace text nodes if the
      // p carries extra visible content.
      var text = (p.textContent || '').trim();
      if (text) return; // any non-alt text → leave alone
      var alt = (img.getAttribute('alt') || '').trim();
      if (!alt) return; // empty alt → plain image, no caption

      var figure = document.createElement('figure');
      figure.className = 'colloquium-figure';
      // Copy preserving any attrs on the img.
      figure.appendChild(img);
      var cap = document.createElement('figcaption');
      cap.className = 'colloquium-figure-caption';
      cap.textContent = alt;
      figure.appendChild(cap);
      p.parentNode.replaceChild(figure, p);
    });
  };

  /**
   * Public: apply fragment classes after reveal builds the DOM. Call from
   * the .then() of Reveal.initialize().
   */
  window.applyColloquiumAnimations = function () {
    var sections = document.querySelectorAll('.reveal section[data-animate]');
    Array.prototype.forEach.call(sections, function (section) {
      var mode = section.getAttribute('data-animate');
      var targets = [];
      if (mode === 'bullets' || mode === 'items') {
        // Only direct <li>s of any top-level list — avoids tagging sub-bullets
        var lists = section.querySelectorAll(':scope > ul, :scope > ol');
        Array.prototype.forEach.call(lists, function (list) {
          var items = list.querySelectorAll(':scope > li');
          Array.prototype.forEach.call(items, function (li) {
            li.classList.add('fragment');
          });
        });
      } else if (mode === 'blocks') {
        targets = section.querySelectorAll(
          ':scope > p, :scope > ul, :scope > ol, :scope > pre, :scope > blockquote, :scope > table'
        );
        Array.prototype.forEach.call(targets, function (el) {
          el.classList.add('fragment');
        });
      }
    });
  };
})();
