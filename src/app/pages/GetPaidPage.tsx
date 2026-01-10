import { useState } from 'react';
import { Plus, Receipt, DollarSign, FileText, Calendar, User, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button-variants';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { FormInput, FormSelect, FormTextarea } from '../components/ui/form-input';
import { invoices, clientAging, workstreamOptions } from '../data/mockData';
import type { Invoice } from '../types';
import { toast } from 'sonner';

type View = 'list' | 'create-invoice' | 'receive-payment' | 'ar-aging';

interface GetPaidPageProps {
  context?: any;
}

export function GetPaidPage({ context }: GetPaidPageProps) {
  const [view, setView] = useState<View>(context?.action === 'create-invoice' ? 'create-invoice' : context?.action === 'receive-payment' ? 'receive-payment' : 'list');

  return (
    <div className="p-8">
      {view === 'list' && <InvoiceList onViewChange={setView} />}
      {view === 'create-invoice' && <CreateInvoice onBack={() => setView('list')} />}
      {view === 'receive-payment' && <ReceivePayment onBack={() => setView('list')} />}
      {view === 'ar-aging' && <ARAgingView onBack={() => setView('list')} />}
    </div>
  );
}

function InvoiceList({ onViewChange }: { onViewChange: (view: View) => void }) {
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
      key: 'number',
      header: 'Invoice #',
      accessor: (row: Invoice) => (
        <span className="font-medium">{row.number}</span>
      ),
      sortable: true,
    },
    {
      key: 'date',
      header: 'Date',
      accessor: (row: Invoice) => formatDate(row.date),
      sortable: true,
    },
    {
      key: 'client',
      header: 'Client',
      accessor: (row: Invoice) => row.client,
      sortable: true,
    },
    {
      key: 'workstream',
      header: 'Workstream',
      accessor: (row: Invoice) => (
        <span className="inline-flex px-2 py-1 bg-[var(--muted)] rounded text-sm">
          {row.workstream}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'total',
      header: 'Total',
      accessor: (row: Invoice) => formatCurrency(row.total),
      align: 'right' as const,
      sortable: true,
    },
    {
      key: 'amountDue',
      header: 'Amount Due',
      accessor: (row: Invoice) => (
        <span className={row.amountDue > 0 ? 'text-orange-500 font-medium' : 'text-green-600'}>
          {formatCurrency(row.amountDue)}
        </span>
      ),
      align: 'right' as const,
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row: Invoice) => <StatusBadge status={row.status} />,
    },
  ];

  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.amountDue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Get Paid</h1>
          <p className="text-[var(--muted-foreground)]">
            Manage invoices, receive payments, and track receivables
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => onViewChange('ar-aging')}
          >
            <FileText className="size-4" />
            AR Aging Report
          </Button>
          <Button
            variant="secondary"
            onClick={() => onViewChange('receive-payment')}
          >
            <DollarSign className="size-4" />
            Receive Payment
          </Button>
          <Button
            variant="primary"
            onClick={() => onViewChange('create-invoice')}
          >
            <Plus className="size-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Total Invoiced</p>
          <p className="text-3xl font-semibold">
            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(
              invoices.reduce((sum, inv) => sum + inv.total, 0)
            )}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Outstanding</p>
          <p className="text-3xl font-semibold text-orange-500">
            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(totalOutstanding)}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-sm text-[var(--muted-foreground)] mb-2">Paid</p>
          <p className="text-3xl font-semibold text-green-600">
            {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(
              invoices.reduce((sum, inv) => sum + inv.amountPaid, 0)
            )}
          </p>
        </div>
      </div>

      {/* Invoice Table */}
      <DataTable
        data={invoices}
        columns={columns}
        onRowClick={(invoice) => {
          toast.info(`Opening invoice ${invoice.number}`);
        }}
        emptyMessage="No invoices found. Create your first invoice to get started."
      />
    </div>
  );
}

