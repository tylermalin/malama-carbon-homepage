import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Leaf,
  Factory,
  Pickaxe,
  Waves,
  Flame,
  TreePine,
  Wind,
} from "lucide-react";

// ---------- Shared types ----------
type Category = "Nature-based" | "Technological";

type Methodology = {
  id: string;
  name: string;
  category: Category;
  icon: React.ReactNode;
  sequestrationPotential: string;
  costRange: { min: number; max: number; label: string };
  capex: string;
  summary: string;
  standards: string[];
  details: string[];
};

// ---------- Data ----------
const METHODOLOGIES: Methodology[] = [
  {
    id: "ar",
    name: "Afforestation & Reforestation (A/R)",
    category: "Nature-based",
    icon: <TreePine className="h-5 w-5" aria-hidden />,
    sequestrationPotential: "High (several GtCO₂/yr; land-limited)",
    costRange: { min: 10, max: 50, label: "$10–$50" },
    capex: "$1,000–$6,000/ha (establishment)",
    summary:
      "Planting or restoring forests on degraded or non-forested land; mature, cost-effective, strong co-benefits.",
    standards: ["Verra VM0047", "Gold Standard A/R", "ACR Forest Protocols", "CAR U.S./Mexico Forest Protocols"],
    details: [
      "Additionality and land use trade-offs must be addressed.",
      "Monitoring focuses on growth, survival, and biomass expansion factors.",
      "Co-benefits include biodiversity, watershed, and cultural values.",
    ],
  },
  {
    id: "soil",
    name: "Soil Carbon Sequestration",
    category: "Nature-based",
    icon: <Leaf className="h-5 w-5" aria-hidden />,
    sequestrationPotential: "2–5 GtCO₂/yr (practice-dependent)",
    costRange: { min: 0, max: 100, label: "$0–$100" },
    capex: "Low (practice shifts; equipment)",
    summary:
      "Adopt cover crops, no-till, managed grazing, and compost to grow soil organic carbon while improving yields and resilience.",
    standards: ["Verra VM0042", "CAR Soil Enrichment", "Gold Standard SOC"],
    details: [
      "Heterogeneous results; requires robust sampling/remote sensing and permanence strategies.",
      "Often paired with agronomic tech and decision support.",
    ],
  },
  {
    id: "blue",
    name: "Blue Carbon (Mangroves, Marshes, Seagrass)",
    category: "Nature-based",
    icon: <Waves className="h-5 w-5" aria-hidden />,
    sequestrationPotential: "Moderate–High per area; ~30 MtCO₂/yr feasible from mangroves",
    costRange: { min: 1, max: 10, label: "< $10" },
    capex: "~$920/ha (restoration; site-dependent)",
    summary:
      "Restore coastal ecosystems with very high per-area sequestration rates and deep, anaerobic soil carbon stocks.",
    standards: ["Verra Tidal Wetland & Seagrass", "Gold Standard Mangrove", "ACR Coastal Wetlands"],
    details: [
      "Hydrological restoration and community stewardship are critical.",
      "Delivers storm protection, fisheries productivity, and cultural values.",
    ],
  },
  {
    id: "biochar",
    name: "Biochar",
    category: "Nature-based",
    icon: <Flame className="h-5 w-5" aria-hidden />,
    sequestrationPotential: "Moderate; 1.36–3.0 GtCO₂ cumulative by 2050 (Drawdown)",
    costRange: { min: 120, max: 140, label: "~$130" },
    capex: "~$22M facility (scale-dependent)",
    summary:
      "Convert waste biomass via pyrolysis into stable carbon added to soils; durable storage with agronomic benefits.",
    standards: ["Verra VM0044", "Puro.earth Biochar", "CAR Biochar"],
    details: [
      "MRV requires feedstock accounting, yield factors, and stability testing.",
      "Economics may include credit revenue and biochar co-product sales.",
    ],
  },
  {
    id: "dac",
    name: "Direct Air Capture (DAC)",
    category: "Technological",
    icon: <Wind className="h-5 w-5" aria-hidden />,
    sequestrationPotential: "Very High; theoretically scalable",
    costRange: { min: 600, max: 1000, label: "$600–$1,000 (falling)" },
    capex: "~$2.1B for 1 MtCO₂/yr plant",
    summary:
      "Chemical sorbents pull CO₂ from ambient air for compression and geologic storage; high durability and traceability.",
    standards: ["Puro.earth Geologically Stored Carbon", "Verra CCS (incl. DAC)", "ACR CCS Methodologies"],
    details: [
      "Key constraints: low-carbon energy, transport, and storage availability.",
      "Projected cost decline to ~$100–$200/ton with scale and innovation.",
    ],
  },
  {
    id: "beccs",
    name: "Bioenergy with CCS (BECCS)",
    category: "Technological",
    icon: <Factory className="h-5 w-5" aria-hidden />,
    sequestrationPotential: "High; contingent on sustainable biomass",
    costRange: { min: 240, max: 260, label: "$240–$260" },
    capex: "Very high (plant + capture + transport)",
    summary:
      "Capture and store biogenic CO₂ from power/processing facilities to deliver net-negative emissions.",
    standards: ["ACR CCS (biogenic)", "Puro.earth Geologic Storage"],
    details: [
      "Land, food, and biodiversity trade-offs must be mitigated.",
      "Integration with grid/industry infrastructure is complex but scalable.",
    ],
  },
  {
    id: "erw",
    name: "Enhanced Rock Weathering (ERW)",
    category: "Technological",
    icon: <Pickaxe className="h-5 w-5" aria-hidden />,
    sequestrationPotential: "High; ~2 GtCO₂/yr (upper-bound)",
    costRange: { min: 50, max: 250, label: "$50–$250" },
    capex: "High (mining, grinding, logistics)",
    summary:
      "Crush silicate rock (e.g., basalt) and apply to cropland to accelerate natural CO₂ uptake into stable bicarbonates.",
    standards: ["Puro.earth ERW"],
    details: [
      "MRV combines soil/water chemistry, isotopes, and mass balance.",
      "Operational limits driven by quarrying, milling energy, and haulage.",
    ],
  },
];

