# Upnex Digital Agency — Website

Premium agency site built with React 19, TypeScript, Vite 7 and Tailwind CSS 4.

---

## Getting started

```bash
npm install     # required: the previous node_modules was Windows-only
npm run dev     # local dev server at http://localhost:5173
npm run build   # typecheck + production build into dist/
npm run preview # preview the production build locally
```

Deploy the contents of `dist/` to any static host (Netlify, Vercel, cPanel,
Cloudflare Pages). No server-side code is required.

---

## Brand

The primary brand colour is **#2B3D70**. It is defined once, as CSS custom
properties in `src/index.css`, alongside a full tonal ramp:

| Token         | Value     | Used for                                   |
|---------------|-----------|--------------------------------------------|
| `--brand-900` | `#16203D` | deepest shadow tone                         |
| `--brand-800` | `#1F2D54` | dark fills                                  |
| `--brand-700` | `#2B3D70` | **primary** — buttons, gradients, fills     |
| `--brand-600` | `#354A88` | button gradient top                         |
| `--brand-500` | `#4359A3` | gradient partner, icon tiles                |
| `--brand-400` | `#5D78C4` | hover borders                               |
| `--brand-300` | `#8AA2E0` | accent text, links, icons on dark surfaces  |
| `--brand-200` | `#B4C4EE` | headline gradient highlight                 |

To re-theme the entire site, change these values in one place — every
component reads from them.

Surfaces (`--surface-0` … `--surface-3`) are navy-tinted neutrals rather than
pure black, so the brand colour reads through the whole page.

### Logo

`public/logo.png` ships with a **transparent background** (the original white
background was removed and the artwork cropped to the mark).

Two variants are provided, which is standard brand practice:

- `logo.png` — navy artwork. Use on light backgrounds; also the favicon source.
- `logo-light.png` — near-white artwork. Used in the navbar, footer, loading
  screen and contact card, because navy on a near-black surface is unreadable.

`favicon.png` (64px) and `apple-touch-icon.png` (180px) are generated from the
same source.

---

## Project structure

```
public/            static assets served from the site root
src/
  App.tsx          page composition + code splitting
  index.css        design system: tokens, utilities, animations
  components/
    SmartImage.tsx resilient <img> wrapper (lazy + fallback)
    Hero.tsx       hero with optimised particle canvas
    ...            one file per section
  utils/cn.ts      Tailwind class merge helper
```

---

## Performance notes

Changes made over the original build, and why:

**Images — 10.7 MB → 1.4 MB (−89%)**
Source PNGs were up to 2.2 MB each at ~1900px wide. Resized to sensible
display widths and re-encoded as progressive JPEG at quality 82.

**Code splitting**
`vite-plugin-singlefile` was removed. It inlined all JS and CSS into a single
543 KB `index.html`, which meant no browser caching and no lazy loading — every
visitor re-downloaded everything on every visit. The build now emits hashed,
separately cacheable chunks, with vendor code (React, Framer Motion, icons)
split from site code so a content change does not invalidate the framework.

Everything below the fold is loaded with `React.lazy`, so the hero paints
before the remaining ~100 KB of section code is fetched.

**Hero canvas**
Particle count now scales to viewport area (18–52 instead of a fixed 80) and
drops further on touch devices. Link-distance checks use squared distance to
avoid a `sqrt` per pair. Device pixel ratio is capped at 2×. The animation
pauses entirely when the hero scrolls off-screen or the tab is backgrounded.

**Scroll handling**
The progress bar and back-to-top button previously fired React state updates on
every scroll event. Both are now throttled with `requestAnimationFrame`, and the
progress bar writes a CSS `transform` directly to the DOM — a compositor-only
operation that triggers no layout and no re-render.

**Rendering**
Below-the-fold sections use `content-visibility: auto`, so the browser skips
layout and paint for offscreen content. All imagery lazy-loads with
`decoding="async"` and explicit dimensions to prevent layout shift.

**Accessibility**
`prefers-reduced-motion` is honoured throughout: animations collapse, the
particle canvas renders a single static frame, and the loading screen shortens
to 300 ms.

**Dependencies**
Removed four packages that were installed but never imported: `gsap`, `lenis`,
`@emailjs/browser` and `react-hot-toast`.

---

## Bug fixes carried out during the rebrand

Eight image paths in the original code did not match any file on disk, so those
sections rendered as empty boxes:

| Referenced in code   | Actual file on disk | Now         |
|----------------------|---------------------|-------------|
| `/portfoli 2.jpg`    | `portfoli 2.png`    | `/portfolio-2.jpg` |
| `/portfolio 3.jpg`   | `portfolio 3.png`   | `/portfolio-3.jpg` |
| `/portfolio 4.jpg`   | `portfolio 4.png`   | `/portfolio-4.jpg` |
| `/portfolio 5.jpg`   | `portfolio 5.png`   | `/portfolio-5.jpg` |
| `/portfolio-1.png`   | `portfolio-1.png`   | `/portfolio-1.jpg` |
| `/10 seo.png`        | `10-seo.png`        | `/blog-seo.jpg` |
| `/AI Marketing.png`  | `AI-Marketing.png`  | `/blog-ai-marketing.jpg` |
| `/Paid Ads.png`      | `Paid-Ads.png`      | `/blog-paid-ads.jpg` |

All asset filenames are now lowercase kebab-case with no spaces. As a safety
net, `SmartImage` swaps in a branded inline-SVG placeholder if any image ever
fails to load again.

Also fixed:

- Two back-to-top buttons were rendering at once (one in `App.tsx`, one in
  `Footer.tsx`). The footer duplicate was removed.
- The back-to-top button had a red shadow (`rgba(200,0,0,0.3)`) left over from
  an earlier edit. Now brand navy.
- The hero badge advertised "Est. 2018" while the About timeline began in 2022.
  Aligned to 2022.
- Blog posts 3 and 4 shared the same image. Post 4 now has its own.
- Grammar: "is a elite" → "is an elite" in the About section.

---

## Content still to update

Placeholder content inherited from the original template that you will want to
replace with real Upnex material:

- **Testimonials** (`src/components/Testimonials.tsx`) — six fictional clients.
- **Portfolio case studies** (`src/components/Portfolio.tsx`) — names, metrics
  and results text.
- **Statistics** — "500+ projects", "120+ clients", "98% satisfaction" appear in
  `Hero.tsx`, `VideoSection.tsx` and `Testimonials.tsx`.
- **Blog posts** (`src/components/Blog.tsx`) — four sample articles.
- **Trusted-by logos** (`src/components/TrustedBy.tsx`) — invented company names.
- **Pricing** (`src/components/Pricing.tsx`) — plan tiers reference $999 and
  $2,499 price points in the FAQ.
- **Social URLs** — currently `instagram.com/upnexagency`,
  `tiktok.com/@upnexagency`, `linkedin.com/in/upnexagency`. Point these at your
  real profiles.
- **Domain** — `upnexagency.com` is used in the canonical tag, Open Graph tags
  and schema markup in `index.html`.

### Contact form

`src/components/Contact.tsx` currently simulates submission with a 2-second
delay and does not send anything. Wire it to a real endpoint (Formspree, Resend,
EmailJS or your own API) inside `handleSubmit` before going live.

### AI chat widget

`src/components/AIChatWidget.tsx` uses keyword pattern matching, not a real
language model. Captured leads are dropped rather than stored — connect it to
your CRM or an email endpoint where the comment marks the handoff point.
