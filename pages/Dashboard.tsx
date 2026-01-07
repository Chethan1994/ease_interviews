
import React, { useState, useEffect } from 'react';
import { UserProgress, Question, Category } from '../types';
import { StatsChart } from '../components/StatsChart';
import { AdBanner } from '../components/AdBanner';
import { PlayCircle, Award, Target, X, Shuffle, Share2, Check, BookOpen, Lightbulb } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface DashboardProps {
  progress: UserProgress;
  questions: Question[];
  onStartStudy: (category?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, questions, onStartStudy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const categories = Object.values(Category);
  
  useEffect(() => {
      analytics.logEvent('view_dashboard', {
          mastered_count: progress.masteredIds.length,
          total_questions: questions.length,
          is_premium: progress.isPremium
      });
  }, [progress.masteredIds.length, questions.length]);
  
  const getCategoryProgress = (cat: Category) => {
    const catQuestions = questions.filter(q => q.category === cat);
    if (catQuestions.length === 0) return 0;
    const mastered = catQuestions.filter(q => progress.masteredIds.includes(q.id)).length;
    return Math.round((mastered / catQuestions.length) * 100);
  };

  const handleShare = async () => {
      const text = `I've mastered ${progress.masteredIds.length} interview questions on InterviewPrep! 🚀`;
      if (navigator.share) {
          try { await navigator.share({ title: 'My Progress', text, url: window.location.origin }); } catch (err) {}
      } else {
          navigator.clipboard.writeText(text);
          setShowShareTooltip(true);
          setTimeout(() => setShowShareTooltip(false), 2000);
      }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Your Learning Dashboard</h1>
            <p className="text-slate-500 mt-2">Personalized progress tracking and study tools.</p>
        </div>
        <button onClick={handleShare} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm">
            {showShareTooltip ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {showShareTooltip ? 'Copied!' : 'Share Progress'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                 <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Award className="w-6 h-6" /></div>
                 <div>
                    <p className="text-sm text-slate-500 font-medium">Mastered</p>
                    <p className="text-2xl font-bold text-slate-900">{progress.masteredIds.length}</p>
                 </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                 <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Target className="w-6 h-6" /></div>
                 <div>
                    <p className="text-sm text-slate-500 font-medium">Remaining</p>
                    <p className="text-2xl font-bold text-slate-900">{questions.length - progress.masteredIds.length}</p>
                 </div>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="bg-primary-600 p-4 rounded-xl shadow-lg shadow-primary-500/20 flex items-center gap-4 hover:bg-primary-700 transition-colors text-left text-white">
                 <div className="p-3 bg-white/20 rounded-lg"><PlayCircle className="w-6 h-6" /></div>
                 <span className="font-bold">Resume Study</span>
              </button>
           </div>
           
           <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
             <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary-500"/> Topic Mastery Breakdown</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {categories.map(cat => (
                  <div key={cat} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-slate-700">{cat}</span>
                      <span className="text-slate-400 font-medium">{getCategoryProgress(cat)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full transition-all duration-700" style={{ width: `${getCategoryProgress(cat)}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
           </div>

           {/* EDUCATIONAL CONTENT (Addresses Low Value Content Policy) */}
           <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden">
               <div className="relative z-10">
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400"/> Engineering Excellence Tips</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                       <div className="space-y-2">
                           <h4 className="font-bold text-primary-400">Communication is Key</h4>
                           <p className="text-slate-400">Always think out loud. Interviewers want to see how you troubleshoot problems, not just your final solution.</p>
                       </div>
                       <div className="space-y-2">
                           <h4 className="font-bold text-primary-400">Trade-offs over Right Answers</h4>
                           <p className="text-slate-400">Explain why you chose a specific pattern. Mention memory vs. performance trade-offs to show seniority.</p>
                       </div>
                   </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 blur-3xl rounded-full"></div>
           </div>
        </div>

        <div className="col-span-1 space-y-6">
          <StatsChart progress={progress} totalQuestions={questions.length} />
          
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 uppercase tracking-widest text-xs">Community Milestone</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              You are among the top 15% of learners preparing for {categories[0]} roles this month. Consistent daily practice is the #1 predictor of interview success.
            </p>
            <div className="flex -space-x-2">
                {[1,2,3,4].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-${i*100+100}`}></div>)}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-500 flex items-center justify-center text-[10px] font-bold text-white">+2k</div>
            </div>
          </div>

          <AdBanner slotId="dashboard-sidebar" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-xl font-bold text-slate-900">Select Study Focus</h3>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto">
                    <button onClick={() => { onStartStudy(); setIsModalOpen(false); }} className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 transition-all text-center min-h-[140px]">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3"><Shuffle className="w-6 h-6" /></div>
                        <span className="font-bold text-indigo-900">Mixed Mode</span>
                    </button>
                    {categories.map(cat => {
                        const percent = getCategoryProgress(cat);
                        return (
                            <button key={cat} onClick={() => { onStartStudy(cat); setIsModalOpen(false); }} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-primary-300 bg-white transition-all text-center min-h-[140px]">
                                <span className="font-bold text-slate-800 mb-1">{cat}</span>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-auto mb-1 overflow-hidden">
                                    <div className="bg-primary-500 h-full" style={{ width: `${percent}%` }}></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">{percent}% Done</span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
