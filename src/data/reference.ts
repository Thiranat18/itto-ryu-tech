// Full settings and "Reading the states" for each tool page. One JSON file per tool in ./reference/, generated from
// the published script's input metadata on TradingView and checked line by line against its published Pine source.
// ./reference/th/ holds the Thai text for the same rows, in the same order.
import type { Lang } from '../i18n';

type State = {
  /** Part of the screen the label appears in; the picker's first step. */
  section: string;
  /** The tool's own words or mark, exactly as it appears on the chart. */
  label: string;
  where: string;
  /** Neutral site wording: Uptrend, Downtrend, Sideways or chop, No reading... */
  reading: string;
  measures: string;
  /** Technical setup in neutral words; empty when the state has none. */
  setup: string;
  notMean: string;
  check: string;
};
export type Reference = {
  /** Published TradingView version the reference was checked against. */
  version: string;
  settings: { group: string; name: string; value: string; range: string; effect: string }[];
  states: State[];
};
type Translation = {
  settings: { name: string; range: string; effect: string }[];
  /** en: the English label, to keep the rows in step; label: what the Thai page shows. */
  states: (State & { en: string })[];
};

const files = import.meta.glob<Reference>('./reference/*.json', { eager: true, import: 'default' });
const thFiles = import.meta.glob<Translation>('./reference/th/*.json', { eager: true, import: 'default' });

const kindOf = (reading: string) =>
  /^uptrend or downtrend/i.test(reading)
    ? 'other'
    : /^(uptrend|leaning up|momentum turned up)/i.test(reading)
      ? 'up'
      : /^(downtrend|leaning down|momentum turned down)/i.test(reading)
        ? 'down'
        : /^(sideways|mixed)/i.test(reading)
          ? 'side'
          : 'other';

export function getReference(slug: string, lang: Lang = 'en') {
  const ref = files[`./reference/${slug}.json`];
  if (!ref) throw new Error(`No reference for ${slug}`);
  // Colour and the dashboard row qualifier come from the English text, so both languages match.
  const repeats = (s: State) =>
    ref.states.filter((t) => t.section === s.section && t.label === s.label).length > 1 || !/[A-Za-z0-9]/.test(s.label);
  const extra = ref.states.map((s) => ({
    kind: kindOf(s.reading),
    // When a label repeats in its section, or is only a symbol such as "—", the chip also names its dashboard row.
    row: repeats(s) ? s.where.split(', ').at(-1)!.replace(/ rows?$/, '') : '',
  }));
  if (lang === 'en') return { ...ref, states: ref.states.map((s, i) => ({ ...s, ...extra[i] })) };

  const th = thFiles[`./reference/th/${slug}.json`];
  if (
    !th ||
    th.settings.length !== ref.settings.length ||
    th.states.length !== ref.states.length ||
    th.settings.some((s, i) => s.name !== ref.settings[i].name) ||
    th.states.some((s, i) => s.en !== ref.states[i].label)
  )
    throw new Error(`Thai reference for ${slug} is missing or out of step with the English`);
  return {
    ...ref,
    settings: ref.settings.map((s, i) => ({ ...s, range: th.settings[i].range, effect: th.settings[i].effect })),
    states: th.states.map(({ en, ...s }, i) => ({ ...s, ...extra[i] })),
  };
}
