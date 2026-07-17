"""
cut_bottles.py — vinos-carta-app · F0 asset pipeline
Recorta botellas con fondo blanco -> alfa, resize a ~900px alto, exporta webp.
"""
import os
from pathlib import Path
from PIL import Image, ImageFilter

TARGET_HEIGHT = 900
FLOOD_THRESHOLD = 245
CROP_PADDING = 4
OUTPUT_DIR = Path("app/public/bottles")

MAPPING = {
    "Castillo de Andrade.png": "castillo-de-andrade",
    "Naranja Andrade.png": "naranja-andrade",
    "Niebla frizzante.png": "niebla",
    "Señorío de Andrade.png": "senorio-de-andrade",
    "sauci-blanco-joven.jpg": "blanco-seco-sauci",
    "sauci-blanco-semidulce.jpg": "blanco-semidulce-sauci",
    "sauci-tinto-crianza.jpg": "tinto-crianza-sauci",
    "fino-espinapura.jpg": "fino-espinapura",
    "fino-cruzado-espinapura.jpg": "fino-cruzado",
    "oloroso-riodiel-sauci.jpg": "oloroso-riodiel",
    "palo-cortado-sauci.jpg": "palo-cortado-sauci",
    "cream-sauci.jpg": "cream-sauci",
    "vino-dulce-sauci.jpg": "dulce-sauci",
    "vino-s-naranja-sauci.jpg": "vino-naranja-s-naranja",
    "s-vermouth-sauci.jpg": "vermut-s-vermouth",
}

DOSSIER_REPROCESS = [
    "fino-palmarejo",
    "docenanero-cream",
    "docenanero-oloroso",
    "pedro-ximenez-1985",
]

SRC_DIR_NEW = Path("demo-data/Imagenes aportadas por edu")
SRC_DIR_EXISTING = Path("app/public/bottles")


def flood_fill_alpha(img, threshold=FLOOD_THRESHOLD):
    """Convierte fondo blanco/casi blanco en transparente via flood-fill desde esquinas."""
    img = img.convert("RGBA")
    width, height = img.size
    pixels = img.load()
    visited = set()
    to_flood = []

    seeds = [
        (0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1),
        (width // 2, 0), (width // 2, height - 1),
        (0, height // 2), (width - 1, height // 2),
    ]

    for sx, sy in seeds:
        if (sx, sy) in visited:
            continue
        r, g, b, a = pixels[sx, sy]
        if a == 0:
            continue
        if r >= threshold and g >= threshold and b >= threshold:
            to_flood.append((sx, sy))

    while to_flood:
        x, y = to_flood.pop()
        if (x, y) in visited:
            continue
        if x < 0 or x >= width or y < 0 or y >= height:
            continue
        visited.add((x, y))
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        if r >= threshold and g >= threshold and b >= threshold:
            pixels[x, y] = (r, g, b, 0)
            to_flood.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    return img


def crop_to_content(img, padding=CROP_PADDING):
    """Recorta al bounding box del contenido no transparente."""
    bbox = img.getbbox()
    if bbox is None:
        return img
    left = max(0, bbox[0] - padding)
    top = max(0, bbox[1] - padding)
    right = min(img.width, bbox[2] + padding)
    bottom = min(img.height, bbox[3] + padding)
    return img.crop((left, top, right, bottom))


def clean_edges(img, feather=2):
    """Suaviza bordes en el canal alfa."""
    r, g, b, a = img.split()
    a = a.filter(ImageFilter.GaussianBlur(radius=feather * 0.5))
    return Image.merge("RGBA", (r, g, b, a))


def process_image(src_path, wine_id):
    """Procesa una imagen: alfa -> crop -> resize -> webp."""
    img = Image.open(src_path)
    has_alpha = img.mode == "RGBA"
    needs_flood = True

    if has_alpha:
        w, h = img.size
        corners = [
            img.getpixel((0, 0)),
            img.getpixel((w - 1, 0)),
            img.getpixel((0, h - 1)),
            img.getpixel((w - 1, h - 1)),
        ]
        transparent_corners = sum(1 for c in corners if len(c) == 4 and c[3] == 0)
        if transparent_corners >= 3:
            needs_flood = False
            print("  %s: ya tiene transparencia (%d/4 esquinas), saltando flood-fill" % (wine_id, transparent_corners))
    else:
        img = img.convert("RGBA")

    if needs_flood:
        img = flood_fill_alpha(img)
        print("  %s: flood-fill completado" % wine_id)

    img = crop_to_content(img)
    print("  %s: crop -> %s" % (wine_id, img.size))

    img = clean_edges(img)

    ratio = TARGET_HEIGHT / img.height
    new_width = int(img.width * ratio)
    img = img.resize((new_width, TARGET_HEIGHT), Image.LANCZOS)
    print("  %s: resize -> %s" % (wine_id, img.size))

    out_path = OUTPUT_DIR / ("%s.webp" % wine_id)
    img.save(out_path, "WEBP", quality=85, lossless=False)
    size_kb = os.path.getsize(out_path) / 1024
    print("  %s: exportado -> %s (%.1f KB)" % (wine_id, out_path.name, size_kb))


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    total = 0

    print("=== Procesando imagenes nuevas de Edu ===")
    for filename, wine_id in MAPPING.items():
        src = SRC_DIR_NEW / filename
        if not src.exists():
            print("  WARN %s no encontrado, saltando" % filename)
            continue
        print("\n%s -> %s:" % (filename, wine_id))
        try:
            process_image(src, wine_id)
            total += 1
        except Exception as e:
            print("  ERROR: %s" % e)

    print("\n=== Re-procesando webp del dosier ===")
    for wine_id in DOSSIER_REPROCESS:
        src = SRC_DIR_EXISTING / ("%s.webp" % wine_id)
        if not src.exists():
            print("  WARN %s.webp no encontrado, saltando" % wine_id)
            continue
        print("\n%s.webp -> %s:" % (wine_id, wine_id))
        try:
            process_image(src, wine_id)
            total += 1
        except Exception as e:
            print("  ERROR: %s" % e)

    print("\n=== Procesadas %d imagenes ===" % total)


if __name__ == "__main__":
    main()
