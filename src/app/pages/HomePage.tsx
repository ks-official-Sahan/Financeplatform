import { Wallet, TrendingUp, TrendingDown, CheckSquare, Plus, Receipt, CreditCard, FileText, Banknote } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/ui/button-variants';
import { kpiData, recentActivity } from '../data/mockData';
import type { RecentActivity } from '../types';

interface HomePageProps {
  onNavigate: (page: string, context?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-LK', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const quickActions = [
    { label: 'Create Invoice', icon: FileText, action: () => onNavigate('get-paid', { action: 'create-invoice' }) },
    { label: 'Receive Payment', icon: Banknote, action: () => onNavigate('get-paid', { action: 'receive-payment' }) },
    { label: 'Add Expense', icon: Receipt, action: () => onNavigate('spend', { action: 'add-expense' }) },
    { label: 'Make Payment', icon: CreditCard, action: () => onNavigate('spend', { action: 'make-payment' }) },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Welcome back!</h1>
        <p className="text-[var(--muted-foreground)]">
          Here's what's happening with your finances today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Cash & Bank"
          value={formatCurrency(kpiData.cashBankTotal)}
          icon={Wallet}
          subtitle="Total liquid assets"
          onClick={() => onNavigate('money')}
        />
        <KPICard
          title="Receivables Outstanding"
          value={formatCurrency(kpiData.arOutstanding)}
          icon={TrendingUp}
          subtitle="Amount owed to firm"
          onClick={() => onNavigate('get-paid')}
        />
        <KPICard
          title="Payables Outstanding"
          value={formatCurrency(kpiData.apOutstanding)}
          icon={TrendingDown}
          subtitle="Amount owed by firm"
          onClick={() => onNavigate('spend')}
        />
        <KPICard
          title="Pending Approvals"
          value={kpiData.approvalsPending}
          icon={CheckSquare}
          subtitle="Items awaiting review"
          onClick={() => onNavigate('approvals')}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.action}
                className="p-6 bg-card border border-border rounded-lg hover:border-[var(--primary)] hover:shadow-md transition-all text-left"
              >
                <div className="size-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <Icon className="size-6 text-[var(--primary)]" aria-hidden="true" />
                </div>
                <h3 className="font-medium text-foreground">{action.label}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => onNavigate('audit-log')}
          >
            View All
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-[var(--muted)]/50 transition-colors cursor-pointer"
              onClick={() => {
                // Navigate to appropriate detail view
                if (activity.type === 'Invoice') {
                  onNavigate('get-paid', { view: 'invoice-detail', id: activity.id });
                } else if (activity.type === 'Expense') {
                  onNavigate('spend', { view: 'expense-detail', id: activity.id });
                }
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusBadge status={activity.status} />
                    <span className="text-sm text-[var(--muted-foreground)]">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  <p className="font-medium text-foreground mb-1">
                    {activity.ref}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {activity.party} • {activity.workstream}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {formatCurrency(activity.amount)}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {activity.type}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
