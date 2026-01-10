# Weeraman Associates Finance Platform

A complete, client-presentable finance management system designed for Weeraman Associates, a Sri Lankan law firm. This internal-only platform provides modern, accessible, and secure financial operations with strong guardrails and audit trails.

## 🎨 Design Philosophy

### Brand Identity
- **Golden Yellow**: `#F2CC0F` - Primary brand color, used for CTAs and focus states
- **Raisin Black**: `#212121` - Text and dark theme foundation
- **Soft Neutral White**: `#F5F5F5` - Background for light theme

### Design Principles
1. **Beginner-Friendly**: Minimal cognitive load with guided flows and progressive disclosure
2. **Modern & Clean**: Generous whitespace, clear visual hierarchy, consistent spacing (8pt system)
3. **Task-Based IA**: Users think in terms of "Get Paid / Spend / Money / People / Reports"
4. **Safe by Design**: Approvals, immutable audit trails, period locking, void/reversal workflows
5. **"Enter Once → Flows Everywhere"**: Linked objects and automatic updates throughout the system

## ♿ Accessibility (WCAG 2.2 AA/AAA)

### Compliance Features
- **AAA Contrast Ratios**: All text and interactive elements meet or exceed WCAG 2.2 AAA standards
- **Focus Indicators**: 3px golden yellow (`#F2CC0F`) focus rings with 2px offset
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Semantic HTML**: Proper heading structure, ARIA labels, and landmark regions
- **Status Communication**: Never rely on color alone - all status indicators include icon + label
- **Form Validation**: Clear error messages with icons, positioned near inputs
- **Screen Reader Support**: Descriptive labels, ARIA attributes, and live regions

### Typography
- **Primary Font**: Inter (with Noto Sans Sinhala/Tamil fallbacks)
- **Type Scale**: H1 (2rem) → H2 (1.5rem) → H3 (1.25rem) → Body (0.875rem) → Small (0.75rem)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 🎯 Core Domain Concepts

### Workstreams (Required)
Four business segments for transaction categorization:
- **Notary**: Notary services and attestations
- **Case**: Legal case work and court representation
- **Company**: Corporate secretarial services
- **Office**: General office operations and overheads

### Transaction Lifecycle
```
Draft → Submitted → Approved → Posted
                              ↓
                          Immutable
                              ↓
                    Void/Reversal for corrections
```

### Key Features
- **Risk-Based Approvals**: Automatic approval routing based on amount thresholds
- **Immutable Posted Records**: Once posted, transactions are locked with audit trail
- **Period Close**: Monthly period locking with Partner unlock requirement
- **Attachment Confidentiality**: Permission-based document access (Public / Partner Only / Confidential)

## 📁 Information Architecture

### Primary Navigation (Max 6 Items)
1. **Home**: Dashboard with KPIs and quick actions
2. **Get Paid**: Invoices, payments, AR aging
3. **Spend**: Expenses, bills, vendor payments
4. **Money**: Account ledgers, transfers, petty cash
5. **People**: Payroll, EPF/ETF, staff loans (Phase 5)
6. **Reports**: Financial and operational reports

### Secondary (Role-Gated)
- **Approvals Inbox**: Pending transaction approvals (Partner/Admin)
- **Stamps**: Inventory and duty tracking (Phase 6)
- **Assets**: Asset register and cost tracking (Phase 6)
- **Closing**: Period close management (Partner only)
- **Settings**: User management, workstreams, approval rules
- **Audit Log**: Complete system activity log

## 🚀 Implementation Phases

### ✅ Phase 1-4 (Implemented)
- Core Finance: Get Paid, Spend, Money modules
- Approval workflows with risk-based routing
- Dashboard with KPIs and recent activity
- Account ledgers and fund transfers
- Petty cash management
- Reports foundation
- Settings and user management
- Audit logging

### 🔄 Phase 5 (Planned)
- Payroll processing
- EPF/ETF statutory contributions
- Staff loans and advances
- HR integration

### 📋 Phase 6 (Future)
- Stamp inventory management
- Stamp duty ledger (collected vs remitted)
- Asset register
- Asset cost timeline (fuel, service, maintenance)
- Depreciation tracking

## 🎨 Component Library

### Buttons
- **Primary**: Golden yellow background with dark text (AAA contrast)
- **Secondary**: Outlined with transparent background
- **Tertiary**: Ghost button for subtle actions
- **Destructive**: Red background for dangerous actions
- **States**: Default / Hover / Pressed / Disabled / Loading

