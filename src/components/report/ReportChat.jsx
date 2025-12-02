import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { extractSlideContent } from '@/utils/slideContentExtractor';
import { useLanguage } from '@/components/shared/LanguageProvider';

export default function ReportChat({ sessionId = 'report2' }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const scrollRef = useRef(null);
    const loadingIntervalRef = useRef(null);
    const { language, isRTL } = useLanguage();

    const texts = {
        he: {
            welcome: 'היי! אני העוזר החכם של הדוח. יש לי גישה לכל תוכן השקופיות ולנתונים הגולמיים שמאחוריהן. אפשר לשאול אותי כל שאלה על הנתונים, המגמות או התובנות שעולות מהמחקר.',
            title: 'עוזר מחקר',
            subtitle: 'מחובר לנתוני הדוח',
            placeholder: 'שאל שאלה על הדוח...',
            analyzing: 'מנתח את הדוח...',
            examining: 'בוחן את המקורות...',
            preparing: 'מכין תשובה...',
            error: 'סליחה, נתקלתי בבעיה בתקשורת עם השרת. נסה שוב מאוחר יותר.'
        },
        en: {
            welcome: 'Hi! I\'m the smart assistant for this report. I have access to all slide content and the underlying data. Feel free to ask me any questions about the data, trends, or insights from the research.',
            title: 'Research Assistant',
            subtitle: 'Connected to report data',
            placeholder: 'Ask a question about the report...',
            analyzing: 'Analyzing the report...',
            examining: 'Examining sources...',
            preparing: 'Preparing answer...',
            error: 'Sorry, I encountered a communication error with the server. Please try again later.'
        }
    };

    const t = texts[language] || texts.he;

    // Load chat history when session changes
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const response = await fetch(`/api/chat/history/${sessionId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.messages && data.messages.length > 0) {
                        setMessages(data.messages);
                    } else {
                        // Set default welcome message if no history
                        setMessages([{
                            role: 'assistant',
                            content: t.welcome
                        }]);
                    }
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
                // Set default welcome message on error
                setMessages([{
                    role: 'assistant',
                    content: t.welcome
                }]);
            } finally {
                setIsLoadingHistory(false);
            }
        };
        loadHistory();
    }, [sessionId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    useEffect(() => {
        if (isTyping) {
            const loadingMessages = [
                t.analyzing,
                t.examining,
                t.preparing
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
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Format history for the backend
            const history = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            // Extract slide content to provide as context
            const slideContext = extractSlideContent();

            const response = await fetch('/api/chat/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: userMessage.content,
                    history: history,
                    slide_context: slideContext,
                    report_id: sessionId
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const newMessages = [...messages, userMessage, { role: 'assistant', content: data.response }];
            setMessages(newMessages);

            // Save chat history to backend
            await saveChatHistory(newMessages);
        } catch (error) {
            console.error('Error querying chat:', error);
            const errorMessages = [...messages, userMessage, { role: 'assistant', content: t.error }];
            setMessages(errorMessages);
            await saveChatHistory(errorMessages);
        } finally {
            setIsTyping(false);
        }
    };

    const saveChatHistory = async (messagesToSave) => {
        try {
            await fetch('/api/chat/history/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    messages: messagesToSave
                }),
            });
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    };

    const formatMessage = (content) => {
        if (!content) return '';
        // Ensure list items start on a new line with a blank line before them
        let formatted = content.replace(/([^\n])\s\*\s/g, '$1\n\n* ');
        // Also handle bullet points that might use dashes
        formatted = formatted.replace(/([^\n])\s-\s/g, '$1\n\n- ');
        return formatted;
    };

    return (
        <div className={`flex flex-col h-full bg-white ${isRTL ? 'border-l' : 'border-r'} border-slate-200`} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-full">
                        <Sparkles className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h3 className="font-bold text-slate-800">{t.title}</h3>
                        <p className="text-xs text-slate-500">{t.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-slate-50/50">
                <div className="space-y-6">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'
                                }`}>
                                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={`flex-1 max-w-[85%] space-y-1`}>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? `bg-slate-900 text-white ${isRTL ? 'rounded-tr-none text-right' : 'rounded-tl-none text-left'}`
                                    : `bg-white border border-slate-200 text-slate-700 ${isRTL ? 'rounded-tr-none text-right' : 'rounded-tl-none text-left'}`
                                    }`}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkBreaks]}
                                        components={{
                                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0 text-sm" {...props} />,
                                            strong: ({ node, ...props }) => <span className={`font-bold ${msg.role === 'user' ? 'text-white' : 'text-slate-900'}`} {...props} />,
                                            ul: ({ node, ...props }) => <ul className="space-y-1.5 mb-2 text-sm" {...props} />,
                                            li: ({ node, ...props }) => (
                                                <li className={`flex gap-2 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} items-start`} {...props}>
                                                    <span className="shrink-0 mt-1.5">•</span>
                                                    <span className="flex-1">{props.children}</span>
                                                </li>
                                            )
                                        }}
                                    >
                                        {formatMessage(msg.content)}
                                    </ReactMarkdown>
                                </div>
                                <p className={`text-[10px] text-slate-400 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {new Date().toLocaleTimeString(language === 'he' ? 'he-IL' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className={`flex gap-3 items-center ${isRTL ? 'justify-end pr-2' : 'justify-start pl-2'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            <div className="flex items-center gap-3">
                                {isRTL && <span className="text-slate-400 text-sm">...</span>}
                                <span className="text-sm text-slate-600 font-medium">
                                    {loadingMessage}
                                </span>
                                <div className="relative w-4 h-4">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-600 animate-spin" style={{ animationDuration: '1.2s' }}></div>
                                    <div className="absolute inset-[2px] rounded-full bg-white"></div>
                                </div>
                                {!isRTL && <span className="text-slate-400 text-sm">...</span>}
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="relative flex items-end gap-2">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={t.placeholder}
                        className={`${isRTL ? 'text-right' : 'text-left'} min-h-[48px] max-h-[200px] rounded-xl border-slate-200 focus:border-slate-400 focus:ring-0 bg-slate-50 pr-4 pl-4 py-3 resize-none`}
                        rows={1}
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="bg-[#0F1C2E] hover:bg-[#1a2d45] text-white rounded-full h-10 w-10 p-0 shrink-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
