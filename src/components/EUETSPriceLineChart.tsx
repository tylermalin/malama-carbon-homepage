"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Point = { date: string; price: number }; // date as ISO "YYYY-MM-DD"

export default function EUETSPriceLineChart({ data, height=240 }: { data: Point[]; height?: number }) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = ref.current.clientWidth;
    const margin = { top: 16, right: 24, bottom: 28, left: 44 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const parsed = data.map(d => ({ date: new Date(d.date), price: d.price }));
    const x = d3.scaleUtc()
      .domain(d3.extent(parsed, d => d.date) as [Date, Date])
      .range([0, w]);
    const y = d3.scaleLinear()
      .domain([0, d3.max(parsed, d => d.price)!]).nice()
      .range([h, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    g.append("g").attr("transform", `translate(0,${h})`).call(d3.axisBottom(x).ticks(6));
    g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `€${d}` as any));

    const line = d3.line<{date:Date; price:number}>().x(d => x(d.date)).y(d => y(d.price));
    g.append("path")
      .datum(parsed)
      .attr("fill", "none")
      .attr("stroke", "#111827")
      .attr("stroke-width", 2)
      .attr("d", line as any);

    // optional: highlight crash region example if supplied
  }, [data, height]);

  return (
    <div className="w-full rounded-2xl border p-3">
      <h3 className="font-semibold mb-2">EU ETS Price (example)</h3>
      <svg ref={ref} className="w-full" style={{ height }} role="img" aria-label="EU ETS price over time"/>
    </div>
  );
}
