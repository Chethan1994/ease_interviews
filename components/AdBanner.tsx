
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code2, Crown, Zap } from 'lucide-react';

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
  
  // --- CONFIGURATION ---
  // CHANGE THIS TO 'true' ONLY AFTER GOOGLE APPROVES YOUR ACCOUNT
  // While false, we show "House Ads" (internal links) to keep the UI looking great.
  const ADS_ENABLED = false; 
  // ---------------------

  useEffect(() => {
    try {
      // Only push to AdSense if enabled and in production
      // @ts-ignore
      if (ADS_ENABLED && window.adsbygoogle && process.env.NODE_ENV === 'production') {
         // @ts-ignore
         (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense push error", err);
    }
  }, [ADS_ENABLED]);

  // 1. DEVELOPMENT / PENDING APPROVAL MODE (House Ads)
  // Instead of empty space, we show internal promos to improve retention/UX.
  if (!ADS_ENABLED || process.env.NODE_ENV === 'development') {
      
      // Select a random internal promo style based on slotId hash or random
      const variant = (slotId.split('').reduce((a,b) => a + b.charCodeAt(0), 0) % 3);

      return (
        <div className={`w-full my-6 ${className}`}>
             {variant === 0 ? (
                 // PROMO: CODING CHALLENGES
                 <Link to="/coding-challenges" className="block group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 shadow-lg border border-slate-700 hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Code2 className="w-24 h-24 text-white" />
                    </div>
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
                            <Code2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg group-hover:text-blue-200 transition-colors">Master React Hooks</h4>
                            <p className="text-slate-400 text-sm">Practice with our interactive in-browser coding environment.</p>
                        </div>
                    </div>
                 </Link>
             ) : variant === 1 ? (
                 // PROMO: PREMIUM / STUDY
                 <Link to="/study" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 shadow-lg hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sparkles className="w-24 h-24 text-white" />
                    </div>
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-lg text-white">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Boost Your Retention</h4>
                            <p className="text-indigo-100 text-sm">Try our Flashcard Study Mode to memorize key concepts faster.</p>
                        </div>
                    </div>
                 </Link>
             ) : (
                 // PROMO: CONTRIBUTOR
                 <Link to="/contribute" className="block group border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl p-6 transition-all text-center">
                    <h4 className="text-slate-700 font-bold mb-1 flex items-center justify-center gap-2">
                        <Crown className="w-4 h-4 text-orange-500" />
                        Become a Contributor
                    </h4>
                    <p className="text-slate-500 text-xs">Help the community by submitting your own interview questions.</p>
                 </Link>
             )}
        </div>
      );
  }

  // 2. LIVE ADSENSE MODE
  return (
    <div className={`text-center my-6 ${className}`}>
        <span className="text-[10px] text-slate-300 uppercase block mb-1">Sponsored</span>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-5226596264390573"
             data-ad-slot={slotId}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
    </div>
  );
};
