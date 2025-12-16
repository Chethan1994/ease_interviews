
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Code2, Brain, CheckCircle, Terminal, XCircle, ShieldAlert, Sparkles, Zap, ArrowRight, Play } from 'lucide-react';

export const Promo: React.FC = () => {
  const navigate = useNavigate();
  const [scene, setScene] = useState(0);
  const [typedCode, setTypedCode] = useState('');
  
  // Script for the coding scene
  const codeToType = `function solveInterview() {
  const prep = new InterviewHub();
  
  if (prep.isReady()) {
    return "Hired! 🚀";
  }
}`;

  // Scene Timer Management
  useEffect(() => {
    const sceneDurations = [4000, 4000, 5000, 5000, 5000]; // Duration for each scene (ms)
    
    if (scene < sceneDurations.length) {
      const timer = setTimeout(() => {
        setScene(s => s + 1);
      }, sceneDurations[scene]);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  // Typing Effect for Scene 2 (Coding)
  useEffect(() => {
    if (scene === 2) {
      setTypedCode('');
      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedCode(codeToType.slice(0, i));
        i++;
        if (i > codeToType.length) clearInterval(typeInterval);
      }, 50);
      return () => clearInterval(typeInterval);
    }
  }, [scene]);

  return (
    <div className="fixed inset-0 bg-slate-950 text-white z-[100] flex flex-col items-center justify-center overflow-hidden font-sans select-none">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Skip Button */}
      <button 
        onClick={() => navigate('/auth')}
        className="absolute top-8 right-8 z-50 text-slate-400 hover:text-white text-sm font-bold tracking-widest uppercase border border-white/10 hover:border-white/30 px-4 py-2 rounded-full transition-all"
      >
        Skip Intro
      </button>

      {/* --- SCENE 0: INTRO --- */}
      {scene === 0 && (
        <div className="relative z-10 text-center animate-in fade-in zoom-in duration-1000">
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-slate-900 p-6 rounded-3xl border border-slate-700">
              <BookOpen className="w-24 h-24 text-blue-400" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Interview<span className="text-blue-500">Prep</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium tracking-wide">
            MASTER THE FULL STACK
          </p>
        </div>
      )}

      {/* --- SCENE 1: THE PROBLEM --- */}
      {scene === 1 && (
        <div className="relative z-10 flex flex-col gap-8 items-center animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="flex gap-4 items-center opacity-50 scale-90">
            <ShieldAlert className="w-12 h-12 text-red-500" />
            <span className="text-4xl font-bold text-slate-300 decoration-red-500 line-through">Anxiety</span>
          </div>
          <div className="flex gap-4 items-center scale-110">
            <XCircle className="w-16 h-16 text-red-600 animate-bounce" />
            <span className="text-7xl font-black text-white">REJECTED?</span>
          </div>
          <div className="flex gap-4 items-center opacity-50 scale-90">
            <Brain className="w-12 h-12 text-red-500" />
            <span className="text-4xl font-bold text-slate-300 decoration-red-500 line-through">Blanking Out</span>
          </div>
          <p className="mt-8 text-2xl text-slate-400 font-light">Stop guessing. Start preparing.</p>
        </div>
      )}

      {/* --- SCENE 2: CODING CHALLENGES --- */}
      {scene === 2 && (
        <div className="relative z-10 w-full max-w-4xl px-4 animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold mb-2 flex items-center justify-center gap-3">
              <Code2 className="w-10 h-10 text-emerald-400" />
              <span className="text-emerald-400">Live Coding</span> Environment
            </h2>
            <p className="text-slate-400 text-xl">Run React, Node.js, and TS directly in browser.</p>
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden font-mono text-lg relative">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-8 min-h-[300px] text-slate-300">
              <pre>{typedCode}<span className="animate-pulse">|</span></pre>
            </div>
            
            {/* Success Badge Animation */}
            {typedCode.length > 50 && (
              <div className="absolute bottom-8 right-8 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-6 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-300">
                <CheckCircle className="w-6 h-6" />
                <span className="font-bold">Tests Passed</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- SCENE 3: QUESTION BANK & AI --- */}
      {scene === 3 && (
        <div className="relative z-10 text-center w-full max-w-5xl animate-in fade-in slide-in-from-right-10 duration-700">
          <h2 className="text-5xl md:text-6xl font-bold mb-12">
            Complete <span className="text-purple-400">Toolkit</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">1000+ Questions</h3>
              <p className="text-slate-400">Curated React, JS, System Design questions.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm scale-110 shadow-2xl shadow-purple-500/10 border-purple-500/30">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">AI Mock Interviews</h3>
              <p className="text-slate-400">Get instant feedback on your answers powered by Gemini.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm">
              <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Spaced Repetition</h3>
              <p className="text-slate-400">Smart flashcards to maximize retention.</p>
            </div>
          </div>
        </div>
      )}

      {/* --- SCENE 4: CTA --- */}
      {scene >= 4 && (
        <div className="relative z-10 text-center animate-in zoom-in-90 duration-700">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white text-slate-900 rounded-3xl shadow-2xl shadow-white/20 mb-6">
              <CheckCircle className="w-12 h-12" />
            </div>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            GET HIRED.
          </h2>
          
          <button 
            onClick={() => navigate('/auth', { state: { mode: 'signup' } })}
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-2xl font-bold transition-all hover:scale-105 shadow-xl shadow-blue-600/30"
          >
            Start Preparing Now
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>

          <p className="mt-8 text-slate-500 font-mono">
            ease-interviews.vercel.app
          </p>

          <button 
            onClick={() => setScene(0)}
            className="mt-12 text-sm text-slate-600 hover:text-slate-400 flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4" /> Replay Trailer
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-slate-800 w-full">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
          style={{ width: `${(scene / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
