import { Settings, Users, Briefcase, Lock, Shield, Database, FileSearch, Stamp, Package } from 'lucide-react';
import { Button } from '../components/ui/button-variants';
import { FormInput, FormSelect } from '../components/ui/form-input';
import { workstreamOptions } from '../data/mockData';

export function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-[var(--muted-foreground)]">
          Configure system preferences, users, and workflows
        </p>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users & Roles */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
              <Users className="size-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Users & Roles</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Manage user access and permissions</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-md">
              <div>
                <p className="font-medium text-sm">Partner</p>
                <p className="text-xs text-[var(--muted-foreground)]">Full system access</p>
              </div>
              <span className="text-sm text-[var(--muted-foreground)]">1 user</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-md">
              <div>
                <p className="font-medium text-sm">Accounts Officer</p>
                <p className="text-xs text-[var(--muted-foreground)]">Finance operations</p>
              </div>
              <span className="text-sm text-[var(--muted-foreground)]">2 users</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-4">
            Manage Users
          </Button>
        </div>

        {/* Workstreams & Categories */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
              <Briefcase className="size-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Workstreams & Categories</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Configure business segments</p>
            </div>
          </div>
          <div className="space-y-2">
            {workstreamOptions.map((ws) => (
              <div key={ws} className="flex items-center justify-between p-2 hover:bg-[var(--muted)] rounded-md">
                <span className="text-sm font-medium">{ws}</span>
                <span className="text-xs text-[var(--muted-foreground)]">Active</span>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-4">
            Manage Workstreams
          </Button>
        </div>

        {/* Approval Rules */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
              <Lock className="size-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Approval Rules</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Set approval thresholds</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-[var(--muted)] rounded-md">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm">Expenses</p>
                <p className="text-sm font-semibold text-[var(--primary)]">&gt; LKR 25,000</p>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">Requires Partner/Admin approval</p>
            </div>
            <div className="p-3 bg-[var(--muted)] rounded-md">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm">Transfers</p>
                <p className="text-sm font-semibold text-[var(--primary)]">&gt; LKR 50,000</p>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">Requires Partner approval</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-4">
            Configure Rules
          </Button>
        </div>

        {/* Planned Protection */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
              <Shield className="size-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Planned Protection</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Backup & restore policy</p>
            </div>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md mb-4">
            <p className="text-sm text-foreground mb-2">
              Automatic daily backups and point-in-time restore capabilities will be available in a future phase.
            </p>
            <span className="inline-flex px-2 py-1 bg-blue-500 text-white text-xs rounded">
              Coming Soon
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Database className="size-4 text-[var(--muted-foreground)]" />
              <span className="text-[var(--muted-foreground)]">Daily automated backups</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-[var(--muted-foreground)]" />
              <span className="text-[var(--muted-foreground)]">Encrypted storage</span>
            </div>
            <div className="flex items-center gap-2">
              <FileSearch className="size-4 text-[var(--muted-foreground)]" />
              <span className="text-[var(--muted-foreground)]">Point-in-time restore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 6 Features */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Additional Modules (Phase 6)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stamps */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-lg bg-gray-400/10 flex items-center justify-center">
                <Stamp className="size-5 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Stamps Module</h3>
                <span className="inline-flex px-2 py-0.5 bg-[var(--muted)] text-xs rounded">Phase 6</span>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Track stamp inventory, movements, and duty ledger (collected vs remitted). Essential for notary operations.
            </p>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>• Stamp inventory by denomination</li>
              <li>• Issue tracking per matter</li>
              <li>• Duty collected vs remitted reports</li>
            </ul>
          </div>

          {/* Assets */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-lg bg-gray-400/10 flex items-center justify-center">
                <Package className="size-5 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Assets Module</h3>
                <span className="inline-flex px-2 py-0.5 bg-[var(--muted)] text-xs rounded">Phase 6</span>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              Asset register with detailed cost timeline tracking for fuel, service, and maintenance expenses.
            </p>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>• Asset register and depreciation</li>
              <li>• Linked expense tracking (fuel, service)</li>
              <li>• Total cost of ownership reports</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Audit Log Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
              <FileSearch className="size-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Audit Log</h2>
              <p className="text-sm text-[var(--muted-foreground)]">Track all system activities</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">
            View Full Log
          </Button>
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-[var(--muted)] rounded-md text-sm">
            <p className="font-medium">Posted Invoice INV-2026-0143</p>
            <p className="text-xs text-[var(--muted-foreground)]">Anura Weeraman • Today at 10:23 AM</p>
          </div>
          <div className="p-3 bg-[var(--muted)] rounded-md text-sm">
            <p className="font-medium">Approved Expense EXP-0234</p>
            <p className="text-xs text-[var(--muted-foreground)]">Anura Weeraman • Today at 9:15 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
