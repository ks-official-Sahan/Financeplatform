// Core domain types for Weeraman Associates Finance Platform

export type Workstream = 'Notary' | 'Case' | 'Company' | 'Office';

export type Lifecycle = 'Draft' | 'Submitted' | 'Approved' | 'Posted' | 'Voided';

export type UserRole = 'Partner' | 'Admin' | 'Accounts Officer' | 'HR' | 'Payroll';

export type AttachmentPermission = 'Public' | 'Partner Only' | 'Confidential';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'Bank' | 'Cash' | 'Petty Cash' | 'Receivable' | 'Payable';
  balance: number;
  currency: string;
}

export interface Attachment {
  id: string;
  filename: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  permission: AttachmentPermission;
  url: string;
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  actor: string;
  action: string;
  details?: string;
  linkedTo?: string;
}

export interface KPIData {
  cashBankTotal: number;
  arOutstanding: number;
  apOutstanding: number;
  approvalsPending: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  ref: string;
  status: Lifecycle;
  amount: number;
  workstream: Workstream;
  date: Date;
  party?: string;
}

// Invoice types
export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  client: string;
  workstream: Workstream;
  matterRef?: string;
  status: Lifecycle;
  lines: InvoiceLine[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  attachments?: Attachment[];
  auditTrail?: AuditEntry[];
}

// Payment types
export interface PaymentAllocation {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
}

export interface Payment {
  id: string;
  date: Date;
  method: 'Cash' | 'Bank Transfer' | 'Cheque' | 'Card';
  account: string;
  reference?: string;
  amount: number;
  allocations: PaymentAllocation[];
  status: Lifecycle;
  receivedFrom: string;
  workstream: Workstream;
}

// Expense types
export interface Expense {
  id: string;
  date: Date;
  category: string;
  description: string;
  amount: number;
  workstream: Workstream;
  account: string;
  party: string;
  assetRef?: string;
  status: Lifecycle;
  attachment?: Attachment;
  requiresApproval: boolean;
}

// Bill types
export interface Bill {
  id: string;
  vendor: string;
  billNumber: string;
  date: Date;
  dueDate: Date;
  amount: number;
  amountPaid: number;
  status: Lifecycle;
  workstream: Workstream;
  category: string;
}

// Ledger types
export interface LedgerEntry {
  id: string;
  date: Date;
  ref: string;
  type: string;
  description: string;
  debit?: number;
  credit?: number;
  balance: number;
  workstream?: Workstream;
  party?: string;
  linkedTo?: string;
}

// Petty Cash types
export interface PettyVoucher {
  id: string;
  date: Date;
  category: string;
  description: string;
  amount: number;
  workstream: Workstream;
  notes?: string;
  attachment?: Attachment;
  status: Lifecycle;
  createdBy: string;
}

export interface PettyCashFloat {
  current: number;
  lastReplenished: Date;
  limit: number;
}

// Approval types
export interface ApprovalItem {
  id: string;
  type: 'Expense' | 'Payment' | 'Bill' | 'Transfer' | 'Adjustment';
  ref: string;
  status: 'Pending' | 'Approved' | 'Returned';
  amount: number;
  workstream: Workstream;
  account: string;
  party: string;
  riskFlags: string[];
  submittedBy: string;
  submittedAt: Date;
  hasAttachment: boolean;
  description: string;
}

// Aging types
export interface AgingBucket {
  current: number;
  days_0_30: number;
  days_31_60: number;
  days_61_90: number;
  days_90_plus: number;
}

export interface ClientAging {
  client: string;
  total: number;
  buckets: AgingBucket;
}

export interface VendorAging {
  vendor: string;
  total: number;
  buckets: AgingBucket;
}

// Period Close types
export interface PeriodStatus {
  month: string;
  year: number;
  isLocked: boolean;
  lockedBy?: string;
  lockedAt?: Date;
}

// Asset types (Phase 6)
export interface Asset {
  id: string;
  name: string;
  category: string;
  purchaseDate: Date;
  purchaseCost: number;
  currentValue: number;
  status: 'Active' | 'Disposed';
}

// Stamp types (Phase 6)
export interface StampInventory {
  denomination: number;
  quantity: number;
  value: number;
}

export interface StampTransaction {
  id: string;
  date: Date;
  type: 'Purchase' | 'Issue' | 'Adjustment';
  denomination: number;
  quantity: number;
  value: number;
  workstream?: Workstream;
  matter?: string;
}
