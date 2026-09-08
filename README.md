# Evidence Ledger — XiaoFan 的静态双语作品集

A static, bilingual (简体中文 / English) portfolio for an **LLM algorithm / Agent
engineering** candidate. The site is styled as an **evidence ledger** — a quiet
editorial research notebook that treats every project as a verifiable case:
Problem → Role & attribution → Mechanism → Validation → Trade-offs → Public
boundary.

Built with **Astro + TypeScript**, output is fully static (no server, no keys)
and deploys to **GitHub Pages** under any sub-path via a configurable `BASE_PATH`.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # local dev server → http://localhost:4321
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm run check      # type-check (astro check)
```

> Node 22+ recommended (the CI workflow uses Node 22).

## Routes

| Route | Content |
| --- | --- |
| `/` | Redirects to `/zh/` |
| `/zh/` `/en/` | Bilingual home pages |
| `/zh/projects/<slug>/` `/en/projects/<slug>/` | Project case pages |
| anything else | Bilingual 404 |

The **中 / EN** toggle in the header always switches to the equivalent route.

## Project structure

```
.
├── .github/workflows/deploy.yml   # GitHub Pages deployment (Node 22)
├── astro.config.mjs               # site/base/trailingSlash; reads BASE_PATH, SITE_URL
├── public/
│   ├── favicon.svg                # Evidence Ledger mark (pure SVG)
│   └── robots.txt
└── src/
    ├── data/site.ts               # ← ALL bilingual content lives here
    ├── lib/lang.ts                # base-aware route + language-switch helpers
    ├── styles/global.css          # design tokens, paper texture, components
    ├── layouts/BaseLayout.astro   # head/SEO, header, footer, ledger rail, progress
    ├── components/
    │   ├── Home.astro             # hero + work + approach + about + contact
    │   ├── ProjectPage.astro      # detail template (6 sections + disclosure)
    │   ├── Header / Footer / LedgerRail / HeroLedger / WorkCard / MiniMotif …
    │   └── diagrams/              # bilingual SVG/CSS mechanism figures
    └── pages/
        ├── index.astro            # root → /zh/
        ├── zh/ … /en/ …           # home pages
        ├── zh/projects/[slug]/ …  # project cases
        └── 404.astro              # lang-aware not-found
```

## Deploying to GitHub Pages

1. Push this repo to GitHub. The workflow deploys from `main` or `master`
   (use `main` for a new repository).
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The included workflow builds and deploys automatically on every push.

**BASE_PATH** — project sites are served from `https://<owner>.github.io/<repo-name>/`,
so asset and internal links must be prefixed with that path. The workflow computes
`BASE_PATH=/<repo-name>/` from the repo name automatically; locally, replicate it
with:

```bash
BASE_PATH=/<repo-name>/ npm run build
```

- For a **user/org site** (`<owner>.github.io`), set `BASE_PATH=/` (in
  `astro.config.mjs` the default is `/`; in the workflow, edit the Build step).
- **No custom domain is assumed.** If you add one, set `site` in
  `astro.config.mjs` (or the `SITE_URL` env var) to it.

## Editing content

Shared content lives in **`src/data/site.ts`**, with Project 01 details in **`src/data/agentCase.ts`**, both bilingual:

- **Global identity** — eyebrow / headline / intro / availability under `global`.
- **Navigation & sections** — `nav`, `sections`.
- **Approach principles** — `approach` (three items, bilingual).
- **About** — bio, role tags, publication note, links under `about`.
- **Projects** — `projects[]`. Each project has a `slug`, bilingual title /
  one-liner / tags / step labels, and a `detail` object with the six case
  sections. Adding a new project = add one entry here; the routes
  (`/zh/projects/<slug>/` and `/en/projects/<slug>/`) are generated
  automatically.
- **Diagram labels** — project `steps`, `tree`, and `memory` fields feed the
  SVG/CSS figures, so the diagrams stay in sync with the copy.

Page components only render this data — no copy is hardcoded in `.astro` files.

## Content sources

Project results are transcribed from the supplied resume and project records in
`src/data/site.ts` and `src/data/agentCase.ts`. Preserve metric scope: team delivery,
migration accuracy, query-category retrieval and overall few-shot retrieval are
separate measures. The reliability case has no resume metric; do not invent one.
The original resume PDF and private contact information are not website assets.

## Typography & assets

- All fonts are **self-hosted** via `@fontsource`: **Noto Sans SC** (Chinese),
  **IBM Plex Sans** (body), **IBM Plex Mono** (meta) — with robust local fallbacks
  (`Songti SC`, `SimSun`, `PingFang SC`, …). No runtime third-party requests.
- No raster images — all texture (dot grid, pinstripe paper) is CSS, and all
  figures are hand-authored, bilingual SVG / HTML.

## Accessibility

- Semantic landmarks, skip link, `lang` per page, visible `:focus-visible`
  outlines, 44px touch targets, keyboard-operable nav.
- `prefers-reduced-motion` disables reveal/pulse/transition motion.
- All diagrams ship with descriptive `aria-label`s plus visible captions.


## Projects and engineering notes

The homepage contains three projects: model iteration, semantic retrieval and the
teaching agent. Project navigation is driven by `projects` in `src/data/site.ts`.
Engineering notes are maintained separately in `src/data/notes.ts`, with bilingual
list and article routes under `/zh/notes/` and `/en/notes/`. The former reliability
project URL redirects to its note. Its current text preserves the existing brief;
a detailed root-cause account still needs the corresponding incident record.
