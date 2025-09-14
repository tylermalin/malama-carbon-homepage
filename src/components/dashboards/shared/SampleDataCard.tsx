import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface SampleDataCardProps {
  title: string;
  data: any[];
  columns: Column[];
  className?: string;
}

export function SampleDataCard({ title, data, columns, className = '' }: SampleDataCardProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Verified': { variant: 'default' as const, className: 'bg-green-100 text-green-800 border-green-200' },
      'In Review': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      'Draft': { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800 border-gray-200' },
      'Available': { variant: 'default' as const, className: 'bg-green-100 text-green-800 border-green-200' },
      'Preview': { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800 border-blue-200' },
      'Allocated': { variant: 'default' as const, className: 'bg-blue-100 text-blue-800 border-blue-200' },
      'Retired': { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800 border-gray-200' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline' as const, className: '' };
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  return (
    <Card className={`border-none bg-card/80 backdrop-blur-sm shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No data available
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  {columns.map((column) => (
                    <th key={column.key} className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className="py-3 px-2 text-sm">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { SampleDataCard as default };
