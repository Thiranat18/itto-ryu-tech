import type { Lang } from '../i18n';
import thText from './indicators.th.json';

export const TV_PROFILE = 'https://www.tradingview.com/u/Thiranat/';

export type Indicator = {
  slug: string;
  name: string;
  /** Title as it appears on TradingView (legacy titles are locked). */
  tvTitle: string;
  category: string;
  summary: string;
  howItWorks: string;
  howToUse: string;
  access: 'Open-source' | 'Protected';
  url: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  /** "What it draws" legend on the detail page, taken from the tool's own description. */
  legend?: { swatch: 'zone' | 'zone2' | 'stop' | 'r' | 'flip'; label: string }[];
  /** Date the guide was last checked against the published script (YYYY-MM-DD). */
  tended: string;
  /** Field guide: input titles and defaults exactly as in the TradingView settings dialog. */
  settings: { name: string; value: string; effect: string }[];
  notDo: string[];
  /** Questions worth asking: three at launch, later only real questions from TradingView. */
  questions: { q: string; a: string }[];
};

// Only scripts published publicly on TradingView. No test status or performance figures (owner's decision).
export const indicators: Indicator[] = [
  {
    slug: 'macd-trend-phase-mtf',
    name: 'MACD Trend Phase MTF',
    tvTitle: 'MACD Trend Phase MTF by [Itto Ryu]',
    category: 'Trend',
    summary: 'Which phase of the trend, across several timeframes.',
    howItWorks:
      'Reads a PPO-normalised MACD on several timeframes. A slow timeframe sets the regime, a middle one defines the phase that tints the pane, and the chart timeframe tracks timing. A table lists the phase on four grid timeframes and weighs them into one consensus reading, MAJOR. Because it is measured in percentages, the same settings can be used on any instrument.',
    howToUse:
      'Read the phase first, as context for your own analysis. What you do with it is your own decision.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/osxqVQak-MACD-Trend-Phase-MTF-by-Itto-Ryu/',
    image: '/indicators/osxqVQak.jpg',
    imageWidth: 960,
    imageHeight: 516,
    tended: '2026-10-04',
    settings: [
      {
        name: 'Phase TF (mid)',
        value: '4 hours',
        effect: 'Timeframe whose phase sets the background colour and triangles',
      },
      { name: 'Regime TF (slow)', value: '1 day', effect: 'Slow layer, only its side of zero is used' },
      { name: 'Chop threshold (|PPO| %)', value: '0.1', effect: 'PPO size below which a timeframe reads CHOP' },
      { name: 'Phase confirm bars', value: '2', effect: 'Chart bars a new phase must hold before changing' },
      { name: 'Major bias threshold (%)', value: '20', effect: 'Net score needed before MAJOR stops reading MIXED' },
      {
        name: 'Show timing signals on price chart',
        value: 'On',
        effect: 'Shows or hides the triangles on the price chart',
      },
    ],
    notDo: [
      'It does not place orders or know your position. Triangles and table dots are readings, not instructions.',
      'It does not forecast. A phase describes current MACD momentum, not where price goes next.',
      'It does not give a probability. The MAJOR percentage is a weighted vote across four timeframes.',
    ],
    questions: [
      {
        q: 'When does a triangle appear on the price chart?',
        a: 'Only while the phase on Phase TF (mid) is BULL PB or BEAR RALLY, and the chart timeframe histogram turns back towards the trend. It marks that momentum turn, and it can change until the chart bar closes.',
      },
      {
        q: 'What does the percentage in the MAJOR row mean?',
        a: 'It is a weighted vote. Each grid timeframe scores its phase, higher timeframes count for more by default, and the net is shown as a percentage. By default, under 20% either way reads MIXED, from 20% LEAN BULL or LEAN BEAR, from 50% BULL or BEAR.',
      },
      {
        q: 'Why does the table tell me to view a lower timeframe?',
        a: 'The phase is set on Phase TF (mid), 4 hours by default. When the chart timeframe is equal to or above it, a warning row appears. The layout expects a chart below that timeframe, for example 1 hour.',
      },
    ],
  },
  {
    slug: 'ema-trend-dashboard',
    name: 'EMA Trend Dashboard',
    tvTitle: 'EMA Trend Dash Board by [Itto Ryu]',
    category: 'Trend',
    summary: 'Four trend stages from a five-EMA stack.',
    howItWorks:
      'Five exponential moving averages (10, 20, 50, 100, 200) are read for how well they stack and whether the gap between the 10 and the 50 is widening or narrowing. That places the market in one of four stages: Accel, Mature, Decel, or a broken stack, split by whether the earlier side still leads and how strongly. Up and down scores out of 100, EMA slopes, pullback and cross rows, and up to three higher timeframes add context, and a one-line verdict sums up the reading.',
    howToUse:
      'Use the stage as context for your own analysis, together with the higher-timeframe rows. It describes where a trend is in its life, not what to do about it.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/FvCmBVYO-EMA-Trend-Dash-Board-by-Itto-Ryu/',
    image: '/indicators/FvCmBVYO.jpg',
    imageWidth: 960,
    imageHeight: 516,
    tended: '2026-10-04',
    settings: [
      { name: 'EMA 3 (Trend)', value: '50', effect: 'Trend EMA behind the slope, gap and extension rows' },
      { name: 'Slope/Gap Lookback (bars)', value: '5', effect: 'Bars back for slope, gap change and score delta' },
      {
        name: 'Gap Momentum Threshold (%)',
        value: '0.05',
        effect: 'Gap change that separates Accel, Mature and Decel',
      },
      { name: 'Use closed HTF bars only', value: 'On', effect: 'Higher timeframe rows use only closed bars' },
      {
        name: 'Pullback: max bars from EMA2 touch to trigger',
        value: '5',
        effect: 'Bars allowed between an EMA 2 touch and a trigger',
      },
      {
        name: 'Extension Warning (ATR from Trend EMA)',
        value: '2',
        effect: 'ATR distance from the trend EMA that shows EXTENDED',
      },
    ],
    notDo: [
      'It does not know your position. HOLD, TRIM and EXIT label the stage, not your trade.',
      'It does not place orders. SIGNAL, VERDICT and chart markers are readings of the EMAs and scores.',
      'It does not forecast. Stages and scores describe the EMAs as they stand now.',
    ],
    questions: [
      {
        q: 'Why does the SIGNAL row say STRONG SHORT?',
        a: 'SIGNAL reads the bull and bear scores. STRONG SHORT means a bear score of 80 or more, with faster EMAs below slower ones in at least three of four pairs. VERDICT adds the stage: STRONG SETUP SHORT, or EASE SHORT at 3 DECEL.',
      },
      {
        q: 'What does the ENTRY TIMING section show?',
        a: 'Pullback shows TRIGGER when price touches the 20 EMA in an aligned stack, then closes back past the 10. Two cross rows count bars since the 10×20 and 50×200 crosses. X-Price is the close at which the 10 and 20 EMAs would meet next bar.',
      },
      {
        q: 'Why does an MTF row show n/a?',
        a: "Each row only reads a timeframe above your chart's. With the defaults of 1 hour, 4 hours and 1 day, a 1 hour chart shows n/a on the TF 60 row, and a daily chart shows n/a for all three. Unticking a row shows “off”.",
      },
    ],
  },
  {
    slug: 'auto-swing-trade-setup',
    name: 'Auto Swing Trade Setup',
    tvTitle: 'Auto Swing Trade Set Up v1.0 by [Itto-Ryu]',
    category: 'Planning',
    summary: 'Rule-based entry zones, an ATR stop and R-multiple reference levels. Levels, not forecasts.',
    howItWorks:
      'From your chosen direction, it sets a mid line from the 20-period averages, held close to price. Around it, it draws a primary and a secondary entry zone, an ATR-based stop, R-multiple reference levels and two flip lines, all redrawn from the latest close. The levels are arithmetic, not predictions.',
    howToUse:
      'Decide your bias first, from your own analysis. The tool then applies the same arithmetic every time. The levels are redrawn from the latest close on every update, live bar included, so they show where the rules sit now, not a plan fixed in advance.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/VJLIg6Ir-Auto-Swing-Trade-Set-Up-v1-0-by-Itto-Ryu/',
    image: '/indicators/VJLIg6Ir.jpg',
    imageWidth: 960,
    imageHeight: 799,
    tended: '2026-10-04',
    settings: [
      { name: 'Direction', value: 'Long', effect: 'Side every zone, stop and level is drawn for' },
      { name: 'SL = ATR x', value: '1.5', effect: 'Stop distance from the entry midpoint, in ATR' },
      { name: 'TP1 R:R', value: '1.5', effect: 'First reference level, as a multiple of the risk' },
      { name: 'TP2 R:R', value: '2.5', effect: 'Second reference level, as a multiple of the risk' },
      { name: 'Flip = ATR x', value: '2', effect: 'ATR distance of the flip line not tied to the stop' },
      { name: 'Zone 1 width (ATR x)', value: '0.3', effect: 'Depth of the primary entry zone, in ATR' },
    ],
    notDo: [
      'It does not choose a direction. You set the bias.',
      'It does not forecast price. The levels are arithmetic from your inputs (ATR,\u00a0R).',
      'It does not know your position or place orders. Switching Direction does not close a trade.',
    ],
    questions: [
      {
        q: 'Why does the badge say LONG before I have decided anything?',
        a: 'The badge repeats the Direction setting, which is Long by default. It is not a reading of the market, and the R:R figures beside it come from your settings. Set Direction to Short and every zone, stop and level is redrawn for that side.',
      },
      {
        q: 'How are the entry zones placed?',
        a: 'For Long the midpoint is the higher of the fast EMA and the Bollinger basis, both 20 periods by default. For Short it is the lower. It then keeps the midpoint within a set ATR distance of the close, and both zones are measured from it.',
      },
      {
        q: 'Why have the zones moved since I made my plan?',
        a: 'The levels recompute live on each bar from the current close, EMA, Bollinger basis and ATR. The tool keeps no record of the bar where you made your plan, so the drawn levels can move away from the ones you noted.',
      },
    ],
    legend: [
      { swatch: 'zone', label: 'Primary entry zone' },
      { swatch: 'zone2', label: 'Secondary entry zone' },
      { swatch: 'stop', label: 'ATR stop' },
      { swatch: 'r', label: 'Two R-multiple reference levels, 1.5R and 2.5R by default' },
      { swatch: 'flip', label: 'Long and short flip lines' },
    ],
  },
  {
    slug: 'esg-th-set50',
    name: 'ESG-TH SET50',
    tvTitle: 'ESG-TH SET50 [Itto-Ryu]',
    category: 'Research',
    summary: 'Published sustainability data beside the chart.',
    howItWorks:
      "Shows a SET50 company's published sustainability data (SET ESG Ratings, Thai IOD CG scores, the S&P Global Sustainability Yearbook and SBTi climate targets) in a small table in the corner of the chart, and tints the chart background by ESG grade. Grades and scores are stored, not live, and are reproduced as each source published them.",
    howToUse:
      'Read it as background about the company, alongside price. It is context for study, not a trading signal.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/KLsQZB5i-ESG-TH-SET50-Itto-Ryu/',
    image: '/indicators/KLsQZB5i.jpg',
    imageWidth: 960,
    imageHeight: 516,
    tended: '2026-10-04',
    settings: [
      { name: 'Show table', value: 'On', effect: 'Shows or hides the table; the tint can stay' },
      { name: 'Background tint by grade', value: 'On', effect: 'Colours the chart background by the SET ESG grade' },
      { name: 'Language', value: 'EN', effect: 'Sets summary language and CE or Buddhist Era years' },
      { name: 'Table position', value: 'top_right', effect: 'Chooses which chart corner holds the table' },
      { name: 'Text size', value: 'small', effect: 'Sets the table font size: tiny, small or normal' },
    ],
    notDo: [
      'It does not give buy or sell signals or alerts. It shows published data beside price.',
      'It does not fetch new data. The data is a snapshot until the script is updated.',
      'It does not rate companies itself. Grades and scores come from the published sources.',
    ],
    questions: [
      {
        q: 'Why does the table show NR?',
        a: 'NR means the company has no grade in the latest SET ESG Ratings round. That can happen for eligibility reasons, not only low scores. A SET stock the tool does not cover also shows NR, because its data is not in this build.',
      },
      {
        q: 'How current is the data?',
        a: "It is a snapshot of each source's published data, built into the script. It changes only when the script is updated. The Source row shows the ratings announcement date, and the Valid until row shows how long the current ratings stay in use.",
      },
      {
        q: 'What do the markers in the History row mean?',
        a: 'The History row lists the grades from the last three SET ESG Ratings rounds, oldest first. The marker after them compares the latest grade with the year before: up, down or same. NR counts as the lowest step.',
      },
    ],
  },
];

type Text = Pick<Indicator, 'summary' | 'howItWorks' | 'howToUse' | 'notDo' | 'questions'> & {
  /** The effect of each setting, in order; names and values stay as in TradingView. */
  settings: string[];
  legend: string[];
};
const translations: Record<string, Text> = thText;

/** The indicators with their guide text in the given language. Names, titles, settings and values stay as published. */
export function indicatorsIn(lang: Lang): Indicator[] {
  if (lang === 'en') return indicators;
  return indicators.map((t) => {
    const x = translations[t.slug];
    if (
      !x ||
      x.settings.length !== t.settings.length ||
      x.notDo.length !== t.notDo.length ||
      x.questions.length !== t.questions.length ||
      x.legend.length !== (t.legend?.length ?? 0)
    )
      throw new Error(`Thai text for ${t.slug} is missing or out of step with indicators.ts`);
    return {
      ...t,
      summary: x.summary,
      howItWorks: x.howItWorks,
      howToUse: x.howToUse,
      settings: t.settings.map((s, i) => ({ ...s, effect: x.settings[i] })),
      notDo: x.notDo,
      questions: x.questions,
      legend: t.legend?.map((item, i) => ({ ...item, label: x.legend[i] })),
    };
  });
}
