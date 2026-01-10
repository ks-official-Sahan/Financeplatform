import type {
  User,
  Account,
  KPIData,
  RecentActivity,
  Invoice,
  Payment,
  Expense,
  Bill,
  LedgerEntry,
  PettyVoucher,
  PettyCashFloat,
  ApprovalItem,
  ClientAging,
  VendorAging,
  PeriodStatus,
} from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Anura Weeraman',
  email: 'anura@weeraman.lk',
  role: 'Partner',
};

export const accounts: Account[] = [
  { id: 'acc1', name: 'Commercial Bank - Current', type: 'Bank', balance: 2847500, currency: 'LKR' },
  { id: 'acc2', name: 'Sampath Bank - Savings', type: 'Bank', balance: 1265000, currency: 'LKR' },
  { id: 'acc3', name: 'Cash on Hand', type: 'Cash', balance: 45000, currency: 'LKR' },
  { id: 'acc4', name: 'Petty Cash', type: 'Petty Cash', balance: 15000, currency: 'LKR' },
];

export const kpiData: KPIData = {
  cashBankTotal: 4172500,
  arOutstanding: 1847250,
  apOutstanding: 385000,
  approvalsPending: 7,
};

export const recentActivity: RecentActivity[] = [
  {
    id: 'ra1',
    type: 'Invoice',
    ref: 'INV-2026-0143',
    status: 'Posted',
    amount: 125000,
    workstream: 'Notary',
    date: new Date('2026-01-10'),
    party: 'Silva Holdings (Pvt) Ltd',
  },
  {
    id: 'ra2',
    type: 'Payment Received',
    ref: 'PMT-0089',
    status: 'Posted',
    amount: 250000,
    workstream: 'Case',
    date: new Date('2026-01-09'),
    party: 'Perera Transport Ltd',
  },
  {
    id: 'ra3',
    type: 'Expense',
    ref: 'EXP-0234',
    status: 'Approved',
    amount: 12500,
    workstream: 'Office',
    date: new Date('2026-01-09'),
    party: 'Lanka Fuel',
  },
  {
    id: 'ra4',
    type: 'Bill Payment',
    ref: 'BP-0067',
    status: 'Posted',
    amount: 45000,
    workstream: 'Office',
    date: new Date('2026-01-08'),
    party: 'Office Supplies Co.',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'inv1',
    number: 'INV-2026-0143',
    date: new Date('2026-01-10'),
    dueDate: new Date('2026-02-09'),
    client: 'Silva Holdings (Pvt) Ltd',
    workstream: 'Notary',
    matterRef: 'NOT-2026-012',
    status: 'Posted',
    lines: [
      { id: 'l1', description: 'Property Transfer - Deed Preparation', quantity: 1, rate: 75000, amount: 75000 },
      { id: 'l2', description: 'Attestation Services', quantity: 1, rate: 50000, amount: 50000 },
    ],
    subtotal: 125000,
    tax: 0,
    total: 125000,
    amountPaid: 0,
    amountDue: 125000,
  },
  {
    id: 'inv2',
    number: 'INV-2026-0142',
    date: new Date('2026-01-08'),
    dueDate: new Date('2026-02-07'),
    client: 'Perera Transport Ltd',
    workstream: 'Case',
    matterRef: 'CASE-2025-089',
    status: 'Posted',
    lines: [
      { id: 'l3', description: 'Legal Consultation - Contract Dispute', quantity: 8, rate: 15000, amount: 120000 },
      { id: 'l4', description: 'Court Filing Fees', quantity: 1, rate: 5000, amount: 5000 },
    ],
    subtotal: 125000,
    tax: 0,
    total: 125000,
    amountPaid: 125000,
    amountDue: 0,
  },
  {
    id: 'inv3',
    number: 'INV-2026-0141',
    date: new Date('2026-01-05'),
    dueDate: new Date('2026-01-20'),
    client: 'Mendis Exports Inc',
    workstream: 'Company',
    matterRef: 'COM-2026-003',
    status: 'Posted',
    lines: [
      { id: 'l5', description: 'Company Formation Services', quantity: 1, rate: 200000, amount: 200000 },
    ],
    subtotal: 200000,
    tax: 0,
    total: 200000,
    amountPaid: 100000,
    amountDue: 100000,
  },
  {
    id: 'inv4',
    number: 'INV-2025-0138',
    date: new Date('2025-12-15'),
    dueDate: new Date('2026-01-14'),
    client: 'Fernando Investments',
    workstream: 'Case',
    status: 'Posted',
    lines: [
      { id: 'l6', description: 'Legal Advisory - Property Dispute', quantity: 12, rate: 18000, amount: 216000 },
    ],
    subtotal: 216000,
    tax: 0,
    total: 216000,
    amountPaid: 0,
    amountDue: 216000,
  },
];

