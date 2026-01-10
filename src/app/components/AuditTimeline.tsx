import { Clock, User as UserIcon, FileText, CheckCircle2, XCircle, Edit, Lock } from 'lucide-react';
import type { AuditEntry } from '../types';

interface AuditTimelineProps {
  entries: AuditEntry[];
}

export function AuditTimeline({ entries }: AuditTimelineProps) {
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-LK', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getActionIcon = (action: string) => {
    if (action.toLowerCase().includes('created') || action.toLowerCase().includes('submitted')) {
      return FileText;
    } else if (action.toLowerCase().includes('approved')) {
      return CheckCircle2;
    } else if (action.toLowerCase().includes('rejected') || action.toLowerCase().includes('voided')) {
      return XCircle;
    } else if (action.toLowerCase().includes('edited') || action.toLowerCase().includes('updated')) {
      return Edit;
    } else if (action.toLowerCase().includes('posted') || action.toLowerCase().includes('locked')) {
      return Lock;
    }
    return Clock;
  };

  const getActionColor = (action: string) => {
    if (action.toLowerCase().includes('approved') || action.toLowerCase().includes('posted')) {
      return 'text-green-500 bg-green-500/10';
    } else if (action.toLowerCase().includes('rejected') || action.toLowerCase().includes('voided')) {
      return 'text-red-500 bg-red-500/10';
    } else if (action.toLowerCase().includes('submitted')) {
      return 'text-blue-500 bg-blue-500/10';
    }
    return 'text-[var(--muted-foreground)] bg-[var(--muted)]';
  };

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => {
        const Icon = getActionIcon(entry.action);
        const colorClass = getActionColor(entry.action);
        const isLast = index === entries.length - 1;

        return (
          <div key={entry.id} className="relative">
            {/* Timeline Line */}
            {!isLast && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-[var(--border)]" />
            )}

            {/* Entry */}
            <div className="flex gap-4">
              {/* Icon */}
              <div className={`size-12 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0 z-10`}>
                <Icon className="size-5" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-foreground">{entry.action}</p>
                    <span className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">
                      {formatDateTime(entry.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-2">
                    <UserIcon className="size-4" aria-hidden="true" />
                    <span>{entry.actor}</span>
                  </div>

                  {entry.details && (
                    <p className="text-sm text-[var(--muted-foreground)] mt-2 p-3 bg-[var(--muted)] rounded-md">
                      {entry.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
