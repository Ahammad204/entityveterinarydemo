import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'tight' | 'normal' | 'wide' | 'full';
  className?: string;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'normal',
  className = '',
  id
}) => {
  const sizeClasses = {
    tight: 'max-w-4xl',
    normal: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full'
  };

  return (
    <div id={id} className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};
