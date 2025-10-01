# Mālama Carbon - Financials Page

## Overview

The Financials Page is a sleek, interactive presentation platform showcasing Mālama Carbon's financial performance, projections, and investment highlights.

## Features

### 📊 Key Metrics Dashboard
- **Total Revenue**: $7.2M (YTD 2025, +156%)
- **Credits Issued**: 128K (LC02 + VC02, +243%)
- **Active Projects**: 47 across 12 countries (+85%)
- **Average Credit Price**: $42 (VC02 Premium, +18%)

### 📈 Interactive Charts & Visualizations
1. **Overview Tab**
   - Revenue performance area chart (quarterly trends)
   - Revenue breakdown pie chart (by stream)
   - Key milestones timeline

2. **Revenue Tab**
   - Revenue vs. costs bar chart
   - Gross margin: 74%
   - Operating efficiency: 89%
   - Customer LTV: $485K

3. **Projections Tab**
   - 5-year revenue projections (conservative, moderate, optimistic scenarios)
   - Growth drivers
   - Market assumptions

4. **Credits Tab**
   - LC02 and VC02 volume trends
   - 104K LC02 credits issued
   - 45K VC02 credits certified
   - 43% conversion rate

### 🎯 Investment Highlights
- Global market leadership (15% biochar market share target by 2027)
- Technology moat (proprietary dMRV, 3 patents)
- Regulatory alignment (100% Article 6.4 compliant)
- Revenue scalability (74% margin)
- Strategic partnerships (8 Fortune 500 companies)
- Impact at scale (10M+ tCO2e by 2028)

## How to Access

### Option 1: Footer Navigation
1. Scroll to the bottom of any page
2. Look for the "Company" section in the footer
3. Click on "Financials"

### Option 2: Direct URL
Navigate to the financials page by setting the page state to `'financials'` in the navigation hook

### Option 3: Programmatic Navigation
```typescript
const { showFinancials } = useNavigation();
showFinancials(); // Navigate to financials page
```

## Design System

### Color Palette
- **Primary**: `#1B4332` (Deep Forest Green)
- **Secondary**: `#0A3D3F` (Ocean Teal)
- **Background**: `#FAFAF9` (Off-White)
- **Accent**: `#ECE6DA` (Sand Beige)

### Components Used
- Recharts for data visualization (Line, Area, Bar, Pie charts)
- Framer Motion for smooth animations
- Radix UI components (Cards, Tabs, Badges, Buttons)
- Responsive grid layouts

### Key Interactions
- Smooth scroll-triggered animations
- Tab-based navigation for different financial views
- Hover effects on cards and metrics
- Interactive charts with tooltips
- CTA buttons for investor contact

## Data Structure

### Revenue Data (Quarterly)
```typescript
{
  month: string;    // Q1 2024, Q2 2024, etc.
  revenue: number;  // In USD
  costs: number;    // In USD
  profit: number;   // In USD
}
```

### Projection Data (5-Year)
```typescript
{
  year: string;       // 2024, 2025, etc.
  conservative: number; // In millions USD
  moderate: number;     // In millions USD
  optimistic: number;   // In millions USD
}
```

### Credit Volume Data
```typescript
{
  month: string;  // Jan, Feb, etc.
  LC02: number;   // Liquid carbon credits (tCO2e)
  VC02: number;   // Verified carbon credits (tCO2e)
}
```

## Customization

To update financial data:
1. Edit `src/components/FinancialsPage.tsx`
2. Update the data arrays:
   - `revenueData` - Quarterly revenue/costs/profit
   - `projectionData` - 5-year projections
   - `creditVolumeData` - Monthly credit issuance
   - `revenueBreakdown` - Revenue stream percentages
   - `keyMetrics` - Top-level KPIs
   - `milestones` - Timeline achievements

## Use Cases

### For Investors
- Comprehensive financial overview
- Growth trajectory visualization
- Market opportunity assessment
- Request full investor deck

### For Partners
- Financial stability demonstration
- Scale and growth potential
- Market position and traction

### For Internal Presentations
- Board meetings
- Investor updates
- Strategic planning sessions
- Quarterly reviews

## Technical Details

**File Location**: `/src/components/FinancialsPage.tsx`

**Dependencies**:
- `recharts` - Chart library
- `motion/react` - Animation library
- `lucide-react` - Icon library
- Radix UI components

**Props**:
- `onNavigate: (section?: string) => void` - Navigate to home
- `onContact?: () => void` - Navigate to contact page

## Future Enhancements

- [ ] Real-time data integration
- [ ] Export to PDF functionality
- [ ] Custom date range filtering
- [ ] Interactive scenario modeling
- [ ] Integration with financial APIs
- [ ] Historical data comparison
- [ ] Quarterly report downloads

## Support

For questions or customization requests, contact the development team or refer to the main project documentation.

---

**Built with ❤️ by Mālama Labs**

