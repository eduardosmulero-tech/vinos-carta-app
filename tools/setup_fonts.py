#!/usr/bin/env python3
"""Descarga el CSS de Cormorant Garamond y reescribe las URLs para usar archivos locales."""

from __future__ import annotations

import re
import urllib.request
from pathlib import Path

CSS_URL = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap"
OUT_DIR = Path("app/public/fonts")
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Descargar CSS
    req = urllib.request.Request(CSS_URL, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req) as response:
        css = response.read().decode("utf-8")

    # Descargar woff2 y reemplazar URLs
    urls = re.findall(r"url\((https://[^)]+\.woff2)\)", css)
    for url in urls:
        filename = url.split("/")[-1]
        out_path = OUT_DIR / filename
        if not out_path.exists():
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req) as response:
                out_path.write_bytes(response.read())
            print(f"Descargado {filename}")
        else:
            print(f"Ya existe {filename}")

    # Reemplazar URLs en el CSS por rutas locales
    def replace_url(match: re.Match) -> str:
        url = match.group(1)
        filename = url.split("/")[-1]
        return f"url({filename})"

    local_css = re.sub(r"url\((https://[^)]+\.woff2)\)", replace_url, css)

    # Escribir CSS local
    (OUT_DIR / "cormorant-garamond.css").write_text(local_css, encoding="utf-8")
    print(f"CSS local guardado en {OUT_DIR / 'cormorant-garamond.css'}")


if __name__ == "__main__":
    main()
