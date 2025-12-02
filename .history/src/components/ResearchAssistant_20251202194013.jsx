import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { ArrowUp, Bot, User, Sparkles, X, MessageCircle } from 'lucide-react';

const ResearchAssistant = forwardRef(({ sessionId = 'quickbrief' }, ref) => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm the Research Assistant for this analysis. I can help you explore the data, generate insights, or answer questions about the findings. What would you like to know?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const scrollRef = useRef(null);
    const loadingIntervalRef = useRef(null);
    const inputRef = useRef(null);

    // Expose method to insert tags from parent
    useImperativeHandle(ref, () => ({
        insertTag: (tag) => {
            if (!selectedTags.includes(tag)) {
                setSelectedTags(prev => [...prev, tag]);
            }
            if (isCollapsed) {
                setIsCollapsed(false);
            }
            // Focus the input
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        },
        clearTags: () => {
            setSelectedTags([]);
        }
    }));

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (isTyping) {
            const loadingMessages = [
                'Analyzing the data...',
                'Examining sources...',
                'Preparing answer...'
            ];
            let currentIndex = 0;

            setLoadingMessage(loadingMessages[0]);

            loadingIntervalRef.current = setInterval(() => {
                currentIndex = (currentIndex + 1) % loadingMessages.length;
                setLoadingMessage(loadingMessages[currentIndex]);
            }, 2500);

            return () => {
                if (loadingIntervalRef.current) {
                    clearInterval(loadingIntervalRef.current);
                }
            };
        } else {
            if (loadingIntervalRef.current) {
                clearInterval(loadingIntervalRef.current);
            }
            setLoadingMessage('');
        }
    }, [isTyping]);

    const handleSend = async () => {
        if (!input.trim() && selectedTags.length === 0) return;

        // Combine tags with input
        const tagsString = selectedTags.length > 0 ? selectedTags.join(' ') + ' ' : '';
        const fullMessage = tagsString + input;
        
        const userMessage = { role: 'user', content: fullMessage, tags: selectedTags };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setSelectedTags([]);
        setIsTyping(true);

        try {
            // Format history for the backend
            const history = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await fetch('/api/chat/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: userMessage.content,
                    history: history,
                    report_id: sessionId
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Error querying chat:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Sorry, I encountered an error. Please try again.' 
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (isCollapsed) {
        return (
            <div className="w-16 border-r border-slate-200 flex flex-col items-center py-6 bg-slate-50">
                <button
                    onClick={() => setIsCollapsed(false)}
                    className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors"
                    title="Open Research Assistant"
                >
                    <MessageCircle className="text-white" size={20} />
                </button>
            </div>
        );
    }

    return (
        <div className="w-96 flex flex-col h-screen max-h-screen bg-white border-r border-slate-200">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-full">
                        <Sparkles className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm">Research Assistant</h3>
                        <p className="text-xs text-slate-500">Connected to analysis data</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsCollapsed(true)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-slate-50/50">
                <div className="space-y-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
                        >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                msg.role === 'user' 
                                    ? 'bg-slate-900 text-white' 
                                    : 'bg-white border border-slate-200 text-slate-600'
                            }`}>
                                {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className={`p-3 rounded-xl text-sm leading-relaxed ${
                                    msg.role === 'user'
                                        ? 'bg-slate-900 text-white rounded-tl-none'
                                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                                }`}>
                                    {msg.content}
                                </div>
                                <p className="text-[10px] text-slate-400">
                                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-3 items-center pl-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center gap-2">
                                <div className="relative w-4 h-4">
                                    <div className="absolute inset-0 rounded-full bg-slate-400 animate-ping opacity-75"></div>
                                    <div className="absolute inset-0 rounded-full bg-slate-500"></div>
                                </div>
                                <span className="text-sm text-slate-500">
                                    {loadingMessage}
                                </span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </div>

            {/* Input */}
            <div className="shrink-0 p-4 bg-white border-t border-slate-100">
                <div className="flex items-end gap-2">
                    <div className="flex-1 min-h-[44px] rounded-xl border border-slate-200 focus-within:border-slate-400 bg-slate-50 px-3 py-2">
                        {/* Selected Tags */}
                        {selectedTags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {selectedTags.map((tag, idx) => (
                                    <span 
                                        key={idx}
                                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-white text-xs rounded"
                                    >
                                        {tag}
                                        <button 
                                            onClick={() => setSelectedTags(prev => prev.filter((_, i) => i !== idx))}
                                            className="hover:bg-slate-700 rounded p-0.5"
                                        >
                                            <X size={10} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder={selectedTags.length > 0 ? "What would you like to do?" : "Ask about the analysis..."}
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-sm p-0"
                            rows={1}
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={(!input.trim() && selectedTags.length === 0) || isTyping}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full h-10 w-10 shrink-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ResearchAssistant;
