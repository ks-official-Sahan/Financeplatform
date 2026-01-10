import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
  onClick?: () => void;
}

export function KPICard({ title, value, icon: Icon, trend, subtitle, onClick }: KPICardProps) {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`
        bg-card border border-border rounded-lg p-6 
        ${onClick ? 'hover:border-[var(--primary)] transition-all cursor-pointer' : ''}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">{title}</p>
          <p className="text-3xl font-semibold text-foreground mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-[var(--muted-foreground)]">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">vs last month</span>
            </div>
          )}
        </div>
        <div className="size-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
          <Icon className="size-6 text-[var(--primary)]" aria-hidden="true" />
        </div>
      </div>
    </Component>
  );
}
