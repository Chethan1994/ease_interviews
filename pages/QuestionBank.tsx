
import React, { useState, useEffect } from 'react';
import { Question, Category, Difficulty } from '../types';
import { Badge } from '../components/ui/Badge';
import { CopyButton } from '../components/ui/CopyButton';
import { ScrollToTop } from '../components/ui/ScrollToTop';
import { AdBanner } from '../components/AdBanner';
import { analytics } from '../utils/analytics';
import { Search, CheckCircle, Code, Terminal, Layout, Hash, ArrowLeft, Clock, Server, Zap, ArrowUpDown, FileCode, Filter, Check, X, Info } from 'lucide-react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

const CATEGORY_GUIDES: Record<Category, string> = {
  [Category.React]: "React is the leading library for building user interfaces. For interviews, focus on the component lifecycle, hooks implementation details, and the difference between the Virtual DOM and the real DOM. Understand how React 18+ introduces concurrent features like automatic batching and transitions.",
  [Category.NextJS]: "Next.js is the preferred framework for production-ready React apps. Key interview topics include Server-Side Rendering (SSR), Static Site Generation (SSG), and the newer App Router architecture. Be prepared to discuss SEO optimization and image management.",
  [Category.TypeScript]: "TypeScript adds static typing to JavaScript. In technical rounds, expect questions on Generics, Union/Intersection types, and the power of Utility types like Partial or Pick. Knowing when to use 'type' vs 'interface' is a classic senior-level question.",
  [Category.JavaScript]: "JavaScript is the foundation of modern web dev. Mastery of the Event Loop, closures, hoisting, and the 'this' keyword is essential. You should also be comfortable explaining ES6+ features and asynchronous programming patterns.",
  [Category.NodeJS]: "Node.js brings JS to the server. Focus on the Event-Driven architecture, non-blocking I/O, and the cluster module for multi-core scaling. Understand how middleware works in frameworks like Express.js.",
  [Category.CSS]: "CSS layout mastery is a must. Modern interviews focus on Flexbox, CSS Grid, and responsive design using relative units (rem/em). Be ready to discuss specificity and the Box Model.",
  [Category.HTML]: "HTML provides the semantic structure of the web. Focus on accessibility (ARIA), SEO meta tags, and the Critical Rendering Path (how the browser parses and displays your page)."
};

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

  const selectedCategory = Object.values(Category).find(c => c === categoryId) || null;

  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'easy' | 'hard'>('default');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [showMastered, setShowMastered] = useState(true);

  useEffect(() => {
    // @ts-ignore
    if (location.state?.reset) {
        setSearch('');
        setSelectedDifficulties([]);
        setShowMastered(true);
        setSortOrder('default');
    }
  }, [location.state]);
  
  useEffect(() => {
    if (selectedCategory) {
        analytics.logEvent('view_category', { category: selectedCategory });
        setSearch('');
        setSelectedDifficulties([]);
        setShowMastered(true);
        setSortOrder('default');
    }
  }, [selectedCategory]);
  
  const categories = Object.values(Category);

  if (!questions) return <div className="p-12 text-center text-slate-500">Loading Content...</div>;

  const currentQuestions = selectedCategory 
    ? questions.filter(q => q.category === selectedCategory).slice(0, 30)
    : [];
    
  const filteredQuestions = currentQuestions.filter(q => {
    const matchesSearch = !search || q.question.toLowerCase().includes(search.toLowerCase()) || q.answer.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(q.difficulty);
    const matchesStatus = showMastered || !masteredIds.includes(q.id);
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const difficultyWeight: Record<Difficulty, number> = { [Difficulty.Easy]: 1, [Difficulty.Medium]: 2, [Difficulty.Hard]: 3 };

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortOrder === 'easy') return difficultyWeight[a.difficulty] - difficultyWeight[b.difficulty];
    if (sortOrder === 'hard') return difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty];
    return 0;
  });

  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Expert Interview Study Guides</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our curators have analyzed thousands of engineering interviews from companies like Google, Meta, and Amazon. 
            Choose a domain below to access a structured path to mastery, complete with conceptual deep-dives and common coding pitfalls.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map(cat => {
            const Icon = CATEGORY_ICONS[cat] || Code;
            return (
              <Link key={cat} to={`/browse/${encodeURIComponent(cat)}`} className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 text-left block">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                  <Icon className="w-6 h-6 text-slate-600 group-hover:text-primary-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{cat}</h3>
                <p className="text-slate-500 text-xs line-clamp-2">In-depth preparation for {cat} roles.</p>
              </Link>
            );
          })}
        </div>
        
        <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100 mb-12">
            <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2"><Info className="w-5 h-5"/> How to Use This Resource</h2>
            <p className="text-primary-700 text-sm leading-relaxed">
                Technical interviews aren't just about code; they're about demonstrating architectural awareness. Each section contains core concepts designed to help you explain <strong>why</strong> a technology works, not just <strong>how</strong> to use it. We recommend starting with the Easy concepts to build confidence before tackling the Hard architectural challenges.
            </p>
        </div>

        <AdBanner slotId="category-footer" />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-[80vh]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/browse" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"><ArrowLeft className="w-6 h-6" /></Link>
          <h1 className="text-2xl font-bold text-slate-900">{selectedCategory} Preparation Guide</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:flex-none md:w-64">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input type="text" placeholder="Search topics..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
           </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
          <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Info className="w-4 h-4 text-primary-500"/> Study Note</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{CATEGORY_GUIDES[selectedCategory]}</p>
      </div>

      <div className="space-y-6">
        {sortedQuestions.map((q) => {
           const isMastered = masteredIds.includes(q.id);
           return (
             <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-primary-100 transition-colors p-6">
                 <div className="flex items-center gap-3 mb-2">
                    <Badge type="difficulty" value={q.difficulty} />
                    {isMastered && <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100"><CheckCircle className="w-3 h-3" /> Mastered</span>}
                 </div>
                 <h3 className="text-lg font-semibold text-slate-900 mb-4">{q.question}</h3>
                 <div className="bg-slate-50 rounded-lg p-4 text-slate-700 text-sm leading-relaxed whitespace-pre-line border border-slate-100">{q.answer}</div>
             </div>
           );
        })}
      </div>
      
      <AdBanner slotId="question-list-footer" className="mt-12" />
      <ScrollToTop />
    </div>
  );
};
