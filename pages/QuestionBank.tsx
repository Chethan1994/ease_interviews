
import React, { useState } from 'react';
import { Question, Category, Difficulty } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Badge } from '../components/ui/Badge';
import { PaymentModal } from '../components/PaymentModal';
import { AdBanner } from '../components/AdBanner';
import { Search, CheckCircle, Lock, Star, ChevronRight, Zap, BookOpen, Code, Terminal, Layers, Hash, Layout, ArrowLeft } from 'lucide-react';

interface QuestionBankProps {
  questions: Question[];
  onNavigateToLogin: () => void;
}

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  [Category.React]: Code,
  [Category.JavaScript]: Terminal,
  [Category.CSS]: Layout,
  [Category.SystemDesign]: Layers,
  [Category.Behavioral]: BookOpen,
  [Category.HTML]: Hash,
};

export const QuestionBank: React.FC<QuestionBankProps> = ({ questions, onNavigateToLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const { user, updateUser } = useAuth();
  
  const categories = Object.values(Category);
  
  // Use Auth user state for premium and mastery status
  const isPremium = user?.isPremium || false;
  const masteredIds = user?.masteredIds || [];

  const VISIBLE_LIMIT = isPremium ? 1000 : 30;

  const currentQuestions = selectedCategory 
    ? questions.filter(q => q.category === selectedCategory) 
    : [];
    
  const filteredQuestions = currentQuestions.filter(q => 
    !search || 
    q.question.toLowerCase().includes(search.toLowerCase()) || 
    q.answer.toLowerCase().includes(search.toLowerCase())
  );

  const visibleQuestions = filteredQuestions.slice(0, VISIBLE_LIMIT);
  const hiddenCount = Math.max(0, filteredQuestions.length - VISIBLE_LIMIT);

  const handleUnlockClick = () => {
      if (!user) {
          onNavigateToLogin();
      } else {
          setShowPayment(true);
      }
  };

  const handlePaymentSuccess = async () => {
      if (user) {
          try {
            const updatedUser = await api.processPaymentSuccess(user.id);
            updateUser(updatedUser);
          } catch (e) {
              console.error("Payment sync failed", e);
              // Fallback optimistic update
              updateUser({ ...user, isPremium: true });
          }
      }
  };

  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Question Bank</h1>
           <p className="text-base text-slate-600 max-w-2xl mx-auto">
             Select a topic to browse 100+ curated interview questions, complete with answers and code examples.
           </p>
           {isPremium && (
             <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold border border-yellow-200">
                <Star className="w-3 h-3 fill-yellow-600 text-yellow-600" /> Premium Active
             </div>
           )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map(cat => {
            const Icon = CATEGORY_ICONS[cat];
            const count = questions.filter(q => q.category === cat).length;
            const masteredCount = questions.filter(q => q.category === cat && masteredIds.includes(q.id)).length;
            const progress = count > 0 ? Math.round((masteredCount / count) * 100) : 0;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="group relative bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon className="w-20 h-20 text-primary-600" />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="inline-flex items-center justify-center p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                        <span className="font-medium">{count} Questions</span>
                        <span>•</span>
                        <span>{masteredCount} Mastered</span>
                    </div>
                    
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                        <div 
                            className="bg-primary-500 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="text-[10px] text-right text-slate-400 font-medium">
                        {progress}% Complete
                    </div>
                </div>
              </button>
            );
          })}
        </div>
        
        <AdBanner slotId="category-footer" />
      </div>
    );
  }

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-80px)] flex flex-col animate-in slide-in-from-right-8 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setSelectedCategory(null)}
                className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    {selectedCategory} <span className="text-slate-300">/</span> Questions
                    {isPremium && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 ml-2" />}
                </h1>
            </div>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${selectedCategory}...`}
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-12">
        {visibleQuestions.length > 0 ? (
          visibleQuestions.map((q, idx) => {
            const isMastered = masteredIds.includes(q.id);
            return (
              <div 
                key={q.id} 
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-slate-400 font-mono text-[10px] font-bold">#{idx + 1}</span>
                        <Badge type="difficulty" value={q.difficulty} />
                        {isMastered && (
                          <span className="flex items-center text-green-600 text-[10px] font-bold bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3 mr-1" /> Mastered
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {q.question}
                      </h3>
                    </div>
                  </div>

                  <div className="relative pl-4 border-l-2 border-primary-500/30">
                     <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm">
                       {q.answer}
                     </p>
                  </div>

                  {q.codeSnippet && (
                    <div className="mt-4">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Code className="w-3 h-3" /> Example
                      </div>
                      <div className="bg-[#1e1e1e] rounded-lg border border-slate-800 overflow-hidden shadow-inner">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border-b border-white/5">
                            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                        </div>
                        <pre className="p-3 overflow-x-auto">
                          <code className="text-xs font-mono text-emerald-400 leading-relaxed">
                            {q.codeSnippet}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500">No questions found matching your search.</p>
          </div>
        )}

        {hiddenCount > 0 && !search && !isPremium && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl mx-auto max-w-4xl mt-6 mb-6">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex-1 text-center md:text-left space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                            <Star className="w-3 h-3 fill-yellow-300" /> Premium Access
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">Unlock {hiddenCount} more {selectedCategory} questions</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                            {user ? 'Go beyond the basics.' : 'Log in to upgrade.'} Get access to advanced scenarios, system design deep dives, and company-specific question banks.
                        </p>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-lg border border-white/10 w-full md:w-64 flex-shrink-0 shadow-lg">
                        <div className="text-center mb-4 pb-4 border-b border-white/10">
                            <span className="text-3xl font-bold text-white tracking-tight">$12</span>
                            <span className="text-slate-400 text-sm font-medium">/month</span>
                        </div>
                        <button 
                            onClick={handleUnlockClick}
                            className="w-full py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 flex items-center justify-center gap-2 group text-sm"
                        >
                            {user ? 'Unlock Now' : 'Log In to Upgrade'} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                  </div>
              </div>
            </div>
        )}

        <AdBanner slotId="questions-list-footer" />
      </div>
    </div>
    
    <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        price="$12.00"
    />
    </>
  );
};
