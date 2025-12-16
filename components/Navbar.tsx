import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, BarChart2, Layers, Code2, Menu, X, Lock, HeartHandshake } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper for tooltip
  const PremiumTooltip = () => (
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-yellow-400" /> 
          <span>Coming Soon (Premium)</span>
          {/* Little arrow */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-900"></div>
      </div>
  );

  const isActive = (path: string) => location.pathname === path;

  const navItemClass = (path: string, disabled = false) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium relative group ${
      disabled 
        ? 'text-slate-400 cursor-not-allowed hover:bg-transparent' 
        : isActive(path)
            ? 'bg-primary-50 text-primary-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;
  
  const mobileNavItemClass = (path: string, disabled = false) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium w-full ${
        disabled
        ? 'text-slate-400 cursor-not-allowed bg-slate-50/50'
        : isActive(path)
            ? 'bg-primary-50 text-primary-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  const handleNavClick = (path: string, resetKey?: string) => {
    // If we are navigating to the same path (e.g. clicking "Question Bank" while in Question Bank), 
    // we pass a state object to force a reset effect in the target component.
    const state = resetKey ? { reset: Date.now() } : undefined;
    navigate(path, { state });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Redirects to Question Bank (browse) */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavClick('/browse', 'reset')}>
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">InterviewPrep</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex gap-1 items-center">
                {/* Dashboard - Disabled */}
                <div className="relative group">
                    <button className={navItemClass('/dashboard', true)} disabled>
                        <BarChart2 className="w-4 h-4" />
                        <span>Dashboard</span>
                    </button>
                    <PremiumTooltip />
                </div>

                <button onClick={() => handleNavClick('/browse', 'reset')} className={navItemClass('/browse')}>
                    <Layers className="w-4 h-4" />
                    <span>Question Bank</span>
                </button>

                <button onClick={() => handleNavClick('/coding-challenges', 'reset')} className={navItemClass('/coding-challenges')}>
                    <Code2 className="w-4 h-4" />
                    <span>Coding</span>
                </button>
                
                {/* Contribute */}
                <button onClick={() => handleNavClick('/contribute')} className={navItemClass('/contribute')}>
                    <HeartHandshake className="w-4 h-4" />
                    <span>Contribute</span>
                </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg animate-in slide-in-from-top-2 duration-200">
              <div className="p-4 space-y-2">
                  {/* Dashboard - Disabled */}
                  <div className="relative">
                      <button className={mobileNavItemClass('/dashboard', true)} disabled>
                          <div className="flex items-center gap-3 w-full">
                            <BarChart2 className="w-5 h-5" />
                            Dashboard 
                            <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-500 px-2 py-0.5 rounded ml-auto flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Premium
                            </span>
                          </div>
                      </button>
                  </div>

                  <button onClick={() => handleNavClick('/browse', 'reset')} className={mobileNavItemClass('/browse')}>
                      <Layers className="w-5 h-5" />
                      Question Bank
                  </button>
                  
                  <button onClick={() => handleNavClick('/coding-challenges', 'reset')} className={mobileNavItemClass('/coding-challenges')}>
                      <Code2 className="w-5 h-5" />
                      Coding Challenges
                  </button>

                  <button onClick={() => handleNavClick('/contribute')} className={mobileNavItemClass('/contribute')}>
                      <HeartHandshake className="w-5 h-5" />
                      Contribute
                  </button>
              </div>
          </div>
      )}
    </nav>
  );
};