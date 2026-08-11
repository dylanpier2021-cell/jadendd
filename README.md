# Jaden Shipley Website Services

Client websites. Each site lives in its own folder and is plain static
HTML, CSS and JavaScript with **no build step** — clone it, open the
`index.html`, and what you see is what deploys.

## Sites

| Folder | Client | Status |
|---|---|---|
| [`/`](.) | Slifer Farm — honor-system farm stand, Champaign, IL | Built, two items outstanding (see below) |

---

## slifer-farm

Five-page static site for a women-owned, self-serve farm stand at
1085 County Road 2200 N, Champaign, IL.

| Page | Purpose |
|---|---|
| `index.html` | Home — what they sell, how the honor system works, story, reviews, map |
| `whats-fresh.html` | Month-by-month seasonal availability |
| `visit.html` | Directions, hours, honor system, FAQ |
| `gifts.html` | Handmade gifts |
| `gallery.html` | 20-photo gallery with a vanilla-JS lightbox |

**Shared front end.** `assets/site.css` and `assets/site.js` are loaded by
every page; page-specific rules stay in a small `<style>` block on the page
that needs them. Editing a token in `site.css` changes all five pages.

**Design system.** Cream `#FAF6EF`, deep farm green `#2F5233`, honey gold
`#E8A93C`. Fraunces for headings, Inter for body, both from Google Fonts.
Curved SVG section dividers, `IntersectionObserver` scroll reveals, full
`prefers-reduced-motion` support.

**SEO.** Unique title and meta description per page (all under 160 chars),
canonicals, Open Graph and Twitter cards, `LocalBusiness`/`GroceryStore`
JSON-LD with verbatim review markup, `BreadcrumbList` on every subpage,
`FAQPage` on `visit.html`, `ImageGallery` on `gallery.html`, plus
`sitemap.xml` and `robots.txt`.

### Deploying

No build. Point any static host at the repository root. Vercel needs no
configuration: there is no framework and no build command, so it serves
`index.html` from the root directly.

Before it goes live, replace `https://sliferfarm.com/` with the real domain
in: every `<link rel="canonical">`, the `og:url` and `og:image` tags, the
JSON-LD `url`/`image`/`@id` fields, `sitemap.xml`, and `robots.txt`.

### Two things still outstanding

1. **Three photos.** The hero, About and social-share slots are wired as
   `<picture>` elements pointing at `assets/farm-stand.jpg`,
   `assets/about-farm.jpg` and `assets/og-image.jpg`. Those files do not
   exist yet, so an `onerror` handler removes the element and a built-in SVG
   illustration shows instead — the page never renders a broken image. Drop
   the real files in at the sizes listed in
   [`assets/PHOTOS-NEEDED.md`](assets/PHOTOS-NEEDED.md)
   and they appear automatically, no code change.

2. **Verify the 5.0 rating.** `aggregateRating` claims 5.0 across 44 Google
   reviews, and that figure also appears in three visible places. The public
   review feed shows the owner replying to one visitor with *"I'm sorry you
   didn't fully enjoy your visit"*, which implies at least one rating below
   five. Read the real average and count off the Google Business Profile
   before launch — overstated rating markup is the one thing here Google
   may actually penalize.

### Photo rights

The gallery images came from the farm's own Facebook and Instagram. Confirm
the owner's permission before this is served publicly.
