import { z } from "zod";

export const seriesPoint = z.object({ t: z.string().min(8), v: z.number() });
export const series = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  unit: z.string().optional(),
  points: z.array(seriesPoint).min(1),
});
export const kpi = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  value: z.string().min(1),
  note: z.string().optional(),
});
export const citation = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  publisher: z.string().optional(),
  date: z.string().optional(),
  url: z.string().url().optional(),
  note: z.string().optional(),
});
export const marketData = z.object({
  generated_at: z.string().optional(),
  kpis: z.array(kpi),
  series: z.array(series),
  refs: z.array(citation),
});
export type MarketDataSchema = z.infer<typeof marketData>;
