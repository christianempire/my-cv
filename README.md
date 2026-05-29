# Christian Changa — CV

Live: <https://christianempire.github.io/my-cv/>
Repo: <https://github.com/christianempire/my-cv>

A bilingual (EN / ES), theme-aware (light / dark), print-optimized personal CV
built as a single Angular 19 page. Source of truth for both the live URL and
the PDFs sent to recruiters.

## Quick start

```bash
npm install
npm start           # dev server with toolbar (theme / photo / lang)
npm run build       # production build → dist/my-cv/browser
npm run pdf         # build + generate three recruiter-ready PDFs
```

`npm start` is the only mode where the in-page toolbar is visible — it's
gated behind Angular's `isDevMode()`, so production builds present a clean,
chromeless document. URL params (`?theme=dark`, `?photo=off`, `?lang=ES`)
work in both modes.

## Generate recruiter-ready PDFs

```bash
npm run pdf
```

Builds the project and writes three recruiter-targeted PDF variants to `pdf/`:

| File | Audience | Variant |
| --- | --- | --- |
| `Christian_Changa_Senior_Full-Stack_Developer.pdf` | US / UK / Canada / Australia | EN · light · no photo |
| `Christian_Changa_Senior_Full-Stack_Developer_LATAM.pdf` | LATAM staff agencies hiring for US clients | EN · light · with photo |
| `Christian_Changa_Desarrollador_Full-Stack_Senior.pdf` | LATAM direct apps + Spain | ES · light · with photo |

Each PDF is a single tall page whose paper dimensions are measured live from
the `.cv` element (typically `920 × ~2100` px) — no A4/Letter fit, no scaling,
no clipping. Recruiters viewing on screen scroll a single document instead of
paginating.

The convention (filenames, query params, region rules) lives at the top of
[`scripts/generate-pdfs.mjs`](scripts/generate-pdfs.mjs). To add a fourth
variant, append one entry to the `VARIANTS` array. Requires Google Chrome
at the default Windows path or `CHROME_PATH` env var to override.

## Tech

- Angular 19 standalone components, no Bootstrap.
- SCSS with theme tokens (`--paper`, `--ink`, `--accent`, …) flipped via
  `[data-theme]` on the `.cv` element.
- Three-font system: Source Serif 4 (display) · IBM Plex Sans (body) ·
  JetBrains Mono (labels & dates).
- All dates and years-of-experience derived live from
  `CAREER_START_YEAR = 2017` + `new Date()` — the CV ages itself.
- Open Graph meta + 1200×630 hero image in [`public/og-image.png`](public/og-image.png).
- Deployed to GitHub Pages from the `dist/` build.

## URL params

| Param | Values | Default | Notes |
| --- | --- | --- | --- |
| `lang` | `EN`, `ES` | `EN` | Swaps every string in `home.component.ts` and the `Intl.DateTimeFormat` locale. |
| `theme` | `light`, `dark` | `light` | Light is the recruiter default; dark is the bonus for design-savvy viewers. |
| `photo` | `on`, `off` | `on` | Strip photo for US / UK / CA / AU outbound where anti-bias norms apply. |

## Project structure

```
src/app/home/        # the single CV component (data + template + styles wiring)
src/styles.scss      # all design tokens, theme variants, layout, responsive
public/favicon.svg   # cc badge — same accent color as the CV
public/og-image.png  # social card (regenerated via headless Chrome from .svg source)
scripts/generate-pdfs.mjs   # builds + writes the three PDF variants
pdf/                 # generated artifacts (gitignored)
```
