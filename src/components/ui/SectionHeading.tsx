import React from 'react';
import { Badge } from './Badge';
import { Info } from 'lucide-react';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  demoNotice?: string;
  showDemoBadge?: boolean;
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  demoNotice,
  showDemoBadge = true,
  className = '',
  light = false
}) => {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-12 ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <span className={`text-xs font-bold uppercase tracking-widest mb-2.5 ${
          light ? 'text-teal-300' : 'text-teal-700'
        }`}>
          {eyebrow}
        </span>
      )}

      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display ${
        light ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-3.5 text-base sm:text-lg leading-relaxed ${
          light ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}

      {showDemoBadge && demoNotice && (
        <div className="mt-3">
          <Badge variant="demo" size="sm" icon={<Info className="w-3 h-3" />}>
            {demoNotice}
          </Badge>
        </div>
      )}
    </div>
  );
};
