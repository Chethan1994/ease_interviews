
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { AlertCircle, ArrowRight, Sparkles, PlayCircle, X, User as UserIcon, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthPageProps {
    onSuccess: () => void;
}

// --- Owl Mascot Component ---
const OwlMascot = ({ isPasswordFocused, mousePosition }: { isPasswordFocused: boolean, mousePosition: { x: number, y: number } }) => {
    const xLimit = 12;
    const yLimit = 12;
    const lookX = Math.max(-xLimit, Math.min(xLimit, mousePosition.x / 15));
    const lookY = Math.max(-yLimit, Math.min(yLimit, mousePosition.y / 15));

    return (
        <div className="w-64 h-64 relative transition-all duration-300 ease-out">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                <defs>
                    <filter id="owl-shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.1"/>
                    </filter>
                    <clipPath id="body-clip">
                        <rect x="0" y="0" width="200" height="200" />
                    </clipPath>
                </defs>
                <g filter="url(#owl-shadow)">
                    <path d="M 50 180 L 150 180 C 170 180 180 160 180 130 C 180 60 160 30 100 30 C 40 30 20 60 20 130 C 20 160 30 180 50 180 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                    <path d="M 60 180 L 140 180 C 150 180 150 170 150 140 C 150 90 130 80 100 80 C 70 80 50 90 50 140 C 50 170 50 180 60 180 Z" fill="#ffffff" />
                </g>
                <g transform={`translate(${lookX * 0.2}, ${lookY * 0.2})`}>
                    <path d="M 40 40 L 30 10 L 60 35 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M 160 40 L 170 10 L 140 35 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" strokeLinejoin="round" />
                    <g>
                        <circle cx="65" cy="85" r="28" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
                        <circle cx="135" cy="85" r="28" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
                        <g style={{ opacity: isPasswordFocused ? 0 : 1, transition: 'opacity 0.2s' }}>
                            <circle cx={65 + lookX} cy={85 + lookY} r="12" fill="#0f172a" />
                            <circle cx={65 + lookX + 3} cy={85 + lookY - 3} r="3" fill="#ffffff" />
                            <circle cx={135 + lookX} cy={85 + lookY} r="12" fill="#0f172a" />
                            <circle cx={135 + lookX + 3} cy={85 + lookY - 3} r="3" fill="#ffffff" />
                        </g>
                        <g style={{ opacity: isPasswordFocused ? 1 : 0, transition: 'opacity 0.2s' }}>
                            <path d="M 45 90 Q 65 100 85 90" stroke="#0f172a" strokeWidth="3" fill="none" />
                            <path d="M 115 90 Q 135 100 155 90" stroke="#0f172a" strokeWidth="3" fill="none" />
                        </g>
                    </g>
                    <path d="M 100 105 L 92 120 L 108 120 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                </g>
                <g style={{ transformOrigin: '40px 150px', transform: isPasswordFocused ? 'translate(20px, -50px) rotate(160deg)' : 'translate(0, 0) rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                    <path d="M 20 130 Q 5 160 40 170 Q 50 140 20 130" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                </g>
                 <g style={{ transformOrigin: '160px 150px', transform: isPasswordFocused ? 'translate(-20px, -50px) rotate(-160deg)' : 'translate(0, 0) rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                    <path d="M 180 130 Q 195 160 160 170 Q 150 140 180 130" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                </g>
            </svg>
        </div>
    );
};

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    
    // Auth State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Animation States
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    // Google Sim State
    const [showGoogleModal, setShowGoogleModal] = useState(false);
    const [simGoogleEmail, setSimGoogleEmail] = useState('');
    const [simGoogleName, setSimGoogleName] = useState('');
    
    const { login } = useAuth();

    useEffect(() => {
        setError('');
        // @ts-ignore
        if (location.state?.mode === 'signup') {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [location.state]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
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

    const handleGoogleClick = () => {
        // Since no real Client ID is provided, open the Simulation Modal
        // In a production app, this would trigger: google.accounts.id.prompt()
        setSimGoogleEmail('');
        setSimGoogleName('');
        setShowGoogleModal(true);
    };

    const confirmGoogleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!simGoogleEmail) return;
        
        const finalName = simGoogleName || simGoogleEmail.split('@')[0];
        
        setLoading(true);
        setShowGoogleModal(false);
        
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const user = await api.googleLogin(
                simGoogleEmail, 
                finalName, 
                `google-sim-${Date.now()}` // Generate stable ID
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

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-4 md:p-8">
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                
                {/* --- Left Column: Mascot & Branding --- */}
                <div className="hidden md:flex flex-col items-center justify-center relative">
                    <div className="absolute w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
                        <OwlMascot isPasswordFocused={isPasswordFocused} mousePosition={mousePosition} />
                    </div>
                    <div className="text-center space-y-4 max-w-sm">
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                            {isLogin ? 'Welcome Back!' : 'Join the Hub'}
                        </h1>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                            Master your interviews with interactive challenges and AI-powered insights.
                        </p>
                        <div className="flex flex-col gap-3 items-center">
                            <div className="flex items-center justify-center gap-2 text-sm font-bold text-purple-600 bg-purple-50 py-2 px-4 rounded-full w-fit mx-auto border border-purple-100">
                                <Sparkles className="w-4 h-4" /> 
                                <span>1000+ Questions Available</span>
                            </div>
                            <button 
                                onClick={() => navigate('/promo')}
                                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors py-2 px-4 hover:bg-slate-100 rounded-full"
                            >
                                <PlayCircle className="w-4 h-4" /> Watch App Trailer
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Form Card --- */}
                <div className="w-full">
                    <div className="md:hidden flex flex-col items-center justify-center mb-6 gap-4">
                        <div className="w-32 h-32">
                            <OwlMascot isPasswordFocused={isPasswordFocused} mousePosition={mousePosition} />
                        </div>
                        <button 
                            onClick={() => navigate('/promo')}
                            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors py-2 px-4 bg-white border border-slate-200 rounded-full shadow-sm"
                        >
                            <PlayCircle className="w-4 h-4" /> Watch Trailer
                        </button>
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
                                    onClick={handleGoogleClick}
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
                                        <div className="group animate-in slide-in-from-left-2 fade-in duration-300">
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
                                onClick={toggleAuthMode}
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

            {/* Google Simulation Modal */}
            {showGoogleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                <span className="font-bold text-slate-700">Sign in with Google</span>
                            </div>
                            <button onClick={() => setShowGoogleModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500 mb-4 bg-yellow-50 text-yellow-700 p-3 rounded-lg border border-yellow-200">
                                <strong>Developer Mode:</strong> Enter the email you want to use. This simulates the Google Auth callback.
                            </p>
                            <form onSubmit={confirmGoogleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Simulated Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input 
                                            type="email" 
                                            required
                                            placeholder="you@gmail.com"
                                            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={simGoogleEmail}
                                            onChange={(e) => setSimGoogleEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Simulated Name (Optional)</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            placeholder="Your Name"
                                            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={simGoogleName}
                                            onChange={(e) => setSimGoogleName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                                    Continue
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
