import { useState } from 'react';
import { FileText, Paperclip, Clock, User, Briefcase, Building2, Download, Trash2 } from 'lucide-react';
import { Button } from './ui/button-variants';
import { StatusBadge } from './StatusBadge';
import { AuditTimeline } from './AuditTimeline';
import { VoidDialog } from './dialogs/VoidDialog';
import type { Lifecycle, Workstream, AuditEntry } from '../types';

interface TransactionDetailProps {
  type: string;
  reference: string;
  date: Date;
  status: Lifecycle;
  amount: number;
  workstream: Workstream;
  party: string;
  account?: string;
  description: string;
  lines?: Array<{ description: string; quantity?: number; rate?: number; amount: number }>;
  attachments?: Array<{ id: string; filename: string; size: number }>;
  auditTrail?: AuditEntry[];
  onVoid?: (reason: string) => void;
  onEdit?: () => void;
  onBack: () => void;
}

export function TransactionDetail({
  type,
  reference,
  date,
  status,
  amount,
  workstream,
  party,
  account,
  description,
  lines,
  attachments,
  auditTrail,
  onVoid,
  onEdit,
  onBack,
}: TransactionDetailProps) {
  const [showVoidDialog, setShowVoidDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'audit'>('details');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-LK', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const canVoid = status === 'Posted' && onVoid;
  const canEdit = status === 'Draft' && onEdit;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="text-sm text-[var(--muted-foreground)] hover:text-foreground mb-4"
        >
          ← Back
        </button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-semibold">{reference}</h1>
              <StatusBadge status={status} />
            </div>
            <p className="text-[var(--muted-foreground)]">
              {type} • {formatDate(date)}
            </p>
          </div>
          <div className="flex gap-3">
            {canEdit && (
              <Button variant="secondary" onClick={onEdit}>
                Edit
              </Button>
            )}
            {canVoid && (
              <Button variant="destructive" onClick={() => setShowVoidDialog(true)}>
                <Trash2 className="size-4" />
                Void Transaction
              </Button>
            )}
            <Button variant="secondary">
              <Download className="size-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-1 border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-[var(--primary)] text-foreground font-medium'
                : 'border-transparent text-[var(--muted-foreground)] hover:text-foreground'
            }`}
          >
            Details
          </button>
          {auditTrail && auditTrail.length > 0 && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === 'audit'
                  ? 'border-[var(--primary)] text-foreground font-medium'
                  : 'border-transparent text-[var(--muted-foreground)] hover:text-foreground'
              }`}
            >
              Audit Trail ({auditTrail.length})
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'details' ? (
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Amount Card */}
            <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 text-[var(--primary-foreground)] rounded-lg p-8">
              <p className="text-sm opacity-90 mb-2">Total Amount</p>
              <p className="text-5xl font-bold">{formatCurrency(amount)}</p>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Description</h2>
              <p className="text-foreground">{description}</p>
            </div>

            {/* Line Items */}
            {lines && lines.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Line Items</h2>
                <div className="space-y-3">
                  {lines.map((line, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 bg-[var(--muted)] rounded-md">
                      <div className="flex-1">
                        <p className="font-medium">{line.description}</p>
                        {line.quantity && line.rate && (
                          <p className="text-sm text-[var(--muted-foreground)] mt-1">
                            {line.quantity} × {formatCurrency(line.rate)}
                          </p>
                        )}
                      </div>
                      <p className="font-semibold">{formatCurrency(line.amount)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {attachments && attachments.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Paperclip className="size-5" />
                  Attachments ({attachments.length})
                </h2>
                <div className="space-y-2">
                  {attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-md hover:bg-[var(--muted)]/80 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="size-5 text-[var(--muted-foreground)]" />
                        <div>
                          <p className="font-medium text-sm">{file.filename}</p>
                          <p className="text-xs text-[var(--muted-foreground)]">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Transaction Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Transaction Info</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-[var(--muted-foreground)] mt-0.5" />
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">Date</p>
                    <p className="font-medium">{formatDate(date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="size-5 text-[var(--muted-foreground)] mt-0.5" />
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">Workstream</p>
                    <p className="font-medium">{workstream}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="size-5 text-[var(--muted-foreground)] mt-0.5" />
                  <div>
                    <p className="text-sm text-[var(--muted-foreground)]">Party</p>
                    <p className="font-medium">{party}</p>
                  </div>
                </div>
                {account && (
                  <div className="flex items-start gap-3">
                    <Building2 className="size-5 text-[var(--muted-foreground)] mt-0.5" />
                    <div>
                      <p className="text-sm text-[var(--muted-foreground)]">Account</p>
                      <p className="font-medium">{account}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Impact Notice */}
            {status === 'Posted' && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm font-medium mb-2">Posted Transaction</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  This transaction is immutable. To correct, you must void and create a new transaction.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl">
          {auditTrail && <AuditTimeline entries={auditTrail} />}
        </div>
      )}

      {/* Void Dialog */}
      {onVoid && (
        <VoidDialog
          isOpen={showVoidDialog}
          onClose={() => setShowVoidDialog(false)}
          onConfirm={(reason) => {
            onVoid(reason);
            setShowVoidDialog(false);
          }}
          title="Void Transaction"
          description="This will create a voiding entry and mark this transaction as voided. This action cannot be undone."
          itemReference={reference}
        />
      )}
    </div>
  );
}
