// Full settings and "Reading the states" for each tool page. One JSON file per tool in ./reference/, generated from
// the published script's input metadata on TradingView and checked line by line against its published Pine source.
export type Reference = {
  /** Published TradingView version the reference was checked against. */
  version: string;
  settings: { group: string; name: string; value: string; range: string; effect: string }[];
  states: {
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
  }[];
};

const files = import.meta.glob<Reference>('./reference/*.json', { eager: true, import: 'default' });

export function getReference(slug: string): Reference {
  const ref = files[`./reference/${slug}.json`];
  if (!ref) throw new Error(`No reference for ${slug}`);
  return ref;
}
