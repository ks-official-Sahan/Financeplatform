import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button-variants';
import { FormTextarea } from '../ui/form-input';

interface VoidDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title: string;
  description: string;
  itemReference: string;
}

export function VoidDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemReference,
}: VoidDialogProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError('Please provide a reason for voiding this item');
      return;
    }
    onConfirm(reason);
    setReason('');
    setError('');
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
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
        aria-labelledby="void-dialog-title"
        aria-describedby="void-dialog-description"
        className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-4 p-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[var(--destructive)]/10 flex items-center justify-center">
              <AlertTriangle className="size-5 text-[var(--destructive)]" aria-hidden="true" />
            </div>
            <div>
              <h2 id="void-dialog-title" className="text-lg font-semibold">
                {title}
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                {itemReference}
              </p>
            </div>
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
        <div className="mb-6">
          <p id="void-dialog-description" className="text-sm text-[var(--muted-foreground)] mb-4">
            {description}
          </p>

          <FormTextarea
            label="Reason for Voiding"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            error={error}
            required
            rows={4}
            placeholder="Explain why this transaction needs to be voided..."
          />

          <div className="mt-4 p-3 bg-[var(--muted)] rounded-md">
            <p className="text-xs text-[var(--muted-foreground)]">
              <strong>Note:</strong> This will create a voiding entry and mark the original transaction as voided. 
              The voiding entry will be recorded in the audit log.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Void Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}
