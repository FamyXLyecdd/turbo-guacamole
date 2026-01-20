import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TheoryPanel = ({ lesson }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 mb-6">
      <div
        className="prose prose-invert prose-code:text-cyan-300 prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-700 max-w-none mb-4"
        dangerouslySetInnerHTML={{ __html: lesson.theory }}
      />

      {lesson.deepDive && (
        <div className="mt-8 border-t border-gray-700/50 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-xs font-mono text-cyan-600 hover:text-cyan-400 transition-colors"
          >
            <span>{isExpanded ? '[-]' : '[+]'}</span>
            DEEP_DIVE_PROTOCOL // {isExpanded ? 'COLLAPSE' : 'EXPAND'}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 text-sm text-gray-400 font-mono leading-relaxed bg-black/20 p-4 rounded mt-2 border-l-2 border-cyan-900">
                   <div dangerouslySetInnerHTML={{ __html: lesson.deepDive }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TheoryPanel;
