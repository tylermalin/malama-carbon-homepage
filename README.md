# Mālama Carbon Homepage

A modern, responsive web application showcasing Mālama Labs' carbon credit platform and project management tools. Built with React, TypeScript, and Tailwind CSS.

## 🌱 About Mālama Labs

Mālama Labs is revolutionizing carbon markets through innovative technology and traditional Hawaiian land stewardship practices. Our platform provides:

- **Universal dMRV (Digital Measurement, Reporting, and Verification)** systems
- **Climate Intelligence Network** for real-time monitoring
- **Carbon Credit Studio** for project development
- **Automated credit creation, reporting, and monitoring**

## 🚀 Live Demo

- **Production Site**: https://malama-carbon-homepage-4giogl0uw-formlesscreature.vercel.app
- **Local Development**: http://localhost:3000

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── figma/           # Figma-specific components
│   ├── HeroSection.tsx  # Landing page hero
│   ├── TeamPage.tsx     # Team showcase
│   ├── ProjectGallery.tsx # Carbon project cards
│   ├── UnifiedCarbonTimeline.tsx # Interactive timeline
│   ├── SourcesDrawer.tsx # Citation management
│   └── ...
├── assets/              # Images and static assets
│   ├── malamalabslogo.png
│   ├── tyler headshopt.JPG
│   ├── Dominick.png
│   └── jeffrey.jpeg
├── context/             # React context providers
│   └── DataContext.tsx  # Centralized data management
├── data/                # Data sources
│   └── market.local.ts  # Authoritative market data
├── lib/                 # Utility libraries
│   └── marketSchema.ts  # Data validation schemas
├── types/               # TypeScript type definitions
│   └── market.ts        # Market data types
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── styles/              # Global styles

public/
└── data/                # Exported data files
    ├── market.json      # Runtime market data
    ├── _backups/        # Automatic backups
    └── _snapshots/      # Production snapshots

scripts/                 # Build and export scripts
├── export-market.ts     # Export TypeScript to JSON
└── snapshot-market.ts   # Capture production data
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tylermalin/malama-carbon-homepage.git
   cd malama-carbon-homepage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 👥 Team

### Founding Team

- **Tyler Malin** - Co-Founder & CEO
  - Environmental Science & Business background
  - Expertise in Carbon Markets, Strategic Leadership, Climate Technology

- **Dominick Garey** - Co-Founder & CTO  
  - Computer Science & Engineering background
  - Expertise in Blockchain Technology, dMRV Systems, Software Architecture

- **Jeffrey Wise** - Co-Founder & Head of Operations
  - Business Administration & Environmental Studies background
  - Expertise in Operations Management, Project Development, Community Relations

## 🌍 Featured Projects

### Hawai'i Food Forest Project
- **Developer**: 505 Farms LLC
- **Location**: Maui, Hawaiʻi
- **Type**: Biochar & Agroforestry
- **Status**: Coming Online Soon (Q4 2025)
- **Description**: Regenerative food forest integrating biochar production, agroforestry, and climate-smart practices

## 🎨 Design Features

- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Clean, professional interface
- **Interactive Components** - Smooth animations and transitions
- **Accessibility** - WCAG compliant components
- **Performance** - Optimized loading and rendering

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run export:market` - Export market data from TypeScript to JSON
- `npm run snapshot:market` - Capture current market data snapshot
- `npm run validate:market` - Validate market data structure

## 📦 Key Dependencies

- `react` - UI library
- `typescript` - Type safety
- `vite` - Build tool
- `tailwindcss` - Styling
- `@radix-ui/*` - UI primitives
- `framer-motion` - Animations
- `lucide-react` - Icons
- `recharts` - Data visualization
- `d3` - Data visualization
- `zod` - Schema validation
- `tsx` - TypeScript execution

## 📊 Data Management System

### SourcesDrawer & DataContext

The application includes a comprehensive data management system for handling market data, citations, and references:

#### **Components**

- **`SourcesDrawer`** - Accessible citation management component
- **`DataContext`** - Centralized data store for KPIs, time series, and references
- **`marketSchema`** - Zod validation for data integrity

#### **Data Flow**

1. **Authoritative Source**: `src/data/market.local.ts` (human-editable TypeScript)
2. **Export Process**: `npm run export:market` → `public/data/market.json`
3. **Runtime Access**: Components use `useData()` hook
4. **Validation**: Automatic schema validation with Zod

#### **Usage Examples**

```typescript
// Using DataContext in components
import { useData } from '../context/DataContext';

function MyComponent() {
  const { kpis, series, refs } = useData();
  // Access centralized data
}

// Adding SourcesDrawer to any component
import SourcesDrawer from './SourcesDrawer';

<SourcesDrawer 
  citations={refs} 
  anchorLabel="View Sources"
  description="References for this section"
/>
```

#### **Content Management Workflow**

1. **Edit Data**: Update `src/data/market.local.ts`
2. **Validate**: `npm run validate:market`
3. **Export**: `npm run export:market`
4. **Deploy**: Changes appear automatically

#### **Interactive Timeline Features**

- **60-Year Carbon Markets Timeline** with interactive events
- **PortraitPopover** for key figures (e.g., Ronald Coase)
- **QuoteHighlight** for important quotes
- **EUETSPriceLineChart** for price visualization
- **MRVCompareSlider** for technology comparisons
- **HeadlineGallery** for news coverage
- **CCPChecklist** for Core Carbon Principles

#### **Data Types**

```typescript
type KPI = { key: string; label: string; value: string; note?: string };
type SeriesPoint = { t: string; v: number };
type Series = { key: string; label: string; unit?: string; points: SeriesPoint[] };
type Citation = { id: string; title: string; publisher?: string; date?: string; url?: string; note?: string };
```

## 🌐 Deployment

This project is automatically deployed to Vercel on every push to the main branch.

- **Repository**: https://github.com/tylermalin/malama-carbon-homepage
- **Vercel Dashboard**: https://vercel.com/formlesscreature/malama-carbon-homepage

## 📄 License

This project is proprietary to Mālama Labs Inc. All rights reserved.

## 🤝 Contributing

This is a private project. For collaboration opportunities, please contact the team through our website.

## 📞 Contact

- **Website**: https://malama-carbon-homepage-4giogl0uw-formlesscreature.vercel.app
- **Email**: hello@malamalabs.com
- **Location**: Hawaiʻi

---

Built with ❤️ by the Mālama Labs team for a sustainable future.