import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { QuestionBank } from './pages/QuestionBank';
import { CodingChallenges } from './pages/CodingChallenges';
import { StudyMode } from './pages/StudyMode';
import { AIQuiz } from './pages/AIQuiz';
import { ViewState, UserProgress } from './types';
import { ALL_QUESTIONS } from './data/questions';

const STORAGE_KEY = 'devprep_progress_v1';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { masteredIds: [], reviewedIds: [], isPremium: false };
  });

  // Persist progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const handleMarkMastered = (id: string) => {
    setProgress(prev => {
        // Add to reviewed if not there
        const reviewedIds = prev.reviewedIds.includes(id) 
            ? prev.reviewedIds 
            : [...prev.reviewedIds, id];
            
        // Add to mastered if not there
        const masteredIds = prev.masteredIds.includes(id) 
            ? prev.masteredIds 
            : [...prev.masteredIds, id];

        return { ...prev, reviewedIds, masteredIds };
    });
  };

  const handleUnlockPremium = () => {
    setProgress(prev => ({ ...prev, isPremium: true }));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            progress={progress} 
            questions={ALL_QUESTIONS} 
            onStartStudy={() => setCurrentView('study')} 
          />
        );
      case 'browse':
        return (
          <QuestionBank 
            questions={ALL_QUESTIONS} 
            masteredIds={progress.masteredIds} 
            isPremium={progress.isPremium}
            onUnlockPremium={handleUnlockPremium}
          />
        );
      case 'coding-challenges':
        return (
            <CodingChallenges />
        );
      case 'study':
        return (
          <StudyMode 
            questions={ALL_QUESTIONS} 
            masteredIds={progress.masteredIds}
            onMarkMastered={handleMarkMastered}
          />
        );
      case 'ai-quiz':
        return (
          <AIQuiz />
        );
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="pb-12">
        {renderView()}
      </main>
    </div>
  );
};

export default App;