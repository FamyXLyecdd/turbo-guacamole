import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { playSound } from '../../utils/sound';

export const cn = (...inputs) => twMerge(clsx(inputs));

export const Button = ({ children, variant = 'primary', size = 'md', className, onClick, ...props }) => {
  const variants = {
    primary: 'bg-intp-highlight text-intp-base hover:bg-intp-accent hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] border border-transparent',
    secondary: 'bg-intp-surfaceLight text-white hover:bg-intp-muted/50 border border-intp-muted/30',
    outline: 'bg-transparent border border-intp-highlight text-intp-highlight hover:bg-intp-highlight/10',
    ghost: 'bg-transparent text-intp-muted hover:text-white hover:bg-white/5',
    danger: 'bg-intp-danger/20 text-intp-danger border border-intp-danger hover:bg-intp-danger/40',
    success: 'bg-intp-success/20 text-intp-success border border-intp-success hover:bg-intp-success/40'
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-8 py-3 text-base',
    icon: 'p-2'
  };

  const handleClick = (e) => {
    playSound('click');
    onClick && onClick(e);
  };

  const handleMouseEnter = () => {
    playSound('hover');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={cn(
        'rounded-md font-mono transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
