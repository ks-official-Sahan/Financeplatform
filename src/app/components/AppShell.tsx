import { useState, ReactNode } from 'react';
import { 
  Home, 
  DollarSign, 
  CreditCard, 
  Wallet, 
  Users, 
  FileText, 
  CheckSquare, 
  Stamp,
  Package,
  Lock,
  Settings,
  FileSearch,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Bell,
  User
} from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { UserRole } from '../types';

interface AppShellProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: UserRole;
  userName: string;
}

export function AppShell({ children, currentPage, onNavigate, userRole, userName }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const primaryNav = [
    { id: 'home', label: 'Home', icon: Home, roles: ['Partner', 'Admin', 'Accounts Officer'] as UserRole[] },
    { id: 'get-paid', label: 'Get Paid', icon: DollarSign, roles: ['Partner', 'Admin', 'Accounts Officer'] as UserRole[] },
    { id: 'spend', label: 'Spend', icon: CreditCard, roles: ['Partner', 'Admin', 'Accounts Officer'] as UserRole[] },
    { id: 'money', label: 'Money', icon: Wallet, roles: ['Partner', 'Admin', 'Accounts Officer'] as UserRole[] },
    { id: 'people', label: 'People', icon: Users, roles: ['Partner', 'Admin', 'HR', 'Payroll'] as UserRole[] },
    { id: 'reports', label: 'Reports', icon: FileText, roles: ['Partner', 'Admin', 'Accounts Officer'] as UserRole[] },
  ];

  const secondaryNav = [
    { id: 'approvals', label: 'Approvals Inbox', icon: CheckSquare, roles: ['Partner', 'Admin'] as UserRole[] },
    { id: 'stamps', label: 'Stamps', icon: Stamp, roles: ['Partner', 'Admin', 'Accounts Officer'] as UserRole[] },
    { id: 'assets', label: 'Assets', icon: Package, roles: ['Partner', 'Admin'] as UserRole[] },
    { id: 'closing', label: 'Closing', icon: Lock, roles: ['Partner'] as UserRole[] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['Partner', 'Admin'] as UserRole[] },
    { id: 'audit-log', label: 'Audit Log', icon: FileSearch, roles: ['Partner', 'Admin'] as UserRole[] },
  ];

  const canAccess = (item: { roles: UserRole[] }) => item.roles.includes(userRole);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarCollapsed ? 'w-16' : 'w-64'} 
          bg-sidebar border-r border-sidebar-border
          flex flex-col transition-all duration-300 ease-in-out
        `}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="size-8 bg-[var(--primary)] rounded-md flex items-center justify-center">
                <span className="text-[var(--primary-foreground)] font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-sidebar-foreground">Weeraman</h1>
                <p className="text-xs text-[var(--muted-foreground)]">Associates</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-md hover:bg-sidebar-accent transition-colors"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <Menu className="size-5" /> : <X className="size-5" />}
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 overflow-y-auto p-4" aria-label="Primary navigation">
          <div className="space-y-1">
            {primaryNav.filter(canAccess).map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md
                    transition-colors
                    ${isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="size-5 flex-shrink-0" aria-hidden="true" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          {!sidebarCollapsed && (
            <div className="my-4 border-t border-sidebar-border" />
          )}

          {/* Secondary Navigation */}
          <div className="space-y-1 mt-4">
            {secondaryNav.filter(canAccess).map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
                    transition-colors
                    ${isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }
                    ${sidebarCollapsed ? 'justify-center' : ''}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="size-4 flex-shrink-0" aria-hidden="true" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--muted-foreground)]" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search transactions, clients..."
                className="w-full pl-10 pr-4 py-2 rounded-md bg-[var(--input-background)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-[var(--muted)] transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                <Moon className="size-5" aria-hidden="true" />
              ) : (
                <Sun className="size-5" aria-hidden="true" />
              )}
            </button>

            {/* Notifications */}
            <button
              className="p-2 rounded-md hover:bg-[var(--muted)] transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="size-5" aria-hidden="true" />
              <span className="absolute top-1 right-1 size-2 bg-[var(--destructive)] rounded-full" aria-label="Unread notifications" />
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-[var(--border)]">
              <div className="text-right">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{userRole}</p>
              </div>
              <button className="size-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-medium">
                <User className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
