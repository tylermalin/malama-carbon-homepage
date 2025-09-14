import { Card, CardContent } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { CheckCircle } from 'lucide-react';

interface ProgressBlockProps {
  title: string;
  progress: number;
  items?: Array<{
    label: string;
    completed: boolean;
  }>;
  className?: string;
}

export function ProgressBlock({ title, progress, items = [], className = '' }: ProgressBlockProps) {
  return (
    <Card className={`border-none bg-card/80 backdrop-blur-sm shadow-lg ${className}`}>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {items.length > 0 && (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle 
                  className={`w-4 h-4 ${item.completed ? 'text-primary' : 'text-muted-foreground'}`} 
                />
                <span className={`text-sm ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
