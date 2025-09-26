"use client";
import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

type CCP = {
  id: string;
  title: string;
  description: string;
  plainLanguage: string;
};

const ccpData: CCP[] = [
  {
    id: "governance",
    title: "Governance",
    description: "Effective program governance and transparency",
    plainLanguage: "Clear rules, fair oversight, and open decision-making"
  },
  {
    id: "tracking",
    title: "Tracking",
    description: "Unique, serial-numbered units and registry",
    plainLanguage: "Every credit has a unique ID and is tracked in a public registry"
  },
  {
    id: "transparency",
    title: "Transparency",
    description: "Comprehensive, publicly available information",
    plainLanguage: "All project details, methodologies, and results are public"
  },
  {
    id: "robustness",
    title: "Robustness",
    description: "Conservative, science-based quantification",
    plainLanguage: "Conservative estimates that don't overstate impact"
  },
  {
    id: "permanence",
    title: "Permanence",
    description: "Durable, long-term storage or emission reductions",
    plainLanguage: "Carbon stays out of the atmosphere for the long term"
  },
  {
    id: "additionality",
    title: "Additionality",
    description: "Additional to what would have occurred otherwise",
    plainLanguage: "The project creates impact that wouldn't happen without the carbon market"
  },
  {
    id: "safeguards",
    title: "Safeguards",
    description: "Sustainable development benefits and safeguards",
    plainLanguage: "Projects help local communities and protect the environment"
  },
  {
    id: "contribution",
    title: "Contribution",
    description: "Contribution to net zero transition",
    plainLanguage: "Projects support the global shift to a low-carbon economy"
  }
];

export default function CCPChecklist() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="rounded-2xl border p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">ICVCM Core Carbon Principles</h3>
        <p className="text-slate-600 text-sm">
          Click through the 8 foundational principles for high-integrity carbon credits
        </p>
        <div className="mt-2 text-xs text-slate-500">
          {checkedItems.length} of {ccpData.length} completed
        </div>
      </div>

      <div className="space-y-4">
        {ccpData.map((ccp) => (
          <div
            key={ccp.id}
            className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              checkedItems.includes(ccp.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
            onClick={() => toggleItem(ccp.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {checkedItems.includes(ccp.id) ? (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-1">{ccp.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{ccp.description}</p>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-700 font-medium mb-1">In plain language:</p>
                  <p className="text-sm text-slate-600">{ccp.plainLanguage}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {checkedItems.length === ccpData.length && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">All Core Carbon Principles reviewed!</p>
          </div>
          <p className="text-green-700 text-sm mt-1">
            These principles form the foundation of high-integrity carbon markets.
          </p>
        </div>
      )}
    </div>
  );
}
