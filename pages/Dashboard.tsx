
import React, { useState, useEffect } from 'react';
import { UserProgress, Question, Category } from '../types';
import { StatsChart } from '../components/StatsChart';
import { AdBanner } from '../components/AdBanner';
import { PlayCircle, Award, Target, X, Shuffle } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface DashboardProps {
  progress: UserProgress;
  questions: Question[];
  onStartStudy: (category?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, questions, onStartStudy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = Object.values(Category);
  
  useEffect(() => {
      // Log dashboard view with user stats
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, Developer</h1>
        <p className="text-slate-500 mt-2">Track your progress and master your next interview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Stats Card */}
        <div className="col-span-1 md:col-span-2">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                 <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <Award className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm text-slate-500 font-medium">Mastered</p>
                    <p className="text-2xl font-bold text-slate-900">{progress.masteredIds.length}</p>
                 </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                 <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Target className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm text-slate-500 font-medium">Total Questions</p>
                    <p className="text-2xl font-bold text-slate-900">{questions.length}</p>
                 </div>
              </div>
              <button 
                 className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors text-left" 
                 onClick={() => setIsModalOpen(true)}
              >
                 <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                    <PlayCircle className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm text-slate-500 font-medium">Quick Start</p>
                    <p className="text-sm font-bold text-indigo-600">Start Session</p>
                 </div>
              </button>
           </div>
           
           <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
             <h3 className="text-lg font-semibold text-slate-800 mb-4">Category Mastery</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map(cat => (
                  <div key={cat} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{cat}</span>
                      <span className="text-slate-500">{getCategoryProgress(cat)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getCategoryProgress(cat)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Chart Column */}
        <div className="col-span-1 space-y-6">
          <StatsChart progress={progress} totalQuestions={questions.length} />
          
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Don't just memorize the answers. Try to explain the concepts out loud as if you were teaching a junior developer. This reinforces deep learning.
            </p>
          </div>

          <AdBanner slotId="dashboard-sidebar" />
        </div>
      </div>

      {/* Topic Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100 flex flex-col max-h-[85vh]">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Start Study Session</h3>
                        <p className="text-sm text-slate-500">Select a specific topic to focus on or mix them all.</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar">
                    {/* All Topics Option */}
                    <button
                        onClick={() => { onStartStudy(); setIsModalOpen(false); }}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-400 transition-all group text-center min-h-[140px]"
                    >
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                            <Shuffle className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-indigo-900">Mix All Topics</span>
                        <span className="text-xs text-indigo-600/70 mt-1 font-medium">{questions.length} questions available</span>
                    </button>

                    {/* Categories */}
                    {categories.map(cat => {
                        const catQuestions = questions.filter(q => q.category === cat);
                        const count = catQuestions.length;
                        const percent = getCategoryProgress(cat);

                        return (
                            <button
                                key={cat}
                                onClick={() => { onStartStudy(cat); setIsModalOpen(false); }}
                                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md hover:bg-white bg-slate-50/50 transition-all text-center min-h-[140px] relative overflow-hidden group"
                            >
                                <span className="font-bold text-slate-800 mb-1 text-lg group-hover:text-primary-700">{cat}</span>
                                <span className="text-xs text-slate-500 mb-3">{count} questions</span>
                                
                                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-auto mb-1 overflow-hidden">
                                    <div className="bg-primary-500 h-full transition-all" style={{ width: `${percent}%` }}></div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">
                                    {percent}% Mastered
                                </span>
                            </button>
                        )
                    })}
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400">
                    Pro Tip: Focusing on one topic at a time can improve retention.
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
