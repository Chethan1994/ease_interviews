import React, { useState, useEffect } from 'react';
import { Question, Difficulty, Category } from '../types';
import { Badge } from '../components/ui/Badge';
import { CopyButton } from '../components/ui/CopyButton';
import { RefreshCw, Check, X, Eye, EyeOff } from 'lucide-react';

interface StudyModeProps {
  questions: Question[];
  onMarkMastered: (id: string) => void;
  masteredIds: string[];
}

export const StudyMode: React.FC<StudyModeProps> = ({ questions, onMarkMastered, masteredIds }) => {
  // Filter out mastered questions initially, or show all if completed
  const [queue, setQueue] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    // Prioritize unmastered questions
    const unmastered = questions.filter(q => !masteredIds.includes(q.id));
    const mastered = questions.filter(q => masteredIds.includes(q.id));
    
    // Simple shuffle
    const shuffled = [...unmastered, ...mastered].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setCurrentIndex(0);
    setSessionComplete(false);
    setIsFlipped(false);
  }, [questions, masteredIds]); // Re-shuffle if source changes slightly, but mainly on mount

  const currentQuestion = queue[currentIndex];

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
      // Just move to next without marking mastered
      handleNext();
  };

  const restart = () => {
      const shuffled = [...queue].sort(() => Math.random() - 0.5);
      setQueue(shuffled);
      setCurrentIndex(0);
      setSessionComplete(false);
      setIsFlipped(false);
  };

  if (!currentQuestion || sessionComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-slate-100">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6">
                <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Session Complete!</h2>
            <p className="text-slate-500 mb-8">You've cycled through the current question stack.</p>
            <button 
                onClick={restart}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
                <RefreshCw className="w-5 h-5" />
                Start Another Session
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
         <div>
            <h2 className="text-xl font-bold text-slate-900">Study Mode</h2>
            <p className="text-sm text-slate-500">Card {currentIndex + 1} of {queue.length}</p>
         </div>
         <div className="flex gap-2">
            <Badge type="category" value={currentQuestion.category} />
            <Badge type="difficulty" value={currentQuestion.difficulty} />
         </div>
      </div>

      <div className="flex-1 flex flex-col justify-center perspective-1000 relative min-h-[400px]">
         {/* Card Container */}
         <div 
            className={`relative w-full h-full transition-all duration-500 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
         >
            {/* Front */}
            <div 
                className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center hover:border-primary-300 transition-colors"
                style={{ backfaceVisibility: 'hidden' }}
            >
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Question</h3>
                <p className="text-2xl sm:text-3xl font-medium text-slate-800 leading-snug">
                    {currentQuestion.question}
                </p>
                <div className="mt-8 text-primary-500 flex items-center gap-2 text-sm font-medium animate-pulse">
                    <Eye className="w-4 h-4" /> Tap to reveal answer
                </div>
            </div>

            {/* Back */}
            <div 
                className="absolute inset-0 backface-hidden bg-slate-900 rounded-2xl shadow-xl p-8 flex flex-col overflow-y-auto"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                 <div className="w-full h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Answer</h3>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                            className="text-slate-400 hover:text-white"
                        >
                            <EyeOff className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-lg text-slate-100 leading-relaxed whitespace-pre-line">
                            {currentQuestion.answer}
                        </p>
                        {currentQuestion.codeSnippet && (
                            <div className="mt-4 bg-black/50 rounded-lg border border-slate-700 overflow-hidden">
                                <div className="flex justify-end p-2 bg-white/5 border-b border-white/5">
                                    <CopyButton text={currentQuestion.codeSnippet} />
                                </div>
                                <pre className="p-4 text-sm font-mono text-emerald-400 overflow-x-auto">
                                    <code>{currentQuestion.codeSnippet}</code>
                                </pre>
                            </div>
                        )}
                    </div>
                 </div>
            </div>
         </div>
      </div>

      {/* Controls */}
      <div className="mt-8 grid grid-cols-2 gap-4">
         <button 
            onClick={handleReviewLater}
            className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
         >
            <X className="w-5 h-5" />
            Still Learning
         </button>
         <button 
            onClick={handleMastered}
            className="flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25 transition-all"
         >
            <Check className="w-5 h-5" />
            Got It!
         </button>
      </div>
    </div>
  );
};