// Canonical, human-edited source of truth used during content sprints.
// Edit this file, then run:  npm run export:market

import type { MarketData } from "../types/market";

export const marketLocal: MarketData = {
  generated_at: new Date().toISOString(),
  kpis: [
    { key: "retirements_h1_2025", label: "H1 2025 Retirements", value: "95M+", note: "Record half-year (illustrative)" },
    { key: "issuance_q2_2025", label: "Q2 2025 Issuance", value: "77M", note: "Illustrative" },
    { key: "unique_buyers", label: "Unique Buyers (lifetime)", value: "17,600+", note: "AlliedOffsets (illustrative)" },
    { key: "avg_eua", label: "EU Allowance", value: "€80" }
  ],
  series: [
    {
      key: "eu_ets_price",
      label: "EU ETS Price",
      unit: "€/t",
      points: [
        { t: "2008-01-01", v: 23 },
        { t: "2012-12-01", v: 3 },
        { t: "2018-01-01", v: 8 },
        { t: "2024-01-01", v: 80 }
      ]
    },
    {
      key: "vcm_retirements_monthly",
      label: "VCM Retirements (Monthly)",
      unit: "tCO2e",
      points: [
        { t: "2025-01-01", v: 14 },
        { t: "2025-02-01", v: 15 },
        { t: "2025-03-01", v: 18 },
        { t: "2025-04-01", v: 20 }
      ]
    }
  ],
  refs: [
    { id: "em-2025", title: "State of the Voluntary Carbon Market 2025", publisher: "Ecosystem Marketplace", url: "https://example.com" },
    { id: "icvcm-ccp", title: "Core Carbon Principles", publisher: "ICVCM", url: "https://icvcm.org/ccp" },
    { id: "sbtiguidance-2025", title: "Corporate Net-Zero Claims Guidance", publisher: "SBTi", url: "https://example.com" },
    { id: "guardian-phantom", title: "Revealed: more than 90% of rainforest carbon offsets by biggest certifier are worthless", publisher: "The Guardian", date: "2023-01-18", url: "https://www.theguardian.com/environment/2023/jan/18/revealed-forest-carbon-offsets-biggest-provider-worthless-verra-aoe" },
    { id: "coase-1960", title: "The Problem of Social Cost", publisher: "Journal of Law and Economics", date: "1960", note: "Foundational work on externalities and property rights" },
    { id: "brundtland-1987", title: "Our Common Future", publisher: "UN World Commission on Environment and Development", date: "1987", note: "Introduced concept of sustainable development" },
    { id: "kyoto-1997", title: "Kyoto Protocol", publisher: "UNFCCC", date: "1997", note: "First international agreement with binding emission targets" },
    { id: "paris-2015", title: "Paris Agreement", publisher: "UNFCCC", date: "2015", url: "https://unfccc.int/process-and-meetings/the-paris-agreement" },
  ]
};
