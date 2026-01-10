import { FileText, Download, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button-variants';
import { FormInput, FormSelect } from '../components/ui/form-input';
import { workstreamOptions } from '../data/mockData';

export function ReportsPage() {
  const reports = [
    {
      id: 'income-statement',
      name: 'Income Statement',
      description: 'Revenue and expenses by period',
      icon: TrendingUp,
      category: 'Financial',
    },
    {
      id: 'workstream-summary',
      name: 'Workstream Summary',
      description: 'Revenue and expenses by workstream',
      icon: BarChart3,
      category: 'Workstream',
    },
    {
      id: 'ar-aging',
      name: 'AR Aging Report',
      description: 'Outstanding receivables by age',
      icon: TrendingUp,
      category: 'Receivables',
    },
    {
      id: 'ap-aging',
      name: 'AP Aging Report',
      description: 'Outstanding payables by age',
      icon: TrendingDown,
      category: 'Payables',
    },
    {
      id: 'cash-flow',
      name: 'Cash Flow Statement',
      description: 'Cash inflows and outflows',
      icon: TrendingUp,
      category: 'Financial',
    },
    {
      id: 'expense-analysis',
      name: 'Expense Analysis',
      description: 'Expenses by category and period',
      icon: TrendingDown,
      category: 'Expenses',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Reports</h1>
        <p className="text-[var(--muted-foreground)]">
          Generate financial and operational reports
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-semibold mb-4">Report Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormInput
            type="date"
            label="Start Date"
            defaultValue={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]}
          />
          <FormInput
            type="date"
            label="End Date"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
          <FormSelect
            label="Workstream"
            options={[
              { value: 'all', label: 'All Workstreams' },
              ...workstreamOptions.map(w => ({ value: w, label: w })),
            ]}
            defaultValue="all"
          />
          <div className="flex items-end">
            <Button variant="primary" className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Report Categories */}
      <div className="space-y-6">
        {['Financial', 'Workstream', 'Receivables', 'Payables', 'Expenses'].map((category) => {
          const categoryReports = reports.filter(r => r.category === category);
          if (categoryReports.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-4">{category} Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryReports.map((report) => {
                  const Icon = report.icon;
                  return (
                    <div
                      key={report.id}
                      className="bg-card border border-border rounded-lg p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="size-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                          <Icon className="size-6 text-[var(--primary)]" aria-hidden="true" />
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="size-4" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{report.name}</h3>
                      <p className="text-sm text-[var(--muted-foreground)] mb-4">
                        {report.description}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" className="flex-1">
                          <FileText className="size-4" />
                          View
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1">
                          <Download className="size-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Options */}
      <div className="bg-[var(--muted)] border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-2">Export Options</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          Reports can be exported in PDF, Excel, or CSV formats
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm">
            Export as PDF
          </Button>
          <Button variant="secondary" size="sm">
            Export as Excel
          </Button>
          <Button variant="secondary" size="sm">
            Export as CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
