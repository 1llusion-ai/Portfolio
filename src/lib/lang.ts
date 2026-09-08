// Route/path helpers. All paths are BASE-aware so the site works under any
// GitHub Pages sub-path (BASE_PATH), not just a custom domain.
import type { Lang } from '../data/site';

const base = import.meta.env.BASE_URL; // '/' or '/portfolio/'

/** Path segments relative to the base, e.g. ['en','projects','x'] or ['zh']. */
function segments(pathname: string): string[] {
  const rel = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return rel.split('/').filter(Boolean);
}

export function pageLang(pathname: string): Lang {
  return segments(pathname)[0] === 'en' ? 'en' : 'zh';
}

/** Equivalent route in the other language ('/zh/…' ↔ '/en/…'). */
export function switchPath(pathname: string, to: Lang): string {
  const segs = segments(pathname);
  const rest = segs[0] === 'zh' || segs[0] === 'en' ? segs.slice(1) : segs;
  return base + [to, ...rest].join('/').replace(/\/+$/, '') + '/';
}

export function homePath(lang: Lang): string {
  return `${base}${lang}/`;
}

export function projectPath(lang: Lang, slug: string): string {
  return `${base}${lang}/projects/${slug}/`;
}

/** Section anchor on the given language's home page, e.g. '/zh/#work'. */
export function anchor(section: string, lang: Lang): string {
  return `${homePath(lang)}#${section}`;
}

export function notesPath(lang: Lang, slug = ""): string {
  return `${base}${lang}/notes/${slug ? slug + "/" : ""}`;
}
