import { Card, CardContent } from '../../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatCard({ value, label, trend, className = '' }: StatCardProps) {
  return (
    <Card className={`border-none bg-card/80 backdrop-blur-sm shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend.value > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.value > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
