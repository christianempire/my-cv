# Context for Claude

Load-bearing notes that aren't obvious from the code. Read before changing
anything in this repo.

## Architecture decisions worth keeping

### PDF generation is content-driven, not paper-sized
[`scripts/generate-pdfs.mjs`](scripts/generate-pdfs.mjs) does **not** use
`format: 'A4'` or `format: 'Letter'`. Each PDF's paper dimensions are measured
live from `.cv` after Puppeteer renders the page — typically `920 × ~2100 px`.
This gives a single tall page, no clipping, no scaling, byte-for-byte mirror
of the live URL. Don't change it back to fixed page sizes without a strong
reason.

### Page chrome is stripped per-render
Before measuring `.cv` dimensions, the script injects an `addStyleTag` that
zeroes `.page`'s padding, gap, min-height, and background. Without it, body
height = `.cv` + 96px page padding, the bottom 96px overflows onto a second
PDF page, and the footer ends up alone on page 2. The injection is per-page
object and doesn't touch the live site.

### Live page has no `@media print` block
We deliberately removed all `@media print` rules. They used to clamp
`.cv { height: 100% !important }`, which collapsed the document to viewport
height and silently discarded the bottom ~500px of content. The PDF path
doesn't need print CSS — Puppeteer handles backgrounds via `printBackground:
true`. Don't reintroduce a print block.

### Toolbar is dev-only via `isDevMode()`
The Theme / Photo / Lang toggles in [`home.component.html`](src/app/home/home.component.html)
are wrapped in `*ngIf="isDev"`. Production builds (`ng build`, which is what
GitHub Pages serves) hide the toolbar entirely. URL params still work as
overrides in production. Don't add a Print button — the only path to PDFs is
`npm run pdf`.

### `.cv` is sized for a 920px design width
`.cv { width: 920px; min-height: 1306px }`. Content drives the actual
rendered height when it exceeds `min-height`. The footer pins to the bottom
via `margin-top: auto` on `.cv-foot` (works because `.cv` is `display: flex;
flex-direction: column`). Tune both width and min-height together if you
change the paper aspect ratio.

### Dates are live
`CAREER_START_YEAR = 2017` in [`home.component.ts`](src/app/home/home.component.ts).
The "9+ yrs" highlight, the "Updated: May 2026" footer, the per-role year
ranges and durations, the About paragraph — all derive from `new Date()` at
runtime. The CV ages itself. Don't hardcode years anywhere.

## Content policies

### Job titles are literal — never inflate
The header tagline says **Senior Full-Stack Developer** — that's Christian's
career-level positioning based on cumulative experience, and it's fine. But
individual role titles in the work-experience section must match what each
employer actually called him:

- Nubelity (current): **Full-Stack Developer** (literal title is "Developer
  Full Stack" — only the word order is normalized to English)
- Halo Media: **Software Engineer** (literal)
- Globant: **Semi-Senior .NET Developer** (literal — `Semi-Senior` is a real
  level in Globant's ladder and well-understood by recruiters who hire from
  LATAM)

Do not change these to "Senior X". Background checks and LinkedIn cross-
checks reveal title inflation immediately. Christian has chosen accuracy
over inflation.

### Numerical metrics in role bullets are realistic-but-needs-validation
Many metrics in the role bullets (`~20k daily users`, `~35% feature-build
time reduction`, `3.8s → 1.4s`, `~30% throughput`, etc.) were generated to
be plausible and defensible, but they're not invariant facts. Christian has
accepted them as-is for now. If he ever asks to adjust, change the numbers
in [`home.component.ts`](src/app/home/home.component.ts) freely. Don't ever
add fabricated metrics on top.

### PDFs are always light theme
The dark theme is for screen viewing only — the live URL toggle for design-
savvy reviewers. PDFs sent to recruiters are always light. Don't add a
dark-theme variant to [`scripts/generate-pdfs.mjs`](scripts/generate-pdfs.mjs).

### Photo policy is region-driven
- **photo=off** for US / UK / Canada / Australia (anti-bias norms, some ATS
  auto-flag CVs with photos)
- **photo=on** for LATAM / Spain (cultural expectation)

The three PDF variants in the script encode this. The naming convention
(`Christian_Changa_Senior_Full-Stack_Developer.pdf` for the no-photo EN, etc.)
matters for recruiter inbox findability — don't shorten.

## Anti-patterns — do not reintroduce

- Bootstrap or Bootstrap Icons (dropped, ~200 KB win)
- `@media print` overrides (cause height clamping)
- A `print()` method or Print button (single PDF path is `npm run pdf`)
- The `Width` toggle / `data-width='max'` rule (removed when toolbar went prod-hidden)
- `Density` / `data-density='compact'` (same)
- Scaling-based PDF fit (replaced by content-driven dimensions)
- Inflating role titles to "Senior" beyond the header tagline

## When in doubt

The live URL (`https://christianempire.github.io/my-cv/`) IS the artifact.
The three PDFs are exact renders of it under different `?lang` / `?photo`
flags. If the live page changes, the PDFs change. Treat the component as
single source of truth.
