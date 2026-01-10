import { useState } from 'react';
import { CheckCircle2, XCircle, Eye, AlertTriangle, Paperclip } from 'lucide-react';
import { Button } from '../components/ui/button-variants';
import { StatusBadge } from '../components/StatusBadge';
import { FormSelect } from '../components/ui/form-input';
import { ApproveDialog } from '../components/dialogs/ApproveDialog';
import { approvalItems } from '../data/mockData';
import type { ApprovalItem } from '../types';
import { toast } from 'sonner';

export function ApprovalsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-LK', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filteredItems = selectedType === 'all' 
    ? approvalItems 
    : approvalItems.filter(item => item.type.toLowerCase() === selectedType);

  const handleApprove = (item: ApprovalItem) => {
    setSelectedItem(item);
    setShowApproveDialog(true);
  };

  const handleConfirmApprove = () => {
    if (selectedItem) {
      toast.success(`${selectedItem.ref} approved and posted successfully`);
      setShowApproveDialog(false);
      setSelectedItem(null);
    }
  };

  const handleReturn = (comment: string) => {
    if (selectedItem) {
      toast.success(`${selectedItem.ref} returned for correction`);
      setShowApproveDialog(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Approvals Inbox</h1>
        <p className="text-[var(--muted-foreground)]">
          Review and approve pending transactions
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="w-64">
          <FormSelect
            label="Filter by Type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'expense', label: 'Expenses' },
              { value: 'payment', label: 'Payments' },
              { value: 'bill', label: 'Bills' },
              { value: 'transfer', label: 'Transfers' },
            ]}
          />
        </div>
        <div className="flex-1" />
        <div className="text-sm text-[var(--muted-foreground)]">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} pending
        </div>
      </div>

      {/* Approval Items */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <CheckCircle2 className="size-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg font-medium mb-2">All caught up!</p>
            <p className="text-[var(--muted-foreground)]">
              No items pending approval at the moment.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg p-6 hover:border-[var(--primary)] transition-all"
            >
              <div className="flex gap-6">
                {/* Left: Main Info */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{item.ref}</h3>
                        <StatusBadge status="Pending" />
                        {item.hasAttachment && (
                          <span className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                            <Paperclip className="size-4" aria-hidden="true" />
                            Attachment
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {item.type} • Submitted by {item.submittedBy} • {formatDateTime(item.submittedAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold text-foreground">
                        {formatCurrency(item.amount)}
                      </p>
                    </div>
                  </div>

                  {/* Risk Flags */}
                  {item.riskFlags.length > 0 && (
                    <div className="flex items-start gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-md">
                      <AlertTriangle className="size-5 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Risk Flags</p>
                        <div className="flex flex-wrap gap-2">
                          {item.riskFlags.map((flag) => (
                            <span
                              key={flag}
                              className="inline-flex px-2 py-1 bg-orange-500 text-white text-xs rounded-md"
                            >
                              {flag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--muted)] rounded-md">
                    <div>
                      <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Workstream</p>
                      <p className="text-sm font-medium text-foreground">{item.workstream}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Account</p>
                      <p className="text-sm font-medium text-foreground">{item.account}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--muted-foreground)] mb-1">Party</p>
                      <p className="text-sm font-medium text-foreground">{item.party}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-foreground">{item.description}</p>
                  </div>

                  {/* Impact Preview */}
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                    <p className="text-xs font-medium text-foreground mb-1">This will affect:</p>
                    <ul className="text-xs text-[var(--muted-foreground)] space-y-0.5">
                      <li>• <strong>{item.account}</strong> balance</li>
                      <li>• <strong>{item.workstream}</strong> workstream totals</li>
                      <li>• Financial reports for current period</li>
                    </ul>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-3 w-48">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleApprove(item)}
                  >
                    <CheckCircle2 className="size-4" />
                    Approve & Post
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => handleApprove(item)}
                  >
                    <XCircle className="size-4" />
                    Return
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                  >
                    <Eye className="size-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Approve Dialog */}
      {selectedItem && (
        <ApproveDialog
          isOpen={showApproveDialog}
          onClose={() => {
            setShowApproveDialog(false);
            setSelectedItem(null);
          }}
          onApprove={handleConfirmApprove}
          onReturn={handleReturn}
          itemReference={selectedItem.ref}
          itemType={selectedItem.type}
          amount={selectedItem.amount}
          details={{
            workstream: selectedItem.workstream,
            account: selectedItem.account,
            party: selectedItem.party,
            description: selectedItem.description,
          }}
        />
      )}
    </div>
  );
}
