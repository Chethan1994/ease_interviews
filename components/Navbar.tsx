
import React, { useState } from 'react';
import { ViewState } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, BarChart2, Layers, Sparkles, Code2, LogIn, User as UserIcon, LogOut, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItemClass = (view: ViewState) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
      currentView === view
        ? 'bg-primary-50 text-primary-700'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;
  
  const mobileNavItemClass = (view: ViewState) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium w-full ${
      currentView === view
        ? 'bg-primary-50 text-primary-700'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  const handleLogout = () => {
    logout();
    setView('dashboard');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <div className="bg-primary-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">DevPrep</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex gap-1">
                <button onClick={() => setView('dashboard')} className={navItemClass('dashboard')}>
                    <BarChart2 className="w-4 h-4" />
                    <span>Dashboard</span>
                </button>
                <button onClick={() => setView('browse')} className={navItemClass('browse')}>
                    <Layers className="w-4 h-4" />
                    <span>Question Bank</span>
                </button>
                <button onClick={() => setView('coding-challenges')} className={navItemClass('coding-challenges')}>
                    <Code2 className="w-4 h-4" />
                    <span>Coding</span>
                </button>
                <button onClick={() => setView('ai-quiz')} className={navItemClass('ai-quiz')}>
                    <Sparkles className="w-4 h-4" />
                    <span>AI Quiz</span>
                </button>
            </div>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {user ? (
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-slate-700">{user.name}</span>
                        <span className="text-[10px] uppercase font-bold text-primary-600">{user.isPremium ? 'Premium' : 'Free Plan'}</span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setView('auth')}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-sm"
                >
                    <LogIn className="w-4 h-4" />
                    Sign In
                </button>
            )}
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
                  <button onClick={() => handleNavClick('dashboard')} className={mobileNavItemClass('dashboard')}>
                      <BarChart2 className="w-5 h-5" />
                      Dashboard
                  </button>
                  <button onClick={() => handleNavClick('browse')} className={mobileNavItemClass('browse')}>
                      <Layers className="w-5 h-5" />
                      Question Bank
                  </button>
                  <button onClick={() => handleNavClick('coding-challenges')} className={mobileNavItemClass('coding-challenges')}>
                      <Code2 className="w-5 h-5" />
                      Coding Challenges
                  </button>
                  <button onClick={() => handleNavClick('ai-quiz')} className={mobileNavItemClass('ai-quiz')}>
                      <Sparkles className="w-5 h-5" />
                      AI Quiz
                  </button>

                  <div className="border-t border-slate-100 my-2 pt-2">
                    {user ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 px-4">
                                <div className="bg-primary-100 p-2 rounded-full">
                                    <UserIcon className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{user.name}</p>
                                    <p className="text-xs font-bold text-primary-600 uppercase">{user.isPremium ? 'Premium Plan' : 'Free Plan'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg font-medium"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleNavClick('auth')}
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 text-white rounded-lg font-bold shadow-sm"
                        >
                            <LogIn className="w-5 h-5" />
                            Sign In / Register
                        </button>
                    )}
                  </div>
              </div>
          </div>
      )}
    </nav>
  );
};
