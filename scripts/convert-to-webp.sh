#!/usr/bin/env bash
# convert-to-webp.sh
# Small helper to convert common images in the repo to WebP using cwebp (from libwebp) if available.
# Usage: ./scripts/convert-to-webp.sh
# It will convert .jpg/.jpeg/.png in the images/ folder to .webp alongside the originals.

#!/usr/bin/env bash
set -euo pipefail

IMG_DIR="$(cd "$(dirname "$0")/.." && pwd)/images"
if [ ! -d "$IMG_DIR" ]; then
  echo "Images directory not found: $IMG_DIR"
  exit 1
fi
# Check tools availability
if command -v magick >/dev/null 2>&1; then
  TOOL="magick"
  echo "Using ImageMagick (magick) for resizing and conversion"
elif command -v cwebp >/dev/null 2>&1; then
  TOOL="cwebp"
  echo "ImageMagick not found; falling back to cwebp (single-size WebP conversion)"
else
  echo "Neither ImageMagick 'magick' nor cwebp found in PATH. Please install one of them."
  echo "macOS: brew install imagemagick   or   brew install webp"
  exit 1
fi

# Responsive widths to generate (px)
WIDTHS=(480 800 1200 1600)

shopt -s nullglob
IFS=$'\n'       # handle spaces in filenames
for img in "$IMG_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  base="${img%.*}"
  ext="${img##*.}"
  filename="$(basename "$base")"
  echo "Processing: $img"
  # quick sanity check: ensure ImageMagick can read the file
  if ! magick identify "$img" >/dev/null 2>&1; then
    echo " - Skipping unreadable or unsupported file: $img"
    continue
  fi

  if [ "$TOOL" = "magick" ]; then
    for w in "${WIDTHS[@]}"; do
      out_resized="$IMG_DIR/${filename}-${w}.${ext}"
      out_webp="$IMG_DIR/${filename}-${w}.webp"
      echo " - creating resized image: $out_resized"
      magick "$img" -resize ${w}x "$out_resized"
      echo " - converting resized image to WebP: $out_webp"
      magick "$out_resized" -quality 80 "$out_webp"
    done
    # also create a full-size webp
    out_full="$IMG_DIR/${filename}.webp"
    echo " - creating full-size WebP: $out_full"
    magick "$img" -quality 80 "$out_full"
  else
    # cwebp fallback: create single webp (no resizing)
  out_webp="$IMG_DIR/${filename}.webp"
  echo " - creating WebP using cwebp: $out_webp"
  cwebp -q 80 "$img" -o "$out_webp"
  fi
done

echo "Conversion complete. WebP (and resized fallbacks if ImageMagick used) created in $IMG_DIR"

exit 0
