
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, BarChart2, Layers, Code2, Menu, X, Lock, HeartHandshake, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { user, logout } = useAuth();
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
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium relative group text-sm ${
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

  const handleNavClick = (path: string, resetKey?: string, state?: any) => {
    const navState = resetKey ? { reset: Date.now(), ...state } : state;
    navigate(path, { state: navState });
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
      logout();
      navigate('/browse');
      setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Redirects to Question Bank (browse) */}
          <div className="flex items-center gap-2 cursor-pointer group flex-shrink-0" onClick={() => handleNavClick('/browse', 'reset')}>
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">InterviewPrep</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 ml-6 flex-1">
                <button 
                    onClick={() => handleNavClick('/dashboard')} 
                    className={navItemClass('/dashboard', !user)} 
                    disabled={!user}
                    title={!user ? "Login to access dashboard" : ""}
                >
                    <BarChart2 className="w-4 h-4" />
                    <span>Dashboard</span>
                </button>

                <button onClick={() => handleNavClick('/browse', 'reset')} className={navItemClass('/browse')}>
                    <Layers className="w-4 h-4" />
                    <span>Question Bank</span>
                </button>

                <button onClick={() => handleNavClick('/coding-challenges', 'reset')} className={navItemClass('/coding-challenges')}>
                    <Code2 className="w-4 h-4" />
                    <span>Coding</span>
                </button>
                
                <button onClick={() => handleNavClick('/contribute')} className={navItemClass('/contribute')}>
                    <HeartHandshake className="w-4 h-4" />
                    <span>Contribute</span>
                </button>

                {user?.isAdmin && (
                    <button onClick={() => handleNavClick('/admin')} className={navItemClass('/admin')}>
                        <Shield className="w-4 h-4" />
                        <span>Admin</span>
                    </button>
                )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user?.email === 'chethansg4@gmail.com' && (
                <div className="hidden md:flex items-center px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold border border-red-200" title="Debug Mode Active">
                    DEBUG
                </div>
            )}
            
            {user ? (
                <>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
                        <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                            <UserIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 max-w-[100px] truncate">
                            {user.name.split(' ')[0]}
                        </span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-lg"
                        title="Sign Out"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </>
            ) : (
                <>
                    <button 
                        onClick={() => handleNavClick('/auth')}
                        className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 transition-colors"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => handleNavClick('/auth', undefined, { mode: 'signup' })}
                        className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
                    >
                        Sign Up
                    </button>
                </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {user && (
                 <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-4 h-4" />
                 </div>
             )}
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
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg animate-in slide-in-from-top-2 duration-200 overflow-hidden h-[calc(100vh-64px)] flex flex-col">
              <div className="p-4 space-y-2 flex-1 overflow-y-auto">
                  <button 
                      onClick={() => handleNavClick('/dashboard')} 
                      className={mobileNavItemClass('/dashboard', !user)}
                      disabled={!user}
                  >
                      <BarChart2 className="w-5 h-5" />
                      Dashboard 
                  </button>

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

                  {user?.isAdmin && (
                      <button onClick={() => handleNavClick('/admin')} className={mobileNavItemClass('/admin')}>
                          <Shield className="w-5 h-5" />
                          Admin
                      </button>
                  )}

                  <div className="border-t border-slate-100 my-4 pt-4">
                      {user ? (
                        <>
                             <div className="flex items-center gap-3 px-4 py-2 mb-2">
                                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{user.name}</p>
                                    <p className="text-xs text-slate-500">{user.email}</p>
                                </div>
                             </div>
                             <button 
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium w-full text-red-600 hover:bg-red-50"
                             >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                             </button>
                        </>
                      ) : (
                        <div className="grid grid-cols-2 gap-3 px-2">
                             <button 
                                onClick={() => handleNavClick('/auth')}
                                className="flex justify-center items-center py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
                             >
                                Sign In
                             </button>
                             <button 
                                onClick={() => handleNavClick('/auth', undefined, { mode: 'signup' })}
                                className="flex justify-center items-center py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-md shadow-primary-500/20"
                             >
                                Sign Up
                             </button>
                        </div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </nav>
  );
};
