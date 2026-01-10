import { useState } from 'react';
import { Plus, Receipt, CreditCard, FileText } from 'lucide-react';
import { Button } from '../components/ui/button-variants';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { FormInput, FormSelect, FormTextarea } from '../components/ui/form-input';
import { expenses, bills, workstreamOptions, categoryOptions } from '../data/mockData';
import type { Expense, Bill } from '../types';
import { toast } from 'sonner';

type View = 'expenses' | 'bills' | 'add-expense' | 'make-payment';

interface SpendPageProps {
  context?: any;
}

export function SpendPage({ context }: SpendPageProps) {
  const [view, setView] = useState<View>(context?.action === 'add-expense' ? 'add-expense' : context?.action === 'make-payment' ? 'make-payment' : 'expenses');

  return (
    <div className="p-8">
      {view === 'expenses' && <ExpensesList onViewChange={setView} />}
      {view === 'bills' && <BillsList onViewChange={setView} />}
      {view === 'add-expense' && <AddExpense onBack={() => setView('expenses')} />}
      {view === 'make-payment' && <MakePayment onBack={() => setView('bills')} />}
    </div>
  );
}

function ExpensesList({ onViewChange }: { onViewChange: (view: View) => void }) {
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
      accessor: (row: Expense) => formatDate(row.date),
      sortable: true,
    },
    {
      key: 'category',
      header: 'Category',
      accessor: (row: Expense) => (
        <span className="inline-flex px-2 py-1 bg-[var(--muted)] rounded text-sm">
          {row.category}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'description',
      header: 'Description',
      accessor: (row: Expense) => row.description,
    },
    {
      key: 'workstream',
      header: 'Workstream',
      accessor: (row: Expense) => row.workstream,
      sortable: true,
    },
    {
      key: 'party',
      header: 'Party',
      accessor: (row: Expense) => row.party,
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: (row: Expense) => formatCurrency(row.amount),
      align: 'right' as const,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row: Expense) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Spend</h1>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
            >
              Expenses
            </button>
            <button
              onClick={() => onViewChange('bills')}
              className="px-4 py-2 rounded-md hover:bg-[var(--muted)] font-medium transition-colors"
            >
              Bills & Payables
            </button>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => onViewChange('add-expense')}
        >
          <Plus className="size-4" />
          Add Expense
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Total Expenses (MTD)</p>
          <p className="text-3xl font-semibold">
            {formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0))}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Pending Approval</p>
          <p className="text-3xl font-semibold text-orange-500">
            {expenses.filter(e => e.status === 'Approved').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Posted Expenses</p>
          <p className="text-3xl font-semibold text-green-600">
            {expenses.filter(e => e.status === 'Posted').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={expenses}
        columns={columns}
        emptyMessage="No expenses found. Add your first expense to get started."
      />
    </div>
  );
}

function BillsList({ onViewChange }: { onViewChange: (view: View) => void }) {
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
      key: 'billNumber',
      header: 'Bill #',
      accessor: (row: Bill) => <span className="font-medium">{row.billNumber}</span>,
      sortable: true,
    },
    {
      key: 'date',
      header: 'Date',
      accessor: (row: Bill) => formatDate(row.date),
      sortable: true,
    },
    {
      key: 'vendor',
      header: 'Vendor',
      accessor: (row: Bill) => row.vendor,
      sortable: true,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      accessor: (row: Bill) => formatDate(row.dueDate),
      sortable: true,
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: (row: Bill) => formatCurrency(row.amount),
      align: 'right' as const,
      sortable: true,
    },
    {
      key: 'amountPaid',
      header: 'Amount Paid',
      accessor: (row: Bill) => (
        <span className={row.amountPaid === row.amount ? 'text-green-600' : 'text-orange-500'}>
          {formatCurrency(row.amountPaid)}
        </span>
      ),
      align: 'right' as const,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row: Bill) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Spend</h1>
          <div className="flex gap-2">
            <button
              onClick={() => onViewChange('expenses')}
              className="px-4 py-2 rounded-md hover:bg-[var(--muted)] font-medium transition-colors"
            >
              Expenses
            </button>
            <button
              className="px-4 py-2 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] font-medium"
            >
              Bills & Payables
            </button>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={() => onViewChange('make-payment')}
        >
          <CreditCard className="size-4" />
          Make Payment
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Total Bills</p>
          <p className="text-3xl font-semibold">
            {formatCurrency(bills.reduce((sum, bill) => sum + bill.amount, 0))}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Outstanding</p>
          <p className="text-3xl font-semibold text-orange-500">
            {formatCurrency(bills.reduce((sum, bill) => sum + (bill.amount - bill.amountPaid), 0))}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Paid</p>
          <p className="text-3xl font-semibold text-green-600">
            {formatCurrency(bills.reduce((sum, bill) => sum + bill.amountPaid, 0))}
          </p>
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={bills}
        columns={columns}
        emptyMessage="No bills found."
      />
    </div>
  );
}

