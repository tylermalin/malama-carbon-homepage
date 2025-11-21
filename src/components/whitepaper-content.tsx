import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb, AlertTriangle, Info, CheckCircle } from 'lucide-react';

// Placeholder diagram component
function Diagram({ title, description }: { title: string; description: string }) {
  return (
    <div className="my-8 p-8 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
      <div className="text-gray-600">
        <div className="text-lg font-medium mb-2 text-black">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}

// Code block component
function CodeBlock({ language, children }: { language?: string; children: string }) {
  return (
    <div className="my-6">
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code className="text-black">{children}</code>
      </pre>
    </div>
  );
}

// Callout component
function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'tip' | 'success'; children: React.ReactNode }) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    tip: Lightbulb,
    success: CheckCircle,
  };
  
  const Icon = icons[type];
  
  return (
    <Alert className="my-6 bg-[rgba(255,255,255,1)] border-gray-200">
      <Icon className="h-4 w-4 text-black" />
      <AlertDescription className="text-sm leading-relaxed text-black">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function WhitepaperContent() {
  return (
    <article className="space-y-12 print:space-y-8">
      {/* Document Header */}
      <header className="text-center py-8 print:py-4 border-b border-gray-200">
        <img 
          src="https://fykjijdixtcgjavidmve.supabase.co/storage/v1/object/public/website-assets/logos/logo.png" 
          alt="Mālama Labs Logo" 
          className="h-16 w-auto mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-4 print:text-3xl text-black">The Mālama Green Paper V3.1</h1>
        <div className="text-gray-600 space-y-2">
          <p>Universal Digital Integrity for the Carbon Economy</p>
          <p>A Standards-Aligned Blueprint for Carbon Market Clarity, Ecological Stewardship, and Scalability</p>
          <p className="mt-4">Mālama Labs Incorporated</p>
          <p>Date: November 2025 (Draft V3.1)</p>
        </div>
      </header>

      {/* Executive Summary */}
      <section id="executive-summary" className="scroll-mt-24">
        <h1 className="text-black">1. Executive Summary</h1>
        
        <p className="mt-4 text-lg leading-relaxed text-black">
          Mālama Labs is building the universal digital integrity layer for the carbon economy.
        </p>
        
        <p className="mt-4 text-black">
          Carbon markets are on the cusp of gigatonne-scale demand, but remain constrained by three systemic problems:
        </p>
        
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4 text-black">
          <li><strong>Fragmented rules and registries</strong> – 30+ registries and hundreds of methodologies with inconsistent requirements.</li>
          <li><strong>Slow, manual verification</strong> – 12–24 month audit cycles, based on sparse sampling and PDFs.</li>
          <li><strong>Low trust and unclear provenance</strong> – buyers cannot easily see how a tonne was measured, verified, and protected over time.</li>
        </ul>

        <p className="mt-6 text-black">
          Mālama Labs' answer is <strong>Universal Digital MRV (UDRMV)</strong>: a standards-aligned system that turns real-world climate data into transparent, verifiable carbon assets, in near real time.
        </p>

        <h2 className="mt-8 text-black">1.1 From Periodic Audits to Continuous Evidence</h2>
        <p className="mt-4 text-black">
          Mālama's methodology fundamentally shifts carbon accounting from a subjective, document-based process to an objective, machine-verified system. We eliminate the reliance on infrequent site visits and often opaque, self-reported spreadsheets by anchoring every carbon claim in continuous, undeniable evidence from three core technological pillars:
        </p>

        <h3 className="mt-6 text-black">Objective, Machine-Verifiable Evidence Pillars</h3>
        
        <div className="space-y-6 mt-6">
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Sensor Networks: Continuous Operational Telemetry</h4>
            <p className="mt-2 text-black">
              <strong>Description:</strong> We deploy advanced, field-hardened environmental sensors that are physically secured and tamper-resistant across project sites. These devices are purpose-built to operate in harsh, remote environments, ensuring data integrity at the source.
            </p>
            <p className="mt-2 text-black">
              <strong>Data Captured:</strong> A constant stream of critical, high-frequency data is collected, including real-time reactor performance metrics (e.g., temperature, pressure, flow rates for biochar projects), key soil parameters (e.g., pH, moisture content, organic carbon levels), and comprehensive operational telemetry essential for calculating carbon removal and avoidance.
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Satellite & Remote Sensing: Geospatial Corroboration and Permanence Risk</h4>
            <p className="mt-2 text-black">
              <strong>Description:</strong> Utilizing a sophisticated stack of remote sensing technologies, including high-resolution multispectral and synthetic aperture radar (SAR) imagery, we achieve independent, wide-area verification of project claims.
            </p>
            <p className="mt-2 text-black">
              <strong>Data Utilized:</strong> This stream is crucial for corroborating on-the-ground measurements. It allows for the accurate measurement of biomass stocks, continuous monitoring of land-use change to detect unauthorized activities, assessment of permanence risk (e.g., drought, fire susceptibility), and the identification and quantification of potential leakage outside the project boundary.
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">AI-Driven Verification: Anomaly Detection and Predictive Validation</h4>
            <p className="mt-2 text-black">
              <strong>Description:</strong> Our platform employs advanced machine learning (ML) models and statistical algorithms to analyze the vast, heterogeneous datasets generated by the sensor and satellite networks.
            </p>
            <p className="mt-2 text-black">
              <strong>Functionality:</strong> This AI layer is responsible for the continuous, automated quality control of data. It performs sophisticated anomaly detection to flag suspicious or erroneous data points, executes comprehensive uncertainty quantification to provide auditable confidence intervals for all metrics, and conducts predictive validation to forecast future performance and flag potential compliance risks before they materialize.
            </p>
          </Card>
        </div>

        <h3 className="mt-8 text-black">The Standardized, Traceable Data Model (UDRMV)</h3>
        <p className="mt-4 text-black">
          All the objective evidence collected through these three pillars is meticulously organized and structured within the Universal Digital Registry and Measurement & Verification (UDRMV) data model. This proprietary framework is built for interoperability, fully aligned with leading industry standards, specifically:
        </p>
        
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4 text-black">
          <li>The <strong>InterWork Alliance Digital MRV Framework v3</strong>, ensuring our approach is technologically current and aligned with digital asset best practices.</li>
          <li>The <strong>Token Taxonomy Framework (TTF)</strong>, which ensures that the resulting digital assets (CRUs) are fungible, well-defined, and ready for integration into the broader digital asset ecosystem.</li>
        </ul>

        <p className="mt-6 text-black">
          This rigorous structure ensures that Mālama-issued assets possess complete, immutable traceability through a standardized chain of custody:
        </p>

        <CodeBlock>
{`AccountableImpactOrganization (The entity responsible for the project and claims)
  ↓
ActivityImpactModule (The specific methodology/protocol used, e.g., Biochar Sequestration)
  ↓
ImpactClaims & Checkpoints (Initial claims submitted with associated time/geo-stamps)
  ↓
DataPackages (Bundles of raw, time-stamped Sensor, Satellite, and AI data)
  ↓
ProcessedClaims (Validated, quantified, and algorithmically approved claims)
  ↓
CRUs (Verified Units) (The final, immutable Carbon Removal Units ready for issuance and market trade)`}
        </CodeBlock>

        <h2 className="mt-8 text-black">1.2 A Token Architecture Built for Integrity, Not Speculation</h2>
        <p className="mt-4 text-black">
          To keep financial logic and environmental claims cleanly separated, Mālama uses a four-token architecture:
        </p>

        <div className="space-y-6 mt-6">
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h3 className="text-black">LC – Liquid Carbon (Pre-Verified Asset)</h3>
            <div className="flex gap-2 mt-2 mb-3">
              <Badge variant="secondary">Fungible</Badge>
              <Badge variant="secondary">τF{'{t,e,v,m,c}'}</Badge>
            </div>
            <p className="text-black">
              <strong>Role:</strong> Data-backed, pre-finance token derived from ProcessedClaims. Supports early project funding without pretending to be a final credit.
            </p>
            <p className="mt-2 text-black">
              <strong>Guarantee:</strong> If later verification fails, LC is revoked and burned.
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h3 className="text-black">VC – Verified Carbon (CRU-Class Credit)</h3>
            <div className="flex gap-2 mt-2 mb-3">
              <Badge variant="secondary">Non-Fungible with divisibility</Badge>
              <Badge variant="secondary">τN{'{d,t,e,v,g,m,b}'}</Badge>
            </div>
            <p className="text-black">
              <strong>Role:</strong> Final, compliance-grade carbon unit (CRU) eligible for retirement. Each VC represents durable tCO₂e with a full digital MRV chain attached.
            </p>
            <p className="mt-2 text-black">
              <strong>Alignment:</strong> Designed to meet ICVCM Core Carbon Principles and Paris Agreement Article 6.4 requirements, including ITMO / Corresponding Adjustment fields.
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h3 className="text-black">KANU – Co-Benefit & Impact Token</h3>
            <div className="flex gap-2 mt-2 mb-3">
              <Badge variant="secondary">Non-Fungible, Non-Transferable</Badge>
              <Badge variant="secondary">τN{'{~d,~t,g}'}</Badge>
            </div>
            <p className="text-black">
              <strong>Role:</strong> Encodes ecological, social, and cultural co-benefits (UN SDGs, biodiversity, soil health, indigenous stewardship) as a transparent attestation layer, not a speculative asset.
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h3 className="text-black">PONO – Governance Token</h3>
            <div className="flex gap-2 mt-2 mb-3">
              <Badge variant="secondary">Fungible, Transfer-Restricted</Badge>
              <Badge variant="secondary">τF{'{g,e,r}'}</Badge>
            </div>
            <p className="text-black">
              <strong>Role:</strong> Governs methodologies, verifier accreditation, risk buffers, and protocol evolution. Vesting and transfer restrictions align influence with long-term stewardship and scientific integrity.
            </p>
          </Card>
        </div>

        <Callout type="info">
          This separation of roles makes the system legible to regulators, registries, institutional buyers, and community stakeholders:
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>LC = economic pre-finance mechanism</li>
            <li>VC = validated environmental claim</li>
            <li>KANU = co-benefit truth layer</li>
            <li>PONO = governance and protocol stewardship</li>
          </ul>
        </Callout>

        <h2 className="mt-8 text-black">1.3 The LC → VC Integrity Pathway</h2>
        <p className="mt-4 text-black">The core integrity pathway is simple:</p>
        
        <div className="space-y-4 mt-6">
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium shrink-0">1</div>
            <div>
              <h4 className="text-black">Objective Evidence Collection</h4>
              <p className="text-sm text-gray-600">Sensors and satellite feeds stream into the UDRMV data lake and are bundled as DataPackages with manifests and cryptographic checksums.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium shrink-0">2</div>
            <div>
              <h4 className="text-black">Initial Digital Verification (AI + Rules)</h4>
              <p className="text-sm text-gray-600">Automated models convert raw data into ProcessedClaims (e.g., "14.2 tCO₂e removed in Batch X"), with explicit uncertainty bounds and methodology references.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium shrink-0">3</div>
            <div>
              <h4 className="text-black">Optional Pre-Finance: LC Minting</h4>
              <p className="text-sm text-gray-600">Based on ProcessedClaims, the system mints LC tokens for early liquidity. LC is always clearly marked as pre-verified, time-limited, and revokable.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium shrink-0">4</div>
            <div>
              <h4 className="text-black">Independent Validation (Human + Digital)</h4>
              <p className="text-sm text-gray-600">Accredited verifiers (VVBs) use the same UDRMV evidence bundle to confirm or adjust the ProcessedClaims. PONO-governed standards and ExtensionSets ensure consistent criteria.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium shrink-0">5</div>
            <div>
              <h4 className="text-black">Issuance: LC Burn → VC + KANU Mint</h4>
              <p className="text-sm text-gray-600">Upon final verification: The relevant LC is burned. VC tokens are minted as CRU-class credits. KANU tokens are issued where co-benefits are verified.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium shrink-0">6</div>
            <div>
              <h4 className="text-black">Retirement & Reporting</h4>
              <p className="text-sm text-gray-600">Buyers retire VC on-chain. The system emits immutable retirement records and can synchronize with legacy registries and Article 6 registries.</p>
            </div>
          </div>
        </div>

        <h2 className="mt-8 text-black">1.4 Digital Methodologies as Code: ExtensionSets</h2>
        <p className="mt-4 text-black">
          Mālama encodes methodology logic as ExtensionSets using IWA v3:
        </p>
        
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4 text-black">
          <li><strong>ExtensionSet.Malama.Biochar.v1</strong> – kiln temperature profiles, feedstock analysis, lab testing for carbon stability classes, reversal risk plans.</li>
          <li><strong>ExtensionSet.Malama.ERW.v1</strong> – rock chemistry, particle size distribution, hydrology, and weathering kinetics (e.g., Idaho ERW pilot design).</li>
        </ul>

        <p className="mt-4 text-black">
          These ExtensionSets live at the smart-contract and data-schema level, so scientific rigor is enforced by the protocol itself, not left to ad-hoc interpretation.
        </p>

        <h2 className="mt-8 text-black">1.5 Who This Green Paper Is For</h2>
        <p className="mt-4 text-black">This Green Paper is designed as a single source of truth for:</p>
        
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4 text-black">
          <li><strong>Community & Land Stewards</strong> – How Mālama keeps local values, co-benefits, and indigenous stewardship visible and fairly rewarded.</li>
          <li><strong>Project Developers</strong> – How UDRMV, LC, and VC shorten time-to-cash and reduce verification pain.</li>
          <li><strong>Investors & Capital Partners</strong> – How the token system, business model, and governance create defensible, scalable infrastructure.</li>
          <li><strong>Registries & Regulators</strong> – How Mālama maps onto IWA Digital MRV, TTF, ICVCM, and Article 6.4.</li>
          <li><strong>Technology & Ecosystem Partners</strong> – How to integrate via APIs, Cardano smart contracts, and standards-based data schemas.</li>
        </ul>

        <h2 className="mt-8 text-black">1.6 Vision</h2>
        <p className="mt-4 text-black">Our thesis is simple:</p>
        
        <Callout type="tip">
          To unlock a truly regenerative carbon economy, verification must be continuous, transparent, and encoded in open standards. Mālama Labs is building that standard-aligned digital integrity layer—so that every tonne of carbon, and every co-benefit attached to it, is traceable, defensible, and governed in pono (right relationship).
        </Callout>
      </section>

      {/* Context & Objectives */}
      <section id="context-objectives" className="scroll-mt-24">
        <h1 className="text-black">2. Context & Objectives</h1>
        <h2 className="text-black">Why a Universal Integrity Layer Is Needed Now</h2>
        
        <p className="mt-4 text-black">
          Carbon markets are entering a new era. Demand is rising exponentially—driven by compliance pressures, corporate commitments, and sovereign climate targets—yet trust in carbon credits remains fragile. Despite billions in capital and thousands of project developers, the market still lacks a single, universally trusted, digitally verifiable foundation.
        </p>

        <p className="mt-4 text-black">
          Today's market reality is shaped by four interlocking problems:
        </p>

        <h3 className="mt-6 text-black">2.1 Fragmentation Across Registries and Methodologies</h3>
        <p className="mt-4 text-black">
          There are more than 30 registries and hundreds of methodologies, each with different rules, data requirements, sampling frequencies, buffer policies, and permanence classifications.
        </p>
        
        <p className="mt-4 text-black">This creates:</p>
        <ul className="list-disc list-inside space-y-2 mt-2 ml-4 text-black">
          <li>inconsistent carbon accounting</li>
          <li>duplicative audits</li>
          <li>incompatible data formats</li>
          <li>slow, manual cross-checking</li>
          <li>bottlenecks for next-generation CDR (biochar, ERW, DAC)</li>
        </ul>

        <Callout type="warning">
          As new CDR methods mature faster than registries can update methodologies, the gap widens: innovation accelerates; verification lags.
        </Callout>

        <h3 className="mt-6 text-black">2.2 Slow, Manual, Non-Digital Verification</h3>
        <p className="mt-4 text-black">
          Legacy MRV processes were designed in the 1990s—before low-cost sensors, satellite analytics, or machine learning were available.
        </p>
        
        <p className="mt-4 text-black">Verification often relies on:</p>
        <ul className="list-disc list-inside space-y-2 mt-2 ml-4 text-black">
          <li>periodic field visits every 12–36 months</li>
          <li>paper and PDF reporting</li>
          <li>small-sample laboratory tests</li>
          <li>self-reported spreadsheets</li>
          <li>human judgement with limited reproducibility</li>
        </ul>

        <p className="mt-4 text-black">
          This process is too slow, too subjective, and too expensive to scale to gigatonne levels.
        </p>

        <h3 className="mt-6 text-black">2.3 Lack of Transparent, Traceable Evidence</h3>
        <p className="mt-4 text-black">
          Projects frequently report modeled values rather than measured ones. Buyers cannot easily access data provenance, uncertainty intervals, or the logic behind credit issuance.
        </p>
        
        <p className="mt-4 text-black">The result is market confusion:</p>
        <ul className="list-disc list-inside space-y-2 mt-2 ml-4 text-black">
          <li>"One tonne" can mean wildly different things.</li>
          <li>Buyers face informational asymmetry relative to project developers.</li>
          <li>Investors cannot distinguish high-integrity credits from low-integrity ones.</li>
          <li>Communities and stewards rarely have visibility or governance power.</li>
        </ul>

        <p className="mt-4 text-black">
          Without transparent, reproducible evidence, markets cannot scale responsibly.
        </p>

        <h3 className="mt-6 text-black">2.4 Digital Tokens Without Digital Integrity</h3>
        <p className="mt-4 text-black">
          Tokenized carbon credits have proliferated—but most simply digitize credits backed by legacy PDFs and opaque methodologies.
        </p>

        <Callout type="warning">
          This reproduces the trust issues of the physical market instead of solving them. Tokenizing a bad credit just creates a faster, more transparent bad credit.
        </Callout>

        <p className="mt-4 text-black">
          Mālama Labs addresses the root cause, not the symptom. Our mission is to anchor every carbon asset in objective, machine-verifiable data, governed by transparent rules and community-inclusive oversight.
        </p>
      </section>

      {/* The Verification & Integrity Gap */}
      <section id="verification-gap" className="scroll-mt-24">
        <h1 className="text-black">3. The Verification & Integrity Gap</h1>
        <h2 className="text-black">Where Today's Carbon Markets Fail—and Why They Can Be Fixed</h2>
        
        <p className="mt-4 text-black">
          The carbon market's core weakness is not a lack of standards—it is the lack of interoperability, digital evidence, and continuous verification.
        </p>

        <h3 className="mt-6 text-black">3.1 Four Root Causes of Market Breakdown</h3>

        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <h4 className="text-black">3.1.1 Infrequent Measurement: A Barrier to Dynamic Carbon Accounting</h4>
          <p className="mt-3 text-black">
            The current reliance on infrequent, standardized measurements—typically a single, exhaustive audit conducted only every 12 to 36 months—fundamentally fails to capture the dynamic, non-linear variability inherent in both industrial processes and natural systems.
          </p>
          <p className="mt-3 text-black">
            A measurement cadence spanning years cannot adequately account for critical, high-frequency fluctuations across several key domains:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li><strong>ERW Production Variability:</strong> Kiln temperature fluctuations and feedstock moisture variations</li>
            <li><strong>Environmental and Geochemical Dynamics:</strong> Weathering dynamics, soil carbon heterogeneity</li>
            <li><strong>Biomass and Ecosystem Shifts:</strong> Seasonal die-off, operational anomalies</li>
          </ul>
        </Card>

        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <h4 className="text-black">3.1.2 Subjective Verification and the Challenge of Interpretation</h4>
          <p className="mt-3 text-black">
            Verification bodies (VVBs) operate in a complex environment where the available data is often sparse, incomplete, or requires nuanced interpretation. Even within a highly standardized framework, the ultimate conclusion reached by a VVB is informed by a degree of professional subjectivity.
          </p>
          <p className="mt-3 text-black">This subjective verification process relies on:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li>Manual Sampling and Site Visits</li>
            <li>Professional Judgement and Expertise</li>
            <li>Conservative Assumptions in the Face of Uncertainty</li>
          </ul>
        </Card>

        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <h4 className="text-black">3.1.3 Insufficient Evidence for Buyers & Regulators</h4>
          <p className="mt-3 text-black">
            The current reporting paradigm severely limits the ability of key stakeholders to properly vet the integrity, transparency, and scientific rigor of carbon projects.
          </p>
          <p className="mt-3 text-black">Stakeholders require comprehensive access to:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li>The Raw Data</li>
            <li>Quantifiable Uncertainty</li>
            <li>Detailed Processing Chain</li>
            <li>Anomaly and Outlier Handling</li>
            <li>Verification and Audit Trail</li>
            <li>Exact Methodological Logic</li>
          </ul>
          <Callout type="warning">
            Today's standard practice—relying on static, narrative-driven PDF documents—is inherently incompatible with the needs of a modern, high-integrity carbon market.
          </Callout>
        </Card>

        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <h4 className="text-black">3.1.4 Financial & Environmental Claims Entangled: The Blurring of Boundaries</h4>
          <p className="mt-3 text-black">
            A significant structural problem within many current environmental market systems is the commingling of distinct economic, ecological, and administrative values into a single financial instrument or digital token.
          </p>
          <p className="mt-3 text-black">Clear boundaries must exist between:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li><strong>Pre-finance vs. Final Credits:</strong> Ex-ante capital vs. ex-post verified credits</li>
            <li><strong>Speculative vs. Environmental Value:</strong> Market-driven vs. verified impact</li>
            <li><strong>Governance vs. Claims on Carbon:</strong> Voting rights vs. environmental assets</li>
          </ul>
        </Card>
      </section>

      {/* The Universal Digital MRV Framework */}
      <section id="udrmv-framework" className="scroll-mt-24">
        <h1 className="text-black">4. The Universal Digital MRV (UDRMV) Framework</h1>
        <h2 className="text-black">The Standards-Aligned Operating System for Carbon Verification</h2>
        
        <p className="mt-4 text-black">
          Mālama's Unified, Digital, Real-time Measurement, Reporting, and Verification (UDRMV) Framework represents a foundational leap forward from the current fragmented, analog, and often opaque system of MRV in the carbon market.
        </p>

        <p className="mt-4 text-black">
          The core innovation of UDRMV is the creation of a unified, continuously updated, and evidence-based verification system that leverages digital technologies to ensure maximum integrity, transparency, and efficiency.
        </p>

        <h3 className="mt-6 text-black">UDRMV's compliance and integration architecture is aligned with:</h3>
        <ul className="list-disc list-inside space-y-2 mt-4 ml-4 text-black">
          <li><strong>InterWork Alliance Digital MRV Framework v3 (IWA dMRV v3)</strong></li>
          <li><strong>InterWork Alliance Token Taxonomy Framework (TTF)</strong></li>
          <li><strong>ICVCM Core Carbon Principles (CCPs)</strong></li>
          <li><strong>ISO 14064, 14065, 14067</strong></li>
          <li><strong>Paris Agreement Article 6.2 & 6.4 Digital Infrastructure</strong></li>
        </ul>

        <Callout type="info">
          UDRMV is not a new standard to compete with existing protocols—it is the essential digital connective tissue between existing standards.
        </Callout>

        <h2 className="mt-8 text-black">4.1 UDRMV Core Principles</h2>

        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <h3 className="text-black">4.1.1 Evidence First, Claims Later: A Mandate for Scientific Rigor</h3>
          <p className="mt-3 text-black">
            The integrity of carbon markets hinges on a fundamental shift in crediting methodology. The Mālama system replaces speculative, "opinion-based," or "model-first" crediting with a stringent mandate: raw, verifiable evidence must unequivocally precede any carbon claim.
          </p>
          <p className="mt-3 text-black">This "evidence-first" approach is built upon:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li>Real Measurements from In-Situ Sampling</li>
            <li>Satellite Corroboration and Remote Sensing</li>
            <li>Repeated, Systematic Sampling and Monitoring</li>
            <li>Automated Consistency and Anomaly Checks</li>
            <li>Fully Open Methodology and Logic</li>
          </ul>
        </Card>

        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <h3 className="text-black">4.1.2 Universal Data Architecture: Ensuring Integrity and Interoperability</h3>
          <p className="mt-3 text-black">
            The cornerstone of the Mālama platform's reliability and scalability is a meticulously defined, Universal Data Architecture.
          </p>
          <p className="mt-3 text-black">The canonical data flow within the Mālama architecture:</p>
          <CodeBlock>
{`AIO → AIM → ImpactClaims → Checkpoints → DataPackages → ProcessedClaims → CRUs`}
          </CodeBlock>
          <div className="mt-4 space-y-3 text-black">
            <p><strong>AIO (Asset and Input Origin):</strong> The initial record detailing the physical asset and verifiable inputs.</p>
            <p><strong>AIM (Asset and Input Measurement):</strong> The raw, time-series data captured from the physical world.</p>
            <p><strong>ImpactClaims:</strong> The initial, unverified assertions of environmental benefit.</p>
            <p><strong>Checkpoints:</strong> Pre-defined milestones for formal review.</p>
            <p><strong>DataPackages:</strong> Cryptographically sealed collection of relevant data.</p>
            <p><strong>ProcessedClaims:</strong> Successfully validated and certified claims.</p>
            <p><strong>CRUs (Certified Restoration Units):</strong> The final, tradable digital asset.</p>
          </div>
        </Card>

        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <h3 className="text-black">4.1.3 Transparent Uncertainty, Not Hidden Assumptions</h3>
          <p className="mt-3 text-black">
            UDRMV requires explicit, machine-readable documentation for every measurement and calculation:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li><strong>Uncertainty Intervals:</strong> The range within which the true value is expected to lie</li>
            <li><strong>Confidence Levels:</strong> The probability that the true value falls within the reported interval</li>
            <li><strong>Data Frequency:</strong> The temporal resolution of the source data</li>
            <li><strong>Calibration History:</strong> A verifiable record of instrument calibration</li>
            <li><strong>Anomaly Flags:</strong> Indicators that signal unusual events during data collection</li>
          </ul>
          <Callout type="success">
            Every Mālama Verified Credit (VC) token stores these fields directly within its metadata, ensuring transparency is intrinsic to the token itself.
          </Callout>
        </Card>

        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <h3 className="text-black">4.1.4 Continuous Verification, Not Periodic Audits</h3>
          <p className="mt-3 text-black">
            The Mālama Project fundamentally shifts the paradigm from outdated, periodic audits to a system of continuous verification leveraging ubiquitous sensor data, satellite imagery, and advanced data analytics.
          </p>
          <p className="mt-3 text-black">This enables several critical functions:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li><strong>Temporal Anomaly Detection:</strong> Instant flagging of unusual changes</li>
            <li><strong>System Drift Identification:</strong> Automatic recalibration of models</li>
            <li><strong>Near-Real-Time Carbon Accounting:</strong> Up-to-the-minute assessment</li>
            <li><strong>Automated Early Warnings:</strong> Proactive alerts for emerging risks</li>
            <li><strong>More Reliable Quantification:</strong> Precise tracking of reversals and risks</li>
          </ul>
        </Card>

        <Diagram 
          title="UDRMV Data Flow Architecture" 
          description="Placeholder for visualization showing the complete data flow from sensors and satellites through AI processing to final CRU issuance"
        />
      </section>

      {/* Token Architecture & Digital Integrity */}
      <section id="token-architecture" className="scroll-mt-24">
        <h1 className="text-black">5. Token Architecture & Digital Integrity</h1>
        <h2 className="text-black">A Four-Token System for Scientific Accuracy, Market Clarity, and Cultural Stewardship</h2>
        
        <p className="mt-4 text-black">
          Mālama Labs has engineered a sophisticated four-token digital architecture specifically designed to eliminate the systemic ambiguities that plague the voluntary carbon market and environmental finance at large.
        </p>

        <Callout type="info">
          This clear, non-overlapping design ensures that every digital asset represents a singular, verifiable truth. The structure is fully compliant with and directly aligns with the InterWork Alliance (IWA) Token Taxonomy Framework.
        </Callout>

        <h3 className="mt-8 text-black">5.1 LC – Liquid Carbon (Pre-Verified Unit)</h3>
        
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-black">Core Definition</h4>
            <Badge variant="outline">τF{'{t,e,v,m,c}'} – Fungible</Badge>
          </div>
          <p className="text-black">
            The LC token acts as the financial equivalent of a ProcessedClaim-derived Unit within a secure, unified digital registry. This instrument ensures that project financing is accessible immediately upon the successful generation and processing of impact data.
          </p>
          
          <div className="mt-6">
            <h4 className="text-black mb-3">Key Integrity Properties:</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="text-black"><strong>Revokable:</strong></p>
                <p className="text-sm text-gray-600 mt-1">If final verification yields a lower quantity than the initial ProcessedClaim, corresponding LC tokens are destroyed. This prevents unverified claims from persisting in markets.</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="text-black"><strong>Measurable:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Each token is linked to specific underlying impact data, including quantified uncertainty intervals and precise methodology version.</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="text-black"><strong>Non-Retirable:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Cannot be used as an offset or environmental claim. Full separation of finance and environmental use prevents double-claiming.</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="text-black"><strong>Time-Limited:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Strict LC → VC conversion deadlines programmed into smart contracts ensure verification progression and prevent indefinite circulation.</p>
              </div>
            </div>
          </div>
        </Card>

        <h3 className="mt-8 text-black">5.2 VC – Verified Carbon (Final CRU Credit)</h3>
        
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-black">The Institutional-Grade Digital Asset</h4>
            <Badge variant="outline">τN{'{d,t,e,v,g,m,b}'} – Non-Fungible with divisibility</Badge>
          </div>
          <p className="text-black">
            The VC token is the core asset of the Mālama protocol, engineered to be the definitive, high-integrity foundation for the next generation of global digital carbon markets.
          </p>
          
          <div className="mt-6">
            <h4 className="text-black mb-3">Core Asset Specifications:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-black"><strong>Token Type (TTF):</strong></p>
                <p className="text-sm text-gray-600 mt-1">Non-Fungible, Divisible with rich metadata for unique identity and market sorting</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-black"><strong>IWA Equivalent:</strong></p>
                <p className="text-sm text-gray-600 mt-1">CRU (Carbon Removal/Reduction Unit)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-black"><strong>Verification:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Dual-layer approval: UDRMV compliance + IWA Digital MRV v3 independent verification</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-black"><strong>Divisibility:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Supports precision to 1e-4 to 1e-6 of a single tCO₂e</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-black mb-3">Technical Properties:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li>Complete and Traceable Provenance</li>
              <li>Explicit Durability Class Encoding</li>
              <li>Burnable for Retirement (provides cryptographic proof)</li>
              <li>Paris Agreement Compatibility (ITMO/Corresponding Adjustment fields)</li>
            </ul>
          </div>
        </Card>

        <h3 className="mt-8 text-black">5.3 KANU – Co-Benefit & Impact Token</h3>
        
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-black">Verified Co-Benefit Attestation</h4>
            <Badge variant="outline">τN{'{~d,~t,g}'} – Non-Fungible, Non-Transferable</Badge>
          </div>
          <p className="text-black">
            KANU is a specialized digital asset that provides an immutable and verifiable record of project benefits extending beyond standard carbon mitigation.
          </p>
          
          <div className="mt-6">
            <h4 className="text-black mb-3">Purpose and Scope:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li>Indigenous Stewardship and Governance</li>
              <li>Soil Regeneration and Agricultural Resilience</li>
              <li>Watershed and Aquifer Protection</li>
              <li>Biodiversity Enhancement and Habitat Restoration</li>
              <li>UN SDG Contributions</li>
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-black mb-3">Core Properties:</h4>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-300 pl-4">
                <p className="text-black"><strong>Non-Transferable:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Explicitly designed to prevent financial speculation. Value resides solely in attestation of achieved outcomes.</p>
              </div>
              <div className="border-l-4 border-blue-300 pl-4">
                <p className="text-black"><strong>Linked to Verified Carbon:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Cryptographically tied to corresponding VC, ensuring co-benefits are associated with measurable climate mitigation.</p>
              </div>
              <div className="border-l-4 border-blue-300 pl-4">
                <p className="text-black"><strong>Evidence-Based & Immutable:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Data-driven creation with comprehensive quantitative and qualitative inputs, permanently anchored to UDRMV.</p>
              </div>
            </div>
          </div>
        </Card>

        <h3 className="mt-8 text-black">5.4 PONO – Governance & Stewardship Token</h3>
        
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-black">Codifying Responsibility and Expertise</h4>
            <Badge variant="outline">τF{'{g,e,r}'} – Fungible, Encumbered, Role-Based</Badge>
          </div>
          <p className="text-black">
            The PONO Token is the core governance asset for the Mālama network. It transcends a simple voting mechanism to become a cryptographic representation of verified expertise, inherent responsibility, and deep cultural commitment.
          </p>
          
          <div className="mt-6">
            <h4 className="text-black mb-3">Core Mandate:</h4>
            <p className="text-black">
              Ensure all network governance is anchored in three non-negotiable principles:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4 text-black">
              <li><strong>Scientific Integrity:</strong> All decisions rooted in verifiable, peer-reviewed science</li>
              <li><strong>Cultural Stewardship:</strong> Respect for Indigenous rights and traditional ecological knowledge</li>
              <li><strong>Long-Term Climate Benefit:</strong> Actions that enhance durable carbon value and ecological resilience</li>
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-black mb-3">Architectural Properties:</h4>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>Transfer-Restricted (Encumbered):</strong></p>
                <p className="text-sm text-gray-600 mt-1">Intentionally illiquid with multi-year vesting schedules and reputation-based slashing mechanisms. Prevents speculation and hostile takeovers.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>Role-Based Allocation:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Assigned to vetted participants: Methodology Stewards, Validators/Auditors, Council Members.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>Deliberative Utility:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Required for high-stakes decisions: Methodology approvals, Verifier credentialing, Protocol upgrades.</p>
              </div>
            </div>
          </div>
        </Card>

        <Callout type="success">
          <strong>Key Takeaway:</strong> All four tokens serve clear, non-overlapping roles. This architecture aligns directly with the IWA Token Taxonomy Framework for interoperability and institutional adoption.
        </Callout>
      </section>

      {/* Digital Methodologies: ExtensionSets */}
      <section id="digital-methodologies" className="scroll-mt-24">
        <h1 className="text-black">6. Digital Methodologies: ExtensionSets</h1>
        <h2 className="text-black">Turning Scientific Standards Into Executable Code</h2>
        
        <p className="mt-4 text-black">
          In the paradigm of legacy systems, core methodologies are typically confined to static PDF documents. This reliance on non-executable standards inevitably leads to ambiguity, subjective interpretation, and inconsistency.
        </p>

        <p className="mt-4 text-black">
          The advent of the UDRMV platform fundamentally transforms this landscape. In UDRMV, methodologies are digitized, versioned, and modularized into executable smart contracts called <strong>ExtensionSets</strong>.
        </p>

        <h3 className="mt-6 text-black">What is an ExtensionSet?</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <p className="text-black">
            An ExtensionSet is a self-contained, auditable digital module that rigorously encodes all necessary scientific and operational requirements.
          </p>
          <div className="mt-4">
            <p className="text-black mb-2"><strong>Each ExtensionSet captures:</strong></p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li>Required Data Inputs</li>
              <li>Required Sensors / Sampling Frequency</li>
              <li>Calculation Models</li>
              <li>Uncertainty Propagation Logic</li>
              <li>Reversal-Risk Mitigation Requirements</li>
              <li>Durability Classification</li>
              <li>Required Lab Tests</li>
              <li>Approved Satellite Products</li>
            </ul>
          </div>
        </Card>

        <Callout type="info">
          This digital enforcement mechanism means that every single project registered on the UDRMV must formally reference a specific ExtensionSet version, ensuring standardized science, transparent logic, and safe updates.
        </Callout>

        <h3 className="mt-8 text-black">6.1 ExtensionSet.Malama.Biochar.v1</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <h4 className="text-black">Protocol for Biochar Carbon Sequestration</h4>
          
          <div className="mt-4">
            <h5 className="text-black mb-3">Required Data for MRV:</h5>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Pyrolysis/Gasification Reactor Data (Continuous):</strong></p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1 ml-4">
                  <li>Kiln Temperature Curves (continuous high-frequency readings)</li>
                  <li>Reactor Run Logs (start/stop times, throughput, maintenance)</li>
                  <li>Energy Input/Output metering</li>
                </ul>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Feedstock and Input Characterization:</strong></p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1 ml-4">
                  <li>Feedstock Moisture and Composition analysis</li>
                  <li>Mass Balance Across All Stages</li>
                </ul>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Biochar Product Quality:</strong></p>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1 ml-4">
                  <li>Ash Content measurement</li>
                  <li>pH, EC, Fixed Carbon Content (certified lab analysis)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h5 className="text-black mb-3">Verification Logic:</h5>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li>AI-Based Temperature Anomaly Detection</li>
              <li>Stability Class Assignment (IBI/EBC-Aligned)</li>
              <li>Carbon Fraction Estimation</li>
              <li>Uncertainty Propagation</li>
              <li>Reversals Buffer Calculation</li>
            </ul>
          </div>

          <div className="mt-6">
            <h5 className="text-black mb-3">Permanence:</h5>
            <div className="flex gap-2">
              <Badge>100-Year Default Durability</Badge>
              <Badge variant="outline">Reversal-Risk Mitigation Plan Mandatory</Badge>
            </div>
          </div>
        </Card>

        <h3 className="mt-8 text-black">6.2 ExtensionSet.Malama.ERW.v1</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <h4 className="text-black">Enhanced Rock Weathering (ERW) MRV Protocol</h4>
          
          <div className="mt-4">
            <h5 className="text-black mb-3">Required Data:</h5>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Mineralogical Composition (XRD):</strong></p>
                <p className="text-sm text-gray-600 mt-1">High-resolution analysis to identify and quantify mineral phases</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Particle Size Distribution:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Complete analysis for effective surface area determination</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Application Rate per Hectare:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Precise, spatially explicit mass tracking</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Soil Parameters:</strong></p>
                <p className="text-sm text-gray-600 mt-1">pH, Soil Organic Carbon (SOC), Cation Exchange Capacity (CEC)</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Hydrological Profiles:</strong></p>
                <p className="text-sm text-gray-600 mt-1">Water flow paths, infiltration rates, moisture content</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Satellite Overlays:</strong></p>
                <p className="text-sm text-gray-600 mt-1">High-resolution moisture and vegetation monitoring</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h5 className="text-black mb-3">Verification Logic:</h5>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li>Mass Balance Modeling (geochemical tracking)</li>
              <li>Modeled + Measured Alkalinity Flux reconciliation</li>
              <li>Surface Weathering Signatures analysis</li>
              <li>Dissolution Rate Calibration</li>
              <li>AI-Driven Anomaly Detection</li>
            </ul>
          </div>

          <div className="mt-6">
            <h5 className="text-black mb-3">Permanence:</h5>
            <div className="flex gap-2">
              <Badge>1,000+ Year Durability</Badge>
              <Badge variant="outline">Model Uncertainty Explicitly Recorded</Badge>
            </div>
          </div>
        </Card>

        <h3 className="mt-8 text-black">6.3 Roadmap for New Methodologies</h3>
        <p className="mt-4 text-black">
          The Mālama Project is committed to expanding its portfolio of recognized methodologies. Prospective new methodologies include:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Direct Air Capture (DAC)</h4>
            <p className="text-sm text-gray-600 mt-2">
              High-tech CDR using chemical processes to capture CO₂ from ambient air with permanent geologic storage.
            </p>
          </Card>
          
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Ocean Alkalinity Enhancement (OAE)</h4>
            <p className="text-sm text-gray-600 mt-2">
              Marine-based CDR adding alkaline minerals to ocean to accelerate natural carbon sink capacity.
            </p>
          </Card>
          
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">BECCS</h4>
            <p className="text-sm text-gray-600 mt-2">
              Bioenergy with Carbon Capture and Storage - sustainable biomass for energy with CO₂ capture.
            </p>
          </Card>
          
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Agroforestry + Soil Carbon</h4>
            <p className="text-sm text-gray-600 mt-2">
              Integrating trees with crops/livestock and soil carbon sequestration practices.
            </p>
          </Card>
          
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Blue Carbon</h4>
            <p className="text-sm text-gray-600 mt-2">
              Carbon sequestered in coastal ecosystems - mangroves, tidal marshes, seagrass meadows.
            </p>
          </Card>
        </div>

        <Callout type="tip">
          Each new methodology, once fully developed and vetted, is formalized as an ExtensionSet through the PONO governance framework, ensuring scientific validity and stakeholder consultation.
        </Callout>
      </section>

      {/* Technical Architecture & Cardano Integration */}
      <section id="technical-architecture" className="scroll-mt-24">
        <h1 className="text-black">7. Technical Architecture & Cardano Integration</h1>
        <h2 className="text-black">The Digital Infrastructure for Continuous Verification</h2>
        
        <p className="mt-4 text-black">
          Mālama's architecture is designed as a three-layer system:
        </p>

        <Diagram 
          title="Three-Layer Architecture" 
          description="Placeholder for architecture diagram showing Layer 1 (Evidence), Layer 2 (Verification & Registry), and Layer 3 (Blockchain Settlement)"
        />

        <h3 className="mt-8 text-black">7.1 Layer 1 – Evidence Layer (UDRMV Data Infrastructure)</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <p className="text-black">
            The Evidence Layer serves as the foundational data pipeline for the entire Mālama system, designed to ingest, process, and validate raw environmental and project data.
          </p>
          
          <div className="mt-4">
            <h4 className="text-black mb-3">Components and Workflow:</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-0.5">1</div>
                <div>
                  <p className="text-black"><strong>Sensor Ingestion Pipelines</strong></p>
                  <p className="text-sm text-gray-600">Real-time data from IoT sensors and monitoring stations</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-0.5">2</div>
                <div>
                  <p className="text-black"><strong>Satellite Imagery Ingestion + Preprocessing</strong></p>
                  <p className="text-sm text-gray-600">High-resolution multispectral and SAR imagery processing</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-0.5">3</div>
                <div>
                  <p className="text-black"><strong>DataPackage Formatting + Manifest Generation</strong></p>
                  <p className="text-sm text-gray-600">Standardization and cryptographic summary creation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-0.5">4</div>
                <div>
                  <p className="text-black"><strong>Automated Quality Checks (AQC)</strong></p>
                  <p className="text-sm text-gray-600">Validation tests, consistency analysis, outlier detection</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-0.5">5</div>
                <div>
                  <p className="text-black"><strong>AI Processing + Anomaly Detection</strong></p>
                  <p className="text-sm text-gray-600">ML models for metric extraction and pattern analysis</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-0.5">6</div>
                <div>
                  <p className="text-black"><strong>ImpactClaim Construction</strong></p>
                  <p className="text-sm text-gray-600">Synthesis of validated metrics into structured claims</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0 mt-0.5">7</div>
                <div>
                  <p className="text-black"><strong>ProcessedClaim Generation</strong></p>
                  <p className="text-sm text-gray-600">Cryptographic signing for on-chain submission</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <h3 className="mt-8 text-black">7.2 Layer 2 – Verification & Registry Layer</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <p className="text-black">
            This layer is the operational core of the Mālama Protocol, serving as the trusted engine for asset creation, conversion, and issuance.
          </p>
          
          <div className="mt-4">
            <h4 className="text-black mb-3">Core Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li><strong>LC Minting:</strong> Initial creation of Liquid Credit tokens</li>
              <li><strong>LC→VC Conversion:</strong> Transformation to Verified Credits after validation</li>
              <li><strong>Reversal Risk Buffers:</strong> Management of shared risk pool</li>
              <li><strong>KANU Issuance Logic:</strong> Distribution mechanics for co-benefit tokens</li>
              <li><strong>Methodology Version Locking:</strong> Permanent linkage to specific methodology versions</li>
              <li><strong>Validator Workflows:</strong> State transition management through verification process</li>
            </ul>
          </div>
        </Card>

        <h3 className="mt-8 text-black">7.3 Layer 3 – Blockchain Settlement Layer (Cardano)</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <p className="text-black">
            Cardano serves as the foundational Blockchain Settlement Layer, providing a secure, decentralized, and auditable ledger for critical project operations.
          </p>
          
          <div className="mt-4">
            <h4 className="text-black mb-3">Cardano Functions:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Token Minting</strong></p>
                <p className="text-sm text-gray-600 mt-1">LC, VC, KANU, PONO token creation</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Retirement Records</strong></p>
                <p className="text-sm text-gray-600 mt-1">Immutable burning/retirement of VCs</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Registry Anchoring</strong></p>
                <p className="text-sm text-gray-600 mt-1">Metadata and hash commitments</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Oracle Data Commitments</strong></p>
                <p className="text-sm text-gray-600 mt-1">Cryptographic data commitments</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Governance Votes</strong></p>
                <p className="text-sm text-gray-600 mt-1">KANU holder voting records</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-black mb-3">Why Cardano?</h4>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li><strong>Extended UTxO (eUTxO) Model:</strong> Deterministic validation with higher security</li>
              <li><strong>Native Assets Integration:</strong> Tokens managed at protocol level</li>
              <li><strong>First-Class Multi-Asset Design:</strong> Equal treatment of all tokens</li>
              <li><strong>Low Fees:</strong> Optimized for high-volume micro-transactions</li>
              <li><strong>Robust Governance Roadmap:</strong> Research-driven decentralization (Voltaire era)</li>
              <li><strong>Open-Source Foundation:</strong> Formal verification and peer-reviewed protocols</li>
            </ul>
          </div>
        </Card>

        <h3 className="mt-8 text-black">7.4 Aiken Smart Contract Architecture</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <p className="text-black">
            The Mālama Project leverages a robust and modular smart contract architecture, built on the Aiken language for Cardano, to provide a decentralized and auditable assurance layer.
          </p>
          
          <div className="mt-4">
            <h4 className="text-black mb-3">Core Modules:</h4>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>LC_Minting.aiken</strong></p>
                <p className="text-sm text-gray-600 mt-1">Manages creation of Mālama Carbon Credits with methodology compliance checks</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>VC_Issuance.aiken</strong></p>
                <p className="text-sm text-gray-600 mt-1">Governs digital Verifiable Credentials issuance and registration</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>KANU_Attestation.aiken</strong></p>
                <p className="text-sm text-gray-600 mt-1">Links off-chain MRV data to on-chain contracts with cryptographic commitments</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>PONO_Governance.aiken</strong></p>
                <p className="text-sm text-gray-600 mt-1">Manages decentralized governance framework and rule enforcement</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>Retirement_Registry.aiken</strong></p>
                <p className="text-sm text-gray-600 mt-1">Oversees permanent removal of credits with auditable records</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-black"><strong>Oracle_Verification.aiken</strong></p>
                <p className="text-sm text-gray-600 mt-1">Facilitates secure external data integration and validation</p>
              </div>
            </div>
          </div>

          <Callout type="success">
            This modular architecture bridges the gap between complex climate science and blockchain immutability, ensuring every transaction produces on-chain hashes of MRV data, signature requirements, and methodology versioning.
          </Callout>
        </Card>
      </section>

      {/* Governance, Risk, and Compliance */}
      <section id="governance" className="scroll-mt-24">
        <h1 className="text-black">8. Governance, Risk, and Compliance</h1>
        
        <p className="mt-4 text-black">
          Carbon markets must serve the public interest, operating with the highest levels of integrity, transparency, and accountability to deliver genuine, verifiable climate impact.
        </p>

        <p className="mt-4 text-black">
          Mālama governs its activities via three reinforcing mechanisms:
        </p>

        <div className="space-y-6 mt-6">
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h3 className="text-black">Transparent, Multi-Stakeholder Oversight</h3>
            <p className="mt-3 text-black">
              Governance is distributed across environmental non-profits, indigenous community representatives, scientific experts, and market participants. All major policy decisions are subject to public comment and documented in a publicly accessible governance ledger.
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h3 className="text-black">Risk Management Framework (RMF)</h3>
            <p className="mt-3 text-black">Comprehensive framework addressing:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4 text-black">
              <li><strong>Systemic Market Risk:</strong> Circuit breakers and stability mechanisms</li>
              <li><strong>Methodological Integrity Risk:</strong> Continuous independent auditing</li>
              <li><strong>Socio-Environmental Risk:</strong> FPIC and biodiversity protection</li>
              <li><strong>Operational Security Risk:</strong> Industry-leading security protocols</li>
            </ul>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h3 className="text-black">Mandatory Compliance and Enforcement</h3>
            <p className="mt-3 text-black">
              All participants must adhere to a strict Code of Conduct. A dedicated Compliance and Ethics Committee oversees enforcement with clearly defined sanctions for non-compliance.
            </p>
          </Card>
        </div>

        <h2 className="mt-8 text-black">8.1 Governance: PONO-Led Decision-Making</h2>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <h3 className="text-black">PONO Holder Participation</h3>
          <p className="mt-3 text-black">PONO holders vote on and ratify decisions across key areas:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li>Approving New Methodologies</li>
            <li>Modifying Reversal-Risk Logic</li>
            <li>Accrediting Validation/Verification Bodies (VVBs)</li>
            <li>Adjusting Uncertainty Windows</li>
            <li>Managing Community Benefit Frameworks</li>
          </ul>

          <div className="mt-6">
            <h4 className="text-black mb-3">Core Design Principles:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded text-center">
                <p className="text-black">Scientific Integrity</p>
              </div>
              <div className="p-4 bg-gray-50 rounded text-center">
                <p className="text-black">Long-Term Safety</p>
              </div>
              <div className="p-4 bg-gray-50 rounded text-center">
                <p className="text-black">Inclusion of Land Stewards</p>
              </div>
            </div>
          </div>
        </Card>

        <h2 className="mt-8 text-black">8.2 Compliance with Global Standards</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">IWA Digital MRV v3</h4>
            <p className="text-sm text-gray-600 mt-2">Digital-native verification standards</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">IWA Token Taxonomy Framework</h4>
            <p className="text-sm text-gray-600 mt-2">Standardized digital token structure</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">ICVCM Core Carbon Principles</h4>
            <p className="text-sm text-gray-600 mt-2">High-integrity carbon credit standards</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">ISO 14064, 14065, 14067</h4>
            <p className="text-sm text-gray-600 mt-2">GHG quantification and verification</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Paris Agreement Article 6.2 & 6.4</h4>
            <p className="text-sm text-gray-600 mt-2">ITMO generation and transfer</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">UN SDG Framework</h4>
            <p className="text-sm text-gray-600 mt-2">Sustainable development reporting</p>
          </Card>
        </div>

        <h2 className="mt-8 text-black">8.3 Reversal-Risk Modeling & Dynamic Buffer Management</h2>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <p className="text-black">
            The platform implements a sophisticated, evidence-based system for managing reversal risk through:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-4 text-black">
            <li><strong>Risk-Adjusted Buffers:</strong> Project-specific assessment of reversal threats</li>
            <li><strong>Real-Time Threat Tracking:</strong> Continuous monitoring of permanence risks</li>
            <li><strong>Satellite Hazard Detection:</strong> Live updates trigger risk re-evaluation</li>
            <li><strong>Surplus Token Maintenance:</strong> Secure buffer pool for verified reversals</li>
          </ul>
        </Card>

        <h2 className="mt-8 text-black">8.4 Verification Security & Fraud Prevention</h2>
        <div className="space-y-4 mt-4">
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <p className="text-black"><strong>Cryptographic Manifests:</strong></p>
            <p className="text-sm text-gray-600 mt-1">Tamper-evident chains with immutable records</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <p className="text-black"><strong>Tamper-Resistant Sensors:</strong></p>
            <p className="text-sm text-gray-600 mt-1">IoT devices with secure enclave computing</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <p className="text-black"><strong>Oracle Attestations:</strong></p>
            <p className="text-sm text-gray-600 mt-1">Decentralized verification of external data</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <p className="text-black"><strong>Validator Staking + Reputation:</strong></p>
            <p className="text-sm text-gray-600 mt-1">Collateral and slashing for honest behavior</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <p className="text-black"><strong>On-Chain Audit Logs:</strong></p>
            <p className="text-sm text-gray-600 mt-1">Transparent, permanent verification records</p>
          </Card>
          <Card className="p-4 bg-[rgba(255,255,255,1)] border-gray-200">
            <p className="text-black"><strong>Dual Human + AI Verification:</strong></p>
            <p className="text-sm text-gray-600 mt-1">Hybrid model combining efficiency and expertise</p>
          </Card>
        </div>
      </section>

      {/* Use Cases, Pilots & Real-World Applications */}
      <section id="use-cases" className="scroll-mt-24">
        <h1 className="text-black">9. Use Cases, Pilots & Real-World Applications</h1>
        <h2 className="text-black">Demonstrating MRV-First Carbon Integrity in Action</h2>

        <h3 className="mt-6 text-black">9.1 Hawaiʻi Biochar Program</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <h4 className="text-black">Enhanced Carbon Removal and Community Stewardship</h4>
          
          <div className="mt-4">
            <p className="text-black mb-3"><strong>Program Pillars:</strong></p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>High-Resolution Kiln Telemetry</strong></p>
                <p className="text-sm text-gray-600 mt-1">Real-time monitoring of temperature profiles, residence time, and gas flow rates ensuring maximum carbon stability</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Feedstock Tracking at Farm-Level</strong></p>
                <p className="text-sm text-gray-600 mt-1">Blockchain-enabled tracking ensuring sustainability, additionality, and co-benefit verification</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Local Community Employment</strong></p>
                <p className="text-sm text-gray-600 mt-1">Decentralized production model creating jobs, capacity building, and exploring co-operative ownership</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-black mb-3"><strong>Enhanced Co-benefits under KANU:</strong></p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-black">
              <li>Soil Fertility and Health improvements</li>
              <li>Fire Mitigation through fuel load reduction</li>
              <li>Water Quality Improvement via biochar filtration</li>
            </ul>
          </div>

          <div className="mt-6">
            <Badge>Durable 100-Year Carbon Removal</Badge>
          </div>
        </Card>

        <h3 className="mt-8 text-black">9.2 Idaho Enhanced Rock Weathering (ERW) Pilot</h3>
        <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200 mt-4">
          <h4 className="text-black">Validating ERW as a Viable Carbon Drawdown Strategy</h4>
          
          <div className="mt-4">
            <p className="text-black mb-3"><strong>Key Features:</strong></p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Multi-Farm Deployment</strong></p>
                <p className="text-sm text-gray-600 mt-1">Capturing variability across soil types, microclimates, and management practices</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Full Mineralogy Profiling (XRD)</strong></p>
                <p className="text-sm text-gray-600 mt-1">Comprehensive analysis for accurate weathering quantification</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Calibrated Dissolution Models</strong></p>
                <p className="text-sm text-gray-600 mt-1">Geochemical models refined by in situ measurements</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>Satellite Monitoring</strong></p>
                <p className="text-sm text-gray-600 mt-1">Moisture dynamics and vegetation health tracking</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-black"><strong>KANU Soil Health Documentation</strong></p>
                <p className="text-sm text-gray-600 mt-1">Systematic verification of nutrient availability and microbial health improvements</p>
              </div>
            </div>
          </div>

          <Callout type="tip">
            This pilot forms the validation set for ExtensionSet.Malama.ERW.v1, the Mālama Project's protocol for Enhanced Rock Weathering MRV in agricultural systems.
          </Callout>
        </Card>

        <h3 className="mt-8 text-black">9.3 Multi-Methodology Future Portfolio</h3>
        <p className="mt-4 text-black">
          The Mālama Project is committed to developing a robust and diversified portfolio of carbon removal methodologies:
        </p>

        <div className="space-y-4 mt-6">
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Direct Air Capture (DAC) Integration</h4>
            <p className="mt-2 text-black">
              With Real-Time Energy Carbon Intensity monitoring to ensure net-negative operations and minimize carbon footprint
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Ocean Alkalinity Enhancement (OAE)</h4>
            <p className="mt-2 text-black">
              + Alkalinity Plume Modeling for accurate tracking of durability and distribution
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Nature-Based Methodologies</h4>
            <p className="mt-2 text-black">
              With Satellite-First Verification using AI/ML for automated monitoring and reduced costs
            </p>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black">Forestry Projects</h4>
            <p className="mt-2 text-black">
              With Dynamic Permanence Risk Modeling replacing static buffers with real-time risk assessment
            </p>
          </Card>
        </div>
      </section>

      {/* Roadmap & Call to Action */}
      <section id="roadmap" className="scroll-mt-24">
        <h1 className="text-black">10. Roadmap & Call to Action</h1>
        <h2 className="text-black">Building the Digital Integrity Layer for the Carbon Economy</h2>
        
        <p className="mt-4 text-black">
          The next 36 months are undeniably the most critical period that will define the fundamental structure and long-term viability of the global carbon markets.
        </p>

        <Callout type="warning">
          This timeframe represents a singular opportunity to transition from nascent, fragmented systems to a mature, verifiable, and globally interoperable economic framework.
        </Callout>

        <p className="mt-6 text-black">
          Mālama's comprehensive roadmap is purposefully designed not just to participate in this future, but to architect it. Our objective is to deploy the world's first industrial-scale, evidence-first digital MRV infrastructure.
        </p>

        <Diagram 
          title="36-Month Roadmap Timeline" 
          description="Placeholder for timeline visualization showing three 12-month phases with key milestones and deliverables"
        />

        <h3 className="mt-8 text-black">10.1 12-Month Roadmap (2025–2026)</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">UDRMV v1.0 full release</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">ExtensionSet.Biochar.v1 + ERW.v1 public release</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">LC→VC engine + audit dashboard</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Cardano registry + retirement contracts</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">KANU prototype deployments</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black mb-3">Partnerships</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Project developer onboarding (Hawaiʻi, Idaho, LATAM, Africa)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Carbon rating agency integrations</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Article 6 pilot integrations</span>
              </li>
            </ul>
          </Card>
        </div>

        <h3 className="mt-8 text-black">10.2 24-Month Roadmap (2026–2027)</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">UDRMV v2 (multi-methodology scaling)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">KANU 2.0 (fully structured co-benefit layer)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">PONO v2 (multi-stakeholder governance)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Risk modeling module with satellite hazard feeds</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black mb-3">Markets</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Institutional buyers + Fortune 100 integrations</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Sovereign digital MRV pilots</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Cross-chain credit bridges</span>
              </li>
            </ul>
          </Card>
        </div>

        <h3 className="mt-8 text-black">10.3 36-Month Roadmap (2027–2028)</h3>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">UDRMV Global Network (open APIs for registries)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Multi-methodology ExtensionSet marketplace</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Native Article 6 registry integrations</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-black">Global Stewardship Council for PONO governance</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-[rgba(255,255,255,1)] border-gray-200">
            <h4 className="text-black mb-3">Market Vision</h4>
            <p className="text-sm text-black">
              Establishing a Universal Integrity Layer for a Regenerative Climate Economy
            </p>
            <ul className="list-disc list-inside space-y-1 mt-3 text-sm text-black ml-4">
              <li>Carbon Removal</li>
              <li>Land Regeneration</li>
              <li>Biodiversity</li>
              <li>Water Quality</li>
              <li>Ecological Restoration</li>
            </ul>
          </Card>
        </div>

        <Callout type="success">
          <strong>The Mālama Vision:</strong> To establish a singular, universal integrity layer that instills trust, transparency, and verifiability across the most critical dimensions of ecological health and climate action. Through this unified standard, Mālama becomes the operating system for a transparent, regenerative climate economy—the trusted infrastructure that connects capital, action, and verifiable results.
        </Callout>
      </section>
    </article>
  );
}
