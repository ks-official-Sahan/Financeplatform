import { CheckCircle2, Clock, FileCheck, Lock, XCircle, FileText } from 'lucide-react';
import type { Lifecycle } from '../types';

interface StatusBadgeProps {
  status: Lifecycle | 'Pending' | 'Returned';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'Draft':
        return {
          icon: FileText,
          label: 'Draft',
          bgClass: 'bg-[var(--status-draft)]',
          textClass: 'text-[var(--status-draft-fg)]',
        };
      case 'Submitted':
      case 'Pending':
        return {
          icon: Clock,
          label: status === 'Pending' ? 'Pending' : 'Submitted',
          bgClass: 'bg-[var(--status-submitted)]',
          textClass: 'text-[var(--status-submitted-fg)]',
        };
      case 'Approved':
        return {
          icon: CheckCircle2,
          label: 'Approved',
          bgClass: 'bg-[var(--status-approved)]',
          textClass: 'text-[var(--status-approved-fg)]',
        };
      case 'Posted':
        return {
          icon: Lock,
          label: 'Posted',
          bgClass: 'bg-[var(--status-posted)]',
          textClass: 'text-[var(--status-posted-fg)]',
        };
      case 'Voided':
        return {
          icon: XCircle,
          label: 'Voided',
          bgClass: 'bg-[var(--status-voided)]',
          textClass: 'text-[var(--status-voided-fg)]',
        };
      case 'Returned':
        return {
          icon: FileCheck,
          label: 'Returned',
          bgClass: 'bg-orange-500',
          textClass: 'text-white',
        };
      default:
        return {
          icon: FileText,
          label: status,
          bgClass: 'bg-gray-500',
          textClass: 'text-white',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md ${config.bgClass} ${config.textClass} ${className}`}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="font-medium">{config.label}</span>
    </span>
  );
}
