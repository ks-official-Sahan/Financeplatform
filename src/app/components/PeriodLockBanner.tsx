import { Lock, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button-variants';

interface PeriodLockBannerProps {
  period: string;
  lockedBy: string;
  lockedAt: Date;
  onRequestUnlock?: () => void;
}

export function PeriodLockBanner({ period, lockedBy, lockedAt, onRequestUnlock }: PeriodLockBannerProps) {
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-LK', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-orange-500/10 border-l-4 border-orange-500 rounded-md p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
          <Lock className="size-5 text-orange-500" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Period Locked: {period}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-2">
                This period is closed. Transactions cannot be posted to {period}.
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                Locked by <strong>{lockedBy}</strong> on {formatDateTime(lockedAt)}
              </p>
            </div>
            {onRequestUnlock && (
              <Button variant="secondary" size="sm" onClick={onRequestUnlock}>
                Request Unlock
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BackdatedTransactionWarning() {
  return (
    <div className="bg-red-500/10 border-l-4 border-red-500 rounded-md p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="size-5 text-red-500" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            Cannot Post Backdated Transaction
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            The selected date falls within a locked period. Please select a date in the current
            open period, or request an unlock from your Partner.
          </p>
        </div>
      </div>
    </div>
  );
}
