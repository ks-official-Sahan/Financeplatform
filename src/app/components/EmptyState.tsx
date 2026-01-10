import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button-variants';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-12 text-center">
      <div className="size-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-6">
        <Icon className="size-8 text-[var(--primary)]" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[var(--muted-foreground)] mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