function AddExpense({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    workstream: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: '',
    party: '',
    account: 'Cash on Hand',
  });

  const handleSubmit = () => {
    // Determine if requires approval based on amount
    const requiresApproval = Number(formData.amount) > 25000;
    
    if (requiresApproval) {
      toast.success('Expense submitted for approval');
    } else {
      toast.success('Expense posted successfully');
    }
    onBack();
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back to Expenses
        </button>
        <h1 className="text-3xl font-semibold mb-2">Add Expense</h1>
        <p className="text-[var(--muted-foreground)]">
          Step {step} of 3: {step === 1 ? 'Choose Workstream' : step === 2 ? 'Fill Details' : 'Review & Submit'}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`size-8 rounded-full flex items-center justify-center font-medium ${
                s === step
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : s < step
                  ? 'bg-green-500 text-white'
                  : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className="w-24 h-0.5 bg-[var(--border)]" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-card border border-border rounded-lg p-6">
        {step === 1 && (
          <div className="space-y-6">
            <FormSelect
              label="Workstream"
              required
              value={formData.workstream}
              onChange={(e) => setFormData({ ...formData, workstream: e.target.value })}
              options={[
                { value: '', label: 'Select workstream...' },
                ...workstreamOptions.map(w => ({ value: w, label: w })),
              ]}
              helperText="Select the workstream this expense belongs to"
            />
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                disabled={!formData.workstream}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                type="date"
                label="Expense Date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <FormSelect
                label="Category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={[
                  { value: '', label: 'Select category...' },
                  ...categoryOptions.expense.map(c => ({ value: c, label: c })),
                ]}
              />
            </div>

            <FormTextarea
              label="Description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the expense..."
              rows={3}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                type="number"
                label="Amount (LKR)"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                helperText="Amounts over LKR 25,000 require approval"
              />
              <FormInput
                label="Party / Vendor"
                required
                value={formData.party}
                onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                placeholder="Vendor name"
              />
            </div>

            <FormSelect
              label="Paid From"
              required
              value={formData.account}
              onChange={(e) => setFormData({ ...formData, account: e.target.value })}
              options={[
                { value: 'Cash on Hand', label: 'Cash on Hand' },
                { value: 'Petty Cash', label: 'Petty Cash' },
                { value: 'Commercial Bank - Current', label: 'Commercial Bank - Current' },
                { value: 'Sampath Bank - Savings', label: 'Sampath Bank - Savings' },
              ]}
            />

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                disabled={!formData.category || !formData.description || !formData.amount || !formData.party}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="p-4 bg-[var(--muted)] rounded-lg">
              <h3 className="font-semibold mb-4">Review Expense</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[var(--muted-foreground)]">Date</p>
                  <p className="font-medium">{formData.date}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Category</p>
                  <p className="font-medium">{formData.category}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Workstream</p>
                  <p className="font-medium">{formData.workstream}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Party</p>
                  <p className="font-medium">{formData.party}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[var(--muted-foreground)]">Description</p>
                  <p className="font-medium">{formData.description}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-lg">
              <p className="text-sm text-[var(--muted-foreground)] mb-1">Amount</p>
              <p className="text-3xl font-semibold">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(Number(formData.amount))}
              </p>
            </div>

            {Number(formData.amount) > 25000 && (
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
                <p className="text-sm text-foreground">
                  ⚠️ This expense requires approval as it exceeds LKR 25,000
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                <Receipt className="size-4" />
                {Number(formData.amount) > 25000 ? 'Submit for Approval' : 'Post Expense'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MakePayment({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    payee: '',
    amount: '',
    account: 'Commercial Bank - Current',
    reference: '',
    notes: '',
  });

  const handleSubmit = () => {
    toast.success('Payment made successfully');
    onBack();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back to Bills
        </button>
        <h1 className="text-3xl font-semibold mb-2">Make Payment</h1>
        <p className="text-[var(--muted-foreground)]">
          Record a payment made to a vendor
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <FormInput
          type="date"
          label="Payment Date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <FormInput
          label="Payee / Vendor"
          required
          value={formData.payee}
          onChange={(e) => setFormData({ ...formData, payee: e.target.value })}
          placeholder="Vendor name"
        />

        <FormInput
          type="number"
          label="Amount (LKR)"
          required
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0.00"
        />

        <FormSelect
          label="Pay From Account"
          required
          value={formData.account}
          onChange={(e) => setFormData({ ...formData, account: e.target.value })}
          options={[
            { value: 'Commercial Bank - Current', label: 'Commercial Bank - Current' },
            { value: 'Sampath Bank - Savings', label: 'Sampath Bank - Savings' },
            { value: 'Cash on Hand', label: 'Cash on Hand' },
          ]}
        />

        <FormInput
          label="Reference / Cheque Number"
          value={formData.reference}
          onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
          placeholder="Optional reference"
        />

        <FormTextarea
          label="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Optional notes..."
          rows={3}
        />

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onBack}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!formData.payee || !formData.amount}
          >
            <CreditCard className="size-4" />
            Make Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