export const expenses: Expense[] = [
  {
    id: 'exp1',
    date: new Date('2026-01-09'),
    category: 'Fuel & Vehicle',
    description: 'Diesel for office vehicle',
    amount: 12500,
    workstream: 'Office',
    account: 'Cash on Hand',
    party: 'Lanka Fuel',
    status: 'Approved',
    requiresApproval: true,
  },
  {
    id: 'exp2',
    date: new Date('2026-01-08'),
    category: 'Office Supplies',
    description: 'Stationery and printer paper',
    amount: 8500,
    workstream: 'Office',
    account: 'Cash on Hand',
    party: 'Office Mart',
    status: 'Posted',
    requiresApproval: false,
  },
  {
    id: 'exp3',
    date: new Date('2026-01-07'),
    category: 'Travel',
    description: 'Client meeting - Galle',
    amount: 5000,
    workstream: 'Case',
    account: 'Petty Cash',
    party: 'Transport',
    status: 'Posted',
    requiresApproval: false,
  },
];

export const bills: Bill[] = [
  {
    id: 'bill1',
    vendor: 'Ceylon Electricity Board',
    billNumber: 'CEB-DEC-2025',
    date: new Date('2025-12-31'),
    dueDate: new Date('2026-01-15'),
    amount: 45000,
    amountPaid: 0,
    status: 'Posted',
    workstream: 'Office',
    category: 'Utilities',
  },
  {
    id: 'bill2',
    vendor: 'Dialog Axiata',
    billNumber: 'DLG-DEC-2025',
    date: new Date('2025-12-28'),
    dueDate: new Date('2026-01-12'),
    amount: 18500,
    amountPaid: 18500,
    status: 'Posted',
    workstream: 'Office',
    category: 'Telecommunications',
  },
];

export const ledgerEntries: LedgerEntry[] = [
  {
    id: 'le1',
    date: new Date('2026-01-10'),
    ref: 'INV-2026-0143',
    type: 'Invoice',
    description: 'Silva Holdings (Pvt) Ltd - Notary Services',
    debit: 125000,
    balance: 2972500,
    workstream: 'Notary',
    party: 'Silva Holdings (Pvt) Ltd',
    linkedTo: 'inv1',
  },
  {
    id: 'le2',
    date: new Date('2026-01-09'),
    ref: 'PMT-0089',
    type: 'Payment',
    description: 'Payment received - Perera Transport Ltd',
    credit: 125000,
    balance: 2847500,
    workstream: 'Case',
    party: 'Perera Transport Ltd',
  },
  {
    id: 'le3',
    date: new Date('2026-01-09'),
    ref: 'EXP-0234',
    type: 'Expense',
    description: 'Fuel - Office Vehicle',
    credit: 12500,
    balance: 2722500,
    workstream: 'Office',
    party: 'Lanka Fuel',
  },
];

export const pettyVouchers: PettyVoucher[] = [
  {
    id: 'pv1',
    date: new Date('2026-01-09'),
    category: 'Refreshments',
    description: 'Client meeting refreshments',
    amount: 2500,
    workstream: 'Case',
    status: 'Posted',
    createdBy: 'Priya Gunasekara',
  },
  {
    id: 'pv2',
    date: new Date('2026-01-08'),
    category: 'Transport',
    description: 'Courier charges - urgent documents',
    amount: 1500,
    workstream: 'Notary',
    status: 'Posted',
    createdBy: 'Anura Weeraman',
  },
];