function CreateInvoice({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    workstream: '',
    client: '',
    matterRef: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    lines: [{ description: '', quantity: 1, rate: 0 }],
  });

  const handleSubmit = () => {
    toast.success('Invoice created and posted successfully!');
    onBack();
  };

  const addLine = () => {
    setFormData({
      ...formData,
      lines: [...formData.lines, { description: '', quantity: 1, rate: 0 }],
    });
  };

  const calculateTotal = () => {
    return formData.lines.reduce((sum, line) => sum + (line.quantity * line.rate), 0);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back to Invoices
        </button>
        <h1 className="text-3xl font-semibold mb-2">Create Invoice</h1>
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
              helperText="Select the workstream this invoice belongs to"
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
                label="Client Name"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Enter client name"
              />
              <FormInput
                label="Matter Reference"
                value={formData.matterRef}
                onChange={(e) => setFormData({ ...formData, matterRef: e.target.value })}
                placeholder="e.g., CASE-2026-001"
              />
              <FormInput
                type="date"
                label="Invoice Date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <FormInput
                type="date"
                label="Due Date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-4 block">Invoice Lines</label>
              <div className="space-y-3">
                {formData.lines.map((line, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-3">
                    <div className="col-span-6">
                      <FormInput
                        placeholder="Description"
                        value={line.description}
                        onChange={(e) => {
                          const newLines = [...formData.lines];
                          newLines[idx].description = e.target.value;
                          setFormData({ ...formData, lines: newLines });
                        }}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormInput
                        type="number"
                        placeholder="Qty"
                        value={line.quantity}
                        onChange={(e) => {
                          const newLines = [...formData.lines];
                          newLines[idx].quantity = Number(e.target.value);
                          setFormData({ ...formData, lines: newLines });
                        }}
                      />
                    </div>
                    <div className="col-span-4">
                      <FormInput
                        type="number"
                        placeholder="Rate (LKR)"
                        value={line.rate}
                        onChange={(e) => {
                          const newLines = [...formData.lines];
                          newLines[idx].rate = Number(e.target.value);
                          setFormData({ ...formData, lines: newLines });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="tertiary" size="sm" onClick={addLine} className="mt-3">
                <Plus className="size-4" />
                Add Line
              </Button>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                disabled={!formData.client || !formData.dueDate}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="p-4 bg-[var(--muted)] rounded-lg">
              <h3 className="font-semibold mb-4">Review Invoice</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[var(--muted-foreground)]">Client</p>
                  <p className="font-medium">{formData.client}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Workstream</p>
                  <p className="font-medium">{formData.workstream}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Date</p>
                  <p className="font-medium">{formData.date}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Due Date</p>
                  <p className="font-medium">{formData.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-lg">
              <p className="text-sm text-[var(--muted-foreground)] mb-1">Total Amount</p>
              <p className="text-3xl font-semibold">
                {new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(calculateTotal())}
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                <Receipt className="size-4" />
                Create & Post Invoice
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReceivePayment({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    method: 'Bank Transfer',
    account: '',
    amount: '',
    reference: '',
    client: '',
  });

  const handleSubmit = () => {
    toast.success('Payment received and allocated successfully!');
    onBack();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back to Invoices
        </button>
        <h1 className="text-3xl font-semibold mb-2">Receive Payment</h1>
        <p className="text-[var(--muted-foreground)]">
          Record a payment received from a client
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            type="date"
            label="Payment Date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <FormSelect
            label="Payment Method"
            required
            value={formData.method}
            onChange={(e) => setFormData({ ...formData, method: e.target.value })}
            options={[
              { value: 'Bank Transfer', label: 'Bank Transfer' },
              { value: 'Cash', label: 'Cash' },
              { value: 'Cheque', label: 'Cheque' },
              { value: 'Card', label: 'Card' },
            ]}
          />
        </div>

        <FormInput
          label="Received From"
          required
          value={formData.client}
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          placeholder="Client name"
        />

        <FormInput
          type="number"
          label="Amount (LKR)"
          required
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0.00"
        />

        <FormInput
          label="Reference / Cheque Number"
          value={formData.reference}
          onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
          placeholder="Optional reference"
        />

        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onBack}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!formData.client || !formData.amount}
          >
            <DollarSign className="size-4" />
            Receive Payment
          </Button>
        </div>
      </div>
    </div>
  );
}

function ARAgingView({ onBack }: { onBack: () => void }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back to Invoices
        </button>
        <h1 className="text-3xl font-semibold mb-2">Accounts Receivable Aging</h1>
        <p className="text-[var(--muted-foreground)]">
          View outstanding invoices by aging period
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--muted)] border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">Client</th>
              <th className="px-6 py-4 text-right text-sm font-medium">Current</th>
              <th className="px-6 py-4 text-right text-sm font-medium">0-30 Days</th>
              <th className="px-6 py-4 text-right text-sm font-medium">31-60 Days</th>
              <th className="px-6 py-4 text-right text-sm font-medium">61-90 Days</th>
              <th className="px-6 py-4 text-right text-sm font-medium">90+ Days</th>
              <th className="px-6 py-4 text-right text-sm font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clientAging.map((client) => (
              <tr key={client.client} className="hover:bg-[var(--muted)]/50">
                <td className="px-6 py-4 text-sm font-medium">{client.client}</td>
                <td className="px-6 py-4 text-sm text-right">{formatCurrency(client.buckets.current)}</td>
                <td className="px-6 py-4 text-sm text-right">{formatCurrency(client.buckets.days_0_30)}</td>
                <td className="px-6 py-4 text-sm text-right text-orange-500">{formatCurrency(client.buckets.days_31_60)}</td>
                <td className="px-6 py-4 text-sm text-right text-orange-600">{formatCurrency(client.buckets.days_61_90)}</td>
                <td className="px-6 py-4 text-sm text-right text-red-600">{formatCurrency(client.buckets.days_90_plus)}</td>
                <td className="px-6 py-4 text-sm text-right font-semibold">{formatCurrency(client.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[var(--muted)] border-t-2 border-border">
            <tr>
              <td className="px-6 py-4 text-sm font-semibold">Total</td>
              <td className="px-6 py-4 text-sm text-right font-semibold">
                {formatCurrency(clientAging.reduce((sum, c) => sum + c.buckets.current, 0))}
              </td>
              <td className="px-6 py-4 text-sm text-right font-semibold">
                {formatCurrency(clientAging.reduce((sum, c) => sum + c.buckets.days_0_30, 0))}
              </td>
              <td className="px-6 py-4 text-sm text-right font-semibold">
                {formatCurrency(clientAging.reduce((sum, c) => sum + c.buckets.days_31_60, 0))}
              </td>
              <td className="px-6 py-4 text-sm text-right font-semibold">
                {formatCurrency(clientAging.reduce((sum, c) => sum + c.buckets.days_61_90, 0))}
              </td>
              <td className="px-6 py-4 text-sm text-right font-semibold">
                {formatCurrency(clientAging.reduce((sum, c) => sum + c.buckets.days_90_plus, 0))}
              </td>
              <td className="px-6 py-4 text-sm text-right font-semibold">
                {formatCurrency(clientAging.reduce((sum, c) => sum + c.total, 0))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
