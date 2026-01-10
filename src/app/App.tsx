import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { GetPaidPage } from './pages/GetPaidPage';
import { SpendPage } from './pages/SpendPage';
import { MoneyPage } from './pages/MoneyPage';
import { PeoplePage } from './pages/PeoplePage';
import { ReportsPage } from './pages/ReportsPage';
import { ApprovalsPage } from './pages/ApprovalsPage';
import { SettingsPage } from './pages/SettingsPage';
import { currentUser } from './data/mockData';
import { Toaster } from 'sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageContext, setPageContext] = useState<any>(null);

  const handleNavigate = (page: string, context?: any) => {
    setCurrentPage(page);
    setPageContext(context);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'get-paid':
        return <GetPaidPage context={pageContext} />;
      case 'spend':
        return <SpendPage context={pageContext} />;
      case 'money':
        return <MoneyPage />;
      case 'people':
        return <PeoplePage />;
      case 'reports':
        return <ReportsPage />;
      case 'approvals':
        return <ApprovalsPage />;
      case 'stamps':
        return <PlaceholderPage title="Stamps" phase="Phase 6" />;
      case 'assets':
        return <PlaceholderPage title="Assets" phase="Phase 6" />;
      case 'closing':
        return <ClosingPage />;
      case 'settings':
        return <SettingsPage />;
      case 'audit-log':
        return <PlaceholderPage title="Audit Log" phase="Available" />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <AppShell
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userRole={currentUser.role}
        userName={currentUser.name}
      >
        {renderPage()}
      </AppShell>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}

function PlaceholderPage({ title, phase }: { title: string; phase: string }) {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <div className="size-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📋</span>
          </div>
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <p className="text-[var(--muted-foreground)] mb-6">
            This module is planned for {phase}
          </p>
          <span className="inline-flex px-4 py-2 bg-[var(--muted)] rounded-md text-sm">
            {phase}
          </span>
        </div>
      </div>
    </div>
  );
}

function ClosingPage() {
  const [periodLocked, setPeriodLocked] = useState(true);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Period Closing</h1>
        <p className="text-[var(--muted-foreground)]">
          Manage period close and lock financial data
        </p>
      </div>

      {/* Period Lock Banner */}
      {periodLocked && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🔒</span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg mb-2">December 2025 is Locked</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                This period has been closed and locked. No transactions can be posted to this period.
                Locked by <strong>Anura Weeraman</strong> on January 5, 2026 at 10:00 AM.
              </p>
              <button
                onClick={() => setPeriodLocked(false)}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Request Unlock (Requires Partner Approval)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Current Period Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">January 2026 (Current Period)</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[var(--muted)] rounded-md">
            <div>
              <p className="font-medium">Period Status</p>
              <p className="text-sm text-[var(--muted-foreground)]">Open for transactions</p>
            </div>
            <span className="inline-flex px-3 py-1 bg-green-500 text-white rounded-md text-sm">
              Open
            </span>
          </div>

          <div className="p-4 bg-[var(--muted)] rounded-md">
            <h3 className="font-medium mb-3">Pre-Close Checklist</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="check1" className="size-4" />
                <label htmlFor="check1">All invoices for the period have been issued</label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="check2" className="size-4" />
                <label htmlFor="check2">All payments have been recorded</label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="check3" className="size-4" />
                <label htmlFor="check3">All expenses have been approved and posted</label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="check4" className="size-4" />
                <label htmlFor="check4">Bank reconciliation completed</label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" id="check5" className="size-4" />
                <label htmlFor="check5">All pending approvals resolved</label>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <p className="text-sm text-foreground mb-3">
              <strong>Note:</strong> Closing a period will lock all transactions for that period.
              Only Partners can unlock a closed period.
            </p>
            <button className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md hover:opacity-90 transition-opacity">
              Close January 2026 Period
            </button>
          </div>
        </div>
      </div>

      {/* Correction Workflow */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Corrections for Posted Items</h2>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          Posted transactions are immutable. To correct a mistake, you must void the original
          transaction and create a new one.
        </p>
        <div className="p-4 bg-[var(--muted)] rounded-md">
          <h3 className="font-medium mb-2">Correction Process:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-[var(--muted-foreground)]">
            <li>Navigate to the posted transaction</li>
            <li>Click "Void" and provide a reason</li>
            <li>System creates a voiding entry</li>
            <li>Create a new transaction with correct details</li>
            <li>Full audit trail maintained</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
