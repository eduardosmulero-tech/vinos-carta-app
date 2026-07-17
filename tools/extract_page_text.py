#!/usr/bin/env python3
"""Extrae el texto de cada página del PDF para identificar qué vino aparece en cada una."""

from __future__ import annotations

from pathlib import Path
from pypdf import PdfReader

PDF_PATH = Path("demo-data/DOSSIER_BODEGAS_ANDRADE.pdf")


def main() -> None:
    reader = PdfReader(PDF_PATH)
    for page_idx, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        # Mostrar primeras líneas
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        preview = " | ".join(lines[:5])
        print(f"--- Página {page_idx} ---")
        print(preview[:200])
        print()


if __name__ == "__main__":
    main()
