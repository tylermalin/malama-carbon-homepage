"use client";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

type Props = {
  before: { src: string; label?: string; };
  after:  { src: string; label?: string; };
  height?: number;
};

export default function BeforeAfterSlider({ before, after, height=320 }: Props) {
  const [v, setV] = useState<number[]>([50]);
  return (
    <div className="relative overflow-hidden rounded-2xl border" style={{ height }}>
      <img src={before.src} alt={before.label || "Before"} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ width: `${v[0]}%` }}>
        <img src={after.src} alt={after.label || "After"} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-x-0 bottom-3 mx-3 bg-white/80 rounded-xl px-3 py-1 text-xs flex justify-between">
        <span>{before.label || "Before"}</span><span>{after.label || "After"}</span>
      </div>
      <div className="absolute inset-x-6 bottom-10">
        <Slider.Root className="relative flex items-center h-5"
          value={v} onValueChange={setV} max={100} step={1} aria-label="Before after slider">
          <Slider.Track className="relative grow h-1 bg-gray-200 rounded-full">
            <Slider.Range className="absolute h-1 bg-gray-800 rounded-full" />
          </Slider.Track>
          <Slider.Thumb className="h-5 w-5 bg-black rounded-full" />
        </Slider.Root>
      </div>
    </div>
  );
}
