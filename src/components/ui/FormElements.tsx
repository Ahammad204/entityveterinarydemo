import React from 'react';

export interface FormLabelProps {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, required, children, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 ${className}`}>
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

export interface HelperTextProps {
  children: React.ReactNode;
  className?: string;
}

export const HelperText: React.FC<HelperTextProps> = ({ children, className = '' }) => (
  <p className={`text-xs text-slate-500 mt-1.5 ${className}`}>{children}</p>
);

export interface ErrorTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ children, className = '' }) => (
  <p className={`text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1 ${className}`}>
    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
    {children}
  </p>
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, helperText, icon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && <FormLabel htmlFor={inputId} required={required}>{label}</FormLabel>}
        <div className="relative rounded-lg shadow-2xs">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
              icon ? 'pl-10' : 'px-3.5'
            } py-2.5 ${
              error ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-slate-300'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <ErrorText>{error}</ErrorText>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, required, error, helperText, options, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && <FormLabel htmlFor={selectId} required={required}>{label}</FormLabel>}
        <select
          id={selectId}
          ref={ref}
          className={`w-full rounded-lg border text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors px-3.5 py-2.5 ${
            error ? 'border-red-400' : 'border-slate-300'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <ErrorText>{error}</ErrorText>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, required, error, helperText, className = '', id, rows = 3, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && <FormLabel htmlFor={textareaId} required={required}>{label}</FormLabel>}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={`w-full rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors px-3.5 py-2.5 ${
            error ? 'border-red-400' : 'border-slate-300'
          } ${className}`}
          {...props}
        />
        {error && <ErrorText>{error}</ErrorText>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
