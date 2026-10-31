// Free Claude skills for the AI-Lab section. Each skill's page text lives in ./skills/<slug>.<lang>.json; the files
// people download live in public/ai-lab/.
import type { Lang } from '../i18n';
import ittoReadEn from './skills/ichimoku-itto-read.en.json';
import ittoReadTh from './skills/ichimoku-itto-read.th.json';
import astrReadEn from './skills/autostruct-read.en.json';
import astrReadTh from './skills/autostruct-read.th.json';

type IttoContent = typeof ittoReadEn;
type AstrContent = typeof astrReadEn;

interface Section {
  key: string;
  name: string;
  jp: string;
}
const ITTO_SECTIONS: Section[] = [
  { key: 'dash', name: 'Dashboard', jp: '一目瞭然' },
  { key: 'strip', name: 'State strip', jp: '状態' },
  { key: 'sides', name: 'Two sides', jp: '陽 · 陰' },
];
const ASTR_SECTIONS: Section[] = [
  { key: 'snap', name: 'Structure snapshot', jp: '一覧' },
  { key: 'map', name: 'Structure map', jp: '構造' },
  { key: 'sides', name: 'Both sides', jp: '陽 · 陰' },
];
/** `file` is the middle part of /ai-lab/report-<file>-<section>.webp; `heights` follow the sections' order. */
function reelFor(sections: Section[], asset: string, command: string, preset: string, asof: string, file: string, heights: number[], tf = '1D') {
  return sections.map((sec, i) => ({
    asset,
    command,
    preset,
    asof,
    tf,
    section: sec.name,
    jp: sec.jp,
    src: `/ai-lab/report-${file}-${sec.key}.webp`,
    width: 1200,
    height: heights[i],
  }));
}
export type ReelSlide = ReturnType<typeof reelFor>[number];

interface Guide {
  href: string;
  cover: string;
  pages: number;
  sizeKB: number;
}

const SKILLS = [
  {
    slug: 'ichimoku-itto-read',
    command: 'ichimoku-itto-read-en',
    version: '0.3.3',
    released: '2026-10-27',
    licence: 'MPL-2.0',
    /** The indicator the skill reads, by its /tools slug. */
    companion: 'ichimoku-itto',
    zip: { href: '/ai-lab/ichimoku-itto-read-en.zip', sizeKB: 49 },
    guide: { href: '/ai-lab/ichimoku-itto-read-user-guide.pdf', cover: '/ai-lab/ichimoku-itto-read-guide-cover.jpg', pages: 9, sizeKB: 295 } as Guide | undefined,
    /** Sample report sections the reel rotates through: price levels are cut out of every image. */
    reel: [
      ...reelFor(ITTO_SECTIONS, 'OANDA:XAUUSD', 'ichimoku-itto-read-en OANDA:XAUUSD full', 'Classic', '2026-10-23', 'xau', [749, 405, 392]),
      ...reelFor(ITTO_SECTIONS, 'BITSTAMP:BTCUSD', 'ichimoku-itto-read-en BITSTAMP:BTCUSD crypto full', 'Crypto', '2026-10-25', 'btc', [676, 405, 392]),
    ],
    content: { en: ittoReadEn, th: ittoReadTh } as Record<Lang, IttoContent | AstrContent>,
  },
  {
    slug: 'autostruct-read',
    command: 'autostruct-read-en',
    version: '0.2',
    released: '2026-10-31',
    licence: 'MPL-2.0',
    companion: 'auto-market-structure-liquidity',
    zip: { href: '/ai-lab/autostruct-read-en.zip', sizeKB: 38 },
    /** No PDF guide yet: the page itself is the manual. */
    guide: undefined as Guide | undefined,
    reel: [
      ...reelFor(ASTR_SECTIONS, 'OANDA:XAUUSD', 'autostruct-read-en OANDA:XAUUSD', 'Swing 2.0 × ATR', '2026-10-31', 'astr-xau', [226, 673, 244]),
      ...reelFor(ASTR_SECTIONS, 'BITSTAMP:BTCUSD', 'autostruct-read-en BITSTAMP:BTCUSD', 'Swing 2.0 × ATR', '2026-10-31', 'astr-btc', [226, 673, 244]),
    ],
    content: { en: astrReadEn, th: astrReadTh } as Record<Lang, IttoContent | AstrContent>,
  },
];

export const skillsIn = (lang: Lang) => SKILLS.map(({ content, ...meta }) => ({ ...meta, ...content[lang] }));
export type Skill = ReturnType<typeof skillsIn>[number];
