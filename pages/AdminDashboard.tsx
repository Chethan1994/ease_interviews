
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Contribution } from '../types';
import { Users, FileText, Check, X, ShieldAlert, Edit3, Trash2, Send, Download, ChevronDown, ChevronUp, Plus } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'contributions'>('users');
  const [adminEmail, setAdminEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Contribution State
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  useEffect(() => {
    if (activeTab === 'contributions') {
        fetchContributions();
    }
  }, [activeTab]);

  const fetchContributions = async () => {
      setLoading(true);
      try {
          const data = await api.getContributions();
          setContributions(data);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  const handlePromoteAdmin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await api.addAdmin(adminEmail);
          setMessage(`Successfully granted admin access to ${adminEmail}`);
          setAdminEmail('');
      } catch (err: any) {
          setMessage('Error: ' + err.message);
      }
  };

  const handleStartEdit = (contribution: Contribution) => {
      setEditingId(contribution._id);
      // Deep copy to prevent mutating original data before save
      setEditForm(JSON.parse(JSON.stringify(contribution.data)));
      
      // Auto-expand if multiple to show the edit fields
      if (contribution.type === 'multiple' && !expandedIds.includes(contribution._id)) {
          setExpandedIds(prev => [...prev, contribution._id]);
      }
  };

  const handleMultipleChange = (index: number, field: string, value: string) => {
      const updatedQuestions = [...(editForm.questions || [])];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      setEditForm({ ...editForm, questions: updatedQuestions });
  };

  const removeQuestionFromMultiple = (index: number) => {
      if (!window.confirm('Remove this question from the set?')) return;
      const updatedQuestions = editForm.questions.filter((_: any, i: number) => i !== index);
      setEditForm({ ...editForm, questions: updatedQuestions });
  };

  const handleSaveEdit = async () => {
      if (!editingId) return;
      try {
          await api.updateContribution(editingId, editForm);
          setEditingId(null);
          fetchContributions();
      } catch (err) {
          console.error(err);
          alert('Failed to update');
      }
  };

  const handleApprove = async (id: string) => {
      if (!window.confirm('Approve this contribution? It will be added to the live database.')) return;
      try {
          await api.approveContribution(id);
          fetchContributions();
      } catch (err) {
          console.error(err);
          alert('Failed to approve');
      }
  };

  const handleReject = async (id: string) => {
      if (!window.confirm('Delete this contribution permanently?')) return;
      try {
          await api.deleteContribution(id);
          fetchContributions();
      } catch (err) {
          console.error(err);
          alert('Failed to delete');
      }
  };

  const toggleExpand = (id: string) => {
      setExpandedIds(prev => 
          prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
  };

  const downloadFile = (filename: string, contentBase64: string, mimetype: string) => {
      const link = document.createElement('a');
      link.href = `data:${mimetype};base64,${contentBase64}`;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const decodeContent = (base64: string) => {
      try {
          return atob(base64);
      } catch (e) {
          return "Unable to decode content preview.";
      }
  };

  if (!user || !user.isAdmin) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
              <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
              <p className="text-slate-500">You do not have permission to view this page.</p>
          </div>
      );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

        <div className="flex border-b border-slate-200 mb-8">
            <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'users' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <Users className="w-4 h-4" /> Manage Admins
            </button>
            <button
                onClick={() => setActiveTab('contributions')}
                className={`px-6 py-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'contributions' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
                <FileText className="w-4 h-4" /> Review Contributions
            </button>
        </div>

        {activeTab === 'users' && (
            <div className="max-w-xl">
                <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Grant Admin Privileges</h3>
                    <p className="text-slate-500 mb-6 text-sm">
                        Enter an email address to grant full administrative access to that user. 
                        They must already be registered.
                    </p>
                    
                    <form onSubmit={handlePromoteAdmin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">User Email</label>
                            <input 
                                type="email" 
                                required
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                                className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                                placeholder="user@example.com"
                            />
                        </div>
                        
                        {message && (
                            <div className={`text-sm font-medium p-3 rounded-lg ${message.startsWith('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {message}
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            Grant Access
                        </button>
                    </form>
                </div>
            </div>
        )}

        {activeTab === 'contributions' && (
            <div>
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading contributions...</div>
                ) : contributions.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                        No pending contributions to review.
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {contributions.map(c => (
                            <div key={c._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 ${c.type === 'single' ? 'bg-blue-100 text-blue-700' : c.type === 'bulk' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {c.type === 'bulk' ? 'FILE UPLOAD' : c.type.toUpperCase() + ' SUBMISSION'}
                                        </span>
                                        <p className="text-xs text-slate-400">ID: {c._id} • {new Date(c.submittedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {editingId === c._id ? (
                                            <>
                                                <button onClick={handleSaveEdit} className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"><Check className="w-4 h-4" /></button>
                                                <button onClick={() => setEditingId(null)} className="p-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200"><X className="w-4 h-4" /></button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleStartEdit(c)} disabled={c.type === 'bulk'} className="p-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 disabled:opacity-50" title="Edit Content"><Edit3 className="w-4 h-4" /></button>
                                                <button onClick={() => handleReject(c._id)} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Reject/Delete"><Trash2 className="w-4 h-4" /></button>
                                                <button onClick={() => handleApprove(c._id)} className="p-2 bg-green-600 text-white rounded hover:bg-green-700 shadow-sm flex items-center gap-2 font-bold text-xs px-3">
                                                    Approve & Push <Send className="w-3 h-3" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Content View */}
                                {c.type === 'single' ? (
                                    editingId === c._id ? (
                                        <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase">Question</label>
                                                <input 
                                                    value={editForm.question || ''} 
                                                    onChange={e => setEditForm({...editForm, question: e.target.value})}
                                                    className="w-full p-2 border border-slate-300 rounded text-sm font-medium"
                                                    placeholder="Question"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase">Answer</label>
                                                <textarea 
                                                    value={editForm.answer || ''} 
                                                    onChange={e => setEditForm({...editForm, answer: e.target.value})}
                                                    className="w-full p-2 border border-slate-300 rounded min-h-[100px] text-sm"
                                                    placeholder="Answer"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/2 space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                                                    <input 
                                                        value={editForm.category || ''} 
                                                        onChange={e => setEditForm({...editForm, category: e.target.value})}
                                                        className="w-full p-2 border border-slate-300 rounded text-xs"
                                                        placeholder="Category"
                                                    />
                                                </div>
                                                <div className="w-1/2 space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase">Difficulty</label>
                                                    <input 
                                                        value={editForm.difficulty || ''} 
                                                        onChange={e => setEditForm({...editForm, difficulty: e.target.value})}
                                                        className="w-full p-2 border border-slate-300 rounded text-xs"
                                                        placeholder="Difficulty"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                            <h4 className="font-bold text-slate-900 mb-2">{c.data.question}</h4>
                                            <p className="text-slate-600 whitespace-pre-line text-sm mb-3">{c.data.answer}</p>
                                            <div className="flex gap-2 text-xs font-mono text-slate-500">
                                                <span className="bg-white border px-2 py-1 rounded">{c.data.category}</span>
                                                <span className="bg-white border px-2 py-1 rounded">{c.data.difficulty}</span>
                                            </div>
                                        </div>
                                    )
                                ) : c.type === 'multiple' ? (
                                    <div className="bg-slate-50 rounded-lg border border-slate-100 overflow-hidden">
                                        <div 
                                            className="p-3 bg-slate-100 border-b border-slate-200 flex justify-between items-center cursor-pointer hover:bg-slate-200 transition-colors"
                                            onClick={() => toggleExpand(c._id)}
                                        >
                                            <span className="text-sm font-bold text-slate-700">Multiple Questions ({c.data.questions?.length || 0})</span>
                                            {expandedIds.includes(c._id) ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                                        </div>
                                        
                                        {expandedIds.includes(c._id) && (
                                            <div className="p-4 space-y-4">
                                                {editingId === c._id ? (
                                                    // EDIT MODE FOR MULTIPLE
                                                    editForm.questions?.map((q: any, idx: number) => (
                                                        <div key={idx} className="bg-white p-4 border border-blue-200 rounded-md shadow-sm relative">
                                                            <div className="flex justify-between items-center mb-3">
                                                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Question #{idx + 1}</span>
                                                                <button 
                                                                    onClick={() => removeQuestionFromMultiple(idx)}
                                                                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                                    title="Remove Question"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <input 
                                                                    value={q.question || ''}
                                                                    onChange={(e) => handleMultipleChange(idx, 'question', e.target.value)}
                                                                    className="w-full p-2 border border-slate-300 rounded text-sm font-medium focus:border-blue-500 outline-none"
                                                                    placeholder="Question Text"
                                                                />
                                                                <textarea 
                                                                    value={q.answer || ''}
                                                                    onChange={(e) => handleMultipleChange(idx, 'answer', e.target.value)}
                                                                    className="w-full p-2 border border-slate-300 rounded text-sm min-h-[80px] focus:border-blue-500 outline-none"
                                                                    placeholder="Answer"
                                                                />
                                                                <div className="flex gap-2">
                                                                    <input 
                                                                        value={q.category || ''}
                                                                        onChange={(e) => handleMultipleChange(idx, 'category', e.target.value)}
                                                                        className="w-1/2 p-2 border border-slate-300 rounded text-xs focus:border-blue-500 outline-none"
                                                                        placeholder="Category"
                                                                    />
                                                                    <input 
                                                                        value={q.difficulty || ''}
                                                                        onChange={(e) => handleMultipleChange(idx, 'difficulty', e.target.value)}
                                                                        className="w-1/2 p-2 border border-slate-300 rounded text-xs focus:border-blue-500 outline-none"
                                                                        placeholder="Difficulty"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    // DISPLAY MODE
                                                    c.data.questions?.map((q: any, idx: number) => (
                                                        <div key={idx} className="bg-white p-3 border border-slate-200 rounded-md">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                                                                <div className="flex gap-1 text-[10px]">
                                                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{q.category}</span>
                                                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{q.difficulty}</span>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm font-semibold text-slate-900 mb-1">{q.question}</p>
                                                            <p className="text-xs text-slate-600 line-clamp-3">{q.answer}</p>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // BULK UPLOAD PREVIEW
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{c.data.filename}</p>
                                                <p className="text-xs text-slate-500">{(c.data.size/1024).toFixed(1)} KB • {c.data.mimetype}</p>
                                            </div>
                                            <button 
                                                onClick={() => downloadFile(c.data.filename, c.data.contentBase64, c.data.mimetype)}
                                                className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1"
                                            >
                                                <Download className="w-3 h-3" /> Download
                                            </button>
                                        </div>
                                        
                                        {/* Text Preview if applicable */}
                                        {(c.data.mimetype?.includes('text') || c.data.mimetype?.includes('json') || c.data.filename?.endsWith('.md') || c.data.filename?.endsWith('.csv')) && (
                                            <div className="mt-2">
                                                <div 
                                                    className="p-2 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-500 cursor-pointer flex justify-between"
                                                    onClick={() => toggleExpand(c._id)}
                                                >
                                                    <span>File Preview</span>
                                                    {expandedIds.includes(c._id) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                </div>
                                                {expandedIds.includes(c._id) && (
                                                    <pre className="bg-white border border-slate-200 border-t-0 p-3 text-xs font-mono text-slate-600 overflow-x-auto max-h-60 rounded-b-lg">
                                                        {decodeContent(c.data.contentBase64)}
                                                    </pre>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
    </div>
  );
};
