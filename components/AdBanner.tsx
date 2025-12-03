import React, { useEffect } from 'react';

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
  useEffect(() => {
    try {
      // In a real environment, this pushes the ad request to Google
      // We wrap it in a try-catch because in dev/test without a real ID, it might throw
      // @ts-ignore
      if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
         // @ts-ignore
         (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense push error", err);
    }
  }, []);

  // Development / Demo Mode Placeholder
  // Since we don't have a real Publisher ID provided, we render a placeholder that mimics the layout.
  // To enable real ads:
  // 1. Add your ID to index.html
  // 2. Set process.env.NODE_ENV to 'production' or remove this conditional
  const isDevMode = true; 

  if (isDevMode) {
      return (
        <div className={`w-full ${className}`}>
             <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg p-3 flex flex-col items-center justify-center text-center min-h-[100px]">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</span>
                 <div className="bg-slate-200/50 rounded px-4 py-2">
                    <span className="text-slate-500 text-xs font-mono">Google AdSense Space (Slot: {slotId})</span>
                 </div>
             </div>
        </div>
      );
  }

  return (
    <div className={`text-center ${className}`}>
        <span className="text-[10px] text-slate-300 uppercase block mb-1">Sponsored</span>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-YOUR_PUBLISHER_ID_HERE"
             data-ad-slot={slotId}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
    </div>
  );
};