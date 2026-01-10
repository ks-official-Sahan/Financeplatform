import { useState } from 'react';
import { Wallet, ArrowRightLeft, Plus, Building2, Banknote } from 'lucide-react';
import { Button } from '../components/ui/button-variants';
import { DataTable } from '../components/DataTable';
import { FormInput, FormSelect, FormTextarea } from '../components/ui/form-input';
import { accounts, ledgerEntries, pettyVouchers, pettyCashFloat } from '../data/mockData';
import type { LedgerEntry, PettyVoucher } from '../types';
import { toast } from 'sonner';

type View = 'accounts' | 'ledger' | 'transfer' | 'petty-cash';

export function MoneyPage() {
  const [view, setView] = useState<View>('accounts');
  const [selectedAccount, setSelectedAccount] = useState('');

  const handleViewLedger = (accountId: string) => {
    setSelectedAccount(accountId);
    setView('ledger');
  };

  return (
    <div className="p-8">
      {view === 'accounts' && <AccountsOverview onViewLedger={handleViewLedger} onViewChange={setView} />}
      {view === 'ledger' && <LedgerView accountId={selectedAccount} onBack={() => setView('accounts')} />}
      {view === 'transfer' && <TransferFunds onBack={() => setView('accounts')} />}
      {view === 'petty-cash' && <PettyCashView onBack={() => setView('accounts')} />}
    </div>
  );
}

