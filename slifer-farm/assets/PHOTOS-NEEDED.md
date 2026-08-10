# Slifer Farm — three photos still needed

Everything on the site is finished and wired up. Three photo slots are waiting
on full-resolution files. Drop them in this folder with these **exact**
filenames and they appear automatically — no code changes, no rebuild.

| Filename          | Used for              | Ideal shot                                     | Size (px)  |
|-------------------|-----------------------|------------------------------------------------|------------|
| `farm-stand.jpg`  | Hero, top of homepage | **Vertical** shot of the stand, stocked        | 900 × 1125 |
| `about-farm.jpg`  | About section         | **Square** — hens in the yard, hives, family   | 800 × 800  |
| `og-image.jpg`    | Link previews / SEO   | **Wide** golden-hour shot of the stand or farm | 1200 × 630 |

Until the files exist, each slot shows the built-in SVG illustration instead.
An `onerror` handler removes the `<picture>` when the file is missing, so the
page never renders a broken-image icon.

## Why the existing photos could not be used

The 556 images now archived in `assets/originals/` are all **206 × 206 pixels** —
Facebook's profile-grid thumbnails, not the full-size uploads. The largest file
in the whole set is 206 × 206.

That is too small for these slots by a wide margin:

- Hero needs 900 × 1125 → a **4.4× upscale**
- OG image needs 1200 × 630 → a **5.8× upscale**, and every source frame is a
  centre-cropped square, so there is no landscape image area to crop from

Upscaling would put a soft, blocky photo where a sharp illustration is now.

## How to get the full-size versions

On **facebook.com/SliferFarm** or **instagram.com/sliferfarm**, open the photo
itself (click into the post — do not save from the grid), then right-click the
large version → *Save Image As*. Facebook typically serves these at 960–2048 px
on the long edge, which is plenty.

Pick one vertical, one square-croppable, and one wide shot.

Get the owner's permission before these go on the live site.

## Processing

Save the untouched files anywhere, then resize into place. With Python/Pillow
(already available, no install needed):

```python
from PIL import Image

def fit(src, dst, W, H, q):
    im = Image.open(src).convert('RGB')
    sc = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * sc), round(im.height * sc)), Image.LANCZOS)
    L, T = (im.width - W) // 2, (im.height - H) // 2
    im = im.crop((L, T, L + W, T + H))
    im.save(dst, quality=q, optimize=True, progressive=True)
    im.save(dst.replace('.jpg', '.webp'), quality=q, method=6)

fit('SOURCE-vertical.jpg', 'assets/farm-stand.jpg',  900, 1125, 80)
fit('SOURCE-square.jpg',   'assets/about-farm.jpg',  800,  800, 80)
fit('SOURCE-wide.jpg',     'assets/og-image.jpg',   1200,  630, 78)
```

Targets: under 250 KB each, under 150 KB for `og-image.jpg`. The script writes
the `.webp` twin automatically; the `<picture>` elements already reference both.

## Gallery photos

`gallery-01` … `gallery-20` (`.jpg` + `.webp`) are already built from the best
of the archived thumbnails, chosen by subject and image quality. They are
206 × 206, which is why `gallery.html` caps its tiles at ~260 px and its
lightbox at 420 px — at that size they look correct rather than soft.

If full-size versions of those same shots turn up, re-export them over the top
using the same filenames at 1200 px square and raise the caps in
`gallery.html`.

## Note on `assets/originals/`

That folder holds all 556 untouched source files as an archive. Nothing was
deleted. It is excluded from crawling in `robots.txt`, and it does not need to
be uploaded to the live host — it is roughly 7.7 MB of working material.
