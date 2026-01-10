import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className = '', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 active:opacity-80',
      secondary: 'border-2 border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)] active:bg-[var(--border)]',
      tertiary: 'bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)] active:bg-[var(--muted)]',
      destructive: 'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-90 active:opacity-80',
      ghost: 'bg-transparent text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]',
    };
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm h-8',
      md: 'px-4 py-2 text-sm h-10',
      lg: 'px-6 py-3 text-base h-12',
    };
    
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
