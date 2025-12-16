
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface AuthPageProps {
    onSuccess: () => void;
}

// --- Study Owl Mascot Component ---
const StudyOwl = ({ isPasswordFocused, mousePosition }: { isPasswordFocused: boolean, mousePosition: { x: number, y: number } }) => {
    // Calculate look direction (limited range)
    const lookX = Math.max(-15, Math.min(15, mousePosition.x / 15));
    const lookY = Math.max(-10, Math.min(10, mousePosition.y / 15));

    return (
        <div className="w-64 h-64 relative transition-all duration-300 ease-out">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                <defs>
                    <filter id="owl-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
                    </filter>
                </defs>

                {/* --- Stack of Books (Base) --- */}
                <g transform="translate(40, 140)">
                    {/* Bottom Book */}
                    <rect x="0" y="25" width="120" height="25" rx="2" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
                    <rect x="5" y="40" width="110" height="3" fill="#60a5fa" opacity="0.3" />
                    <text x="60" y="42" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontFamily="sans-serif" fontWeight="bold">ALGORITHMS</text>
                    
                    {/* Top Book */}
                    <rect x="10" y="0" width="100" height="25" rx="2" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
                    <rect x="15" y="15" width="90" height="3" fill="#f87171" opacity="0.3" />
                    <text x="60" y="17" textAnchor="middle" fontSize="8" fill="#7f1d1d" fontFamily="sans-serif" fontWeight="bold">REACT</text>
                </g>

                {/* --- Body --- */}
                <ellipse cx="100" cy="110" rx="45" ry="50" fill="#cbd5e1" stroke="#475569" strokeWidth="2" filter="url(#owl-shadow)" />
                {/* Belly feathers */}
                <path d="M 80 130 Q 100 140 120 130" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                <path d="M 85 140 Q 100 150 115 140" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

                {/* --- Head Group (Follows mouse) --- */}
                <g style={{ 
                    transform: `translate(${lookX}px, ${lookY}px)`, 
                    transition: 'transform 0.1s ease-out' 
                }}>
                    {/* Head Shape */}
                    <ellipse cx="100" cy="70" rx="40" ry="35" fill="#e2e8f0" stroke="#475569" strokeWidth="2" filter="url(#owl-shadow)" />
                    
                    {/* Ears/Tufts */}
                    <path d="M 70 45 L 60 25 L 85 40" fill="#cbd5e1" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M 130 45 L 140 25 L 115 40" fill="#cbd5e1" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />

                    {/* Eyes Background */}
                    <circle cx="82" cy="70" r="14" fill="#ffffff" stroke="#475569" strokeWidth="2" />
                    <circle cx="118" cy="70" r="14" fill="#ffffff" stroke="#475569" strokeWidth="2" />

                    {/* Pupils (Move slightly more for depth) */}
                    <g style={{ transform: `translate(${lookX * 0.5}px, ${lookY * 0.5}px)` }}>
                        <circle cx="82" cy="70" r="6" fill="#1e293b" />
                        <circle cx="84" cy="68" r="2" fill="white" />
                        
                        <circle cx="118" cy="70" r="6" fill="#1e293b" />
                        <circle cx="120" cy="68" r="2" fill="white" />
                    </g>

                    {/* Beak */}
                    <path d="M 100 80 L 95 90 L 105 90 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
                </g>

                {/* --- Wings / Hands (Interactive Privacy Mode) --- */}
                {/* Left Wing */}
                <path 
                    d="M 55 110 Q 30 130 55 150" 
                    fill="#94a3b8" 
                    stroke="#475569" 
                    strokeWidth="2"
                    style={{
                        transformOrigin: '55px 110px',
                        transform: isPasswordFocused ? 'rotate(-30deg) translate(25px, -45px) scale(1.2)' : 'rotate(0deg)',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                />
                
                {/* Right Wing */}
                <path 
                    d="M 145 110 Q 170 130 145 150" 
                    fill="#94a3b8" 
                    stroke="#475569" 
                    strokeWidth="2"
                    style={{
                        transformOrigin: '145px 110px',
                        transform: isPasswordFocused ? 'rotate(30deg) translate(-25px, -45px) scale(1.2)' : 'rotate(0deg)',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                />

                {/* Graduation Cap (Optional Flair) */}
                <g transform={`translate(${lookX * 0.8}, ${lookY * 0.8 - 10})`}>
                    <path d="M 100 20 L 130 35 L 100 50 L 70 35 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
                    <path d="M 130 35 L 130 45" stroke="#f59e0b" strokeWidth="2" />
                    <circle cx="130" cy="48" r="3" fill="#f59e0b" />
                </g>

            </svg>
        </div>
    );
};

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    
    useEffect(() => {
        // @ts-ignore
        if (location.state?.mode === 'signup') {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [location.state]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Animation States
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    // Use window for mouse tracking to make it smoother across the split layout
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize coordinates from center of screen roughly
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            setMousePosition({
                x: e.clientX - centerX,
                y: e.clientY - centerY
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let user;
            if (isLogin) {
                user = await api.login(email, password);
            } else {
                user = await api.register(email, password, name);
            }
            login(user);
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const timestamp = Date.now();
            const mockGoogleProfile = {
                email: `google_user_${timestamp}@gmail.com`,
                name: 'Google User',
                googleId: `google-auth-id-${timestamp}`
            };
            const user = await api.googleLogin(
                mockGoogleProfile.email, 
                mockGoogleProfile.name, 
                mockGoogleProfile.googleId
            );
            login(user);
            onSuccess();
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to authenticate with Google");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                
                {/* --- Left Column: Mascot & Branding --- */}
                <div className="hidden md:flex flex-col items-center justify-center relative">
                    {/* Decorative Blob */}
                    <div className="absolute w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    
                    <div className="mb-8">
                        <StudyOwl isPasswordFocused={isPasswordFocused} mousePosition={mousePosition} />
                    </div>
                    
                    <div className="text-center space-y-4 max-w-sm">
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            {isLogin ? 'Welcome Back!' : 'Join the Hub'}
                        </h1>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                            Your personal study companion. Master your interviews with interactive challenges.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 py-2 px-4 rounded-full w-fit mx-auto border border-blue-100">
                            <Sparkles className="w-4 h-4" /> 
                            <span>Smart Progress Tracking</span>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Form Card --- */}
                <div className="w-full">
                    {/* Mobile Mascot (Smaller) */}
                    <div className="md:hidden flex justify-center mb-6">
                        <div className="w-32 h-32">
                            <StudyOwl isPasswordFocused={isPasswordFocused} mousePosition={mousePosition} />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                        
                        <div className="p-8 md:p-10">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">
                                    {isLogin ? 'Enter your details to access your dashboard.' : 'Start your journey to mastery today.'}
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 text-sm font-medium animate-in slide-in-from-top-2">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-5">
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className="group relative w-full py-3 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-bold hover:border-slate-300 hover:text-slate-800 transition-all duration-200 flex items-center justify-center gap-3 overflow-hidden shadow-sm active:scale-[0.98]"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                            </svg>
                                            Continue with Google
                                        </>
                                    )}
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="px-3 bg-white text-slate-400 font-bold tracking-widest">Or</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {!isLogin && (
                                        <div className="group">
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white"
                                                placeholder="John Doe"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <div className="group">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Password</label>
                                        <input
                                            type="password"
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 mt-2 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg shadow-slate-500/30 hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
                                    >
                                        {loading ? (
                                            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        ) : (
                                            <>
                                                {isLogin ? 'Sign In' : 'Create Account'}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                        <div className="bg-slate-50 p-5 text-center border-t border-slate-100">
                            <button
                                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                            >
                                {isLogin ? (
                                    <span>New here? <span className="text-indigo-600 underline decoration-2 underline-offset-2">Create an account</span></span>
                                ) : (
                                    <span>Already have an account? <span className="text-indigo-600 underline decoration-2 underline-offset-2">Sign in</span></span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
