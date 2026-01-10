import { forwardRef, InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, required, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-medium text-[var(--foreground)]"
          >
            {label}
            {required && <span className="text-[var(--destructive)] ml-1" aria-label="required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full px-3 py-2 rounded-md 
            bg-[var(--input-background)] 
            border-2 
            ${error ? 'border-[var(--destructive)]' : 'border-[var(--border)]'}
            text-[var(--foreground)]
            placeholder:text-[var(--muted-foreground)]
            focus:outline-none 
            focus:ring-3 
            focus:ring-[var(--ring)] 
            focus:ring-offset-2
            disabled:opacity-50 
            disabled:cursor-not-allowed
            transition-colors
            ${className}
          `}
          {...props}
        />
        {error && (
          <div id={errorId} className="flex items-center gap-1.5 text-sm text-[var(--destructive)]" role="alert">
            <AlertCircle className="size-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-sm text-[var(--muted-foreground)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export interface FormTextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  rows?: number;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, required, rows = 4, className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label 
            htmlFor={textareaId} 
            className="text-sm font-medium text-[var(--foreground)]"
          >
            {label}
            {required && <span className="text-[var(--destructive)] ml-1" aria-label="required">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full px-3 py-2 rounded-md 
            bg-[var(--input-background)] 
            border-2 
            ${error ? 'border-[var(--destructive)]' : 'border-[var(--border)]'}
            text-[var(--foreground)]
            placeholder:text-[var(--muted-foreground)]
            focus:outline-none 
            focus:ring-3 
            focus:ring-[var(--ring)] 
            focus:ring-offset-2
            disabled:opacity-50 
            disabled:cursor-not-allowed
            resize-vertical
            transition-colors
            ${className}
          `}
          {...props}
        />
        {error && (
          <div id={errorId} className="flex items-center gap-1.5 text-sm text-[var(--destructive)]" role="alert">
            <AlertCircle className="size-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-sm text-[var(--muted-foreground)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export interface FormSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, required, options, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label 
            htmlFor={selectId} 
            className="text-sm font-medium text-[var(--foreground)]"
          >
            {label}
            {required && <span className="text-[var(--destructive)] ml-1" aria-label="required">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full px-3 py-2 rounded-md 
            bg-[var(--input-background)] 
            border-2 
            ${error ? 'border-[var(--destructive)]' : 'border-[var(--border)]'}
            text-[var(--foreground)]
            focus:outline-none 
            focus:ring-3 
            focus:ring-[var(--ring)] 
            focus:ring-offset-2
            disabled:opacity-50 
            disabled:cursor-not-allowed
            transition-colors
            ${className}
          `}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <div id={errorId} className="flex items-center gap-1.5 text-sm text-[var(--destructive)]" role="alert">
            <AlertCircle className="size-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-sm text-[var(--muted-foreground)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
