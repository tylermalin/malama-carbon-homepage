import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

const LIFECYCLE_STEPS = [
  {
    title: "Design & Methodology Selection",
    desc:
      "Define boundaries, baseline, additionality; select a registered methodology fit for activity and region.",
    malama:
      "Mālama accelerates onboarding with a complete project assessment, monitoring setup, and compliance configuration in 1–2 weeks.",
  },
  {
    title: "Validation",
    desc:
      "Independent VVB audits design and opens public comment; aligns with standard rules and safeguards.",
    malama:
      "Mālama prepares standardized digital datasets that simplify third-party audits and reduce bottlenecks.",
  },
  {
    title: "Registration",
    desc:
      "Approved projects are listed on the registry and become eligible for issuance after monitoring and verification.",
    malama:
      "Projects onboarded through Mālama are registry-ready, with pre-certified templates aligned to Verra, Gold Standard, and Puro.earth.",
  },
  {
    title: "Monitoring",
    desc:
      "Implement operations and collect data per methodology (e.g., growth plots, SOC sampling, metered capture).",
    malama:
      "Mālama's universal dMRV provides real-time monitoring for biochar, ERW, A/R, regenerative ag, and blue carbon.",
  },
  {
    title: "Verification & Issuance",
    desc:
      "VVB confirms outcomes; serialized credits (1 ton CO₂ each) issued to project account.",
    malama:
      "AI-powered validation and credit calculation streamline issuance. Mālama enables minting of Liquid (LCO₂) and Verified (VCO₂) credits.",
  },
  {
    title: "Retirement",
    desc:
      "Buyers retire credits in the registry to claim climate benefits once and permanently.",
    malama:
      "Credits issued through Mālama integrate directly with blockchain registries, ensuring transparent, permanent retirement and easy buyer access.",
  },
];

export function LifecycleWithMalama() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section aria-labelledby="lifecycle" className="mb-14">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-gray-700" aria-hidden />
        <h2 id="lifecycle" className="text-xl font-semibold text-gray-900">Carbon Project Development Lifecycle</h2>
      </div>
      <p className="mt-2 max-w-3xl text-gray-600">
        Standards and registries require a rigorous, transparent process to ensure credits are additional, measurable, and verifiable. Mālama integrates into each step to accelerate timelines and add automation.
      </p>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LIFECYCLE_STEPS.map((s, i) => (
          <li key={s.title}>
            <button
              onClick={() => setActiveStep(i)}
              className={`group w-full rounded-2xl border p-4 text-left transition ${
                activeStep === i ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"
              }`}
              aria-pressed={activeStep === i}
              aria-current={activeStep === i}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{i + 1}. {s.title}</div>
                  <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                  {activeStep === i && (
                    <p className="mt-2 rounded-md bg-emerald-50 p-2 text-sm text-emerald-700">{s.malama}</p>
                  )}
                </div>
                {activeStep === i ? (
                  <ChevronUp className="mt-0.5 h-4 w-4 text-gray-700" />
                ) : (
                  <ChevronDown className="mt-0.5 h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                )}
              </div>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
