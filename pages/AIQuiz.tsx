import React, { useState } from 'react';
import { Category, Difficulty } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Send, RefreshCw, AlertCircle, Award } from 'lucide-react';

interface AIQuizProps {}

type QuizState = 'config' | 'loading' | 'question' | 'evaluating' | 'result' | 'error';

interface GeneratedQuestion {
    question: string;
    context?: string;
}

interface EvaluationResult {
    score: number;
    feedback: string;
    betterAnswer: string;
}

export const AIQuiz: React.FC<AIQuizProps> = () => {
    const [state, setState] = useState<QuizState>('config');
    const [category, setCategory] = useState<Category>(Category.React);
    const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
    const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const generateQuestion = async () => {
        setState('loading');
        setErrorMsg('');
        
        try {
            const prompt = `Generate a unique, technical interview question about ${category} at ${difficulty} level.
            Avoid generic "What is React" questions. Focus on scenarios or deeper concepts.
            Return a JSON object with properties: 'question' (the question text) and 'context' (optional context or brief setup if needed).`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                            context: { type: Type.STRING }
                        },
                        required: ["question"]
                    }
                }
            });

            const text = response.text;
            if (text) {
                const data = JSON.parse(text);
                setCurrentQuestion(data);
                setUserAnswer('');
                setState('question');
            } else {
                throw new Error("No data returned from AI");
            }

        } catch (e) {
            console.error(e);
            setErrorMsg("Failed to generate question. Please check your API key or try again.");
            setState('error');
        }
    };

    const submitAnswer = async () => {
        if (!userAnswer.trim()) return;
        setState('evaluating');

        try {
            const prompt = `
            Context: Technical Interview for ${category} (${difficulty}).
            Question: ${currentQuestion?.question}
            ${currentQuestion?.context ? `Context: ${currentQuestion.context}` : ''}
            
            User Answer: "${userAnswer}"
            
            Evaluate the user's answer. Return a JSON object:
            {
                "score": (integer 0-10),
                "feedback": (string, constructive criticism and what was missing),
                "betterAnswer": (string, a concise, ideal model answer)
            }
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            score: { type: Type.INTEGER },
                            feedback: { type: Type.STRING },
                            betterAnswer: { type: Type.STRING }
                        },
                        required: ["score", "feedback", "betterAnswer"]
                    }
                }
            });
            
            const text = response.text;
            if (text) {
                const data = JSON.parse(text);
                setEvaluation(data);
                setState('result');
            } else {
                throw new Error("No evaluation returned");
            }

        } catch (e) {
            console.error(e);
            setErrorMsg("Failed to evaluate answer.");
            setState('error');
        }
    };

    if (state === 'error') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 flex flex-col items-center gap-4">
                    <AlertCircle className="w-10 h-10" />
                    <p>{errorMsg}</p>
                    <button 
                        onClick={() => setState('config')}
                        className="px-6 py-2 bg-white border border-red-200 rounded-lg hover:bg-red-50 font-medium transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (state === 'config') {
        return (
            <div className="max-w-xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">AI Mock Interview</h1>
                    </div>
                    <p className="text-slate-500 mb-8">
                        Generate a custom interview question powered by Gemini and get instant feedback on your answer.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Topic</label>
                            <select 
                                className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category)}
                            >
                                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                            <div className="grid grid-cols-3 gap-3">
                                {Object.values(Difficulty).map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDifficulty(d)}
                                        className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                                            difficulty === d 
                                            ? 'bg-purple-600 text-white border-purple-600' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={generateQuestion}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Sparkles className="w-5 h-5" />
                            Generate Question
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (state === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
                <p className="text-slate-500 font-medium">Consulting Gemini...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {category} • {difficulty}
                    </span>
                    <button 
                        onClick={() => setState('config')}
                        className="text-sm text-slate-500 hover:text-purple-600 font-medium"
                    >
                        End Session
                    </button>
                </div>

                {/* Question Area */}
                <div className="p-8">
                    {currentQuestion?.context && (
                        <div className="mb-4 text-slate-500 italic text-sm border-l-4 border-purple-200 pl-3">
                            {currentQuestion.context}
                        </div>
                    )}
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-8">
                        {currentQuestion?.question}
                    </h2>

                    {state === 'question' || state === 'evaluating' ? (
                        <div className="space-y-4">
                            <textarea
                                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none min-h-[150px] text-slate-700 font-medium placeholder:font-normal"
                                placeholder="Type your answer here..."
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                disabled={state === 'evaluating'}
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={submitAnswer}
                                    disabled={!userAnswer.trim() || state === 'evaluating'}
                                    className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
                                        !userAnswer.trim() || state === 'evaluating'
                                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20'
                                    }`}
                                >
                                    {state === 'evaluating' ? (
                                        <>
                                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></span>
                                            Evaluating...
                                        </>
                                    ) : (
                                        <>
                                            Submit Answer <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Result State
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">Your Answer</h3>
                                <p className="text-slate-800">{userAnswer}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="col-span-1 bg-white border border-slate-100 shadow-sm rounded-xl p-6 flex flex-col items-center justify-center text-center">
                                    <div className={`text-4xl font-black mb-2 ${
                                        evaluation!.score >= 8 ? 'text-green-500' : 
                                        evaluation!.score >= 5 ? 'text-yellow-500' : 'text-red-500'
                                    }`}>
                                        {evaluation?.score}/10
                                    </div>
                                    <div className="text-sm font-medium text-slate-500">AI Score</div>
                                </div>
                                
                                <div className="col-span-1 md:col-span-2 bg-purple-50 border border-purple-100 rounded-xl p-6">
                                    <div className="flex items-center gap-2 text-purple-800 font-bold mb-3">
                                        <Sparkles className="w-5 h-5" /> AI Feedback
                                    </div>
                                    <p className="text-purple-900 text-sm leading-relaxed">
                                        {evaluation?.feedback}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                                <div className="flex items-center gap-2 text-green-800 font-bold mb-3">
                                    <Award className="w-5 h-5" /> Model Answer
                                </div>
                                <p className="text-green-900 text-sm leading-relaxed whitespace-pre-line">
                                    {evaluation?.betterAnswer}
                                </p>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={generateQuestion}
                                    className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl"
                                >
                                    <RefreshCw className="w-5 h-5" /> Next Question
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};