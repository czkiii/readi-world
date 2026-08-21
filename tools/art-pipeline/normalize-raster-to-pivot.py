#!/usr/bin/env python3
"""Create a deterministic transparent normalized raster around an exact pivot."""

import argparse
from pathlib import Path

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--canvas-width", type=int, required=True)
    parser.add_argument("--canvas-height", type=int, required=True)
    parser.add_argument("--visible-max-width", type=int, required=True)
    parser.add_argument("--visible-max-height", type=int, required=True)
    parser.add_argument("--pivot-x", type=int, required=True)
    parser.add_argument("--pivot-y", type=int, required=True)
    args = parser.parse_args()

    source_path = Path(args.input).resolve()
    output_path = Path(args.output).resolve()
    if output_path.exists():
        raise SystemExit(f"Output exists; overwrite blocked: {output_path}")

    source = Image.open(source_path).convert("RGBA")
    bounds = source.getchannel("A").getbbox()
    if bounds is None:
        raise SystemExit("Input has no visible alpha pixels")
    source = source.crop(bounds)

    scale = min(
        args.visible_max_width / source.width,
        args.visible_max_height / source.height,
    )
    width = max(1, round(source.width * scale))
    height = max(1, round(source.height * scale))
    resized = source.resize((width, height), Image.Resampling.LANCZOS)

    left = round(args.pivot_x - (width / 2))
    top = args.pivot_y - height
    if left < 0 or top < 0 or left + width > args.canvas_width or top + height > args.canvas_height:
        raise SystemExit("Normalized subject does not fit the requested canvas and pivot")

    canvas = Image.new("RGBA", (args.canvas_width, args.canvas_height), (0, 0, 0, 0))
    canvas.alpha_composite(resized, (left, top))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path, format="PNG", optimize=False)
    print(
        f"NORMALIZED | canvas={args.canvas_width}x{args.canvas_height} "
        f"visible={width}x{height} offset={left},{top} pivot={args.pivot_x},{args.pivot_y}"
    )


if __name__ == "__main__":
    main()

