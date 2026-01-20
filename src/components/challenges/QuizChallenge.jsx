import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizChallenge = ({ lesson, onComplete, onFail }) => {
  const [selected, setSelected] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;

    setHasSubmitted(true);
    const correct = selected === lesson.quiz.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      onFail();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto pt-10">
      <div className="bg-gray-900/50 border border-cyan-900/30 p-6 rounded-lg mb-8 backdrop-blur-sm">
        <h3 className="text-xl text-cyan-400 font-mono mb-6">
          {lesson.task}
        </h3>

        <div className="space-y-3">
          {lesson.quiz.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!hasSubmitted) setSelected(idx);
              }}
              disabled={hasSubmitted}
              className={`w-full text-left p-4 rounded border font-mono transition-all duration-200
                ${hasSubmitted && idx === lesson.quiz.correctIndex
                  ? 'bg-green-500/20 border-green-500 text-green-300'
                  : hasSubmitted && selected === idx && idx !== lesson.quiz.correctIndex
                  ? 'bg-red-500/20 border-red-500 text-red-300'
                  : selected === idx
                  ? 'bg-cyan-900/40 border-cyan-500 text-cyan-100'
                  : 'bg-black/40 border-gray-700 text-gray-400 hover:border-cyan-700 hover:text-cyan-200'}
              `}
            >
              <span className="inline-block w-8 opacity-50">
                {String.fromCharCode(65 + idx)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        {!hasSubmitted && (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className={`px-8 py-3 rounded font-bold tracking-wider transition-all
              ${selected !== null
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
            `}
          >
            CONFIRM_SELECTION
          </button>
        )}

        {hasSubmitted && !isCorrect && (
          <div className="text-red-400 font-mono animate-pulse">
            // ERROR: INCORRECT SELECTION. SYSTEM DAMAGED.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizChallenge;
