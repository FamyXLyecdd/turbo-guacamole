import React from 'react';
import { cn } from './Button';

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-intp-surfaceLight text-intp-muted border-white/10',
    highlight: 'bg-intp-highlight/10 text-intp-highlight border-intp-highlight/20',
    accent: 'bg-intp-accent/10 text-intp-accent border-intp-accent/20',
    success: 'bg-intp-success/10 text-intp-success border-intp-success/20',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
