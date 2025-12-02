import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sparkles, ArrowUp, Bot, User, X, MessageCircle, Loader2,
    Download, RefreshCw, FileText, Presentation, FileType, ChevronDown,
    GripVertical, Play
} from 'lucide-react';

// Demo Chat Messages Flow
const DEMO_CHAT_MESSAGES = [
    { delay: 500, text: "Breaking down question...", type: 'status' },
    { delay: 2000, text: "Creating subquestions and prompts...", type: 'status' },
    { delay: 4000, text: "Creating blocks...", type: 'status' },
    { delay: 7000, text: "Analyzing market data...", type: 'status' },
];

// Demo Blocks that will be created
const DEMO_BLOCKS = [
    { 
        id: 'block-1', 
        title: 'Executive Summary',
        subtitle: 'Key findings and overall satisfaction metrics',
        prompts: 'Analyze overall customer satisfaction scores across all Oral-B iO models. Include average ratings, sentiment distribution, and comparison between models.',
        showAt: 4500 
    },
    { 
        id: 'block-2', 
        title: 'Satisfaction Leaderboard',
        subtitle: 'Model-by-model performance comparison',
        prompts: 'Create a ranked comparison of all Oral-B iO models based on customer satisfaction. Include purchase volume data and rating distributions.',
        showAt: 5000 
    },
    { 
        id: 'block-3', 
        title: 'Feature Deep Dive',
        subtitle: 'Analysis of key product features',
        prompts: 'Analyze customer feedback on specific features: cleaning performance, battery life, smart features, brush head design, and noise level.',
        showAt: 5500 
    },
    { 
        id: 'block-4', 
        title: 'Key Drivers Analysis',
        subtitle: 'What drives satisfaction and dissatisfaction',
        prompts: 'Identify the top drivers of customer satisfaction and dissatisfaction. Include sentiment analysis and quote examples.',
        showAt: 6000 
    },
    { 
        id: 'block-5', 
        title: 'Strategic Recommendations',
        subtitle: 'Actionable insights and next steps',
        prompts: 'Based on the analysis, provide strategic recommendations for product improvement, marketing positioning, and customer communication.',
        showAt: 6500 
    },
];

