import React from 'react';

export type BadgeVariant = 'demo' | 'tbc' | 'verified' | 'emergency' | 'accent' | 'neutral' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'demo',
  children,
  icon,
  className = '',
  size = 'md'
}) => {
  const variantClasses: Record<BadgeVariant, string> = {
    demo: 'bg-amber-50 text-amber-800 border-amber-200/80 font-medium',
    tbc: 'bg-slate-100 text-slate-700 border-slate-300 font-medium',
    verified: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
    emergency: 'bg-red-100 text-red-800 border-red-300 font-bold',
    accent: 'bg-teal-50 text-teal-800 border-teal-200 font-medium',
    neutral: 'bg-slate-50 text-slate-600 border-slate-200 font-normal',
    info: 'bg-sky-50 text-sky-800 border-sky-200 font-medium'
  };

  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-2 py-0.5 rounded-md gap-1' 
    : 'text-xs px-2.5 py-1 rounded-lg gap-1.5';

  return (
    <span className={`inline-flex items-center border ${variantClasses[variant]} ${sizeClasses} whitespace-nowrap ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