### Form Inputs
- Text input, textarea, select, date picker
- **States**: Default / Focus (3px golden ring) / Error / Disabled
- Helper text and inline validation
- Required field indicators

### Status Badges
Always include icon + label:
- **Draft**: Gray with FileText icon
- **Submitted**: Blue with Clock icon
- **Approved**: Green with CheckCircle2 icon
- **Posted**: Purple with Lock icon
- **Voided**: Red with XCircle icon

### Data Tables
- Sortable columns with visual indicators
- Density options: Comfortable / Compact
- Row actions and hover states
- Empty states with helpful messages
- Responsive overflow handling

### Dialogs
- **Approve Dialog**: Preview transaction with inline approve/return
- **Void Dialog**: Require reason for voiding with audit trail note
- **Confirm Dialog**: Destructive action confirmation
- Accessible focus management and keyboard support

## 🔒 Security & Guardrails

### Approval Rules
- Expenses > LKR 25,000 require Partner/Admin approval
- Transfers > LKR 50,000 require Partner approval
- New vendor payments flagged as "High Risk"
- Configurable thresholds in Settings

### Period Locking
1. Partner closes a period (e.g., December 2025)
2. System locks all transactions for that period
3. Backdated entries to locked periods are blocked
4. Only Partners can unlock (requires approval workflow)
5. Period lock banner appears throughout the app

### Void/Reversal Workflow
1. User navigates to posted transaction
2. Clicks "Void" (available for posted items only)
3. System requires reason (mandatory field)
4. System creates voiding entry with audit trail
5. User creates replacement transaction with correct details
6. Full audit trail maintained for compliance

## 🌓 Theme Support

### Light Theme
- Background: `#F5F5F5`
- Card: `#FFFFFF`
- Text: `#212121`
- Borders: `#D4D4D4`

### Dark Theme
- Background: `#1A1A1A` (near-black, not pure black)
- Card: `#212121`
- Text: `#F5F5F5`
- Borders: `#3A3A3A`

**Theme Toggle**: Top-right header with sun/moon icon

## 📊 Key Screens

### Home Dashboard
- **KPI Cards**: Cash & Bank total, AR outstanding, AP outstanding, Pending approvals
- **Quick Actions**: Create invoice, receive payment, add expense, make payment
- **Activity Feed**: Recent posted transactions with drill-down

### Get Paid Section
- **Invoice List**: Sortable table with status, amounts, clients
- **Create Invoice**: 3-step guided flow (Workstream → Details → Review)
- **Receive Payment**: Record payment with multi-invoice allocation
- **AR Aging**: Outstanding receivables by 0-30, 31-60, 61-90, 90+ day buckets

### Spend Section
- **Expenses List**: With category, workstream, approval status
- **Add Expense**: 3-step flow with auto-approval threshold check
- **Bills & Payables**: Vendor bills with due dates and payment status
- **Make Payment**: Record vendor payments

### Money Section
- **Account Overview**: Bank and cash account cards with balances
- **Ledger View**: Running balance with debit/credit columns
- **Transfer Funds**: Inter-account transfers with approval routing
- **Petty Cash**: Float management with voucher list

### Approvals Inbox
- **Risk Flag Display**: High Amount, New Vendor indicators
- **Impact Preview**: Shows affected accounts, workstream, reports
- **Inline Actions**: Approve & Post / Return for Correction / View Details
- **Attachment Indicators**: Shows if documents are attached

### Reports
- Income Statement, Workstream Summary, AR/AP Aging, Cash Flow
- Configurable filters: Date range, workstream, party
- Export options: PDF, Excel, CSV

## 🔧 Technical Stack

### Frontend
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling with custom design system
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon system
- **Sonner**: Toast notifications
- **Motion (Framer Motion)**: Smooth animations

### Design System
- **8pt Spacing System**: Consistent padding and margins
- **12-Column Grid**: Desktop layout structure
- **Custom CSS Variables**: Theme tokens for light/dark modes
- **Focus Management**: WCAG 2.2 compliant focus indicators

## 🎯 Interactive Prototype Flows

### Flow 1: Add Expense → Approval → Posted
1. User clicks "Add Expense" from dashboard
2. Step 1: Select workstream (Notary/Case/Company/Office)
3. Step 2: Fill details (date, category, amount, party)
4. Step 3: Review summary with impact preview
5. If amount > LKR 25,000 → Submitted for approval
6. If amount ≤ LKR 25,000 → Auto-posted
7. Approval inbox shows pending item with risk flags
8. Partner approves → Transaction posted to ledger
9. Appears in activity feed and expense list

