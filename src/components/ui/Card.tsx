import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  bordered = true,
  className = '',
  padding = 'md',
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hoverable 
    ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 card-elevation-subtle' 
    : 'card-elevation-subtle';

  const borderClass = bordered ? 'border border-slate-200/90' : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-2xs ${borderClass} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