// Research Assistant Component for Demo
const DemoResearchAssistant = ({ messages, isTyping, loadingMessage }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    return (
        <div className="w-96 flex flex-col h-full overflow-hidden bg-white border-r border-slate-200">
            {/* Header */}
            <div className="shrink-0 p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-full">
                        <Sparkles className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm">Research Assistant</h3>
                        <p className="text-xs text-slate-500">Connected to analysis data</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-slate-50/50">
                <div className="space-y-4">
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3"
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
                                    {msg.type === 'status' ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                                            <span>{msg.content}</span>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3 items-center pl-2"
                        >
                            <div className="flex items-center gap-2">
                                <div className="relative w-4 h-4">
                                    <div className="absolute inset-0 rounded-full bg-slate-400 animate-ping opacity-75"></div>
                                    <div className="absolute inset-0 rounded-full bg-slate-500"></div>
                                </div>
                                <span className="text-sm text-slate-500">
                                    {loadingMessage}
                                </span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </div>

            {/* Input - Disabled during demo */}
            <div className="shrink-0 p-4 bg-white border-t border-slate-100">
                <div className="flex items-end gap-2">
                    <div className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 opacity-50">
                        <textarea
                            placeholder="Analysis in progress..."
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-sm p-0"
                            rows={1}
                            disabled
                        />
                    </div>
                    <button
                        disabled
                        className="bg-slate-300 text-white rounded-full h-10 w-10 shrink-0 flex items-center justify-center cursor-not-allowed"
                    >
                        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Demo Block Component
const DemoBlock = ({ block, index, isAnalyzing }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full bg-white group/slide relative"
        >
            {/* Full Width Divider */}
            <div className="w-full h-px bg-slate-200 mb-8"></div>
            
            {/* Block Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                        <GripVertical size={12} className="text-slate-400" />
                        <span className="text-xs font-medium text-slate-500">Block {index + 1}</span>
                    </div>
                </div>
            </div>

            {/* Block Title & Subtitle */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{block.title}</h2>
                <p className="text-slate-500">{block.subtitle}</p>
            </div>

            {/* Prompt Running State */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-200 rounded-lg">
                        <Sparkles className="w-4 h-4 text-slate-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Prompt</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{block.prompts}</p>
                
                {isAnalyzing && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 pt-4 border-t border-slate-200"
                    >
                        <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                        <span className="text-sm text-slate-500">Running analysis...</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

// Progress Bar Component
const AnalysisProgressBar = ({ progress, estimatedTime }) => {
    return (
        <div className="bg-white border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Analysis in Progress</span>
                </div>
                <span className="text-sm text-slate-500">Estimated Time: {estimatedTime}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-slate-900 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );
};

// Main Demo Component
export default function QuickBriefDemo({ initialQuestion = "What is the customer satisfaction for Oral-B iO models?" }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [visibleBlocks, setVisibleBlocks] = useState([]);
    const [progress, setProgress] = useState(0);
    const [currentLoadingMessage, setCurrentLoadingMessage] = useState('');
    const [hasStarted, setHasStarted] = useState(false);

    // Start the demo flow
    const startDemo = () => {
        setHasStarted(true);
        setIsAnalyzing(true);
        
        // Add user question
        setChatMessages([{ role: 'user', content: initialQuestion }]);
        
        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 15) {
                    clearInterval(progressInterval);
                    return 15;
                }
                return prev + 0.5;
            });
        }, 500);

        // Chat messages flow
        DEMO_CHAT_MESSAGES.forEach((msg, index) => {
            setTimeout(() => {
                setChatMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: msg.text,
                    type: msg.type 
                }]);
                setCurrentLoadingMessage(msg.text);
            }, msg.delay);
        });

        // Show blocks progressively
        DEMO_BLOCKS.forEach((block) => {
            setTimeout(() => {
                setVisibleBlocks(prev => [...prev, block]);
            }, block.showAt);
        });
    };

    // Initial state - show question input
    if (!hasStarted) {
        return (
            <div className="flex bg-white" style={{ height: 'calc(100vh - 56px)' }}>
                <div className="flex-1 flex flex-col items-center justify-center px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl font-semibold text-slate-900 mb-2">
                            What would you like to research?
                        </h1>
                    </motion.div>

                    <div className="w-full max-w-2xl">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4">
                            <div className="flex items-end gap-3">
                                <textarea
                                    value={initialQuestion}
                                    readOnly
                                    className="flex-1 text-lg bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-slate-900"
                                    rows={2}
                                />
                                <button
                                    onClick={startDemo}
                                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full h-12 w-12 shrink-0 flex items-center justify-center transition-colors"
                                >
                                    <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Analysis in progress state
    return (
        <div className="flex flex-col bg-white" style={{ height: 'calc(100vh - 56px)' }}>
            {/* Progress Bar */}
            <AnalysisProgressBar progress={progress} estimatedTime="3h" />
            
            <div className="flex flex-1 overflow-hidden">
                {/* Research Assistant Sidebar */}
                <DemoResearchAssistant 
                    messages={chatMessages}
                    isTyping={isAnalyzing}
                    loadingMessage={currentLoadingMessage}
                />

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="max-w-5xl mx-auto px-12 py-12">
                        {/* Header */}
                        <div className="mb-12 flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-slate-900 mb-3">Oral-B IO Models Analysis</h1>
                                <p className="text-slate-500 text-lg">Interactive workspace for Oral-B iO customer satisfaction analysis.</p>
                            </div>
                            
                            {/* Action Buttons - Disabled during analysis */}
                            <div className="flex items-center gap-3 opacity-50">
                                <button
                                    disabled
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg cursor-not-allowed"
                                >
                                    <Download size={16} />
                                    <span className="font-medium text-sm">Export</span>
                                    <ChevronDown size={14} />
                                </button>
                                
                                <button
                                    disabled
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-300 text-white rounded-lg cursor-not-allowed"
                                >
                                    <RefreshCw size={16} />
                                    <span className="font-medium text-sm">Rerun</span>
                                </button>
                            </div>
                        </div>

                        {/* Blocks */}
                        <div className="space-y-16">
                            <AnimatePresence>
                                {visibleBlocks.map((block, index) => (
                                    <DemoBlock 
                                        key={block.id} 
                                        block={block} 
                                        index={index}
                                        isAnalyzing={isAnalyzing}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {visibleBlocks.length === 0 && (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-slate-400 mx-auto mb-4" />
                                    <p className="text-slate-500">Creating analysis blocks...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
