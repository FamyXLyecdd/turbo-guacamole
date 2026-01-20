import { useState, useCallback, useEffect } from 'react';
import { executeCode, initPyodide } from '../utils/executor';

export const usePython = () => {
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Warm up the engine
    initPyodide()
      .then(() => setIsReady(true))
      .catch((err) => {
        console.error(err);
        setError("Failed to load Python engine");
      });
  }, []);

  const run = useCallback(async (code) => {
    if (!isReady) return;
    setIsRunning(true);
    setOutput([]);

    const handleOutput = (msg) => {
      setOutput((prev) => [...prev, msg]);
    };

    try {
      await executeCode(code, handleOutput);
    } catch (err) {
      handleOutput(`System Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [isReady]);

  const clearOutput = () => setOutput([]);

  return {
    output,
    run,
    isRunning,
    isReady,
    error,
    clearOutput
  };
};
