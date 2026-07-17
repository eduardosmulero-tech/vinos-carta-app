#!/usr/bin/env python3
"""Analiza las imágenes extraídas del PDF para identificar posibles fotos de botella."""

from __future__ import annotations

import io
from pathlib import Path

from pypdf import PdfReader
from PIL import Image

PDF_PATH = Path("demo-data/DOSSIER_BODEGAS_ANDRADE.pdf")


def main() -> None:
    reader = PdfReader(PDF_PATH)
    candidates: list[tuple[int, int, int, int, str]] = []

    for page_idx, page in enumerate(reader.pages, start=1):
        if not page.images:
            continue
        for img_idx, image_file in enumerate(page.images, start=1):
            try:
                img = Image.open(io.BytesIO(image_file.data))
                w, h = img.size
                aspect = w / h
                # Botellas suelen ser verticales o cuadradas, no panorámicas
                if aspect < 1.5:
                    candidates.append((page_idx, img_idx, w, h, f"{aspect:.2f}"))
            except Exception as exc:  # noqa: BLE001
                print(f"Error p{page_idx} i{img_idx}: {exc}")

    print("Posibles fotos de botella (aspecto < 1.5):")
    for page_idx, img_idx, w, h, aspect in candidates:
        print(f"  page{page_idx:02d}_img{img_idx:02d}.webp | original {w}x{h} | aspect {aspect}")


if __name__ == "__main__":
    main()
