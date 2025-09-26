"use client";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

type MRVFeature = {
  category: string;
  old: string;
  new: string;
};

const mrvFeatures: MRVFeature[] = [
  {
    category: "Data Collection",
    old: "Manual field visits, paper forms, annual measurements",
    new: "Satellite imagery, IoT sensors, real-time monitoring"
  },
  {
    category: "Verification",
    old: "Third-party auditors, subjective assessments, infrequent checks",
    new: "AI analysis, automated algorithms, continuous verification"
  },
  {
    category: "Transparency",
    old: "Private reports, limited access, delayed publication",
    new: "Public dashboards, blockchain records, real-time updates"
  },
  {
    category: "Cost",
    old: "High verification costs, long timelines, limited scalability",
    new: "Reduced costs, faster processing, scalable to thousands of projects"
  },
  {
    category: "Accuracy",
    old: "Human error, sampling bias, estimation uncertainty",
    new: "Precise measurements, comprehensive coverage, reduced uncertainty"
  }
];

export default function MRVCompareSlider() {
  const [sliderValue, setSliderValue] = useState<number[]>([50]);

  return (
    <div className="rounded-2xl border p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Digital MRV Revolution</h3>
        <p className="text-slate-600 text-sm mb-4">
          Compare traditional vs. digital measurement, reporting, and verification
        </p>
        
        {/* Slider */}
        <div className="relative">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Traditional MRV</span>
            <span>Digital MRV</span>
          </div>
          <Slider.Root
            className="relative flex items-center h-6"
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
            aria-label="MRV comparison slider"
          >
            <Slider.Track className="relative grow h-2 bg-slate-200 rounded-full">
              <Slider.Range className="absolute h-2 bg-gradient-to-r from-red-500 to-blue-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="h-6 w-6 bg-white border-2 border-slate-400 rounded-full shadow-lg" />
          </Slider.Root>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="space-y-4">
        {mrvFeatures.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border">
            <h4 className="font-semibold text-slate-900 mb-3">{feature.category}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg transition-all duration-300 ${
                sliderValue[0] < 30 ? 'bg-red-50 border border-red-200' : 'bg-slate-50'
              }`}>
                <p className="text-xs font-medium text-slate-500 mb-1">Traditional</p>
                <p className="text-sm text-slate-700">{feature.old}</p>
              </div>
              <div className={`p-3 rounded-lg transition-all duration-300 ${
                sliderValue[0] > 70 ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'
              }`}>
                <p className="text-xs font-medium text-slate-500 mb-1">Digital</p>
                <p className="text-sm text-slate-700">{feature.new}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h4 className="font-semibold text-slate-900 mb-2">The Transformation</h4>
        <p className="text-sm text-slate-700">
          Digital MRV technologies are revolutionizing carbon markets by providing more accurate, 
          transparent, and cost-effective verification. This shift enables scaling to thousands 
          of projects while maintaining high integrity standards.
        </p>
      </div>
    </div>
  );
}
