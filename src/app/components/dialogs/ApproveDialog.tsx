import { X, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/button-variants';
import { FormTextarea } from '../ui/form-input';
import { useState } from 'react';

interface ApproveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReturn: (comment: string) => void;
  itemReference: string;
  itemType: string;
  amount: number;
  details: {
    workstream: string;
    account: string;
    party: string;
    description: string;
  };
}

export function ApproveDialog({
  isOpen,
  onClose,
  onApprove,
  onReturn,
  itemReference,
  itemType,
  amount,
  details,
}: ApproveDialogProps) {
  const [returnComment, setReturnComment] = useState('');
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleReturn = () => {
    if (!returnComment.trim()) {
      setError('Please provide a reason for returning this item');
      return;
    }
    onReturn(returnComment);
    setReturnComment('');
    setShowReturnForm(false);
    setError('');
  };

  const handleClose = () => {
    setReturnComment('');
    setShowReturnForm(false);
    setError('');
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-labelledby="approve-dialog-title"
        className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 id="approve-dialog-title" className="text-xl font-semibold">
              Review {itemType}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              {itemReference}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-[var(--muted)] transition-colors"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        {!showReturnForm ? (
          <div className="space-y-6">
            {/* Amount */}
            <div className="p-4 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-lg">
              <p className="text-sm text-[var(--muted-foreground)] mb-1">Amount</p>
              <p className="text-3xl font-semibold text-foreground">{formatCurrency(amount)}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Workstream</p>
                <p className="text-sm text-foreground">{details.workstream}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Account</p>
                <p className="text-sm text-foreground">{details.account}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Party</p>
                <p className="text-sm text-foreground">{details.party}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Description</p>
              <p className="text-sm text-foreground">{details.description}</p>
            </div>

            {/* Impact Preview */}
            <div className="p-4 bg-[var(--muted)] rounded-lg">
              <p className="text-sm font-medium mb-2">This will affect:</p>
              <ul className="space-y-1 text-sm text-[var(--muted-foreground)]">
                <li>• <strong>{details.account}</strong> balance</li>
                <li>• <strong>{details.workstream}</strong> workstream totals</li>
                <li>• Financial reports for current period</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-border">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowReturnForm(true)}
              >
                <XCircle className="size-4" />
                Return for Correction
              </Button>
              <Button variant="primary" onClick={onApprove}>
                <CheckCircle2 className="size-4" />
                Approve & Post
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <FormTextarea
              label="Reason for Returning"
              value={returnComment}
              onChange={(e) => setReturnComment(e.target.value)}
              error={error}
              required
              rows={5}
              placeholder="Explain what needs to be corrected..."
              helperText="The submitter will be notified and can make corrections before resubmitting."
            />

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setShowReturnForm(false)}>
                Back
              </Button>
              <Button variant="destructive" onClick={handleReturn}>
                <XCircle className="size-4" />
                Return Item
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
