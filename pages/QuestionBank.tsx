
import React, { useState, useEffect } from 'react';
import { Question, Category, Difficulty } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Badge } from '../components/ui/Badge';
import { CopyButton } from '../components/ui/CopyButton';
import { AdBanner } from '../components/AdBanner';
import { analytics } from '../utils/analytics';
import { Search, CheckCircle, Code, Terminal, Layout, Hash, ArrowLeft, Clock, Server, Zap, ArrowUpDown, FileCode, FileText, Download } from 'lucide-react';

interface QuestionBankProps {
  questions: Question[];
  onNavigateToLogin: () => void;
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

export const QuestionBank: React.FC<QuestionBankProps> = ({ questions, onNavigateToLogin }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'easy' | 'hard'>('default');
  
  const { user } = useAuth();
  
  // Track category selection
  useEffect(() => {
    if (selectedCategory) {
        analytics.logEvent('view_category', { category: selectedCategory });
    }
  }, [selectedCategory]);
  
  const categories = Object.values(Category);
  
  // Release 1: Premium features disabled
  const isPremium = false; 
  const masteredIds = user?.masteredIds || [];

  const currentQuestions = selectedCategory 
    ? questions.filter(q => q.category === selectedCategory) 
    : [];
    
  const filteredQuestions = currentQuestions.filter(q => 
    !search || 
    q.question.toLowerCase().includes(search.toLowerCase()) || 
    q.answer.toLowerCase().includes(search.toLowerCase())
  );

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

  // Show all available questions
  const visibleQuestions = sortedQuestions;

  const handleDownload = () => {
    if (visibleQuestions.length === 0) return;
    
    analytics.logEvent('download_questions', { category: selectedCategory });

    const title = `${selectedCategory || 'Interview'} Questions`;
    
    // Construct HTML content optimized for Word
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${title}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.5; color: #1e293b; }
          h1 { color: #1e293b; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 30px; }
          .question-container { margin-bottom: 30px; page-break-inside: avoid; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; }
          .question-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
          .question-text { font-size: 14pt; font-weight: bold; color: #0f172a; }
          .meta { font-size: 10pt; color: #64748b; font-style: italic; margin-left: 10px; background-color: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
          .answer-label { font-weight: bold; font-size: 10pt; color: #2563eb; margin-bottom: 5px; text-transform: uppercase; }
          .answer-text { font-size: 11pt; margin-top: 5px; color: #334155; }
          .code-block { 
            background-color: #f8fafc; 
            border: 1px solid #cbd5e1; 
            padding: 12px; 
            font-family: 'Consolas', 'Courier New', monospace; 
            font-size: 10pt; 
            margin-top: 15px; 
            white-space: pre-wrap;
            color: #0f172a;
          }
          .footer { margin-top: 50px; font-size: 9pt; text-align: center; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
    `;

    const body = visibleQuestions.map((q, idx) => `
      <div class="question-container">
        <div class="question-header">
          <span class="question-text">Q${idx + 1}: ${q.question}</span>
          <span class="meta">${q.category} | ${q.difficulty}</span>
        </div>
        <div>
          <div class="answer-label">Answer:</div>
          <div class="answer-text">${q.answer.replace(/\n/g, '<br/>')}</div>
          ${q.codeSnippet ? `<div class="code-block">${q.codeSnippet.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>` : ''}
        </div>
      </div>
    `).join('');

    const footer = `
        <div class="footer">
          Generated by InterviewPrep on ${new Date().toLocaleDateString()}
        </div>
      </body>
      </html>
    `;

    const fullContent = header + body + footer;
    const blob = new Blob([fullContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // If no category selected, show Category Selection View
  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frontend Interview Question Bank
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive collection of hand-picked interview questions and answers. Select a topic to start browsing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(cat => {
            const Icon = CATEGORY_ICONS[cat];
            const count = questions.filter(q => q.category === cat).length;
            
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 text-left"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                  <Icon className="w-6 h-6 text-slate-600 group-hover:text-primary-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-primary-700 transition-colors">{cat}</h3>
                <p className="text-slate-500 text-sm">{count} questions</p>
              </button>
            );
          })}
        </div>
        
        <AdBanner slotId="category-footer" className="mt-12" />
      </div>
    );
  }

  // Category Detail View
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in slide-in-from-right-8 duration-300">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedCategory(null)}
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

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:flex-none md:w-64">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input
               type="text"
               placeholder="Search questions..."
               className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           
           <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-white">
              <button 
                onClick={() => setSortOrder('default')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${sortOrder === 'default' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Default
              </button>
              <button 
                onClick={() => setSortOrder('easy')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${sortOrder === 'easy' ? 'bg-green-50 text-green-700' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Easy First
              </button>
              <button 
                onClick={() => setSortOrder('hard')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${sortOrder === 'hard' ? 'bg-red-50 text-red-700' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Hard First
              </button>
           </div>
           
           <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors shadow-sm ml-auto md:ml-0"
              title="Download as DOC"
           >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
           </button>
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

        {visibleQuestions.length === 0 && (
           <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <div className="text-slate-300 mb-4">
                 <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No questions found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
           </div>
        )}
      </div>
      
      <AdBanner slotId="question-list-footer" className="mt-12" />
    </div>
  );
};
