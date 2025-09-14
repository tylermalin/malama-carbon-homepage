import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { FileX, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ 
  title, 
  description, 
  actionLabel = "Get Started", 
  onAction,
  className = '' 
}: EmptyStateProps) {
  return (
    <Card className={`border-none bg-card/80 backdrop-blur-sm shadow-lg ${className}`}>
      <CardContent className="p-12 text-center">
        <FileX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
        {onAction && (
          <Button onClick={onAction} className="hover:scale-105 transition-transform duration-300">
            <Plus className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
