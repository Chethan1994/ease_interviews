
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, BarChart2, Layers, Code2, Menu, X, Lock, HeartHandshake, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { useNavigate, useLocation, NavLink, Link } from 'react-router-dom';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getNavItemClass = (isActive: boolean, disabled = false) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium relative group text-sm ${
      disabled 
        ? 'text-slate-400 cursor-not-allowed hover:bg-transparent pointer-events-none' 
        : isActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;
  
  const getMobileNavItemClass = (isActive: boolean, disabled = false) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium w-full ${
        disabled
        ? 'text-slate-400 cursor-not-allowed bg-slate-50/50 pointer-events-none'
        : isActive
            ? 'bg-primary-50 text-primary-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  const handleLogout = () => {
      logout();
      navigate('/browse');
      setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/browse" 
            state={{ reset: Date.now() }}
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">InterviewPrep</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 ml-6 flex-1">
                <NavLink 
                    to="/dashboard"
                    className={({ isActive }) => getNavItemClass(isActive, !user)}
                    onClick={(e) => !user && e.preventDefault()}
                    title={!user ? "Login to access dashboard" : ""}
                >
                    <BarChart2 className="w-4 h-4" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink 
                    to="/browse" 
                    state={{ reset: Date.now() }}
                    className={({ isActive }) => getNavItemClass(isActive)}
                >
                    <Layers className="w-4 h-4" />
                    <span>Question Bank</span>
                </NavLink>

                <NavLink 
                    to="/coding-challenges" 
                    state={{ reset: Date.now() }}
                    className={({ isActive }) => getNavItemClass(isActive)}
                >
                    <Code2 className="w-4 h-4" />
                    <span>Coding</span>
                </NavLink>
                
                <NavLink 
                    to="/contribute" 
                    className={({ isActive }) => getNavItemClass(isActive)}
                >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Contribute</span>
                </NavLink>

                {user?.isAdmin && (
                    <NavLink 
                        to="/admin" 
                        className={({ isActive }) => getNavItemClass(isActive)}
                    >
                        <Shield className="w-4 h-4" />
                        <span>Admin</span>
                    </NavLink>
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
                    <Link 
                        to="/auth"
                        className="text-slate-600 hover:text-slate-900 font-medium text-sm px-4 py-2 transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link 
                        to="/auth"
                        state={{ mode: 'signup' }}
                        className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
                    >
                        Sign Up
                    </Link>
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
                  <NavLink 
                      to="/dashboard"
                      className={({ isActive }) => getMobileNavItemClass(isActive, !user)}
                      onClick={(e) => { if(!user) e.preventDefault(); else setIsMobileMenuOpen(false); }}
                  >
                      <BarChart2 className="w-5 h-5" />
                      Dashboard 
                  </NavLink>

                  <NavLink 
                      to="/browse" 
                      state={{ reset: Date.now() }}
                      className={({ isActive }) => getMobileNavItemClass(isActive)}
                      onClick={() => setIsMobileMenuOpen(false)}
                  >
                      <Layers className="w-5 h-5" />
                      Question Bank
                  </NavLink>
                  
                  <NavLink 
                      to="/coding-challenges" 
                      state={{ reset: Date.now() }}
                      className={({ isActive }) => getMobileNavItemClass(isActive)}
                      onClick={() => setIsMobileMenuOpen(false)}
                  >
                      <Code2 className="w-5 h-5" />
                      Coding Challenges
                  </NavLink>

                  <NavLink 
                      to="/contribute" 
                      className={({ isActive }) => getMobileNavItemClass(isActive)}
                      onClick={() => setIsMobileMenuOpen(false)}
                  >
                      <HeartHandshake className="w-5 h-5" />
                      Contribute
                  </NavLink>

                  {user?.isAdmin && (
                      <NavLink 
                          to="/admin" 
                          className={({ isActive }) => getMobileNavItemClass(isActive)}
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                          <Shield className="w-5 h-5" />
                          Admin
                      </NavLink>
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
                             <Link 
                                to="/auth"
                                className="flex justify-center items-center py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                             >
                                Sign In
                             </Link>
                             <Link 
                                to="/auth"
                                state={{ mode: 'signup' }}
                                className="flex justify-center items-center py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-md shadow-primary-500/20"
                                onClick={() => setIsMobileMenuOpen(false)}
                             >
                                Sign Up
                             </Link>
                        </div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </nav>
  );
};