export const pettyCashFloat: PettyCashFloat = {
  current: 15000,
  lastReplenished: new Date('2026-01-05'),
  limit: 25000,
};

export const approvalItems: ApprovalItem[] = [
  {
    id: 'app1',
    type: 'Expense',
    ref: 'EXP-0235',
    status: 'Pending',
    amount: 35000,
    workstream: 'Office',
    account: 'Commercial Bank - Current',
    party: 'Office Furniture Co.',
    riskFlags: ['High Amount'],
    submittedBy: 'Priya Gunasekara',
    submittedAt: new Date('2026-01-10T09:30:00'),
    hasAttachment: true,
    description: 'New office chairs (4 units)',
  },
  {
    id: 'app2',
    type: 'Payment',
    ref: 'PMT-0090',
    status: 'Pending',
    amount: 150000,
    workstream: 'Case',
    account: 'Commercial Bank - Current',
    party: 'Expert Witness Services',
    riskFlags: ['High Amount', 'New Vendor'],
    submittedBy: 'Priya Gunasekara',
    submittedAt: new Date('2026-01-09T14:20:00'),
    hasAttachment: true,
    description: 'Expert testimony - Land Survey Case',
  },
  {
    id: 'app3',
    type: 'Bill',
    ref: 'BILL-0045',
    status: 'Pending',
    amount: 28000,
    workstream: 'Office',
    account: 'Commercial Bank - Current',
    party: 'IT Support Services',
    riskFlags: [],
    submittedBy: 'Priya Gunasekara',
    submittedAt: new Date('2026-01-09T11:00:00'),
    hasAttachment: false,
    description: 'Monthly IT maintenance',
  },
  {
    id: 'app4',
    type: 'Transfer',
    ref: 'TRF-0012',
    status: 'Pending',
    amount: 50000,
    workstream: 'Office',
    account: 'Commercial Bank to Cash',
    party: 'Internal',
    riskFlags: [],
    submittedBy: 'Priya Gunasekara',
    submittedAt: new Date('2026-01-08T16:45:00'),
    hasAttachment: false,
    description: 'Replenish office cash',
  },
];

export const clientAging: ClientAging[] = [
  {
    client: 'Fernando Investments',
    total: 216000,
    buckets: { current: 0, days_0_30: 216000, days_31_60: 0, days_61_90: 0, days_90_plus: 0 },
  },
  {
    client: 'Silva Holdings (Pvt) Ltd',
    total: 125000,
    buckets: { current: 125000, days_0_30: 0, days_31_60: 0, days_61_90: 0, days_90_plus: 0 },
  },
  {
    client: 'Mendis Exports Inc',
    total: 100000,
    buckets: { current: 100000, days_0_30: 0, days_31_60: 0, days_61_90: 0, days_90_plus: 0 },
  },
  {
    client: 'Jayawardena Group',
    total: 185000,
    buckets: { current: 0, days_0_30: 0, days_31_60: 185000, days_61_90: 0, days_90_plus: 0 },
  },
];

export const vendorAging: VendorAging[] = [
  {
    vendor: 'Ceylon Electricity Board',
    total: 45000,
    buckets: { current: 45000, days_0_30: 0, days_31_60: 0, days_61_90: 0, days_90_plus: 0 },
  },
  {
    vendor: 'Office Supplies Co.',
    total: 32000,
    buckets: { current: 32000, days_0_30: 0, days_31_60: 0, days_61_90: 0, days_90_plus: 0 },
  },
];

export const periodStatus: PeriodStatus = {
  month: 'December',
  year: 2025,
  isLocked: true,
  lockedBy: 'Anura Weeraman',
  lockedAt: new Date('2026-01-05T10:00:00'),
};

export const workstreamOptions = ['Notary', 'Case', 'Company', 'Office'];
export const categoryOptions = {
  expense: ['Office Supplies', 'Fuel & Vehicle', 'Travel', 'Utilities', 'Telecommunications', 'Professional Fees', 'Other'],
  income: ['Legal Fees', 'Notary Fees', 'Consultation', 'Court Representation', 'Document Preparation'],
};
