#!/usr/bin/env python3
"""Descarga los archivos woff2 de Cormorant Garamond desde Google Fonts."""

from __future__ import annotations

import re
import urllib.request
from pathlib import Path

CSS_URL = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap"
OUT_DIR = Path("app/public/fonts")
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    req = urllib.request.Request(CSS_URL, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req) as response:
        css = response.read().decode("utf-8")

    urls = re.findall(r"url\((https://[^)]+\.woff2)\)", css)
    print(f"Encontradas {len(urls)} URLs de woff2")

    for url in urls:
        filename = url.split("/")[-1]
        out_path = OUT_DIR / filename
        if out_path.exists():
            print(f"Ya existe {filename}")
            continue
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req) as response:
            out_path.write_bytes(response.read())
        print(f"Descargado {filename}")

    print(f"\nFuentes guardadas en {OUT_DIR.resolve()}")


if __name__ == "__main__":
    main()
