
import React, { useState } from 'react';
import { CODING_CHALLENGES } from '../data/codingChallenges';
import { Category } from '../types';
import { Badge } from '../components/ui/Badge';
import { AdBanner } from '../components/AdBanner';
import { CopyButton } from '../components/ui/CopyButton';
import { Code2, Play, ExternalLink, Box, CheckCircle2, RefreshCw, Terminal, Layout, Hash, ArrowLeft, Clock, Server } from 'lucide-react';

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  [Category.React]: Code2,
  [Category.JavaScript]: Terminal,
  [Category.NodeJS]: Server,
  [Category.CSS]: Layout,
  [Category.HTML]: Hash,
};

export const CodingChallenges: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [runningId, setRunningId] = useState<string | null>(null);
  
  // Release 1: Premium disabled
  const isPremium = false;

  const getStackBlitzUrl = (code: string, title: string) => {
    const files = {
        'App.js': code,
        'index.js': `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);`,
        'index.html': `<div id="root"></div>`
    };
    
    const params = new URLSearchParams();
    params.append('project[template]', 'create-react-app');
    params.append('project[title]', `InterviewPrep - ${title}`);
    params.append('project[files][src/App.js]', files['App.js']);
    params.append('project[files][src/index.js]', files['index.js']);
    params.append('project[files][public/index.html]', files['index.html']);

    return `https://stackblitz.com/run?${params.toString()}`;
  };

  const generateSrcDoc = (code: string) => {
    // Basic detection for Node.js code which won't run in browser
    if (code.includes("require('http')") || code.includes("require('fs')") || code.includes("process.")) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>body { font-family: sans-serif; padding: 20px; color: #334155; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 90vh; } .icon { font-size: 40px; margin-bottom: 20px; }</style>
            </head>
            <body>
                <div class="icon">⚠️</div>
                <h3>Backend Environment Required</h3>
                <p>This challenge uses Node.js modules (fs, http, etc.) which cannot run directly in the browser.</p>
                <p>Please review the logic in the Solution tab or run this code locally.</p>
            </body>
            </html>
        `;
    }

    let cleanCode = code
        .replace(/import\s+React.*?;/g, '')
        .replace(/import\s+.*?from\s+['"].*?['"];/g, '');

    let appCode = cleanCode;
    let mountCode = '';

    if (code.includes('export default function')) {
        const match = code.match(/export default function\s+(\w+)/);
        const name = match ? match[1] : 'App';
        appCode = appCode.replace('export default function', 'function');
        mountCode = `try { const root = ReactDOM.createRoot(document.getElementById('root')); root.render(<${name} />); } catch (e) { document.body.innerHTML = '<div style="color:red; padding:20px">Runtime Error: ' + e.message + '</div>'; }`;
    } else {
        appCode = appCode.replace(/export default/, '');
        mountCode = `const root = ReactDOM.createRoot(document.getElementById('root')); root.render(<div className="p-6 font-sans text-slate-600 flex flex-col items-center justify-center text-center h-full"><h3 className="text-xl font-bold text-slate-800 mb-2">Logic Output</h3><p>Check console for results.</p></div>);`;
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
            <style>body { background-color: #ffffff; margin: 0; min-height: 100vh; font-family: sans-serif; } ::-webkit-scrollbar { width: 6px; }</style>
        </head>
        <body>
            <div id="root"></div>
            <script type="text/babel">
                const { useState, useEffect, useRef, useReducer, useMemo, useCallback, useContext, createContext } = React;
                ${appCode}
                ${mountCode}
            </script>
        </body>
        </html>
    `;
  };

  // --- View: Category Selection ---
  if (!selectedCategory) {
    const categories = Object.values(Category);
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
                    Master frontend coding interviews with interactive challenges. Run code directly in the browser.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {categories.map(cat => {
                    const Icon = CATEGORY_ICONS[cat];
                    const count = CODING_CHALLENGES.filter(c => c.category === cat).length;
                    
                    return (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className="group relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 text-left overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Icon className="w-24 h-24 text-indigo-600" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{cat}</h3>
                                <p className="text-slate-500 font-medium">{count} Challenges</p>
                            </div>
                        </button>
                    );
                })}
            </div>
            
            <AdBanner slotId="challenges-home-footer" />
        </div>
    );
  }

  // --- View: List of Challenges (Filtered) ---
  const filteredChallenges = CODING_CHALLENGES.filter(c => c.category === selectedCategory);
  const visibleLimit = 5;
  const visibleChallenges = filteredChallenges.slice(0, visibleLimit);
  const hiddenCount = Math.max(0, filteredChallenges.length - visibleLimit);

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in slide-in-from-right-8 duration-300">
        <div className="flex items-center gap-4 mb-8">
            <button 
                onClick={() => setSelectedCategory(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    {selectedCategory} <span className="text-slate-300">/</span> Challenges
                </h1>
            </div>
        </div>

        <div className="space-y-12 pb-12">
            {visibleChallenges.map((challenge, idx) => {
                const isRunning = runningId === challenge.id;
                const isNode = challenge.category === Category.NodeJS;

                return (
                    <div key={challenge.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
                        <div className="absolute top-4 right-4 text-slate-200 font-black text-4xl opacity-20 pointer-events-none select-none">
                            #{idx + 1}
                        </div>

                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex flex-col gap-2 mb-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-bold text-slate-900">{challenge.title}</h3>
                                    <Badge type="difficulty" value={challenge.difficulty} />
                                </div>
                                <div className="flex gap-2">
                                    {challenge.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed">{challenge.description}</p>
                        </div>

                        {/* Editor / Solution Area */}
                        <div className="flex flex-col lg:flex-row">
                            <div className={`bg-[#1e1e1e] flex flex-col min-h-[300px] transition-all duration-300 ${isRunning ? 'lg:w-1/2' : 'w-full'}`}>
                                <div className="px-4 py-2 bg-emerald-900/20 border-b border-emerald-900/20 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                        <CheckCircle2 className="w-4 h-4" /> Solution
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] bg-emerald-900/40 text-emerald-300 border border-emerald-900/50 px-2 py-0.5 rounded font-mono">Recommended</span>
                                        <CopyButton text={challenge.solutionCode} />
                                    </div>
                                </div>
                                <pre className="flex-1 p-6 overflow-x-auto text-sm font-mono text-emerald-100 leading-relaxed custom-scrollbar">
                                    <code>{challenge.solutionCode}</code>
                                </pre>
                            </div>

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

                        {/* Footer Actions */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200">
                            <div className="flex flex-wrap gap-2 justify-end items-center">
                                {isNode ? (
                                    <span className="text-sm text-slate-400 italic flex items-center gap-2">
                                        <Terminal className="w-4 h-4" />
                                        Execution requires local Node.js environment.
                                    </span>
                                ) : (
                                    <>
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
                                        
                                        <button disabled className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed text-sm font-medium opacity-60">
                                            <Play className="w-4 h-4" /> StackBlitz
                                        </button>
                                        <button disabled className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed text-sm font-medium opacity-60">
                                            <Box className="w-4 h-4" /> CodeSandbox
                                        </button>
                                        <button disabled className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed text-sm font-medium opacity-60">
                                            <ExternalLink className="w-4 h-4" /> Plunker
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            {!isNode && (
                                <div className="mt-3 text-right">
                                    <span className="text-[10px] text-slate-400 font-medium flex items-center justify-end gap-1.5 opacity-80">
                                        <Clock className="w-3 h-3" />
                                        Direct integration with StackBlitz, CodeSandbox, and Plunker coming in the next release.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Coming Soon Banner */}
            {hiddenCount > 0 && !isPremium && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white shadow-2xl mx-auto max-w-4xl mt-12">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative p-12 text-center">
                         <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4">
                              <Clock className="w-8 h-8 text-indigo-300" />
                          </div>
                        <h3 className="text-3xl font-bold tracking-tight mb-4">More Challenges Coming Soon</h3>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            We are preparing {hiddenCount} more advanced {selectedCategory} coding challenges, including complex system components and architectural patterns used by top tech companies. Check back in our next release!
                        </p>
                    </div>
                </div>
            )}
        </div>
        
        <AdBanner slotId="challenges-list-footer" />
    </div>
    </>
  );
};