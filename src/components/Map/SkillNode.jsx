import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, Zap } from 'lucide-react';
import { cn } from '../ui/Button';

export const SkillNode = ({
  id,
  title,
  status = 'locked', // locked, available, completed
  x,
  y,
  onClick,
  icon: Icon
}) => {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isAvailable = status === 'available';

  return (
    <div
      className="absolute flex flex-col items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: x, top: y }}
      onClick={() => !isLocked && onClick()}
    >
      <motion.div
        whileHover={!isLocked ? { scale: 1.1, boxShadow: "0 0 25px rgba(34,211,238,0.4)" } : {}}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-colors duration-300 relative z-10",
          isLocked && "bg-intp-base border-gray-800 text-gray-700",
          isAvailable && "bg-intp-surface border-intp-highlight text-intp-highlight animate-pulse-slow shadow-[0_0_15px_rgba(56,189,248,0.2)]",
          isCompleted && "bg-intp-accent/20 border-intp-accent text-intp-accent"
        )}
      >
        {isLocked && <Lock size={20} />}
        {isCompleted && <Check size={24} strokeWidth={3} />}
        {isAvailable && (Icon ? <Icon size={24} /> : <Zap size={24} />)}
      </motion.div>

      {/* Label */}
      <div className={cn(
        "absolute top-20 text-xs font-mono font-bold whitespace-nowrap px-2 py-1 rounded bg-black/50 backdrop-blur transition-opacity",
        isLocked ? "opacity-50 text-gray-500" : "text-white opacity-100",
        "group-hover:scale-105 transition-transform"
      )}>
        {title}
      </div>
    </div>
  );
};
