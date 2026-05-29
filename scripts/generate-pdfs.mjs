/**
 * generate-pdfs.mjs
 * Generates the three recruiter-ready CV PDFs from the latest build:
 *
 *   1. Christian_Changa_Senior_Full-Stack_Developer.pdf
 *      EN · light · NO photo
 *      → US / UK / Canada / Australia direct applications.
 *      Anti-bias norms in those markets prefer no photo, and some
 *      ATS auto-flag CVs that have one. Always send this version
 *      for cold outreach to those regions.
 *
 *   2. Christian_Changa_Senior_Full-Stack_Developer_LATAM.pdf
 *      EN · light · with photo
 *      → LATAM staff agencies that hire for US clients (Globant,
 *      Encora, BairesDev, etc.). Their internal recruiters are
 *      LATAM-based and culturally expect a photo, but the role
 *      itself is English-speaking, so the document is EN.
 *
 *   3. Christian_Changa_Desarrollador_Full-Stack_Senior.pdf
 *      ES · light · with photo
 *      → LATAM direct applications (Peru, Argentina, Mexico,
 *      Colombia, Chile, Spain). Photo expected, Spanish required.
 *
 * Theme is ALWAYS light for outbound PDFs — dark prints with
 * full-bleed backgrounds, which is rude to recruiters' printers
 * and reads as "off-brand" in conservative industries. Send the
 * dark variant only as a live URL to design-savvy audiences.
 *
 * Page sizing: each PDF is generated at the live page's actual
 * .cv dimensions (typically 920 × ~2100 px depending on language and
 * photo state). The PDF is a single tall page — no A4/Letter fit,
 * no scaling, no clipping. This makes the PDF byte-for-byte mirror
 * the live page, and recruiters viewing on screen scroll a single
 * document instead of paginating.
 *
 * Run:
 *   npm run pdf
 *
 * Output:
 *   pdf/*.pdf
 *
 * Requirements:
 *   - Project built (chained via "npm run pdf").
 *   - Google Chrome installed at the default OS path, or override
 *     via CHROME_PATH env var.
 *   - puppeteer-core (devDependency, no Chromium download).
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const DEFAULT_CHROME = process.platform === 'win32'
  ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  : process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome';
const CHROME = process.env.CHROME_PATH ?? DEFAULT_CHROME;
const PORT = 4422;
const DIST = resolve('dist/my-cv/browser');
const OUT_DIR = resolve('pdf');

const VARIANTS = [
  {
    name: 'Christian_Changa_Senior_Full-Stack_Developer.pdf',
    query: 'lang=EN&theme=light&photo=off',
    purpose: 'US / UK / Canada / Australia — English, no photo',
  },
  {
    name: 'Christian_Changa_Senior_Full-Stack_Developer_LATAM.pdf',
    query: 'lang=EN&theme=light&photo=on',
    purpose: 'LATAM staff agencies for US clients — English with photo',
  },
  {
    name: 'Christian_Changa_Desarrollador_Full-Stack_Senior.pdf',
    query: 'lang=ES&theme=light&photo=on',
    purpose: 'LATAM direct apps + Spain — Spanish with photo',
  },
];

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.txt': 'text/plain',
};

if (!existsSync(DIST)) {
  console.error(`✘ Missing build at ${DIST}. Run "npm run build" first.`);
  process.exit(1);
}
if (!existsSync(CHROME)) {
  console.error(`✘ Chrome not found at ${CHROME}. Set CHROME_PATH env var to override.`);
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const safePath = urlPath === '/' ? '/index.html' : urlPath;
    const filePath = join(DIST, safePath);
    if (!filePath.startsWith(DIST)) {
      res.writeHead(403);
      return res.end();
    }
    if (!existsSync(filePath)) {
      const body = readFileSync(join(DIST, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(body);
    }
    const body = readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
    });
    res.end(body);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
console.log(`▸ Serving ${DIST} at http://127.0.0.1:${PORT}`);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});

try {
  for (const v of VARIANTS) {
    const url = `http://127.0.0.1:${PORT}/?${v.query}`;
    const out = join(OUT_DIR, v.name);

    const page = await browser.newPage();
    // Viewport must comfortably contain the 920px .cv before layout
    // measurements — Puppeteer's default 800×600 is narrower than
    // the document and collapses the flex layout to min-height.
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('print');

    // Strip the .page chrome (background, padding, gap, min-height)
    // so .cv starts at body (0,0) and body height === .cv height.
    // Without this, the 32 + 64 px page padding pushes content
    // taller than the paper and the footer paginates onto page 2.
    await page.addStyleTag({
      content: `
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
        }
        .page {
          padding: 0 !important;
          gap: 0 !important;
          min-height: 0 !important;
          background: transparent !important;
        }
      `,
    });

    // Give fonts + computed styles a beat to settle.
    await new Promise((r) => setTimeout(r, 300));

    // Measure the live .cv at print-media-emulated size — that's
    // the document we want the PDF to contain, exactly.
    const dims = await page.evaluate(() => {
      const r = document.querySelector('.cv').getBoundingClientRect();
      return { width: Math.ceil(r.width), height: Math.ceil(r.height) };
    });

    console.log(`▸ ${v.name}`);
    console.log(`  ${v.purpose}  ·  ${dims.width}×${dims.height} px`);

    await page.pdf({
      path: out,
      width: `${dims.width}px`,
      height: `${dims.height}px`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: false,
    });
    await page.close();

    console.log(`  ✓ ${out}\n`);
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`Done. ${VARIANTS.length} PDFs written to ${OUT_DIR}/.`);
