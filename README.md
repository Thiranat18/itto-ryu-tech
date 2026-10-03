# Itto-ryu Tech Dojo

An open-source trading-education site at **[ittoryutech.com](https://ittoryutech.com)**. It teaches with the Itto-ryu indicators on TradingView.
The site is in Thai, and it follows a dojo theme: you rank up from Kyu to Dan as you finish lessons.

> For education only. Nothing here is investment advice.

## Curriculum

| # | Rank | Lesson | Indicator |
|---|------|--------|-----------|
| 1 | 4 Kyu | Trend Phase | MACD Trend Phase MTF |
| 2 | 3 Kyu | Trade Plan | Auto Swing Trade Set Up |
| 3 | 2 Kyu | Pullback System | EMA + Ichimoku (S50) |
| 4 | 1 Kyu | Backtest & Edge | Case study v3.1.1 |

Each lesson has a short concept section, an interactive chart, a "take it or not?" quiz on a blinded chart, and a link to the indicator.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Stack: [Astro](https://astro.build), Tailwind CSS. Charts will use [TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts).

## License

- Code: [MIT](LICENSE)
- Lesson content (text, images): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