function AccountsOverview({ onViewLedger, onViewChange }: { onViewLedger: (id: string) => void; onViewChange: (view: View) => void }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const bankAccounts = accounts.filter(a => a.type === 'Bank');
  const cashAccounts = accounts.filter(a => a.type === 'Cash' || a.type === 'Petty Cash');
  
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Money</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage accounts, view ledgers, and transfer funds
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => onViewChange('petty-cash')}
          >
            <Banknote className="size-4" />
            Petty Cash
          </Button>
          <Button
            variant="primary"
            onClick={() => onViewChange('transfer')}
          >
            <ArrowRightLeft className="size-4" />
            Transfer Funds
          </Button>
        </div>
      </div>

      {/* Total Balance */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 text-[var(--primary-foreground)] rounded-lg p-8">
        <p className="text-sm opacity-90 mb-2">Total Cash & Bank Balance</p>
        <p className="text-5xl font-bold mb-4">{formatCurrency(totalBalance)}</p>
        <p className="text-sm opacity-75">As of {new Date().toLocaleDateString('en-LK')}</p>
      </div>

      {/* Bank Accounts */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Building2 className="size-5" />
          Bank Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => onViewLedger(account.id)}
              className="bg-card border border-border rounded-lg p-6 hover:border-[var(--primary)] hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{account.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{account.type}</p>
                </div>
                <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="size-5 text-blue-500" />
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-1">Balance</p>
                <p className="text-2xl font-semibold">{formatCurrency(account.balance)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cash Accounts */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Wallet className="size-5" />
          Cash Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cashAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => account.type === 'Petty Cash' ? onViewChange('petty-cash') : onViewLedger(account.id)}
              className="bg-card border border-border rounded-lg p-6 hover:border-[var(--primary)] hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{account.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{account.type}</p>
                </div>
                <div className="size-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Wallet className="size-5 text-green-500" />
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-1">Balance</p>
                <p className="text-2xl font-semibold">{formatCurrency(account.balance)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LedgerView({ accountId, onBack }: { accountId: string; onBack: () => void }) {
  const account = accounts.find(a => a.id === accountId);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-LK', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const columns = [
    {
      key: 'date',
      header: 'Date',
      accessor: (row: LedgerEntry) => formatDate(row.date),
      sortable: true,
    },
    {
      key: 'ref',
      header: 'Reference',
      accessor: (row: LedgerEntry) => <span className="font-medium">{row.ref}</span>,
      sortable: true,
    },
    {
      key: 'description',
      header: 'Description',
      accessor: (row: LedgerEntry) => (
        <div>
          <p className="text-sm">{row.description}</p>
          {row.workstream && (
            <span className="inline-flex px-2 py-0.5 bg-[var(--muted)] rounded text-xs mt-1">
              {row.workstream}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'debit',
      header: 'Debit',
      accessor: (row: LedgerEntry) => row.debit ? formatCurrency(row.debit) : '-',
      align: 'right' as const,
    },
    {
      key: 'credit',
      header: 'Credit',
      accessor: (row: LedgerEntry) => row.credit ? formatCurrency(row.credit) : '-',
      align: 'right' as const,
    },
    {
      key: 'balance',
      header: 'Balance',
      accessor: (row: LedgerEntry) => (
        <span className="font-semibold">{formatCurrency(row.balance)}</span>
      ),
      align: 'right' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back to Accounts
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">{account?.name}</h1>
            <p className="text-[var(--muted-foreground)]">Account Ledger</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[var(--muted-foreground)] mb-1">Current Balance</p>
            <p className="text-3xl font-semibold">{formatCurrency(account?.balance || 0)}</p>
          </div>
        </div>
      </div>

      <DataTable
        data={ledgerEntries}
        columns={columns}
        density="comfortable"
        emptyMessage="No transactions found for this account."
      />
    </div>
  );
}

function TransferFunds({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    fromAccount: '',
    toAccount: '',
    amount: '',
    workstream: 'Office',
    notes: '',
  });

  const handleSubmit = () => {
    toast.success('Transfer completed successfully');
    onBack();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back to Accounts
        </button>
        <h1 className="text-3xl font-semibold mb-2">Transfer Funds</h1>
        <p className="text-[var(--muted-foreground)]">
          Move money between accounts
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <FormInput
          type="date"
          label="Transfer Date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            label="From Account"
            required
            value={formData.fromAccount}
            onChange={(e) => setFormData({ ...formData, fromAccount: e.target.value })}
            options={[
              { value: '', label: 'Select account...' },
              ...accounts.filter(a => a.type === 'Bank' || a.type === 'Cash').map(a => ({
                value: a.id,
                label: a.name,
              })),
            ]}
          />
          <FormSelect
            label="To Account"
            required
            value={formData.toAccount}
            onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
            options={[
              { value: '', label: 'Select account...' },
              ...accounts.filter(a => a.type === 'Bank' || a.type === 'Cash').map(a => ({
                value: a.id,
                label: a.name,
              })),
            ]}
          />
        </div>

        <FormInput
          type="number"
          label="Amount (LKR)"
          required
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0.00"
          helperText="Transfers over LKR 50,000 require approval"
        />

        <FormTextarea
          label="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Optional transfer notes..."
          rows={3}
        />

        {Number(formData.amount) > 50000 && (
          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
            <p className="text-sm text-foreground">
              ⚠️ This transfer requires approval as it exceeds LKR 50,000
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onBack}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!formData.fromAccount || !formData.toAccount || !formData.amount}
          >
            <ArrowRightLeft className="size-4" />
            {Number(formData.amount) > 50000 ? 'Submit for Approval' : 'Complete Transfer'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function PettyCashView({ onBack }: { onBack: () => void }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-LK', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const columns = [
    {
      key: 'date',
      header: 'Date',
      accessor: (row: PettyVoucher) => formatDate(row.date),
      sortable: true,
    },
    {
      key: 'category',
      header: 'Category',
      accessor: (row: PettyVoucher) => (
        <span className="inline-flex px-2 py-1 bg-[var(--muted)] rounded text-sm">
          {row.category}
        </span>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      accessor: (row: PettyVoucher) => row.description,
    },
    {
      key: 'workstream',
      header: 'Workstream',
      accessor: (row: PettyVoucher) => row.workstream,
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: (row: PettyVoucher) => formatCurrency(row.amount),
      align: 'right' as const,
    },
    {
      key: 'createdBy',
      header: 'Created By',
      accessor: (row: PettyVoucher) => row.createdBy,
    },
  ];

  const usedPercentage = (pettyCashFloat.current / pettyCashFloat.limit) * 100;

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back to Accounts
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Petty Cash</h1>
            <p className="text-[var(--muted-foreground)]">Manage petty cash float and vouchers</p>
          </div>
          <Button variant="primary">
            <Plus className="size-4" />
            Add Voucher
          </Button>
        </div>
      </div>

      {/* Float Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-[var(--muted-foreground)] mb-2">Current Float</p>
            <p className="text-4xl font-semibold">{formatCurrency(pettyCashFloat.current)}</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              of {formatCurrency(pettyCashFloat.limit)} limit
            </p>
          </div>
          <Button variant="secondary">
            Replenish Float
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="h-3 bg-[var(--muted)] rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                usedPercentage > 80 ? 'bg-red-500' : usedPercentage > 50 ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${usedPercentage}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-[var(--muted-foreground)]">
          Last replenished: {formatDate(pettyCashFloat.lastReplenished)}
        </p>
      </div>

      {/* Vouchers Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Vouchers</h2>
        <DataTable
          data={pettyVouchers}
          columns={columns}
          emptyMessage="No petty cash vouchers found."
        />
      </div>
    </div>
  );
}
