import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const FillBlankChallenge = ({ lesson, onComplete, onFail }) => {
  const [selected, setSelected] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { code, options, correctIndex } = lesson.fillBlank;

  // Replace the placeholder '____' with selected value or keep it
  const displayCode = selected !== null
    ? code.replace('____', options[selected])
    : code;

  const handleSubmit = () => {
    if (selected === null) return;

    setHasSubmitted(true);
    const correct = selected === correctIndex;
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
    <div className="flex flex-col h-full pt-4">
      <div className="text-gray-400 mb-4 font-mono text-sm">
        // COMPLETE THE PATTERN
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Left: Code Preview */}
        <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg p-1 relative overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={displayCode}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 16,
              fontFamily: '"JetBrains Mono", monospace',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
            }}
          />
          {/* Overlay to prevent interaction if needed, though readOnly does it */}
          <div className="absolute inset-0 pointer-events-none" />
        </div>

        {/* Right: Options */}
        <div className="flex flex-col justify-center space-y-4">
           {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!hasSubmitted) setSelected(idx);
              }}
              disabled={hasSubmitted}
              className={`p-4 rounded border font-mono text-lg transition-all duration-200
                ${hasSubmitted && idx === correctIndex
                  ? 'bg-green-500/20 border-green-500 text-green-300'
                  : hasSubmitted && selected === idx && idx !== correctIndex
                  ? 'bg-red-500/20 border-red-500 text-red-300'
                  : selected === idx
                  ? 'bg-cyan-900/40 border-cyan-500 text-cyan-100'
                  : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-cyan-700'}
              `}
            >
              {option}
            </button>
          ))}

          <div className="mt-8">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selected === null}
                className={`w-full py-4 rounded font-bold tracking-wider transition-all
                  ${selected !== null
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'}
                `}
              >
                COMPILE
              </button>
            ) : (
                <div className={`text-center font-mono p-4 rounded border ${isCorrect ? 'border-green-500/30 bg-green-900/20 text-green-400' : 'border-red-500/30 bg-red-900/20 text-red-400'}`}>
                    {isCorrect ? '>> COMPILE SUCCESSFUL' : '>> SYNTAX ERROR DETECTED'}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillBlankChallenge;
