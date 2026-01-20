
let pyodideInstance = null;
let isLoading = false;

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";

export const initPyodide = async () => {
  if (pyodideInstance) return pyodideInstance;

  // Simple lock mechanism
  if (isLoading) {
    while (isLoading) {
      await new Promise(r => setTimeout(r, 100));
      if (pyodideInstance) return pyodideInstance;
    }
  }

  isLoading = true;

  try {
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = PYODIDE_URL;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    pyodideInstance = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
    });

    isLoading = false;
    return pyodideInstance;
  } catch (error) {
    isLoading = false;
    console.error("Failed to load Pyodide:", error);
    throw error;
  }
};

export const executeCode = async (code, onOutput) => {
  const pyodide = await initPyodide();

  // Reset output capture
  // We define a custom python print override or use setStdout if available
  // The most robust way is to redirect sys.stdout in Python

  try {
    // We can't easily rely on setStdout for async execution in all versions without setup
    // But let's try the modern API first
    pyodide.setStdout({ batched: (msg) => onOutput(msg) });
    pyodide.setStderr({ batched: (msg) => onOutput(msg) }); // Treat stderr as output for now or color it differently

    await pyodide.runPythonAsync(code);

    // We don't necessarily return the result for "programs", just the side effects (print)
    // But if it's an expression, we might want it.
    // For this app, we rely on 'print' outputs mostly.

    return true;
  } catch (error) {
    onOutput(`\nTraceback:\n${error.message}`);
    return false;
  }
};
