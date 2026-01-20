import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePython } from '../hooks/usePython';
import { useGame } from '../context/GameContext';
import { CURRICULUM } from '../data/curriculum';
import { CodeDeck } from '../components/Editor/CodeDeck';
import { Terminal } from '../components/Editor/Terminal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, Play, CheckCircle, RotateCcw, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';

// New Components
import TheoryPanel from '../components/TheoryPanel';
import QuizChallenge from '../components/challenges/QuizChallenge';
import FillBlankChallenge from '../components/challenges/FillBlankChallenge';

export const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { run, output, isRunning, isReady, clearOutput } = usePython();
  const { completeLesson, isLessonCompleted, deductCpuCycle, cpuCycles } = useGame();

  const [lesson, setLesson] = useState(null);
  const [code, setCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Find lesson data
  useEffect(() => {
    let found = null;
    for (const mod of CURRICULUM) {
      const l = mod.lessons.find(l => l.id === id);
      if (l) {
        found = l;
        break;
      }
    }

    if (found) {
      setLesson(found);
      setCode(found.initialCode || '');
      setIsSuccess(isLessonCompleted(found.id));
      clearOutput();
    }
  }, [id]);

  const handleSuccess = () => {
    if (!isSuccess) {
      playSound('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38BDF8', '#22D3EE', '#ffffff']
      });
      completeLesson(lesson.id, lesson.xp);
      setIsSuccess(true);
    }
  };

  const handleFail = () => {
    playSound('error');
    deductCpuCycle();
  };

  // Code Run Logic
  const handleRun = async () => {
    if (!lesson) return;
    playSound('click');
    await run(code);
  };

  // Check correctness after execution (Only for Code Type)
  useEffect(() => {
    if (!lesson || isRunning || output.length === 0 || lesson.type === 'quiz' || lesson.type === 'fillBlank') return;

    const outputStr = output.join('\n');

    // Simple check: does output contain expected string?
    // Enhance: support regex or exact match? 'exact_output' is in data.
    let isCorrect = false;
    if (lesson.checkType === 'exact_output') {
        // Clean trailing newlines for comparison
        isCorrect = outputStr.trim() === lesson.expectedOutput.trim();
    } else {
        isCorrect = output.some(line => line.includes(lesson.expectedOutput));
    }

    if (isCorrect) {
      handleSuccess();
    } else if (output.some(line => line.includes('Error') || line.includes('Traceback'))) {
       // Only penalize if it's an error, not just wrong logic?
       // Let's penalize errors.
       handleFail();
    } else {
       // Wrong output but no error? maybe silent fail or small sound?
       // Let's not deduct heart for logic error yet, only runtime error.
    }
  }, [isRunning, output, lesson]);

  if (!lesson) return <div className="p-10 text-center text-white font-mono">Loading data stream...</div>;

  const renderChallenge = () => {
    switch (lesson.type) {
      case 'quiz':
        return (
          <QuizChallenge
            lesson={lesson}
            onComplete={handleSuccess}
            onFail={handleFail}
          />
        );
      case 'fillBlank':
        return (
           <FillBlankChallenge
             lesson={lesson}
             onComplete={handleSuccess}
             onFail={handleFail}
           />
        );
      default: // 'code'
        return (
            <div className="flex flex-col h-full relative">
                <div className="h-12 border-b border-white/5 bg-[#0B1120] flex items-center justify-between px-4">
                    <div className="text-xs text-intp-muted font-mono">main.py</div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setCode(lesson.initialCode)} title="Reset Code">
                            <RotateCcw size={14} />
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleRun}
                            disabled={isRunning || !isReady}
                            className={isRunning ? "opacity-70 cursor-wait" : ""}
                        >
                            {isRunning ? "Executing..." : <><Play size={14} /> Run Code</>}
                        </Button>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <CodeDeck code={code} onChange={setCode} />
                </div>
                <div className="h-1/3 md:h-64 border-t border-white/5">
                    <Terminal output={output} className="h-full rounded-none border-0" />
                </div>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen md:flex-row bg-intp-base text-white">

      {/* Left Panel: Content */}
      <div className="w-full md:w-1/3 lg:w-[40%] flex flex-col border-r border-white/5 bg-intp-base/50 backdrop-blur">

        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/map')} className="text-intp-muted hover:text-white">
                <ArrowLeft size={16} /> Back
            </Button>
            <div className="flex gap-4 items-center">
                 <div className="flex items-center gap-1 text-red-400">
                    <Heart size={16} fill="currentColor" />
                    <span className="font-mono text-sm">{cpuCycles}/5</span>
                 </div>
                 <Badge variant="highlight">{lesson.xp} XP</Badge>
            </div>
        </div>

        {/* Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-mono text-white mb-2">{lesson.title}</h1>
                <p className="text-intp-muted">{lesson.description}</p>
            </div>

            <TheoryPanel lesson={lesson} />

            <div className="bg-intp-surfaceLight/30 p-4 rounded-lg border border-intp-highlight/20">
                <h3 className="text-sm font-bold text-intp-highlight uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle size={16} /> Mission Objective
                </h3>
                <p className="text-sm">{lesson.task}</p>
            </div>

            {/* Success State */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg"
                    >
                        <h3 className="text-green-400 font-bold mb-2">System Validated</h3>
                        <p className="text-sm text-green-300 mb-4">Module logic confirmed. You may proceed.</p>
                        <Button variant="primary" className="w-full" onClick={() => navigate('/map')}>
                            Return to Map
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Right Panel: Challenge Area */}
      <div className="flex-1 h-1/2 md:h-full overflow-y-auto md:overflow-hidden bg-[#0B1120]">
        {renderChallenge()}
      </div>
    </div>
  );
};
