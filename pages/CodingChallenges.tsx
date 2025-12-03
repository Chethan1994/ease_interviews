
import React, { useState } from 'react';
import { CODING_CHALLENGES } from '../data/codingChallenges';
import { Badge } from '../components/ui/Badge';
import { Code2, Play, ExternalLink, Box, CheckCircle2, RefreshCw } from 'lucide-react';

export const CodingChallenges: React.FC = () => {
  const [runningId, setRunningId] = useState<string | null>(null);

  const getStackBlitzUrl = (code: string, title: string) => {
    const files = {
        'App.js': code,
        'index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        'index.html': `<div id="root"></div>`
    };
    
    const params = new URLSearchParams();
    params.append('project[template]', 'create-react-app');
    params.append('project[title]', `DevPrep - ${title}`);
    params.append('project[files][src/App.js]', files['App.js']);
    params.append('project[files][src/index.js]', files['index.js']);
    params.append('project[files][public/index.html]', files['index.html']);

    return `https://stackblitz.com/run?${params.toString()}`;
  };

  const generateSrcDoc = (code: string) => {
    // 1. Remove imports
    let cleanCode = code
        .replace(/import\s+React.*?;/g, '')
        .replace(/import\s+.*?from\s+['"].*?['"];/g, '');

    let appCode = cleanCode;
    let mountCode = '';

    // 2. Detect Component or Pure Function
    if (code.includes('export default function')) {
        const match = code.match(/export default function\s+(\w+)/);
        const name = match ? match[1] : 'App';
        // Remove 'export default' so it's just a local function
        appCode = appCode.replace('export default function', 'function');
        mountCode = `
            try {
                const root = ReactDOM.createRoot(document.getElementById('root')); 
                root.render(<${name} />);
            } catch (e) {
                document.body.innerHTML = '<div style="color:red; padding:20px">Runtime Error: ' + e.message + '</div>';
            }
        `;
    } else {
        // For pure logic (JS) challenges, we try to just run it and show a message
        // We'll strip any export default if present
        appCode = appCode.replace(/export default/, '');
        mountCode = `
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(
                <div className="p-6 font-sans text-slate-600 flex flex-col items-center justify-center text-center h-full">
                    <div className="bg-slate-100 p-4 rounded-full mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Logic Challenge</h3>
                    <p>This is a non-visual algorithm challenge.</p>
                    <p className="text-sm mt-2">The function has been loaded into memory. You can test it via the browser console.</p>
                </div>
            );
        `;
    }

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body { background-color: #ffffff; margin: 0; min-height: 100vh; font-family: sans-serif; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
            </style>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                // Inject common React hooks globally so stripped imports work
                const { useState, useEffect, useRef, useReducer, useMemo, useCallback, useContext, createContext } = React;
                
                ${appCode}

                ${mountCode}
            </script>
        </body>
        </html>
    `;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center justify-center gap-3">
            <div className="bg-slate-900 text-white p-2 rounded-lg">
                <Code2 className="w-8 h-8" />
            </div>
            Coding Challenges
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Practice hands-on coding problems. Solutions are provided upfront—run them instantly to see the result.
        </p>
      </div>

      <div className="space-y-12">
        {CODING_CHALLENGES.map((challenge) => {
            const isRunning = runningId === challenge.id;

            return (
                <div key={challenge.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    {/* Header Section */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{challenge.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge type="difficulty" value={challenge.difficulty} />
                                    {challenge.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-700 text-lg leading-relaxed">{challenge.description}</p>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        {/* Solution Code - Full Width (or responsive split if needed in future) */}
                        <div className={`bg-[#1e1e1e] flex flex-col min-h-[300px] transition-all duration-300 ${isRunning ? 'lg:w-1/2' : 'w-full'}`}>
                             <div className="px-4 py-2 bg-emerald-900/20 border-b border-emerald-900/20 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                    <CheckCircle2 className="w-4 h-4" /> Solution
                                </div>
                                <span className="text-[10px] bg-emerald-900/40 text-emerald-300 border border-emerald-900/50 px-2 py-0.5 rounded font-mono">Recommended</span>
                            </div>
                            <pre className="flex-1 p-6 overflow-x-auto text-sm font-mono text-emerald-100 leading-relaxed custom-scrollbar">
                                <code>{challenge.solutionCode}</code>
                            </pre>
                        </div>

                        {/* Live Preview Pane */}
                        {isRunning && (
                             <div className="flex flex-col lg:w-1/2 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50 min-h-[400px]">
                                <div className="px-4 py-2 bg-white border-b border-slate-200 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        <Play className="w-4 h-4 text-green-600" /> Live Preview
                                    </div>
                                </div>
                                <div className="flex-1 relative">
                                    <iframe 
                                        srcDoc={generateSrcDoc(challenge.solutionCode)}
                                        className="absolute inset-0 w-full h-full"
                                        title={`Preview ${challenge.title}`}
                                        sandbox="allow-scripts allow-modals allow-same-origin"
                                    />
                                </div>
                             </div>
                        )}
                    </div>
                    
                    {/* Buttons Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-2 justify-end items-center">
                        <button
                            onClick={() => setRunningId(isRunning ? null : challenge.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-bold shadow-sm ${
                                isRunning 
                                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                                : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-green-500/25'
                            }`}
                        >
                            {isRunning ? <RefreshCw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            {isRunning ? 'Reset / Close' : 'Run Preview'}
                        </button>
                        
                        <a 
                            href={getStackBlitzUrl(challenge.solutionCode, challenge.title)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-bold shadow-sm hover:shadow-indigo-500/25"
                        >
                            <Play className="w-4 h-4" /> StackBlitz
                        </a>
                        <a 
                            href="https://codesandbox.io/s/new"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                        >
                            <Box className="w-4 h-4" /> CodeSandbox
                        </a>
                        <a 
                            href="http://plnkr.co/edit/?p=preview"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
                        >
                            <ExternalLink className="w-4 h-4" /> Plunker
                        </a>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
