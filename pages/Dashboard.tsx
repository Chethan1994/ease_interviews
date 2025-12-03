import React from 'react';
import { UserProgress, Question, Category } from '../types';
import { StatsChart } from '../components/StatsChart';
import { PlayCircle, Award, Target } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  questions: Question[];
  onStartStudy: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, questions, onStartStudy }) => {
  const categories = Object.values(Category);
  
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
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={onStartStudy}>
                 <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                    <PlayCircle className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm text-slate-500 font-medium">Quick Start</p>
                    <p className="text-sm font-bold text-indigo-600">Resume Session</p>
                 </div>
              </div>
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
        <div className="col-span-1">
          <StatsChart progress={progress} totalQuestions={questions.length} />
          
          <div className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Don't just memorize the answers. Try to explain the concepts out loud as if you were teaching a junior developer. This reinforces deep learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};