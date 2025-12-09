
import React, { useState, useEffect } from 'react';
import { Question, Category, Difficulty } from '../types';
import { Badge } from '../components/ui/Badge';
import { CopyButton } from '../components/ui/CopyButton';
import { ScrollToTop } from '../components/ui/ScrollToTop';
import { AdBanner } from '../components/AdBanner';
import { analytics } from '../utils/analytics';
import { Search, CheckCircle, Code, Terminal, Layout, Hash, ArrowLeft, Clock, Server, Zap, ArrowUpDown, FileCode, FileText, Filter, Check, X } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface QuestionBankProps {
  questions: Question[];
  masteredIds: string[];
  onNavigateToLogin: () => void;
  isGuest: boolean;
}

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  [Category.React]: Code,
  [Category.NextJS]: Zap,
  [Category.TypeScript]: FileCode,
  [Category.JavaScript]: Terminal,
  [Category.NodeJS]: Server,
  [Category.CSS]: Layout,
  [Category.HTML]: Hash,
};

export const QuestionBank: React.FC<QuestionBankProps> = ({ questions = [], masteredIds, onNavigateToLogin, isGuest }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Derive selected category from URL
  const selectedCategory = Object.values(Category).find(c => c === categoryId) || null;

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'easy' | 'hard'>('default');
  
  // Filter States
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [showMastered, setShowMastered] = useState(true);

  // Reset filters if navigation state requests it (e.g. clicking "Question Bank" in nav)
  useEffect(() => {
    // @ts-ignore
    if (location.state?.reset) {
        setSearch('');
        setSelectedDifficulties([]);
        setShowMastered(true);
        setSortOrder('default');
        // We don't need to force navigate here because Navbar links already point to /browse
    }
  }, [location.state]);
  
  // Track category selection analytics and reset view-specific filters
  useEffect(() => {
    if (selectedCategory) {
        analytics.logEvent('view_category', { category: selectedCategory });
        // Reset filters when changing category
        setSearch('');
        setSelectedDifficulties([]);
        setShowMastered(true);
        setSortOrder('default');
    }
  }, [selectedCategory]);
  
  const categories = Object.values(Category);

  if (!questions) {
      return <div className="p-12 text-center text-slate-500">Loading Question Bank...</div>;
  }

  // Limit to first 30 questions per category as requested
  const currentQuestions = selectedCategory 
    ? questions.filter(q => q.category === selectedCategory).slice(0, 30)
    : [];
    
  // Filter Logic
  const filteredQuestions = currentQuestions.filter(q => {
    // Search
    const matchesSearch = !search || 
      q.question.toLowerCase().includes(search.toLowerCase()) || 
      q.answer.toLowerCase().includes(search.toLowerCase());
    
    // Difficulty Filter
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(q.difficulty);
    
    // Status Filter
    const isMastered = masteredIds.includes(q.id);
    const matchesStatus = showMastered || !isMastered;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  // Sorting Logic
  const difficultyWeight: Record<Difficulty, number> = {
    [Difficulty.Easy]: 1,
    [Difficulty.Medium]: 2,
    [Difficulty.Hard]: 3,
  };

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortOrder === 'easy') {
      return difficultyWeight[a.difficulty] - difficultyWeight[b.difficulty];
    }
    if (sortOrder === 'hard') {
      return difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty];
    }
    return 0; // Default order (as defined in data file)
  });

  const visibleQuestions = sortedQuestions;

  // Handler for category selection
  const handleCategorySelect = (cat: Category) => {
      navigate(`/browse/${encodeURIComponent(cat)}`);
  };

  // Handler for back button
  const handleBackToBlocks = () => {
      navigate('/browse');
  };

  // If no category selected (and no valid URL param), show Category Selection View
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Full stack Interview Question Bank
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive collection of hand-picked interview questions and answers. Select a topic to start browsing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(cat => {
            const Icon = CATEGORY_ICONS[cat] || Code;
            const count = questions.filter(q => q.category === cat).length;
            // Display count is capped at 30 effectively for the user view
            const displayCount = Math.min(count, 30);
            
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                  <Icon className="w-6 h-6 text-slate-600 group-hover:text-primary-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-primary-700 transition-colors">{cat}</h3>
                <p className="text-slate-500 text-sm">{displayCount}+ questions</p>
              </button>
            );
          })}
        </div>
        
        <AdBanner slotId="category-footer" className="mt-12" />
        <ScrollToTop />
      </div>
    );
  }

  // Category Detail View
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in slide-in-from-right-8 duration-300 min-h-[80vh]">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBackToBlocks}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              {selectedCategory}
              <span className="text-slate-300">/</span>
              <span className="text-slate-500 text-lg font-medium">{visibleQuestions.length} Questions</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative">
           {/* Search */}
           <div className="relative flex-1 md:flex-none md:w-64">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input
               type="text"
               placeholder="Search questions & topics..."
               className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           
           {/* Filter Button & Menu */}
           <div className="relative">
                <button 
                    onClick={() => { setShowFilterMenu(!showFilterMenu); setShowSortMenu(false); }}
                    className={`p-2 rounded-lg border transition-all flex items-center gap-2 ${showFilterMenu || selectedDifficulties.length > 0 || !showMastered ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    title="Advanced Filters"
                >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">Filters</span>
                    {(selectedDifficulties.length > 0 || !showMastered) && (
                        <span className="flex h-2 w-2 rounded-full bg-primary-600"></span>
                    )}
                </button>

                {showFilterMenu && (
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-20 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-900">Advanced Filters</h3>
                            <button onClick={() => setShowFilterMenu(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
                        </div>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Difficulty</label>
                                <div className="space-y-2.5">
                                    {Object.values(Difficulty).map(d => (
                                        <label key={d} className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer hover:text-slate-900 group">
                                            <div className="relative flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={selectedDifficulties.includes(d)}
                                                    onChange={() => {
                                                        setSelectedDifficulties(prev => 
                                                            prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
                                                        );
                                                    }}
                                                    className="peer h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                                                />
                                            </div>
                                            {d}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t border-slate-100">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Status</label>
                                <label className={`flex items-center gap-2.5 text-sm text-slate-700 ${isGuest ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-slate-900'}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={!showMastered}
                                        onChange={(e) => !isGuest && setShowMastered(!e.target.checked)}
                                        disabled={isGuest}
                                        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
                                    />
                                    Hide Mastered Questions
                                    {isGuest && <span className="text-xs text-slate-400 font-normal ml-auto">(Login required)</span>}
                                </label>
                            </div>

                            <button 
                                onClick={() => { setSelectedDifficulties([]); setShowMastered(true); }}
                                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                )}
           </div>

           {/* Sort Button & Menu */}
           <div className="relative">
                <button 
                    onClick={() => { setShowSortMenu(!showSortMenu); setShowFilterMenu(false); }}
                    className={`p-2 rounded-lg border transition-all ${showSortMenu ? 'bg-slate-100 border-slate-300' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                    title="Sort Order"
                >
                    <ArrowUpDown className="w-4 h-4 text-slate-600" />
                </button>
                
                {showSortMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-50 mb-1">Sort By</div>
                        <button onClick={() => { setSortOrder('default'); setShowSortMenu(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center justify-between ${sortOrder === 'default' ? 'text-primary-600 font-medium bg-primary-50/30' : 'text-slate-600'}`}>
                            Default
                            {sortOrder === 'default' && <Check className="w-4 h-4" />}
                        </button>
                        <button onClick={() => { setSortOrder('easy'); setShowSortMenu(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center justify-between ${sortOrder === 'easy' ? 'text-primary-600 font-medium bg-primary-50/30' : 'text-slate-600'}`}>
                            Difficulty (Easy First)
                            {sortOrder === 'easy' && <Check className="w-4 h-4" />}
                        </button>
                        <button onClick={() => { setSortOrder('hard'); setShowSortMenu(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 flex items-center justify-between ${sortOrder === 'hard' ? 'text-primary-600 font-medium bg-primary-50/30' : 'text-slate-600'}`}>
                            Difficulty (Hard First)
                            {sortOrder === 'hard' && <Check className="w-4 h-4" />}
                        </button>
                    </div>
                )}
           </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
        {visibleQuestions.map((q) => {
           const isMastered = masteredIds.includes(q.id);
           
           return (
             <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-primary-100 transition-colors">
               <div className="p-6">
                 <div className="flex justify-between items-start gap-4 mb-4">
                   <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <Badge type="difficulty" value={q.difficulty} />
                        {isMastered && (
                           <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                             <CheckCircle className="w-3 h-3" /> Mastered
                           </span>
                        )}
                     </div>
                     <h3 className="text-lg font-semibold text-slate-900 leading-snug">{q.question}</h3>
                   </div>
                 </div>

                 <div className="prose prose-slate max-w-none">
                    <div className="bg-slate-50 rounded-lg p-4 text-slate-700 leading-relaxed whitespace-pre-line border border-slate-100">
                       {q.answer}
                    </div>
                    {q.codeSnippet && (
                       <div className="mt-4 relative group">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <CopyButton text={q.codeSnippet} className="bg-slate-700/50 backdrop-blur" />
                          </div>
                          <pre className="bg-[#1e1e1e] text-slate-200 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed border border-slate-800">
                             <code>{q.codeSnippet}</code>
                          </pre>
                       </div>
                    )}
                 </div>
               </div>
             </div>
           );
        })}

        {/* Footer Message */}
        {visibleQuestions.length > 0 && (
            <div className="mt-12 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 rounded-3xl border border-blue-800/50 p-10 text-center relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl shadow-inner mb-6 border border-white/10 transform -rotate-3 transition-transform hover:rotate-0 duration-300">
                        <Clock className="w-8 h-8 text-blue-200" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">More Questions In The Works</h3>
                    <p className="text-blue-200 max-w-lg mx-auto mb-8 text-lg leading-relaxed">
                        We are actively crafting new high-quality <span className="font-semibold text-blue-100">{selectedCategory}</span> questions. 
                        Stay tuned for the next update!
                    </p>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-blue-600/20 rounded-full blur-3xl mix-blend-overlay"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl mix-blend-overlay"></div>
                </div>
            </div>
        )}

        {visibleQuestions.length === 0 && (
           <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <div className="text-slate-300 mb-4">
                 <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No questions found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
              {(selectedDifficulties.length > 0 || !showMastered) && (
                <button 
                    onClick={() => { setSelectedDifficulties([]); setShowMastered(true); setSearch(''); }}
                    className="mt-4 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                    Clear Filters
                </button>
              )}
           </div>
        )}
      </div>
      
      <AdBanner slotId="question-list-footer" className="mt-12" />
      <ScrollToTop />
    </div>
  );
};
