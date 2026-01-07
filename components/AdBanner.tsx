
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Code2, Crown, Zap, ArrowRight } from 'lucide-react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  label?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slotId = '1234567890', 
  format = 'auto', 
  className = '',
  label = 'Advertisement'
}) => {
  const location = useLocation();
  const adInitialized = useRef(false);
  
  // --- CONFIGURATION ---
  // Set to true to enable Google AdSense
  const ADS_ENABLED = true; 
  // ---------------------

  useEffect(() => {
    if (ADS_ENABLED && !adInitialized.current) {
      try {
        // @ts-ignore
        if (typeof window !== 'undefined' && window.adsbygoogle) {
           // @ts-ignore
           (window.adsbygoogle = window.adsbygoogle || []).push({});
           adInitialized.current = true;
        }
      } catch (err) {
        console.warn("AdSense push failed - this is normal if ads are still pending approval", err);
      }
    }
  }, [ADS_ENABLED, location.pathname]);

  // Fallback / Development / Pending Approval UI
  // Note: Even when enabled, ads may take time to show. 
  // We show our "House Ads" as fallbacks for better UX.
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
      const variant = (slotId.split('').reduce((a,b) => a + b.charCodeAt(0), 0) % 3);

      return (
        <div className={`w-full my-8 ${className}`}>
             <div className="text-[10px] text-slate-400 font-bold uppercase mb-2 text-center tracking-widest opacity-50">[ Dev Ad Placeholder ]</div>
             {variant === 0 ? (
                 <Link to="/coding-challenges" className="block group relative overflow-hidden rounded-2xl bg-slate-900 p-8 shadow-xl border border-slate-700 hover:border-blue-500 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Code2 className="w-32 h-32 text-white" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                                <Code2 className="w-5 h-5" />
                            </div>
                            <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Skill Up</span>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-2">Interactive Coding Round</h4>
                        <p className="text-slate-400 text-sm mb-6 max-w-sm">Practice frontend machine coding rounds directly in your browser with real-time preview.</p>
                        <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
                            Explore Challenges <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                 </Link>
             ) : variant === 1 ? (
                 <Link to="/study" className="block group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-8 shadow-xl hover:shadow-indigo-500/20 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="w-32 h-32 text-white" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white/20 p-2 rounded-lg text-white">
                                <Zap className="w-5 h-5" />
                            </div>
                            <span className="text-indigo-100 text-xs font-black uppercase tracking-widest">Premium Learning</span>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-2">Spaced Repetition Cards</h4>
                        <p className="text-indigo-100 text-sm mb-6 max-w-sm">Memorize complex JavaScript engine concepts and React internals with our smart flashcard engine.</p>
                        <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:translate-x-1 transition-transform">
                            Start Learning <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                 </Link>
             ) : (
                 <Link to="/contribute" className="block group border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-2xl p-8 transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-slate-800 font-bold text-lg mb-1 flex items-center gap-2">
                                <Crown className="w-5 h-5 text-orange-500" />
                                Join Our Expert Community
                            </h4>
                            <p className="text-slate-500 text-sm">Contribute questions and help thousands of developers grow.</p>
                        </div>
                        <div className="bg-white p-3 rounded-full border border-slate-200 text-slate-400 group-hover:text-primary-600 group-hover:border-primary-200 transition-all shadow-sm">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                 </Link>
             )}
        </div>
      );
  }

  return (
    <div className={`text-center my-8 overflow-hidden min-h-[100px] ${className}`}>
        <span className="text-[10px] text-slate-300 uppercase font-black tracking-tighter block mb-2 opacity-50">{label}</span>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-5226596264390573"
             data-ad-slot={slotId}
             data-ad-format={format}
             data-full-width-responsive="true"
             key={location.pathname + slotId} />
    </div>
  );
};
