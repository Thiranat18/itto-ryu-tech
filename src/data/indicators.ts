export type Indicator = {
  name: string;
  kanji: string;
  category: string;
  summary: string;
  tags: string[];
  /** Public TradingView script URL; null until confirmed published. */
  url: string | null;
};

// DRAFT: candidates from the saved-script list. Confirm which are public and add their URLs.
export const indicators: Indicator[] = [
  {
    name: 'Trade Navigator',
    kanji: '導',
    category: 'Trade planning',
    summary:
      'Chop filter, multi-timeframe bias and a full trade plan (zones, stop, targets) in one dashboard, with a MACD timing row.',
    tags: ['Multi-timeframe', 'Dashboard', 'Trade plan'],
    url: null,
  },
  {
    name: 'MACD Trend Phase MTF',
    kanji: '相',
    category: 'Trend',
    summary:
      'Reads the trend phase on Daily / 4H / 1H with a PPO state machine, so you know which phase the market is in before you look for entries.',
    tags: ['Multi-timeframe', 'MACD / PPO'],
    url: null,
  },
  {
    name: 'Auto Swing Trade Set Up',
    kanji: '構',
    category: 'Trade planning',
    summary:
      'Draws entry, ATR-based stop loss, risk:reward and TP1 / TP2 levels automatically for swing setups.',
    tags: ['ATR', 'Risk management'],
    url: null,
  },
  {
    name: 'Swing Reversal Matrix',
    kanji: '転',
    category: 'Reversal',
    summary: 'Multi-timeframe stochastic matrix that flags swing-reversal conditions across timeframes at a glance.',
    tags: ['Multi-timeframe', 'Stochastic'],
    url: null,
  },
  {
    name: 'Chop Zone Detector',
    kanji: '静',
    category: 'Regime',
    summary: 'Marks sideways, choppy conditions so trend signals can be skipped when the market has no direction.',
    tags: ['Regime filter'],
    url: null,
  },
  {
    name: 'Ichimoku Trend Dashboard',
    kanji: '雲',
    category: 'Trend',
    summary: 'Summarises Ichimoku trend conditions in a compact table instead of reading every line on the chart.',
    tags: ['Ichimoku', 'Dashboard'],
    url: null,
  },
  {
    name: 'EMA Trend Dashboard',
    kanji: '流',
    category: 'Trend',
    summary: 'EMA stack and slope status across timeframes in one table.',
    tags: ['EMA', 'Dashboard'],
    url: null,
  },
  {
    name: 'ESG-TH SET50',
    kanji: '徳',
    category: 'Fundamentals',
    summary: 'Shows SET ESG ratings and related sustainability data for SET50 stocks directly on the chart.',
    tags: ['SET50', 'ESG'],
    url: null,
  },
];
