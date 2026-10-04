// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ittoryutech.com',
  vite: {
    // Keep classic min-/max-width media queries (range syntax needs Safari 16.4+).
    build: { cssTarget: ['chrome100', 'edge100', 'firefox100', 'safari15', 'ios15'] },
  },
});