// ---------- Helpers ----------

function ToggleDetails({
  isOpenId,
  id,
  setIsOpenId,
}: {
  isOpenId: string | null;
  id: string;
  setIsOpenId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const open = isOpenId === id;
  return (
    <button
      onClick={() => setIsOpenId(open ? null : id)}
      className="mt-3 inline-flex items-center justify-center gap-2 self-start rounded-xl border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 transition hover:border-gray-900"
      aria-expanded={open}
      aria-controls={`details-${id}`}
    >
      {open ? (
        <>
          <ChevronUp className="h-4 w-4" aria-hidden /> Hide details
        </>
      ) : (
        <>
          <ChevronDown className="h-4 w-4" aria-hidden /> View details
        </>
      )}
    </button>
  );
}

// ---------- Component 2: Methodologies Explorer ----------
export function MethodologiesExplorer() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  // Show all methodologies without filtering or sorting
  const methodologies = METHODOLOGIES;

  return (
    <section aria-labelledby="explorer" className="mb-14">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-700" aria-hidden />
        <h2 id="explorer" className="text-xl font-semibold text-gray-900">Methodologies Explorer</h2>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {methodologies.map((m) => (
            <li key={m.id}>
              <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                <header className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span aria-hidden className="inline-flex items-center justify-center rounded-xl bg-gray-100 p-2 text-gray-700">{m.icon}</span>
                    <h3 className="text-sm font-semibold text-gray-900">{m.name}</h3>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    m.category === "Nature-based"
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                  }`}>
                    {m.category}
                  </span>
                </header>

                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-md bg-gray-50 p-3">
                    <dt className="text-gray-500">Sequestration potential</dt>
                    <dd className="mt-0.5 font-medium text-gray-900">{m.sequestrationPotential}</dd>
                  </div>
                  <div className="rounded-md bg-gray-50 p-3">
                    <dt className="text-gray-500">Cost per ton (CO₂)</dt>
                    <dd className="mt-0.5 font-medium text-gray-900">{m.costRange.label}</dd>
                  </div>
                  <div className="rounded-md bg-gray-50 p-3">
                    <dt className="text-gray-500">Initial CAPEX</dt>
                    <dd className="mt-0.5 font-medium text-gray-900">{m.capex}</dd>
                  </div>
                  <div className="rounded-md bg-gray-50 p-3">
                    <dt className="text-gray-500">Standards & registries</dt>
                    <dd className="mt-0.5 font-medium text-gray-900">{m.standards.join(", ")}</dd>
                  </div>
                </dl>

                <p className="mt-3 text-sm text-gray-700">{m.summary}</p>

                <ToggleDetails
                  isOpenId={openCard}
                  id={m.id}
                  setIsOpenId={setOpenCard}
                />

                {openCard === m.id && (
                  <div id={`details-${m.id}`} className="mt-3 space-y-2 rounded-xl border border-gray-200 p-3">
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {m.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
    </section>
  );
}
