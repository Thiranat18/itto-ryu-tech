# Itto-Ryu Tech

Open-source Pine Script indicators by Itto-Ryu Tech, shown at **[ittoryutech.com](https://www.ittoryutech.com)**.

Owned and developed by Mr. Thiranat Ngamchitcharoen, Trader and Pine Script Developer.

> For education only. Nothing here is investment advice.

Indicator entries live in `src/data/indicators.ts`.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Stack: [Astro](https://astro.build), plain CSS (`src/styles/global.css`), self-hosted Shippori Mincho, Zen Kaku Gothic New, Noto Serif Thai and Noto Sans Thai font subsets.

Languages: English at the root (default) and Thai under `/th/`, built from the same pages in `src/pages/[...lang]/`. Interface copy is in `src/i18n/en.json` and `th.json`; Thai tool text is in `src/data/indicators.th.json` and `src/data/reference/th/`.

## License

- Website code: [MIT](LICENSE)
- Open-source indicators: Mozilla Public License 2.0 (as published on TradingView)
- Site text: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The logo and chart screenshots are not covered.
- Fonts in `public/fonts`: SIL Open Font License 1.1 (see the `OFL-*.txt` files)
