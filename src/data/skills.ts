// Free Claude skills for the AI-Lab section. Each skill's page text lives in ./skills/<slug>.<lang>.json; the files
// people download live in public/ai-lab/.
import type { Lang } from '../i18n';
import ittoReadEn from './skills/ichimoku-itto-read.en.json';
import ittoReadTh from './skills/ichimoku-itto-read.th.json';

type Content = typeof ittoReadEn;

const SECTIONS = [
  { key: 'dash', name: 'Dashboard', jp: '一目瞭然' },
  { key: 'strip', name: 'State strip', jp: '状態' },
  { key: 'sides', name: 'Two sides', jp: '陽 · 陰' },
];
function reelFor(asset: string, command: string, preset: string, asof: string, file: string, heights: number[]) {
  return SECTIONS.map((sec, i) => ({
    asset,
    command,
    preset,
    asof,
    section: sec.name,
    jp: sec.jp,
    src: `/ai-lab/report-${file}-${sec.key}.webp`,
    width: 1200,
    height: heights[i],
  }));
}
export type ReelSlide = ReturnType<typeof reelFor>[number];

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
    guide: { href: '/ai-lab/ichimoku-itto-read-user-guide.pdf', cover: '/ai-lab/ichimoku-itto-read-guide-cover.jpg', pages: 9, sizeKB: 295 },
    /** Sample report sections the reel rotates through: price levels are cut out of every image. */
    reel: [
      ...reelFor('OANDA:XAUUSD', 'ichimoku-itto-read-en OANDA:XAUUSD full', 'Classic', '2026-10-23', 'xau', [749, 405, 392]),
      ...reelFor('BITSTAMP:BTCUSD', 'ichimoku-itto-read-en BITSTAMP:BTCUSD crypto full', 'Crypto', '2026-10-25', 'btc', [676, 405, 392]),
    ],
    content: { en: ittoReadEn, th: ittoReadTh } as Record<Lang, Content>,
  },
];

export const skillsIn = (lang: Lang) => SKILLS.map(({ content, ...meta }) => ({ ...meta, ...content[lang] }));
export type Skill = ReturnType<typeof skillsIn>[number];
