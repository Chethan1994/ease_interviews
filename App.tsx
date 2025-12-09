
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { QuestionBank } from './pages/QuestionBank';
import { CodingChallenges } from './pages/CodingChallenges';
import { StudyMode } from './pages/StudyMode';
import { AuthPage } from './pages/AuthPage';
import { AIQuiz } from './pages/AIQuiz'; // Assuming you have this imported
import { ALL_QUESTIONS as QUESTION_BANK } from './data/questions';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { api } from './services/api';
import { analytics } from './utils/analytics';

const MainContent: React.FC = () => {
  const location = useLocation();
  const { user, updateUser } = useAuth();
  
  // Local state for Release 1 "Guest" progress
  const [guestMasteredIds, setGuestMasteredIds] = useState<string[]>([]);
  const [guestReviewedIds, setGuestReviewedIds] = useState<string[]>([]);

  useEffect(() => {
    // Track page views
    analytics.logPageView(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Adapter to switch between real user data and guest local state
  const masteredIds = user ? user.masteredIds : guestMasteredIds;
  const reviewedIds = user ? (user.reviewedIds || []) : guestReviewedIds;
  
  const progressAdapter = {
      masteredIds: masteredIds,
      reviewedIds: reviewedIds, 
      isPremium: user?.isPremium || false
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

  const questionBankElement = (
      <QuestionBank 
          questions={QUESTION_BANK} 
          masteredIds={masteredIds}
          isGuest={!user}
          onNavigateToLogin={() => {}}
      />
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="pb-12">
        <Routes>
            <Route path="/dashboard" element={
                <Dashboard 
                    progress={progressAdapter} 
                    questions={QUESTION_BANK} 
                    onStartStudy={() => {}} // Navigation handled via Link inside Dashboard if needed, or update Dashboard to use Link
                />
            } />
            <Route path="/browse" element={questionBankElement} />
            <Route path="/browse/:categoryId" element={questionBankElement} />
            
            <Route path="/coding-challenges" element={<CodingChallenges />} />
            <Route path="/study" element={
                <StudyMode 
                    questions={QUESTION_BANK} 
                    masteredIds={progressAdapter.masteredIds}
                    onMarkMastered={handleMarkMastered}
                    onMarkReviewed={handleMarkReviewed}
                />
            } />
            <Route path="/auth" element={
                <AuthPage onSuccess={() => {}} /> 
            } />
            {/* Redirect root to browse */}
            <Route path="*" element={<Navigate to="/browse" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <AuthProvider>
                <MainContent />
            </AuthProvider>
        </HashRouter>
    );
};

export default App;
