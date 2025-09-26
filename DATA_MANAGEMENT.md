# Data Management System Documentation

## Overview

The Mālama Carbon Homepage includes a comprehensive data management system for handling market data, citations, and references. This system provides a transparent, auditable, and maintainable approach to content management.

## Architecture

### Core Components

1. **DataContext** (`src/context/DataContext.tsx`)
   - Centralized React context for data management
   - Provides KPIs, time series, and references to components
   - Type-safe with TypeScript

2. **SourcesDrawer** (`src/components/SourcesDrawer.tsx`)
   - Accessible citation management component
   - Built with Radix UI for accessibility
   - Supports external links and metadata

3. **Market Schema** (`src/lib/marketSchema.ts`)
   - Zod validation schemas for data integrity
   - Runtime type checking
   - Prevents invalid data from being exported

### Data Flow

```
src/data/market.local.ts (Authoritative Source)
           ↓
    npm run export:market
           ↓
public/data/market.json (Runtime Data)
           ↓
    DataContext Provider
           ↓
    Components (useData hook)
```

## Usage Guide

### 1. Editing Market Data

The authoritative source for all market data is `src/data/market.local.ts`. This file contains:

- **KPIs**: Key performance indicators with labels, values, and notes
- **Time Series**: Historical data points for charts and visualizations
- **References**: Citations and sources with metadata

```typescript
// Example: Adding a new KPI
kpis: [
  { 
    key: "new_metric_2025", 
    label: "New Metric 2025", 
    value: "100M+", 
    note: "Illustrative data" 
  }
]
```

### 2. Export Process

After editing the TypeScript file, run the export command:

```bash
npm run export:market
```

This command:
- Validates the data structure using Zod schemas
- Creates automatic backups of existing data
- Exports to `public/data/market.json`
- Updates the `generated_at` timestamp

### 3. Validation

Before exporting, validate your data:

```bash
npm run validate:market
```

This ensures your data structure is correct and prevents runtime errors.

### 4. Production Snapshots

Capture production data for auditing:

```bash
npm run snapshot:market
```

This creates timestamped snapshots in `public/data/_snapshots/`.

## Component Integration

### Using DataContext

```typescript
import { useData } from '../context/DataContext';

function MyComponent() {
  const { kpis, series, refs } = useData();
  
  // Access specific data
  const retirementKPI = kpis.find(k => k.key === 'retirements_h1_2025');
  const etsPriceSeries = series.find(s => s.key === 'eu_ets_price');
  
  return (
    <div>
      <h2>Market Overview</h2>
      <p>Retirements: {retirementKPI?.value}</p>
      {/* Render chart with etsPriceSeries.points */}
    </div>
  );
}
```

### Adding SourcesDrawer

```typescript
import SourcesDrawer from './SourcesDrawer';

function MyComponent() {
  const { refs } = useData();
  
  return (
    <div>
      <h2>Market Analysis</h2>
      <p>Content here...</p>
      
      <SourcesDrawer 
        citations={refs} 
        anchorLabel="View Sources"
        description="References for this analysis"
        title="Market Data Sources"
      />
    </div>
  );
}
```

## Data Types

### KPI (Key Performance Indicator)

```typescript
type KPI = {
  key: string;        // Unique identifier
  label: string;      // Display name
  value: string;      // Value (can include units, formatting)
  note?: string;      // Optional context or source note
};
```

### Time Series

```typescript
type SeriesPoint = {
  t: string;          // ISO date string
  v: number;          // Numeric value
};

type Series = {
  key: string;        // Unique identifier
  label: string;      // Display name
  unit?: string;      // Unit of measurement
  points: SeriesPoint[]; // Data points
};
```

### Citation

```typescript
type Citation = {
  id: string;         // Unique identifier
  title: string;      // Source title
  publisher?: string; // Publishing organization
  date?: string;      // Publication date
  url?: string;       // External link
  note?: string;      // Context or description
};
```

## Interactive Components

The timeline includes several interactive components that demonstrate the data system:

### PortraitPopover
- Displays key figures with biographical information
- Used for Ronald Coase and other important figures

### QuoteHighlight
- Shows important quotes with attribution
- Used for Brundtland Report and other key documents

### EUETSPriceLineChart
- D3-powered line chart for price visualization
- Uses time series data from the context

### MRVCompareSlider
- Interactive comparison of traditional vs digital MRV
- Demonstrates technology evolution

### HeadlineGallery
- Grid of news headlines with links
- Used for Guardian investigation and other media coverage

## Best Practices

### Data Management

1. **Always validate** before exporting
2. **Use descriptive keys** for easy identification
3. **Include notes** for context and sources
4. **Keep data current** with regular updates
5. **Document changes** in commit messages

### Component Development

1. **Use the useData hook** for accessing data
2. **Add SourcesDrawer** to components with external references
3. **Handle loading states** gracefully
4. **Provide fallbacks** for missing data
5. **Test with different data scenarios**

### Content Updates

1. **Edit TypeScript files** for data changes
2. **Run validation** before export
3. **Test locally** before deployment
4. **Document changes** for team members
5. **Use semantic versioning** for major updates

## Troubleshooting

### Common Issues

1. **Validation Errors**
   - Check data structure against schema
   - Ensure required fields are present
   - Verify data types match expectations

2. **Export Failures**
   - Check file permissions
   - Ensure backup directory exists
   - Verify TypeScript compilation

3. **Runtime Errors**
   - Check DataProvider is wrapping the app
   - Verify useData is used within provider
   - Ensure data is properly exported

### Debug Commands

```bash
# Validate data structure
npm run validate:market

# Check export process
npm run export:market

# Test data access
npm run dev
# Navigate to timeline page and check console
```

## Security Considerations

1. **Data Validation**: All data is validated using Zod schemas
2. **Type Safety**: TypeScript prevents many runtime errors
3. **Backup System**: Automatic backups prevent data loss
4. **Audit Trail**: Timestamped exports and snapshots
5. **Access Control**: Data files are in public directory (consider CDN)

## Performance

1. **Lazy Loading**: Data is loaded once and cached
2. **Efficient Updates**: Only changed data triggers re-renders
3. **Optimized Bundling**: Data is separated from code
4. **CDN Ready**: JSON files can be served from CDN
5. **Caching Headers**: Appropriate cache headers for data files

## Future Enhancements

1. **API Integration**: Connect to live data sources
2. **Real-time Updates**: WebSocket connections for live data
3. **Advanced Validation**: More sophisticated data rules
4. **Data Visualization**: Additional chart types and interactions
5. **Content Management**: Admin interface for non-technical users

---

For questions or issues with the data management system, please contact the development team or create an issue in the repository.
