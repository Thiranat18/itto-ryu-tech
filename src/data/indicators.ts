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
  legend?: { swatch: 'zone' | 'zone2' | 'stop' | 'r'; label: string }[];
};

// Only scripts published publicly on TradingView. No test status or performance figures (owner's decision).
export const indicators: Indicator[] = [
  {
    slug: 'macd-trend-phase-mtf',
    name: 'MACD Trend Phase MTF',
    tvTitle: 'MACD Trend Phase MTF by [Itto Ryu]',
    category: 'Trend',
    summary: 'Which phase of the trend, across three timeframes.',
    howItWorks:
      'Reads a PPO-normalised MACD on three timeframes. A slow timeframe sets the regime, a middle one defines the phase, and the chart timeframe tracks timing. The result is a named phase, a multi-timeframe dashboard and a weighted consensus. Because it is measured in percentages, the same settings can be read on any symbol.',
    howToUse:
      'Read the phase first, as context for your own analysis. What you do with it is your own decision.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/osxqVQak-MACD-Trend-Phase-MTF-by-Itto-Ryu/',
    image: '/indicators/osxqVQak.jpg',
    imageWidth: 960,
    imageHeight: 516,
  },
  {
    slug: 'ema-trend-dashboard',
    name: 'EMA Trend Dashboard',
    tvTitle: 'EMA Trend Dash Board by [Itto Ryu]',
    category: 'Trend',
    summary: 'Four trend stages from a five-EMA stack.',
    howItWorks:
      'Five exponential moving averages (10, 20, 50, 100, 200) are read three ways: how well they stack, the slope of the 50, and the gap between the fast and trend lines. Together these place the market in one of four stages: Accel, Mature, Decel, or a fourth stage where the stack has broken. A 0–100 bull/bear score and a one-line label summarise the reading.',
    howToUse:
      'Use the stage as context for your own analysis. It describes where a trend is in its life, not what to do about it.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/FvCmBVYO-EMA-Trend-Dash-Board-by-Itto-Ryu/',
    image: '/indicators/FvCmBVYO.jpg',
    imageWidth: 960,
    imageHeight: 516,
  },
  {
    slug: 'auto-swing-trade-setup',
    name: 'Auto Swing Trade Setup',
    tvTitle: 'Auto Swing Trade Set Up v1.0 by [Itto-Ryu]',
    category: 'Planning',
    summary: 'Rule-based entry zones, an ATR stop and R-multiple reference levels. Levels, not forecasts.',
    howItWorks:
      'From your chosen direction and inputs, it draws a primary and a secondary entry zone, an ATR-based stop, R-multiple reference levels and the lines where the idea would no longer hold. The levels are arithmetic, not predictions.',
    howToUse:
      'Decide your bias first, from your own analysis. The tool then draws the same levels the same way every time, so the plan is on the chart before the trade.',
    access: 'Protected',
    url: 'https://www.tradingview.com/script/VJLIg6Ir-Auto-Swing-Trade-Set-Up-v1-0-by-Itto-Ryu/',
    image: '/indicators/VJLIg6Ir.jpg',
    imageWidth: 960,
    imageHeight: 799,
    legend: [
      { swatch: 'zone', label: 'Primary entry zone' },
      { swatch: 'zone2', label: 'Secondary entry zone' },
      { swatch: 'stop', label: 'ATR stop' },
      { swatch: 'r', label: '1R, 2R and 3R reference levels' },
    ],
  },
  {
    slug: 'esg-th-set50',
    name: 'ESG-TH SET50',
    tvTitle: 'ESG-TH SET50 [Itto-Ryu]',
    category: 'Research',
    summary: 'Published sustainability data beside the chart.',
    howItWorks:
      "Shows a SET50 company's published sustainability data (SET ESG Ratings, Thai IOD CG scores, the S&P Global Sustainability Yearbook and SBTi climate targets) in a small table in the corner of the chart. Values are reproduced as each source published them.",
    howToUse:
      'Read it as background about the company, alongside price. It is context for study, not a trading signal.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/KLsQZB5i-ESG-TH-SET50-Itto-Ryu/',
    image: '/indicators/KLsQZB5i.jpg',
    imageWidth: 960,
    imageHeight: 516,
  },
];
