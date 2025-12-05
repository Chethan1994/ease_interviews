
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { QuestionBank } from './pages/QuestionBank';
import { CodingChallenges } from './pages/CodingChallenges';
import { StudyMode } from './pages/StudyMode';
import { ViewState } from './types';
import { ALL_QUESTIONS } from './data/questions';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { api } from './services/api';

const MainContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('browse');
  const { user, updateUser } = useAuth();
  
  // Local state for Release 1 "Guest" progress (since auth is disabled)
  const [guestMasteredIds, setGuestMasteredIds] = useState<string[]>([]);

  // Adapter to switch between real user data and guest local state
  const masteredIds = user ? user.masteredIds : guestMasteredIds;
  
  const progressAdapter = {
      masteredIds: masteredIds,
      reviewedIds: [], 
      isPremium: user?.isPremium || false
  };

  const handleMarkMastered = async (id: string) => {
    if (user) {
        try {
            // Optimistic update
            const newMastered = [...user.masteredIds, id];
            updateUser({ ...user, masteredIds: newMastered });
            // Sync
            await api.markMastered(user.id, id);
        } catch (e) {
            console.error(e);
        }
    } else {
        // Guest mode
        if (!guestMasteredIds.includes(id)) {
            setGuestMasteredIds(prev => [...prev, id]);
        }
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            progress={progressAdapter} 
            questions={ALL_QUESTIONS} 
            onStartStudy={() => setCurrentView('study')} 
          />
        );
      case 'browse':
        return (
          <QuestionBank 
            questions={ALL_QUESTIONS} 
            onNavigateToLogin={() => setCurrentView('auth')}
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
            masteredIds={progressAdapter.masteredIds}
            onMarkMastered={handleMarkMastered}
          />
        );
      // AI Quiz and Auth pages removed for Release 1
      /*
      case 'ai-quiz':
        return (
          <AIQuiz />
        );
      case 'auth':
          return (
              <AuthPage onSuccess={() => setCurrentView('dashboard')} />
          );
      */
      default:
        // Fallback to browse if a disabled view is requested
        return (
          <QuestionBank 
            questions={ALL_QUESTIONS} 
            onNavigateToLogin={() => {}}
          />
        );
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

const App: React.FC = () => {
    return (
        <AuthProvider>
            <MainContent />
        </AuthProvider>
    );
};

export default App;