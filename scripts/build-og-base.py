#!/usr/bin/env python3
"""Render the shared base for dynamic OG cards.

The base has the RC logo + "Relaxed Constraints" wordmark baked in;
Hugo's images.Text then overlays the per-page title at build time.

Run whenever the logo or brand wordmark changes:
    python3 scripts/build-og-base.py
"""

import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parent.parent
FONT = REPO / "themes/relcon-theme/assets/fonts/InterTight.ttf"
LOGO_SVG = REPO / "themes/relcon-theme/static/images/relcon-logo-L07.svg"
OUT = REPO / "themes/relcon-theme/assets/images/og-base.png"

W, H = 1200, 630
BG = "#F4F4F6"
INK = "#111114"
ACCENT = "#FF634A"

LOGO_H = 56
MARGIN_X = 80
MARGIN_Y = 80
WORDMARK_GAP = 18
WORDMARK_SIZE = 36
WORDMARK_WEIGHT = 600


def rasterize_logo(height: int) -> Image.Image:
    """Rasterize the L07 mark into a PNG the given height; swap the two
    fills to the OG palette (ink near-black, accent coral) on the fly."""
    svg = LOGO_SVG.read_text()
    # The L07 SVG uses fill="currentColor" for ink and var(...) for accent.
    # rsvg-convert won't resolve either — pre-bake explicit fills.
    svg = svg.replace('fill="currentColor"', f'fill="{INK}"')
    svg = svg.replace(
        'fill="var(--c-accent, var(--r-accent, #b8421e))"',
        f'fill="{ACCENT}"',
    )
    result = subprocess.run(
        ["rsvg-convert", "--height", str(height)],
        input=svg.encode(),
        capture_output=True,
        check=True,
    )
    from io import BytesIO
    return Image.open(BytesIO(result.stdout)).convert("RGBA")


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    img = Image.new("RGBA", (W, H), BG)

    # Logo
    logo = rasterize_logo(LOGO_H)
    img.paste(logo, (MARGIN_X, MARGIN_Y), logo)

    # Wordmark: Inter Tight SemiBold-ish (variation axis wght=600)
    font = ImageFont.truetype(str(FONT), size=WORDMARK_SIZE)
    font.set_variation_by_axes([WORDMARK_WEIGHT])

    draw = ImageDraw.Draw(img)
    text_x = MARGIN_X + logo.width + WORDMARK_GAP
    # Center the wordmark on the logo's cap-height.
    ascent, descent = font.getmetrics()
    text_y = MARGIN_Y + (LOGO_H - ascent) // 2 + 4  # nudge baseline
    draw.text((text_x, text_y), "Relaxed Constraints", fill=INK, font=font)

    img.convert("RGB").save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT.relative_to(REPO)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
