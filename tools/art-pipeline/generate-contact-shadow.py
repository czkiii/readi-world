#!/usr/bin/env python3
"""Generate the canonical soft Readi tree contact-shadow source."""

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    output = Path(args.output).resolve()
    if output.exists():
        raise SystemExit(f"Output exists; overwrite blocked: {output}")

    scale = 4
    width, height = 128, 64
    alpha = Image.new("L", (width * scale, height * scale), 0)
    draw = ImageDraw.Draw(alpha)

    def ellipse(box, fill):
        draw.ellipse(tuple(value * scale for value in box), fill=fill)

    ellipse((20, 24, 108, 46), 54)
    ellipse((26, 26, 102, 47), 66)
    ellipse((39, 29, 89, 47), 74)
    alpha = alpha.filter(ImageFilter.GaussianBlur(3 * scale))
    alpha = alpha.resize((width, height), Image.Resampling.LANCZOS)
    safe = Image.new("L", (width, height), 0)
    safe_draw = ImageDraw.Draw(safe)
    safe_draw.rectangle((16, 8, 112, 48), fill=255)
    alpha = Image.composite(alpha, Image.new("L", (width, height), 0), safe)
    alpha = alpha.point(lambda value: 0 if value < 2 else value)

    shadow = Image.new("RGBA", (width, height), (35, 42, 38, 0))
    shadow.putalpha(alpha)
    output.parent.mkdir(parents=True, exist_ok=True)
    shadow.save(output, "PNG", optimize=False)
    print("CONTACT SHADOW | 128x64 | pivot=64,48 | soft procedural alpha")


if __name__ == "__main__":
    main()
