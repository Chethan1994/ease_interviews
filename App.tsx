
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { QuestionBank } from './pages/QuestionBank';
import { CodingChallenges } from './pages/CodingChallenges';
import { StudyMode } from './pages/StudyMode';
import { AuthPage } from './pages/AuthPage';
import { Contributor } from './pages/Contributor';
import { AdminDashboard } from './pages/AdminDashboard';
import { ALL_QUESTIONS as STATIC_QUESTIONS } from './data/questions';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { api } from './services/api';
import { analytics } from './utils/analytics';
import { Question } from './types';
import { AlertTriangle, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  // Local state for Release 1 "Guest" progress
  const [guestMasteredIds, setGuestMasteredIds] = useState<string[]>([]);
  const [guestReviewedIds, setGuestReviewedIds] = useState<string[]>([]);
  
  // Combined Questions (Static + DB)
  const [questions, setQuestions] = useState<Question[]>(STATIC_QUESTIONS);
  
  // Debug State
  const [backendError, setBackendError] = useState<string | null>(null);

  useEffect(() => {
    // Track page views
    analytics.logPageView(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Fetch extra questions from DB
  useEffect(() => {
      const fetchQuestions = async () => {
          try {
              const dbQuestions = await api.getDBQuestions();
              // Merge, favoring DB if there were duplicates (though ID collision unlikely with current scheme)
              // We append DB questions to static ones
              if (dbQuestions && dbQuestions.length > 0) {
                  setQuestions([...STATIC_QUESTIONS, ...dbQuestions]);
              }
              // If successful, ensure no error is showing
              setBackendError(null);
          } catch (e: any) {
              // Silently fail for initial data fetch to allow "Offline Mode"
              // We log to console for developer awareness but don't disrupt user experience
              console.warn("Backend not reachable. App running in static/offline mode.", e.message);
          }
      };
      fetchQuestions();
  }, []);

  // Enable Debug Mode for specific user
  useEffect(() => {
    if (user?.email === 'chethansg4@gmail.com') {
      console.log('🐞 Debug Mode Enabled for Admin');
      // @ts-ignore
      window.DEBUG_MODE = true;
    }
  }, [user]);

  // Adapter to switch between real user data and guest local state
  const masteredIds = user ? user.masteredIds : guestMasteredIds;
  const reviewedIds = user ? (user.reviewedIds || []) : guestReviewedIds;
  
  const progressAdapter = {
      masteredIds: masteredIds,
      reviewedIds: reviewedIds, 
      isPremium: user?.isPremium || false
  };

  const handleMarkMastered = async (id: string) => {
    const question = questions.find(q => q.id === id);
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
        } catch (e: any) {
            console.error(e);
            // Optionally show toast for action failure
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
          questions={questions} 
          masteredIds={masteredIds}
          isGuest={!user}
          onNavigateToLogin={() => {}}
      />
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      
      {/* Backend Error Banner - Only show for critical errors manually set, not initial fetch */}
      {backendError && (
        <div className="bg-red-600 text-white px-4 py-3 shadow-lg fixed bottom-0 w-full z-[100] animate-in slide-in-from-bottom-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-bold">Connection Issue</p>
                        <p className="text-xs text-red-100 opacity-90 font-mono mt-0.5 max-w-2xl truncate">{backendError}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setBackendError(null)} className="text-white/60 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
      )}

      <main className="pb-12">
        <Routes>
            <Route path="/dashboard" element={
                <Dashboard 
                    progress={progressAdapter} 
                    questions={questions} 
                    onStartStudy={() => navigate('/study')}
                />
            } />
            <Route path="/browse" element={questionBankElement} />
            <Route path="/browse/:categoryId" element={questionBankElement} />
            
            <Route path="/coding-challenges" element={<CodingChallenges />} />
            <Route path="/coding-challenges/:categoryId" element={<CodingChallenges />} />

            <Route path="/study" element={
                <StudyMode 
                    questions={questions} 
                    masteredIds={progressAdapter.masteredIds}
                    onMarkMastered={handleMarkMastered}
                    onMarkReviewed={handleMarkReviewed}
                />
            } />
            <Route path="/contribute" element={<Contributor />} />
            <Route path="/auth" element={
                <AuthPage onSuccess={() => navigate('/dashboard')} /> 
            } />
            
            <Route path="/admin" element={
                user?.isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" replace />
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
