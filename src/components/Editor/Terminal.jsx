import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '../ui/Button';

export const Terminal = ({ output = [], className }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  return (
    <div className={cn("flex flex-col bg-[#050910] border border-white/5 rounded-lg overflow-hidden font-mono text-sm", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-intp-muted select-none">
        <TerminalIcon size={12} />
        <span>STDOUT</span>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-1">
        <AnimatePresence initial={false}>
          {output.length === 0 && (
            <div className="text-gray-700 italic opacity-50">
              // Waiting for signal...
            </div>
          )}
          {output.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "break-words whitespace-pre-wrap",
                line.startsWith("Error") || line.startsWith("Traceback") || line.startsWith("System Error")
                  ? "text-red-400"
                  : line.startsWith("System Online") || line === "INTP\n" // Special coloring for specific outputs?
                    ? "text-intp-accent"
                    : "text-gray-300"
              )}
            >
              <span className="opacity-30 mr-2 select-none">$</span>
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>
    </div>
  );
};
