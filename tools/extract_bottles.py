#!/usr/bin/env python3
"""Extrae imágenes de botellas del dosier corporativo.

Uso:
    python tools/extract_bottles.py

Salida:
    app/public/bottles/  (imágenes webp de ~800px de alto)
"""

from __future__ import annotations

import io
import os
from pathlib import Path

from pypdf import PdfReader
from PIL import Image

PDF_PATH = Path("demo-data/DOSSIER_BODEGAS_ANDRADE.pdf")
OUT_DIR = Path("app/public/bottles")
TARGET_HEIGHT = 800
QUALITY = 80


def trim_white_background(img: Image.Image, threshold: int = 250) -> Image.Image:
    """Recorta los bordes blancos de una imagen RGBA/RGB."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    # Crear máscara: píxeles no blancos
    width, height = img.size
    pixels = img.load()
    assert pixels is not None

    left, top, right, bottom = width, height, 0, 0
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 0 and not (r >= threshold and g >= threshold and b >= threshold):
                left = min(left, x)
                top = min(top, y)
                right = max(right, x)
                bottom = max(bottom, y)

    if left >= right or top >= bottom:
        return img

    return img.crop((left, top, right + 1, bottom + 1))


def process_image(image: Image.Image) -> Image.Image:
    """Recorta fondo blanco y redimensiona a alto fijo."""
    trimmed = trim_white_background(image)
    # Fondo transparente para exportar a webp con fondo crema en la app
    w, h = trimmed.size
    ratio = TARGET_HEIGHT / h
    new_size = (max(1, int(w * ratio)), TARGET_HEIGHT)
    return trimmed.resize(new_size, Image.Resampling.LANCZOS)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(PDF_PATH)

    extracted: list[tuple[int, int, Image.Image]] = []
    for page_idx, page in enumerate(reader.pages, start=1):
        if not page.images:
            continue
        for img_idx, image_file in enumerate(page.images, start=1):
            try:
                img = Image.open(io.BytesIO(image_file.data))
                processed = process_image(img)
                extracted.append((page_idx, img_idx, processed))
                # Guardar con nombre descriptivo para inspección manual
                out_path = OUT_DIR / f"page{page_idx:02d}_img{img_idx:02d}.webp"
                processed.save(out_path, "WEBP", quality=QUALITY)
                print(f"Guardada {out_path} ({processed.size[0]}x{processed.size[1]})")
            except Exception as exc:  # noqa: BLE001
                print(f"Error en página {page_idx}, imagen {img_idx}: {exc}")

    print(f"\nTotal de imágenes extraídas: {len(extracted)}")
    print(f"Revisa {OUT_DIR.resolve()} y mapea cada foto a su id de vino.")


if __name__ == "__main__":
    main()
