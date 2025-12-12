import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, User, Bot, Sparkles, Database, Plus, X, ExternalLink } from 'lucide-react';
import ResearchPlan from './ResearchPlan';

// Mock sources data
const MOCK_SOURCES = [
    { id: 1, name: 'Social Graph Facebook - dentists', type: 'social', url: '#' },
    { id: 2, name: 'Social Graph Facebook - parents', type: 'social', url: '#' },
    { id: 3, name: 'Israel Ministry of Health – Oral Health Surveys', type: 'government', url: '#' },
    { id: 4, name: 'Central Bureau of Statistics – Child Health Data', type: 'government', url: '#' },
    { id: 5, name: 'WHO Oral Health Database', type: 'organization', url: '#' },
    { id: 6, name: 'OECD Health at a Glance', type: 'organization', url: '#' },
    { id: 7, name: 'Amazon Reviews', type: 'reviews', url: '#' },
    { id: 8, name: 'Boots Reviews', type: 'reviews', url: '#' },
];

/**
 * AgentOrchestrator - Clean Chat with Subtle Reasoning
 * Fixed height with no scrolling needed for input
 */
export default function AgentOrchestrator({
    thinkingSteps = [],
    conversation = [],
    plan = null,
    onSendMessage,
    onStartPlan,
    onEditPlan,
    isProcessing = false,
    selectedBlock = null,
}) {
    const [message, setMessage] = useState('');
    const [showSources, setShowSources] = useState(false);
    const [sources, setSources] = useState(MOCK_SOURCES);
    const messagesEndRef = useRef(null);
    const sourcesRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation, thinkingSteps, plan]);

    // Close sources dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sourcesRef.current && !sourcesRef.current.contains(e.target)) {
                setShowSources(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSend = () => {
        if (!message.trim() || isProcessing) return;
        onSendMessage(message);
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleAddSource = () => {
        const name = prompt('Enter source name:');
        if (name) {
            setSources(prev => [...prev, { id: Date.now(), name, type: 'custom', url: '#' }]);
        }
    };

    // Render markdown-style formatting in messages
    const renderMessage = (content) => {
        // Convert **bold** to <strong>
        let html = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convert *italic* to <em>
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Convert bullet points
        html = html.replace(/^\* /gm, '• ');
        return html;
    };

    return (
        <div className="h-full flex flex-col bg-white border-r border-slate-200">
            {/* Styles for chat messages */}
            <style>{`
                .chat-message strong {
                    font-weight: 600;
                    color: #1e293b;
                }
                .chat-message em {
                    font-style: italic;
                }
            `}</style>

            {/* Header */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">Research Assistant</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {isProcessing ? 'Analyzing...' : 'Ready to help'}
                        </p>
                    </div>

                    {/* Sources Button */}
                    <div className="relative" ref={sourcesRef}>
                        <button
                            onClick={() => setShowSources(!showSources)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                            <Database className="w-3.5 h-3.5 text-slate-600" />
                            <span className="text-xs font-medium text-slate-700">{sources.length}</span>
                        </button>

                        {/* Sources Dropdown */}
                        <AnimatePresence>
                            {showSources && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-200 z-50"
                                >
                                    <div className="p-3 border-b border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-semibold text-slate-900">Sources ({sources.length})</h4>
                                            <button
                                                onClick={() => setShowSources(false)}
                                                className="p-1 hover:bg-slate-100 rounded"
                                            >
                                                <X className="w-3.5 h-3.5 text-slate-400" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {sources.map((source) => (
                                            <div
                                                key={source.id}
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer group"
                                            >
                                                <Database className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                                <span className="text-sm text-slate-700 flex-1 truncate">{source.name}</span>
                                                <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-slate-500" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-2 border-t border-slate-100">
                                        <button
                                            onClick={handleAddSource}
                                            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            Add Source
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Scrollable Content Area - Fixed Height */}
            <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
                {/* Conversation Messages */}
                {conversation.length > 0 && (
                    <div className="space-y-4 mb-4">
                        {conversation.map((msg, index) => (
                            <div
                                key={index}
                                className="flex gap-3"
                            >
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${msg.role === 'user'
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-teal-100 text-teal-700'
                                    }`}>
                                    {msg.role === 'user' ? (
                                        <User className="w-3.5 h-3.5" />
                                    ) : (
                                        <Sparkles className="w-3.5 h-3.5" />
                                    )}
                                </div>

                                {/* Message */}
                                <div className="flex-1">
                                    <div
                                        className="text-sm text-slate-900 leading-relaxed whitespace-pre-wrap chat-message"
                                        dangerouslySetInnerHTML={{ __html: renderMessage(msg.content) }}
                                    />
                                    {msg.timestamp && (
                                        <div className="text-xs text-slate-400 mt-1">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Research Plan Proposal */}
                {plan && !isProcessing && (
                    <div className="mb-6 ml-9">
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                            I've put together a research plan.
                        </div>
                        <ResearchPlan
                            plan={plan}
                            onStart={onStartPlan}
                            onEdit={onEditPlan}
                        />
                    </div>
                )}

                {/* Gemini-Style Reasoning Display */}
                {isProcessing && thinkingSteps.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-start gap-2 text-sm text-slate-600 mb-2">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="flex-shrink-0 mt-0.5"
                            >
                                ✨
                            </motion.div>
                            <div className="flex-1">
                                <div className="font-medium">Thinking...</div>
                                <div className="text-xs text-slate-500 mt-1 space-y-1">
                                    {thinkingSteps.filter(s => s.status === 'active' || s.status === 'complete').slice(-3).map((step) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: step.status === 'active' ? 1 : 0.5, x: 0 }}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="flex-shrink-0">
                                                {step.status === 'complete' ? '✓' : ''}
                                            </span>
                                            <span className={step.status === 'active' ? 'text-slate-700' : 'text-slate-400'}>
                                                {step.title}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {thinkingSteps.length === 0 && conversation.length === 0 && !plan && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-slate-400">
                            <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">Waiting to start research...</p>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 px-4 py-3 border-t border-slate-100 bg-white">
                {/* Context Indicator */}
                {selectedBlock && (
                    <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-teal-50 text-teal-700 rounded text-xs border border-teal-100">
                        <span className="font-medium">Context:</span>
                        <span className="truncate max-w-[200px]">{selectedBlock.title}</span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isProcessing ? "Analysis in progress..." : "Ask a follow-up..."}
                        disabled={isProcessing}
                        className="flex-1 h-10 bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:border-slate-400 disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!message.trim() || isProcessing}
                        className="flex-shrink-0 w-10 h-10 bg-[#0F1C2E] text-white rounded-full hover:bg-[#1a2d45] disabled:bg-slate-200 disabled:text-slate-400 transition-all duration-200 flex items-center justify-center"
                    >
                        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
