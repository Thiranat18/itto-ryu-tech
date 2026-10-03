export const TV_PROFILE = 'https://www.tradingview.com/u/Thiranat/';

export type Indicator = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  howItWorks: string;
  howToUse: string;
  access: 'Open-source' | 'Protected';
  url: string;
  image: string;
};

// Only scripts published publicly on TradingView. No test status or performance figures (owner's decision).
export const indicators: Indicator[] = [
  {
    slug: 'macd-trend-phase-mtf',
    name: 'MACD Trend Phase MTF',
    category: 'Trend',
    summary: 'Which phase of the trend, across three timeframes.',
    howItWorks:
      'Reads a PPO-normalised MACD on three timeframes. A slow timeframe sets the regime, a middle one defines the phase, and the chart timeframe tracks timing. The result is a named phase, a multi-timeframe dashboard and a weighted consensus. Because it works in percentages, it runs on any market.',
    howToUse:
      'Read the phase before anything else. Act only when the phase and your own plan agree; otherwise, wait.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/osxqVQak-MACD-Trend-Phase-MTF-by-Itto-Ryu/',
    image: '/indicators/osxqVQak.jpg',
  },
  {
    slug: 'ema-trend-dashboard',
    name: 'EMA Trend Dashboard',
    category: 'Trend',
    summary: 'Four trend stages from a five-EMA stack.',
    howItWorks:
      'Five exponential moving averages (10, 20, 50, 100, 200) and three derived readings, stack alignment, EMA 50 slope and the gap between fast and trend lines, place the market in one of four stages: Accel, Mature, Decel or Reversal. A 0–100 bull/bear score and a one-line verdict summarise it.',
    howToUse:
      'Use the stage as context for your own plan: early stages call for patience with a position, late stages for care.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/FvCmBVYO-EMA-Trend-Dash-Board-by-Itto-Ryu/',
    image: '/indicators/FvCmBVYO.jpg',
  },
  {
    slug: 'auto-swing-trade-setup',
    name: 'Auto Swing Trade Setup',
    category: 'Planning',
    summary: 'Rule-based entry zones, an ATR stop and R-multiple reference levels. Levels, not forecasts.',
    howItWorks:
      'From your chosen direction and inputs, it draws a primary and a secondary entry zone, an ATR-based stop, R-multiple reference levels and the lines where the idea would no longer hold. The levels are arithmetic, not predictions.',
    howToUse:
      'Decide your bias first, from your own analysis. The tool then draws the same levels the same way every time, so the plan is on the chart before the trade.',
    access: 'Protected',
    url: 'https://www.tradingview.com/script/VJLIg6Ir-Auto-Swing-Trade-Set-Up-v1-0-by-Itto-Ryu/',
    image: '/indicators/VJLIg6Ir.jpg',
  },
  {
    slug: 'esg-th-set50',
    name: 'ESG-TH SET50',
    category: 'Research',
    summary: 'Published sustainability data beside the chart.',
    howItWorks:
      "Shows a SET50 company's publicly announced sustainability profile, such as SET ESG Ratings and other published sources, in a small table in the corner of the chart.",
    howToUse:
      'Read it as background about the company, alongside price. It is context for study, not a trading signal.',
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/KLsQZB5i-ESG-TH-SET50-Itto-Ryu/',
    image: '/indicators/KLsQZB5i.jpg',
  },
];
