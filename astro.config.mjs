// @ts-check
import { defineConfig } from 'astro/config';

// BASE_PATH controls the deploy sub-path. GitHub Pages project sites serve the
// repo at a sub-path like /<repo-name>/, so you set BASE_PATH to that name:
//   BASE_PATH=/my-repo/ npm run build     (PowerShell: $env:BASE_PATH='/my-repo/')
// For a user/org site (owner.github.io) leave it unset (defaults to '/').
//
// Normalized defensively: trimmed, leading/trailing slashes normalized, and any
// stray Windows drive prefix stripped, so a malformed value can never produce a
// silently broken relative base.
const rawBase = (process.env.BASE_PATH || '/').trim();
const cleaned = rawBase
  .replace(/^[a-zA-Z]:[\\/]/, '')
  .replace(/^\/+|\/+$/g, '')
  .split('/')
  .filter(Boolean)
  .join('/');
const base = cleaned ? `/${cleaned}/` : '/';

// SITE_URL is the origin used for canonical/OG URLs (no custom domain assumed).
const site = process.env.SITE_URL || 'https://1llusion-ai.github.io';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
