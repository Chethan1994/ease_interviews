
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { QuestionBank } from './pages/QuestionBank';
import { CodingChallenges } from './pages/CodingChallenges';
import { StudyMode } from './pages/StudyMode';
import { ViewState } from './types';
import { ALL_QUESTIONS as QUESTION_BANK } from './data/questions';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { api } from './services/api';
import { analytics } from './utils/analytics';

const MainContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('browse');
  const [questionBankKey, setQuestionBankKey] = useState(0);
  const [codingChallengesKey, setCodingChallengesKey] = useState(0);
  const { user, updateUser } = useAuth();
  
  // Local state for Release 1 "Guest" progress
  const [guestMasteredIds, setGuestMasteredIds] = useState<string[]>([]);
  const [guestReviewedIds, setGuestReviewedIds] = useState<string[]>([]);

  useEffect(() => {
    // Track page views
    analytics.logPageView(currentView);
  }, [currentView]);

  // Adapter to switch between real user data and guest local state
  const masteredIds = user ? user.masteredIds : guestMasteredIds;
  const reviewedIds = user ? (user.reviewedIds || []) : guestReviewedIds;
  
  const progressAdapter = {
      masteredIds: masteredIds,
      reviewedIds: reviewedIds, 
      isPremium: user?.isPremium || false
  };

  const handleSetView = (view: ViewState) => {
    if (view === 'browse') {
      setQuestionBankKey(prev => prev + 1);
    }
    if (view === 'coding-challenges') {
      setCodingChallengesKey(prev => prev + 1);
    }
    setCurrentView(view);
  };

  const handleMarkMastered = async (id: string) => {
    const question = QUESTION_BANK.find(q => q.id === id);
    if (question) {
        analytics.logMastery(id, question.category);
    }

    if (user) {
        try {
            const newMastered = [...user.masteredIds];
            if (!newMastered.includes(id)) {
                newMastered.push(id);
                updateUser({ ...user, masteredIds: newMastered });
                await api.markMastered(user.id, id);
            }
        } catch (e) {
            console.error(e);
        }
    } else {
        if (!guestMasteredIds.includes(id)) {
            setGuestMasteredIds(prev => [...prev, id]);
        }
    }
  };

  const handleMarkReviewed = async (id: string) => {
    // If it's already mastered or reviewed, skip api call logic to save bandwidth, 
    // but in guest mode we still update state.
    const isAlreadyReviewed = reviewedIds.includes(id);

    if (user) {
        if (!isAlreadyReviewed) {
             const newReviewed = [...(user.reviewedIds || [])];
             newReviewed.push(id);
             updateUser({ ...user, reviewedIds: newReviewed });
             try {
                await api.markReviewed(user.id, id);
             } catch(e) { console.error(e); }
        }
    } else {
        if (!isAlreadyReviewed) {
            setGuestReviewedIds(prev => [...prev, id]);
        }
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            progress={progressAdapter} 
            questions={QUESTION_BANK} 
            onStartStudy={() => setCurrentView('study')} 
          />
        );
      case 'browse':
        return (
          <QuestionBank 
            key={questionBankKey}
            questions={QUESTION_BANK} 
            masteredIds={masteredIds}
            isGuest={!user}
            onNavigateToLogin={() => setCurrentView('auth')}
          />
        );
      case 'coding-challenges':
        return (
            <CodingChallenges key={codingChallengesKey} />
        );
      case 'study':
        return (
          <StudyMode 
            questions={QUESTION_BANK} 
            masteredIds={progressAdapter.masteredIds}
            onMarkMastered={handleMarkMastered}
            onMarkReviewed={handleMarkReviewed}
          />
        );
      /* Auth removed for Release 1 */
      default:
        return (
          <QuestionBank 
            key={questionBankKey}
            questions={QUESTION_BANK} 
            masteredIds={masteredIds}
            isGuest={!user}
            onNavigateToLogin={() => {}}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar currentView={currentView} setView={handleSetView} />
      <main className="pb-12">
        {renderView()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <MainContent />
        </AuthProvider>
    );
};

export default App;
