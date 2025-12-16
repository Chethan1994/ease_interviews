
import React, { useState, useEffect } from 'react';
import { Question, Difficulty, Category } from '../types';
import { Badge } from '../components/ui/Badge';
import { CopyButton } from '../components/ui/CopyButton';
import { RefreshCw, Check, X, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { analytics } from '../utils/analytics';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface StudyModeProps {
  questions: Question[];
  onMarkMastered: (id: string) => void;
  onMarkReviewed: (id: string) => void;
  masteredIds: string[];
}

export const StudyMode: React.FC<StudyModeProps> = ({ questions, onMarkMastered, onMarkReviewed, masteredIds }) => {
  const [queue, setQueue] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    // 1. Filter by Category if param exists
    let eligibleQuestions = questions;
    if (categoryFilter) {
        eligibleQuestions = questions.filter(q => q.category === categoryFilter);
    }

    // 2. Separate Unmastered vs Mastered for prioritization
    const unmastered = eligibleQuestions.filter(q => !masteredIds.includes(q.id));
    const mastered = eligibleQuestions.filter(q => masteredIds.includes(q.id));
    
    // 3. Shuffle both groups
    const shuffledUnmastered = [...unmastered].sort(() => Math.random() - 0.5);
    const shuffledMastered = [...mastered].sort(() => Math.random() - 0.5);

    // 4. Combine (Unmastered first)
    const finalQueue = [...shuffledUnmastered, ...shuffledMastered];

    setQueue(finalQueue);
    setCurrentIndex(0);
    setSessionComplete(false);
    setIsFlipped(false);
  }, [questions, masteredIds, categoryFilter]);

  const currentQuestion = queue[currentIndex];

  // Track review when a new card is shown
  useEffect(() => {
    if (currentQuestion) {
        onMarkReviewed(currentQuestion.id);
        analytics.logQuestionView(currentQuestion.id, currentQuestion.category);
    }
  }, [currentQuestion]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
        if (currentIndex < queue.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setSessionComplete(true);
        }
    }, 200);
  };

  const handleMastered = () => {
    if (currentQuestion) {
        onMarkMastered(currentQuestion.id);
    }
    handleNext();
  };

  const handleReviewLater = () => {
      handleNext();
  };

  const restart = () => {
      const shuffled = [...queue].sort(() => Math.random() - 0.5);
      setQueue(shuffled);
      setCurrentIndex(0);
      setSessionComplete(false);
      setIsFlipped(false);
  };

  if (queue.length === 0 && questions.length > 0) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <h2 className="text-xl font-bold text-slate-800">No questions found.</h2>
            <p className="text-slate-500 mt-2">Try selecting a different topic or clearing your filters.</p>
            <button onClick={() => navigate('/dashboard')} className="mt-4 px-4 py-2 bg-slate-200 rounded-lg text-slate-700 font-medium">Back to Dashboard</button>
        </div>
      );
  }

  if (!currentQuestion || sessionComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-in zoom-in-95 duration-300">
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-slate-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6">
                <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Session Complete!</h2>
            <p className="text-slate-500 mb-8">You've cycled through all {queue.length} questions in this stack.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={restart}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                    <RefreshCw className="w-5 h-5" />
                    Review Again
                </button>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    {categoryFilter || 'Mixed Study'}
                </h2>
                <p className="text-sm text-slate-500">Card {currentIndex + 1} of {queue.length}</p>
            </div>
         </div>
         <div className="flex gap-2">
            {!categoryFilter && <Badge type="category" value={currentQuestion.category} />}
            <Badge type="difficulty" value={currentQuestion.difficulty} />
         </div>
      </div>

      <div className="flex-1 flex flex-col justify-center perspective-1000 relative min-h-[400px]">
         {/* Card Container */}
         <div 
            className={`relative w-full h-full transition-all duration-500 transform-style-3d cursor-pointer group ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
         >
            {/* Front */}
            <div 
                className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center group-hover:border-primary-300 group-hover:shadow-2xl transition-all"
                style={{ backfaceVisibility: 'hidden' }}
            >
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Question</h3>
                <p className="text-2xl sm:text-3xl font-medium text-slate-800 leading-snug max-w-2xl">
                    {currentQuestion.question}
                </p>
                <div className="mt-8 text-primary-500 flex items-center gap-2 text-sm font-bold uppercase tracking-wider animate-pulse">
                    <Eye className="w-4 h-4" /> Tap to reveal answer
                </div>
            </div>

            {/* Back */}
            <div 
                className="absolute inset-0 backface-hidden bg-slate-900 rounded-2xl shadow-xl p-8 flex flex-col overflow-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                 <div className="w-full h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Answer</h3>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold uppercase"
                        >
                            <EyeOff className="w-4 h-4" /> Hide
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 sleek-scrollbar-dark">
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-slate-100 leading-relaxed whitespace-pre-line">
                                {currentQuestion.answer}
                            </p>
                            {currentQuestion.imageUrl && (
                            <div className="mt-6 mb-4 bg-white/5 p-2 rounded-xl">
                                <img 
                                    src={currentQuestion.imageUrl} 
                                    alt="Explanation diagram" 
                                    className="rounded-lg border border-slate-700 max-w-full h-auto mx-auto" 
                                />
                            </div>
                            )}
                            {currentQuestion.codeSnippet && (
                                <div className="mt-6 bg-black/50 rounded-lg border border-slate-700 overflow-hidden relative group/code">
                                    <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                        <CopyButton text={currentQuestion.codeSnippet} className="bg-slate-700 hover:bg-slate-600" />
                                    </div>
                                    <pre className="p-4 text-sm font-mono text-emerald-400 overflow-x-auto bg-transparent m-0">
                                        <code>{currentQuestion.codeSnippet}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
            </div>
         </div>
      </div>

      {/* Controls */}
      <div className="mt-8 grid grid-cols-2 gap-4">
         <button 
            onClick={handleReviewLater}
            className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
         >
            <X className="w-5 h-5" />
            Still Learning
         </button>
         <button 
            onClick={handleMastered}
            className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all active:scale-[0.98]"
         >
            <Check className="w-5 h-5" />
            Got It!
         </button>
      </div>
    </div>
  );
};
