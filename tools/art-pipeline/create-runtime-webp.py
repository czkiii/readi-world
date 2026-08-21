#!/usr/bin/env python3
"""Create a lossless alpha-preserving WebP runtime candidate."""

import argparse
from pathlib import Path

from PIL import Image


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    source = Path(args.input).resolve()
    output = Path(args.output).resolve()
    if output.exists():
        raise SystemExit(f"Output exists; overwrite blocked: {output}")
    image = Image.open(source).convert("RGBA")
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, "WEBP", lossless=True, method=6, exact=True)
    print(f"WEBP | {image.width}x{image.height} | bytes={output.stat().st_size} | {output}")


if __name__ == "__main__":
    main()

