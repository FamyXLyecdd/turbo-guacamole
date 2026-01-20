import React from 'react';
import Editor from '@monaco-editor/react';

export const CodeDeck = ({ code, onChange, language = 'python', readOnly = false }) => {
  const handleEditorDidMount = (editor, monaco) => {
    // Define INTP theme
    monaco.editor.defineTheme('intp-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: '22d3ee' },
        { token: 'string', foreground: '38bdf8' },
        { token: 'number', foreground: 'f472b6' },
      ],
      colors: {
        'editor.background': '#0B1120', // intp-base
        'editor.lineHighlightBackground': '#1e293b',
        'editorLineNumber.foreground': '#475569',
      }
    });

    monaco.editor.setTheme('intp-dark');
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-white/5 shadow-2xl">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: '"Fira Code", monospace',
          fontLigatures: true,
          scrollBeyondLastLine: false,
          readOnly: readOnly,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          lineNumbersMinChars: 3,
        }}
      />
    </div>
  );
};
