import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import ResearchPlan from './ResearchPlan';

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
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation, thinkingSteps, plan]);

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

    return (
        <div className="h-full flex flex-col bg-white border-r border-slate-200">
            {/* Header */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Research Assistant</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                    {isProcessing ? 'Analyzing...' : 'Ready to help'}
                </p>
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
                                    <p className="text-sm text-slate-900 leading-relaxed whitespace-pre-wrap">
                                        {msg.content}
                                    </p>
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
                <div className="flex items-end gap-2">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isProcessing ? "Analysis in progress..." : "Ask a follow-up..."}
                        disabled={isProcessing}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-slate-300 disabled:opacity-50"
                        rows={2}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!message.trim() || isProcessing}
                        className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition-colors flex items-center justify-center"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
