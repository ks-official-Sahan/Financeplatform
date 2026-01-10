import { Users, DollarSign, Briefcase, AlertCircle } from 'lucide-react';

export function PeoplePage() {
  const features = [
    {
      title: 'Payroll Management',
      description: 'Process monthly salaries with tax calculations',
      icon: DollarSign,
      phase: 'Phase 5',
    },
    {
      title: 'EPF/ETF Tracking',
      description: 'Track and remit statutory contributions',
      icon: Briefcase,
      phase: 'Phase 5',
    },
    {
      title: 'Staff Loans',
      description: 'Manage employee advances and loans',
      icon: Users,
      phase: 'Phase 5',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">People</h1>
        <p className="text-[var(--muted-foreground)]">
          Payroll, EPF/ETF, and staff loan management
        </p>
      </div>

      {/* Phase Banner */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="size-6 text-blue-500" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-2">Phase 5 Feature</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              The People module is planned for Phase 5 of the implementation. This module will include
              comprehensive payroll processing, statutory contribution tracking (EPF/ETF), and staff loan management.
            </p>
            <div className="inline-flex px-3 py-1 bg-blue-500 text-white text-sm rounded-md">
              Coming in Phase 5
            </div>
          </div>
        </div>
      </div>

      {/* Planned Features */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Planned Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="size-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <Icon className="size-6 text-[var(--primary)]" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">
                  {feature.description}
                </p>
                <span className="inline-flex px-2 py-1 bg-[var(--muted)] text-xs rounded">
                  {feature.phase}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4">Implementation Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="size-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Phase 1-4: Core Finance (Complete)</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Get Paid, Spend, Money, Approvals, and Reporting
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Phase 5: People & Payroll (Planned)</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Payroll processing, EPF/ETF, staff loans, and HR integration
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-2 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Phase 6: Stamps & Assets (Future)</p>
              <p className="text-sm text-[var(--muted-foreground)]">
                Stamp inventory, asset register, and cost tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
