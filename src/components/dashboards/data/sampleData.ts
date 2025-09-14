export const stewardData = {
  stats: {
    projectedAnnualCredits: 2540,
    verifiedPlots: 3,
    mrvHealth: 0.92,
    nextTask: "Soil sampling (due in 3 days)"
  },
  projects: [
    { name: "Kawaihae Parcel A", tmk: "3-7-1-006-012", practice: "Biochar", status: "Verified", estCredits: 980, lastUpdate: "2025-09-10" },
    { name: "Wailuku Farm Block", tmk: "2-3-5-004-001", practice: "Regenerative Ag", status: "In Review", estCredits: 760, lastUpdate: "2025-09-08" },
    { name: "Hana Community Plot", tmk: "1-1-4-002-019", practice: "Ag Waste → Biochar", status: "Draft", estCredits: 800, lastUpdate: "2025-09-06" }
  ],
  mrv: {
    completeness: 0.76,
    signals: [
      { type: "Temperature", last7: [420, 430, 415, 405, 410, 418, 425] },
      { type: "Moisture", last7: [22, 21, 23, 24, 22, 20, 21] },
      { type: "pH", last7: [7.1, 7.0, 7.2, 7.1, 7.0, 7.1, 7.2] },
      { type: "Biochar Yield kg", last7: [120, 0, 95, 110, 140, 0, 130] }
    ]
  },
  pricePoints: [80, 120, 180]
};

export const developerData = {
  stats: { 
    uptime: 0.999, 
    endpoints: 12, 
    sdks: ["JS", "Python"], 
    sandboxCallsToday: 184 
  },
  endpoints: [
    { path: "/auth/token", method: "POST", desc: "Obtain sandbox access token", limit: "60 req/min", status: "Available" },
    { path: "/mrv/signals", method: "GET", desc: "Retrieve MRV signal snapshots", limit: "120 req/min", status: "Available" },
    { path: "/projects", method: "GET", desc: "List sample projects", limit: "60 req/min", status: "Available" },
    { path: "/credits/market", method: "GET", desc: "Browse sample credits", limit: "60 req/min", status: "Available" },
    { path: "/orders", method: "POST", desc: "Create mock order (preview only)", limit: "30 req/min", status: "Preview" }
  ],
  sandbox: { keyMasked: "malama_sbx_****_3f29a" }
};

export const buyerData = {
  stats: { 
    availableProjects: 8, 
    previewPortfolio: 1250, 
    avgPrice: 118, 
    verifiers: ["Puro.earth", "Isometric"] 
  },
  market: [
    { project: "Maui Food Forest", region: "Hawaiʻi, US", method: "Biochar", verification: "Puro.earth", price: 120, vintage: "2025", dmrvConfidence: 0.973 },
    { project: "Kawaihae Indigenous Carbon", region: "Hawaiʻi, US", method: "Ag Waste → Biochar", verification: "Isometric (in review)", price: 110, vintage: "2025", dmrvConfidence: 0.948 }
  ],
  portfolio: [
    { holding: 750, vintage: "2024", status: "Allocated", proof: "preview" },
    { holding: 500, vintage: "2025", status: "Retired", proof: "preview" }
  ],
  disclosureReadiness: 0.64
};

export const partnerData = {
  stats: { 
    active: 6, 
    resources: 24, 
    openCalls: 3, 
    regions: 4 
  },
  collab: {
    ideas: [{ title: "Community Biochar Hubs", org: "HFUU", focus: "Biochar" }],
    scoping: [{ title: "TMK Mapping Pilot", org: "County GIS", focus: "MRV" }],
    active: [{ title: "Indigenous Steward Pathway", org: "AgEnergy Hawaiʻi", focus: "Stewardship" }],
    completed: [{ title: "Sensor Calibration Study", org: "UH Extension", focus: "MRV" }]
  },
  resources: [
    { title: "MRV SOP v0.9", type: "SOP", updated: "2025-08-20", link: "#" },
    { title: "Biochar Feedstock Catalog", type: "Dataset", updated: "2025-09-01", link: "#" }
  ],
  grants: [
    { name: "Regenerative Ag Pilot Fund", due: "2025-10-15", tags: ["Ag", "MRV"] },
    { name: "Climate Tech Collaboration Grant", due: "2025-11-01", tags: ["Tech", "Partnership"] },
    { name: "Community Carbon Initiative", due: "2025-12-05", tags: ["Community", "Stewardship"] }
  ]
};
