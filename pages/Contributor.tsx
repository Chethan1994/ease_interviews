import React, { useState, useRef } from 'react';
import { Category, Difficulty } from '../types';
import { Send, Upload, FileText, CheckCircle, AlertCircle, Plus, Loader2, Trash2, Edit2, List, Eye } from 'lucide-react';
import { CopyButton } from '../components/ui/CopyButton';
import { API_BASE } from '../services/api';

interface ContributorQuestion {
    id: string;
    category: string; // Changed from Category to string to support manual entry
    difficulty: Difficulty;
    question: string;
    answer: string;
    codeSnippet: string;
}

export const Contributor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
  
  // List State
  const [questions, setQuestions] = useState<ContributorQuestion[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Form State
  const [category, setCategory] = useState<string>(Category.React);
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  
  // Bulk Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      if (val === 'OTHER') {
          setIsCustomCategory(true);
          setCategory('');
      } else {
          setIsCustomCategory(false);
          setCategory(val);
      }
  };

  const addToQueue = (e: React.FormEvent) => {
      e.preventDefault();
      const finalCategory = isCustomCategory ? customCategory : category;
      
      if (!question.trim() || !answer.trim() || !finalCategory.trim()) return;

      const newQ: ContributorQuestion = {
          id: Date.now().toString(),
          category: finalCategory,
          difficulty,
          question,
          answer,
          codeSnippet
      };

      setQuestions([...questions, newQ]);
      
      // Reset form but keep category/difficulty for speed
      setQuestion('');
      setAnswer('');
      setCodeSnippet('');
  };

  const removeFromQueue = (id: string) => {
      setQuestions(questions.filter(q => q.id !== id));
  };

  const resetAll = () => {
    setQuestions([]);
    setQuestion('');
    setAnswer('');
    setCodeSnippet('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setSubmitStatus('idle');
    setShowPreview(false);
  };

  const submitWithTimeout = async (url: string, options: RequestInit, timeout = 15000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
  };

  const handleManualSubmit = async () => {
    if (questions.length === 0) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData();
    formData.append('type', 'multiple');
    formData.append('questions', JSON.stringify(questions));

    try {
        const response = await submitWithTimeout(`${API_BASE}/contribute`, {
            method: 'POST',
            body: formData,
        });

        const contentType = response.headers.get("content-type");
        if (!response.ok) {
             throw new Error(`Server responded with ${response.status}`);
        }
        
        if (contentType && contentType.indexOf("application/json") !== -1) {
            await response.json();
        }

        setSubmitStatus('success');
        setTimeout(() => resetAll(), 3000);
    } catch (err: any) {
        console.error("Submission Error:", err);
        setSubmitStatus('error');
        setErrorMessage('Failed to send contribution. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData();
    formData.append('type', 'bulk');
    formData.append('file', selectedFile);

    try {
        const response = await submitWithTimeout(`${API_BASE}/contribute`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Failed to upload');

        setSubmitStatus('success');
        setTimeout(() => resetAll(), 3000);
    } catch (err: any) {
        console.error(err);
        setSubmitStatus('error');
        setErrorMessage('Failed to upload file. Please ensure it is under 4MB.');
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 4 * 1024 * 1024) {
          alert("File size exceeds 4MB limit.");
          return;
      }
      setSelectedFile(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4 flex items-center justify-center gap-3">
          <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
            <Plus className="w-8 h-8" />
          </div>
          Become a Contributor
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Help the community grow! Submit your own interview questions or coding challenges.
          All submissions are reviewed before being added to the platform.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative min-h-[500px]">
        {/* Loading Overlay */}
        {isSubmitting && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                <p className="text-lg font-bold text-slate-700">Submitting your contribution...</p>
                <p className="text-xs text-slate-400 mt-2">Sending to reviewer</p>
            </div>
        )}

        {/* Success Overlay */}
        {submitStatus === 'success' && !isSubmitting && (
            <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                <p className="text-slate-500">Your contribution has been submitted for review.</p>
            </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setActiveTab('manual'); setShowPreview(false); }}
            disabled={isSubmitting}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'manual'
                ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <List className="w-4 h-4" /> Manual Entry
          </button>
          <button
            onClick={() => { setActiveTab('bulk'); setShowPreview(false); }}
            disabled={isSubmitting}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'bulk'
                ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <Upload className="w-4 h-4" /> Bulk Upload
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {submitStatus === 'error' && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  {errorMessage}
              </div>
          )}

          {activeTab === 'manual' ? (
            showPreview ? (
              // PREVIEW MODE
              <div className="animate-in slide-in-from-right-4">
                  <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">Preview Submission</h2>
                      <div className="flex gap-3">
                          <button 
                            onClick={() => setShowPreview(false)}
                            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                          >
                             Keep Editing
                          </button>
                          <button 
                            onClick={handleManualSubmit}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-bold shadow-md"
                          >
                             Confirm & Submit
                          </button>
                      </div>
                  </div>

                  <div className="space-y-6">
                      {questions.map((q, idx) => (
                          <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative group">
                               <div className="absolute top-4 right-4 text-slate-200 font-black text-3xl select-none">#{idx + 1}</div>
                               <div className="flex gap-2 mb-3">
                                   <span className="bg-white border border-slate-200 px-2 py-1 rounded text-xs font-bold text-slate-600">{q.category}</span>
                                   <span className={`bg-white border border-slate-200 px-2 py-1 rounded text-xs font-bold ${q.difficulty === Difficulty.Easy ? 'text-green-600' : q.difficulty === Difficulty.Medium ? 'text-yellow-600' : 'text-red-600'}`}>{q.difficulty}</span>
                               </div>
                               <h3 className="font-bold text-lg text-slate-900 mb-2">{q.question}</h3>
                               <p className="text-slate-700 whitespace-pre-line mb-4">{q.answer}</p>
                               {q.codeSnippet && (
                                   <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                                       {q.codeSnippet}
                                   </pre>
                               )}
                          </div>
                      ))}
                  </div>
              </div>
            ) : (
              // EDIT MODE
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Form */}
                  <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={addToQueue} className="space-y-5">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Plus className="w-5 h-5 text-purple-600" /> Add New Question
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                                    <select
                                        value={isCustomCategory ? 'OTHER' : category}
                                        onChange={handleCategoryChange}
                                        className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white mb-2"
                                    >
                                        {Object.values(Category).map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                        ))}
                                        <option value="OTHER">Other (Specify)</option>
                                    </select>
                                    
                                    {isCustomCategory && (
                                        <input 
                                            type="text"
                                            required={isCustomCategory}
                                            value={customCategory}
                                            onChange={(e) => setCustomCategory(e.target.value)}
                                            placeholder="Enter new category"
                                            className="w-full p-2.5 border border-purple-300 bg-purple-50 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-purple-900 placeholder:text-purple-300"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Difficulty</label>
                                    <select
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                                        className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                                    >
                                        {Object.values(Difficulty).map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Question</label>
                                    <textarea
                                        required
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none min-h-[80px]"
                                        placeholder="e.g. What is the difference between useMemo and useCallback?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Answer</label>
                                    <textarea
                                        required
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none min-h-[100px]"
                                        placeholder="Provide a detailed answer..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Code Snippet (Optional)</label>
                                    <textarea
                                        value={codeSnippet}
                                        onChange={(e) => setCodeSnippet(e.target.value)}
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-mono text-sm bg-slate-900 text-slate-200 min-h-[80px]"
                                        placeholder="// Paste relevant code here..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add to List
                            </button>
                        </div>
                    </form>
                  </div>

                  {/* Right Column: List */}
                  <div className="lg:col-span-1">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col h-full max-h-[800px]">
                          <div className="p-4 border-b border-slate-200 bg-white">
                              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                  <List className="w-4 h-4" /> Questions to Submit
                                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full ml-auto">
                                      {questions.length}
                                  </span>
                              </h3>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                              {questions.length === 0 ? (
                                  <div className="text-center py-12 text-slate-400">
                                      <p className="text-sm">No questions added yet.</p>
                                      <p className="text-xs mt-1">Fill the form and click "Add to List"</p>
                                  </div>
                              ) : (
                                  questions.map((q, idx) => (
                                      <div key={q.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm group hover:border-purple-200 transition-colors">
                                          <div className="flex justify-between items-start mb-1">
                                              <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
                                              <button onClick={() => removeFromQueue(q.id)} className="text-slate-400 hover:text-red-500 p-1">
                                                  <Trash2 className="w-3.5 h-3.5" />
                                              </button>
                                          </div>
                                          <p className="text-sm font-medium text-slate-800 line-clamp-2 mb-1">{q.question}</p>
                                          <div className="flex gap-2">
                                              <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{q.category}</span>
                                          </div>
                                      </div>
                                  ))
                              )}
                          </div>

                          <div className="p-4 border-t border-slate-200 bg-white">
                              <button
                                  onClick={() => setShowPreview(true)}
                                  disabled={questions.length === 0}
                                  className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                                      questions.length === 0
                                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                                  }`}
                              >
                                  Preview & Submit <Send className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
            )
          ) : (
            // BULK UPLOAD MODE
            <form onSubmit={handleBulkSubmit} className="space-y-8 py-8">
              <div 
                className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${
                    selectedFile ? 'border-purple-500 bg-purple-50' : 'border-slate-300 hover:bg-slate-50 hover:border-purple-400'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {selectedFile ? selectedFile.name : 'Click to Upload File'}
                </h3>
                <p className="text-slate-500 max-w-sm">
                  {selectedFile 
                    ? `${(selectedFile.size / 1024).toFixed(2)} KB ready to upload.` 
                    : 'Upload a JSON, CSV, or Text file containing multiple questions.'}
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".json,.csv,.txt,.md"
                />
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <h4 className="font-bold text-slate-800 mb-2">Instructions:</h4>
                 <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                    <li>Prepare your file with questions, answers, and categories.</li>
                    <li>Accepted formats: JSON, CSV, TXT, MD.</li>
                    <li>Ensure the file size is under 4MB.</li>
                    <li>Click the area above to select your file, then click "Submit Contribution".</li>
                 </ul>
              </div>

              <button
                type="submit"
                disabled={!selectedFile || isSubmitting}
                className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                    !selectedFile || isSubmitting
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20'
                }`}
              >
                Submit Contribution <Upload className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};