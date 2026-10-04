// Two languages: English at the site root (the default) and Thai under /th/. Interface and page copy live in
// en.json and th.json; tool text lives next to the tool data (indicators.th.json, reference/th/).
import en from './en.json';
import th from './th.json';

export const LANGS = ['en', 'th'] as const;
export type Lang = (typeof LANGS)[number];

const ui = { en, th };

// Fail the build when one language has a key, array item or value type the other does not.
const shape = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(shape)
    : v && typeof v === 'object'
      ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, shape((v as Record<string, unknown>)[k])]))
      : typeof v;
if (JSON.stringify(shape(en)) !== JSON.stringify(shape(th))) throw new Error('en.json and th.json differ in shape');

export const t = (lang: Lang) => ui[lang];

/** A tool's category or licence in the given language; the English value stays the filter key. */
export const label = (lang: Lang, group: 'categories' | 'access', value: string) =>
  (ui[lang].labels[group] as Record<string, string>)[value] ?? value;

/** The [...lang] route param: undefined for English at the root, 'th' for /th/. */
export const langParam = (lang: Lang) => (lang === 'en' ? undefined : lang);

export const langOf = (path: string): Lang => (/^\/th(\/|$)/.test(path) ? 'th' : 'en');

/** A site path in the given language: '/tools' becomes '/th/tools'. */
export const localize = (lang: Lang, path: string) => (lang === 'en' ? path : path === '/' ? '/th' : `/th${path}`);

/** The current page in the given language. */
export const pageIn = (lang: Lang, path: string) => localize(lang, path.replace(/^\/th(?=\/|$)/, '') || '/');

/** Fills {name} placeholders. */
export const fill = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key]));

/** "4 Oct 2026" in English, "4 ต.ค. 2569" (Buddhist Era) in Thai. */
export const formatDate = (lang: Lang, iso: string) =>
  new Date(iso).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
