export const TV_PROFILE = 'https://www.tradingview.com/u/Thiranat/';

export type Indicator = {
  name: string;
  kanji: string;
  category: string;
  summary: string;
  tags: string[];
  access: 'Open-source' | 'Protected';
  url: string;
  image: string;
};

// Only scripts that are published publicly on TradingView.
export const indicators: Indicator[] = [
  {
    name: 'MACD Trend Phase MTF',
    kanji: '相',
    category: 'Trend',
    summary:
      'Answers "where are we in the trend lifecycle?" A PPO-normalised MACD across three timeframes gives a phase name, a multi-timeframe dashboard and a weighted consensus verdict.',
    tags: ['Multi-timeframe', 'PPO', 'Any market'],
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/osxqVQak-MACD-Trend-Phase-MTF-by-Itto-Ryu/',
    image: '/indicators/osxqVQak.jpg',
  },
  {
    name: 'EMA Trend Dash Board',
    kanji: '流',
    category: 'Trend',
    summary:
      'Classifies the trend into four stages (Accel, Mature, Decel, Reversal) from a 10/20/50/100/200 EMA stack, with a 0–100 bull/bear score and a one-line verdict.',
    tags: ['EMA', 'Dashboard', 'Trend stage'],
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/FvCmBVYO-EMA-Trend-Dash-Board-by-Itto-Ryu/',
    image: '/indicators/FvCmBVYO.jpg',
  },
  {
    name: 'Auto Swing Trade Set Up',
    kanji: '構',
    category: 'Trade planning',
    summary:
      'For swing traders who already have a directional bias: draws entry zones, an ATR-based stop loss, TP1 / TP2, thesis-flip levels and the R:R ratio on the chart.',
    tags: ['ATR', 'Risk management', 'Swing'],
    access: 'Protected',
    url: 'https://www.tradingview.com/script/VJLIg6Ir-Auto-Swing-Trade-Set-Up-v1-0-by-Itto-Ryu/',
    image: '/indicators/VJLIg6Ir.jpg',
  },
  {
    name: 'ESG-TH SET50',
    kanji: '徳',
    category: 'Research',
    summary:
      "Puts a SET50 stock's published sustainability profile (SET ESG Ratings, Thai IOD, S&P Global, SBTi) in the corner of the chart, for academic and educational use.",
    tags: ['SET50', 'ESG', 'Thailand'],
    access: 'Open-source',
    url: 'https://www.tradingview.com/script/KLsQZB5i-ESG-TH-SET50-Itto-Ryu/',
    image: '/indicators/KLsQZB5i.jpg',
  },
];
