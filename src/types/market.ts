export type KPI = { key: string; label: string; value: string; note?: string };
export type SeriesPoint = { t: string; v: number };           // ISO date, numeric value
export type Series = { key: string; label: string; unit?: string; points: SeriesPoint[] };
export type Citation = { id: string; title: string; publisher?: string; date?: string; url?: string; note?: string };

export type MarketData = {
  generated_at?: string;  // ISO datetime
  kpis: KPI[];
  series: Series[];
  refs: Citation[];
};
