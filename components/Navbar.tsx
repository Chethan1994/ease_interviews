
import React from 'react';
import { ViewState } from '../types';
import { BookOpen, BarChart2, Layers, Sparkles, Code2 } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItemClass = (view: ViewState) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
      currentView === view
        ? 'bg-primary-50 text-primary-700'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="bg-primary-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">DevPrep</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setView('dashboard')}
              className={navItemClass('dashboard')}
            >
              <BarChart2 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setView('browse')}
              className={navItemClass('browse')}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Question Bank</span>
            </button>
            <button
              onClick={() => setView('coding-challenges')}
              className={navItemClass('coding-challenges')}
            >
              <Code2 className="w-4 h-4" />
              <span className="hidden sm:inline">Coding</span>
            </button>
            <button
              onClick={() => setView('ai-quiz')}
              className={navItemClass('ai-quiz')}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Quiz</span>
            </button>
            <button
              onClick={() => setView('study')}
              className={`ml-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-sm ${currentView === 'study' ? 'ring-2 ring-primary-200' : ''}`}
            >
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