### Flow 2: Create Invoice → Receive Payment → Allocate
1. User clicks "Create Invoice" from Get Paid
2. Step 1: Select workstream
3. Step 2: Enter client, matter, invoice lines
4. Step 3: Review total amount
5. Submit → Invoice posted to AR
6. User clicks "Receive Payment"
7. Enter payment details and amount
8. System automatically allocates to outstanding invoices
9. Invoice status updates, AR decreases

### Flow 3: Void Posted Transaction (Correction Workflow)
1. User navigates to posted transaction detail
2. Clicks "Void" button
3. System shows Void Dialog with warning
4. User enters required reason
5. System creates voiding entry
6. Original transaction marked as "Voided"
7. User creates new transaction with correct details
8. Audit timeline shows full history

### Flow 4: Period Close & Unlock
1. Partner navigates to Closing page
2. Completes pre-close checklist
3. Clicks "Close December 2025 Period"
4. System locks all December transactions
5. Period lock banner appears throughout app
6. User attempts backdated entry → Error message
7. User requests unlock → Partner approval required
8. Partner approves → Period unlocked temporarily

## 🎨 Design System Variables

### Colors
```css
--golden-yellow: #F2CC0F
--raisin-black: #212121
--soft-white: #F5F5F5
--ring: #F2CC0F (focus indicator)
```

### Spacing Scale (8pt System)
```css
0.5 = 4px   (0.25rem)
1   = 8px   (0.5rem)
2   = 16px  (1rem)
3   = 24px  (1.5rem)
4   = 32px  (2rem)
6   = 48px  (3rem)
8   = 64px  (4rem)
```

### Border Radius
```css
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1440px (primary design target)
- **Tablet**: 768px (adjusted layouts)
- **Mobile**: 375px (key screens optimized)

### Responsive Patterns
- **Sidebar**: Collapsible to icon-only on mobile
- **Tables**: Horizontal scroll with sticky columns
- **Forms**: Single-column layout on mobile
- **KPI Cards**: Stack vertically on smaller screens

## 🔍 Data Models

### Invoice
```typescript
{
  id, number, date, dueDate, client, workstream, matterRef,
  status: 'Draft' | 'Submitted' | 'Approved' | 'Posted' | 'Voided',
  lines: [{ description, quantity, rate, amount }],
  subtotal, tax, total, amountPaid, amountDue,
  attachments, auditTrail
}
```

### Expense
```typescript
{
  id, date, category, description, amount, workstream,
  account, party, assetRef, status, attachment, requiresApproval
}
```

### Ledger Entry
```typescript
{
  id, date, ref, type, description,
  debit, credit, balance,
  workstream, party, linkedTo
}
```

### Approval Item
```typescript
{
  id, type, ref, status, amount, workstream, account, party,
  riskFlags: ['High Amount', 'New Vendor'],
  submittedBy, submittedAt, hasAttachment, description
}
```

## 🎓 User Roles & Permissions

### Partner (Full Access)
- All modules and features
- Approve high-value transactions
- Close/unlock periods
- Manage users and settings
- View audit log

### Admin (Operations)
- All finance operations
- Approve transactions
- Cannot close/unlock periods
- Manage settings
- View audit log

### Accounts Officer
- Create invoices, expenses, payments
- View reports
- Cannot approve (unless designated)
- Limited settings access

### HR / Payroll (Phase 5)
- People module only
- Payroll processing
- EPF/ETF management
- Staff loans

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Environment Setup
- Node.js 18+ required
- React 18.3.1
- Tailwind CSS 4.x
- Vite 6.x

## 📋 Next Steps

### Immediate Enhancements
1. Add bank reconciliation workflow (Phase 4)
2. Implement email notifications for approvals
3. Add bulk invoice creation
4. Enhanced reporting with charts (Recharts)
5. PDF generation for invoices

### Phase 5 Preparation
1. Payroll schema design
2. EPF/ETF calculation rules
3. Staff loan workflow design
4. Integration points with HR systems

### Phase 6 Planning
1. Stamp inventory data model
2. Asset depreciation calculations
3. Cost timeline tracking structure
4. Duty remittance reporting

## 📞 Support & Documentation

### Key Contacts
- **Project Lead**: [To be assigned]
- **Design**: TOP 1% Product Designer
- **Development**: Full-stack team

### Documentation
- User guides per module
- Admin setup documentation
- API documentation (future)
- Security & compliance guide

---

**Built with accessibility, security, and user experience as top priorities.**

*For Weeraman Associates - January 2026*
