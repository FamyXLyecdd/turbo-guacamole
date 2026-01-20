import React from 'react';
import { cn } from './Button';
import { motion } from 'framer-motion';

export const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' } : {}}
      className={cn(
        'bg-intp-surface/80 backdrop-blur-md border border-white/5 rounded-lg p-6 relative overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIvPgo8L3N2Zz4=')] opacity-20 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
