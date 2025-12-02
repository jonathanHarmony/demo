import React, { useState, useRef } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    Plus, Trash2, Grid3x3, Type, Heading1, Play, Code, Layout, Sparkles,
    CheckCircle, AlertTriangle, TrendingUp, Star, Info, ThumbsUp, ThumbsDown,
    BarChart2, PieChart as PieIcon, Target, MessageCircle, DollarSign, Zap,
    Wrench, Shield, Battery, Smartphone, LineChart as LineChartIcon
} from 'lucide-react';

// --- Design System Colors (Notion-like Black/Slate Theme) ---
const COLORS = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    chartColors: ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#3b82f6']
};

const PIE_COLORS = ['#10b981', '#94a3b8', '#ef4444'];

// ============================================
// REAL DATA FROM ORAL-B RESEARCH PRESENTATION
// ============================================

// Slide 2: Satisfaction Leaderboard
const ratingData = [
    { name: 'iO 3', rating: 4.83, reviews: 180, price: '~605 NIS', sentiment: 92 },
    { name: 'iO 5', rating: 4.79, reviews: 210, price: '~749 NIS', sentiment: 93 },
    { name: 'iO 9', rating: 4.53, reviews: 255, price: '~1,512 NIS', sentiment: 59 },
    { name: 'iO 10', rating: 4.36, reviews: 330, price: '~2,017 NIS', sentiment: 78 },
];

const purchaseVolumeData = [
    { name: 'iO 2', volume: 4000 },
    { name: 'iO 3', volume: 4000 },
    { name: 'iO 5', volume: 2000 },
    { name: 'iO 9', volume: 800 },
    { name: 'iO 10', volume: 900 },
];

// Slide 3: Sentiment Analysis
const overallSentiment = [
    { name: 'Positive', value: 1170, percentage: 53 },
    { name: 'Neutral', value: 915, percentage: 41 },
    { name: 'Negative', value: 135, percentage: 6 },
];

const sentimentByModel = [
    { name: 'iO 3', positive: 180, neutral: 15, negative: 0 },
    { name: 'iO 5', positive: 210, neutral: 15, negative: 0 },
    { name: 'iO 9', positive: 240, neutral: 135, negative: 30 },
    { name: 'iO 10', positive: 270, neutral: 30, negative: 45 },
];

// Slide 4: Key Drivers
const featureData = [
    { name: 'Cleaning', mentions: 435, sentiment: 'positive' },
    { name: 'Price', mentions: 285, sentiment: 'mixed' },
    { name: 'Heads', mentions: 270, sentiment: 'mixed' },
    { name: 'App', mentions: 240, sentiment: 'mixed' },
    { name: 'Charging', mentions: 240, sentiment: 'mixed' },
    { name: 'Durability', mentions: 180, sentiment: 'negative' },
];

// --- Initial State with Oral-B Slides ---
const initialSlides = [
    {
        id: 'slide-exec',
        topic: 'Executive Summary',
        prompts: 'Summarize the key findings for Oral-B iO customer satisfaction.',
        code: '',
        elements: [
            // Full-width intro
            { id: 'intro', type: 'text', colSpan: 3, content: 'Comprehensive analysis of Oral-B iO customer satisfaction across multiple platforms.' },
            // Research Scope highlight box - full width
            {
                id: 'scope', type: 'highlight-box', colSpan: 3, title: 'Research Scope & Data Sources',
                leftContent: {
                    label: 'Platforms Analyzed:',
                    tags: ['Reddit', 'Amazon', 'Superpharm', 'YouTube', 'Facebook', 'TikTok']
                },
                rightContent: [
                    { value: '2,220 Comments & Reviews', subtitle: 'Sentiment & feature analysis' },
                    { value: '975 Superpharm Reviews', subtitle: 'Product ratings across 4 models' },
                    { value: '11,700 Amazon Purchases', subtitle: 'Last month volume data' }
                ]
            },
            // 3-column insight cards
            {
                id: 'card1', type: 'card', colSpan: 1, icon: 'check', title: 'High Satisfaction',
                content: 'Average ratings between 4.36-4.83 out of 5',
                footer: 'iO 3 and iO 5 lead with 4.83 and 4.79 ratings'
            },
            {
                id: 'card2', type: 'card', colSpan: 1, icon: 'trending', title: 'Top Strength',
                content: 'Cleaning performance praised across all models',
                footer: '"Professional clean at home" is the key message'
            },
            {
                id: 'card3', type: 'card', colSpan: 1, icon: 'alert', title: 'Key Concerns',
                content: 'Price, reliability, and brush head design',
                footer: 'Premium models face more criticism'
            },
            // Headline Recommendations - full width with 2-col grid inside
            {
                id: 'recs', type: 'recommendations', colSpan: 3, title: 'Headline Recommendations',
                items: [
                    { icon: '📈', text: 'Position iO 3 and iO 5 as "hero value" models in mainstream marketing' },
                    { icon: '💎', text: 'Use iO 9 and iO 10 as halo models, but address price and reliability concerns' },
                    { icon: '✨', text: 'Double down on cleaning performance in all communication' },
                    { icon: '🔧', text: 'Investigate and fix: charging failures, open box issues, and mold concerns' }
                ]
            }
        ]
    },
    {
        id: 'slide-satisfaction',
        topic: 'Satisfaction Leaderboard',
        prompts: 'Visualize the customer ratings and purchase volume.',
        code: '',
        elements: [
            { id: 'chart-rating', type: 'chart', chartType: 'bar', data: ratingData, title: 'Average Customer Ratings by Model' },
            { id: 'card-io3', type: 'card', icon: 'star', title: 'iO 3', content: 'Price: ~605 NIS\nReviews: 180\nSentiment: 92%', footer: 'Leading Value Model' },
            { id: 'card-io5', type: 'card', icon: 'star', title: 'iO 5', content: 'Price: ~749 NIS\nReviews: 210\nSentiment: 93%', footer: 'Top Rated' },
            { id: 'chart-volume', type: 'chart', chartType: 'bar-vertical', data: purchaseVolumeData, title: 'Amazon Purchase Volume (Last Month)' }
        ]
    },
    {
        id: 'slide-sentiment',
        topic: 'Sentiment Analysis Overview',
        prompts: 'Analyze the sentiment distribution across platforms.',
        code: '',
        elements: [
            { id: 'chart-pie', type: 'chart', chartType: 'pie', data: overallSentiment, title: 'Overall Sentiment Distribution' },
            {
                id: 'insight-pos', type: 'card', icon: 'check', title: 'Mid-Tier Excellence',
                content: 'iO 3 and iO 5 show almost exclusively positive sentiment with minimal neutral and zero negative comments.',
                footer: 'Strongest Performers'
            },
            {
                id: 'insight-neg', type: 'card', icon: 'alert', title: 'Premium Model Debate',
                content: 'iO 9 and iO 10 maintain high positive counts but attract more neutral and negative feedback around price.',
                footer: 'Price Sensitivity'
            }
        ]
    }
];

// --- Chart Components ---
const ChartRenderer = ({ type, data }) => {
    if (type === 'bar') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 5]} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="rating" fill="#6366f1" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS.chartColors[index % COLORS.chartColors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'bar-vertical') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={50} />
                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="volume" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'pie') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                </PieChart>
            </ResponsiveContainer>
        );
    }
    return null;
};

const TableRenderer = ({ data }) => (
    <div className="w-full overflow-x-auto">
        <table className="w-full text-sm border-collapse">
            <thead>
                <tr className="border-b border-slate-200">
                    <th className="text-left py-2 px-3 font-semibold text-slate-700 text-xs uppercase tracking-wide">Name</th>
                    <th className="text-left py-2 px-3 font-semibold text-slate-700 text-xs uppercase tracking-wide">Value</th>
                    <th className="text-left py-2 px-3 font-semibold text-slate-700 text-xs uppercase tracking-wide">Trend</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-2 px-3 text-slate-800">{row.name}</td>
                        <td className="py-2 px-3 text-slate-600">{row.value}</td>
                        <td className="py-2 px-3 text-emerald-600 font-medium">+{Math.floor(Math.random() * 20)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- Canvas Element Component ---
const CanvasElement = ({ element, onUpdate, onDelete, isHovered, onHover }) => {
    const handleContentChange = (e) => {
        onUpdate(element.id, { content: e.target.innerText });
    };

    const handleTitleChange = (e) => {
        onUpdate(element.id, { title: e.target.innerText });
    };

    // Icon helper
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'check': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'alert': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case 'trending': return <TrendingUp className="w-5 h-5 text-indigo-500" />;
            case 'star': return <Star className="w-5 h-5 text-amber-400" />;
            case 'thumbsup': return <ThumbsUp className="w-5 h-5 text-emerald-500" />;
            case 'thumbsdown': return <ThumbsDown className="w-5 h-5 text-red-500" />;
            default: return <Info className="w-5 h-5 text-slate-400" />;
        }
    };

    return (
        <div
            className="group relative h-full flex flex-col"
            onMouseEnter={() => onHover(element.id)}
            onMouseLeave={() => onHover(null)}
        >
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => onDelete(element.id)} className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 bg-white shadow-sm border border-slate-200">
                    <Trash2 size={12} />
                </button>
            </div>

            {element.type === 'heading' && (
                <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleContentChange}
                    className="outline-none w-full text-2xl font-bold text-slate-900 mb-4"
                >
                    {element.content}
                </div>
            )}

            {element.type === 'text' && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 h-full">
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleContentChange}
                        className="outline-none text-sm text-slate-700 leading-relaxed whitespace-pre-wrap"
                    >
                        {element.content}
                    </div>
                </div>
            )}

            {element.type === 'card' && (
                <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 h-full flex flex-col hover:border-slate-300 transition-colors">
                    <div className="flex items-start gap-3 mb-2">
                        {getIcon(element.icon)}
                        <div className="flex-1">
                            {element.title && (
                                <h3
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={handleTitleChange}
                                    className="text-slate-900 text-sm font-semibold mb-1 outline-none"
                                >
                                    {element.title}
                                </h3>
                            )}
                            <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={handleContentChange}
                                className="text-slate-600 text-sm leading-snug outline-none"
                            >
                                {element.content}
                            </div>
                        </div>
                    </div>
                    {element.footer && (
                        <div className="mt-auto pt-3 border-t border-slate-100">
                            <p className="text-slate-400 text-xs">{element.footer}</p>
                        </div>
                    )}
                </div>
            )}

            {element.type === 'chart' && (
                <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-200 transition-all flex flex-col h-full">
                    {element.title && (
                        <h3
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleTitleChange}
                            className="text-slate-800 text-sm font-semibold mb-2 outline-none"
                        >
                            {element.title}
                        </h3>
                    )}
                    <div className="flex-1 min-h-[200px]">
                        <ChartRenderer type={element.chartType} data={element.data} />
                    </div>
                </div>
            )}

            {element.type === 'highlight-box' && (
                <div className="bg-slate-50 border-l-4 border-indigo-500 rounded-r-lg p-5 h-full">
                    {element.title && (
                        <h3 className="text-slate-900 text-sm font-semibold mb-4">{element.title}</h3>
                    )}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left side - platforms */}
                        <div>
                            {element.leftContent?.label && (
                                <p className="text-slate-700 text-sm mb-3">{element.leftContent.label}</p>
                            )}
                            {element.leftContent?.tags && (
                                <div className="flex flex-wrap gap-2">
                                    {element.leftContent.tags.map((tag, i) => (
                                        <span key={i} className="bg-white px-3 py-1 rounded-md text-xs text-slate-600 border border-slate-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Right side - stats */}
                        <div className="space-y-3">
                            {element.rightContent?.map((item, i) => (
                                <div key={i} className="bg-white rounded-lg p-3 border border-slate-200">
                                    <p className="text-slate-900 text-sm font-medium">{item.value}</p>
                                    <p className="text-slate-500 text-xs">{item.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {element.type === 'recommendations' && (
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 h-full">
                    {element.title && (
                        <h3 className="text-slate-900 font-semibold mb-4">{element.title}</h3>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        {element.items?.map((item, i) => (
                            <div key={i} className="bg-white rounded-lg p-3 border border-slate-200 flex items-start gap-2">
                                <span className="text-lg">{item.icon}</span>
                                <p className="text-slate-700 text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Slide Block Component ---
const SlideBlock = ({ slide, onUpdate, onAddElement, onDeleteElement, onUpdateElement, onRun, isActive, onReorder }) => {
    const [activeTab, setActiveTab] = useState('preview');
    const [hoveredElement, setHoveredElement] = useState(null);
    const [showAddMenu, setShowAddMenu] = useState(false);

    const tabs = [
        { id: 'topic', label: 'Topic', icon: Type },
        { id: 'prompts', label: 'Prompts', icon: Sparkles },
        { id: 'code', label: 'Code', icon: Code },
        { id: 'preview', label: 'Preview', icon: Layout },
    ];

    return (
        <div className="w-full bg-white mb-12 group/slide relative">
            {/* Slide Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={slide.topic}
                        onChange={(e) => onUpdate(slide.id, { topic: e.target.value })}
                        className="text-2xl font-bold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 w-full placeholder-slate-300"
                        placeholder="Enter topic..."
                    />
                </div>
                <button
                    onClick={() => onRun(slide.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Play size={16} fill="currentColor" />
                    <span className="font-medium text-sm">Run Block</span>
                </button>
            </div>

            {/* Tabs Navigation - Visible only on hover */}
            <div className="absolute top-0 right-0 -mt-12 opacity-0 group-hover/slide:opacity-100 transition-opacity duration-200">
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg shadow-sm border border-slate-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                {activeTab === 'topic' && (
                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Research Question / Topic</label>
                            <textarea
                                value={slide.topic}
                                onChange={(e) => onUpdate(slide.id, { topic: e.target.value })}
                                className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none text-slate-700"
                                placeholder="What is the main goal of this block?"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'prompts' && (
                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">System Prompts</label>
                            <textarea
                                value={slide.prompts}
                                onChange={(e) => onUpdate(slide.id, { prompts: e.target.value })}
                                className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none font-mono text-sm text-slate-700"
                                placeholder="Enter prompts for the AI..."
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div className="relative group">
                        <div className="absolute right-4 top-4 px-2 py-1 bg-slate-200 rounded text-xs font-mono text-slate-600 pointer-events-none">HTML</div>
                        <textarea
                            value={slide.code}
                            onChange={(e) => onUpdate(slide.id, { code: e.target.value })}
                            className="w-full h-96 p-4 bg-slate-900 text-slate-50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none resize-none font-mono text-sm"
                            spellCheck="false"
                            placeholder="<div>Custom HTML...</div>"
                        />
                    </div>
                )}

                {activeTab === 'preview' && (
                    <div className="relative bg-slate-50/50 border border-slate-100 rounded-xl p-6 min-h-[400px]">
                        <Droppable droppableId={slide.id} direction="horizontal">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="grid grid-cols-3 gap-4 auto-rows-min"
                                >
                                    {slide.elements.map((element, index) => {
                                        // Determine column span
                                        const colSpan = element.colSpan || (element.type === 'heading' ? 3 : 1);
                                        const colSpanClass = colSpan === 3 ? 'col-span-3' : colSpan === 2 ? 'col-span-2' : 'col-span-1';
                                        
                                        // Determine min height based on type
                                        const isCompact = ['text', 'card'].includes(element.type);
                                        const isLarge = ['chart', 'highlight-box', 'recommendations'].includes(element.type);
                                        const heightClass = isCompact ? '' : isLarge ? 'min-h-[200px]' : '';
                                        
                                        return (
                                        <Draggable key={element.id} draggableId={element.id} index={index}>
                                            {(providedDrag, snapshot) => (
                                                <div
                                                    ref={providedDrag.innerRef}
                                                    {...providedDrag.draggableProps}
                                                    {...providedDrag.dragHandleProps}
                                                    className={`${colSpanClass} ${heightClass}`}
                                                    style={{
                                                        ...providedDrag.draggableProps.style,
                                                    }}
                                                >
                                                    <CanvasElement
                                                        element={element}
                                                        onUpdate={onUpdateElement}
                                                        onDelete={onDeleteElement}
                                                        isHovered={hoveredElement === element.id}
                                                        onHover={setHoveredElement}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        {/* Add Element Button */}
                        <div className="mt-8 flex justify-center relative">
                            <div className="relative">
                                <button
                                    onClick={() => setShowAddMenu(!showAddMenu)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-full hover:border-indigo-300 hover:text-indigo-600 shadow-sm transition-all"
                                >
                                    <Plus size={16} />
                                    <span className="text-sm font-medium">Add Element</span>
                                </button>

                                {showAddMenu && (
                                    <div className="absolute left-1/2 -translate-x-1/2 top-12 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-20">
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-3 py-2">Content</div>
                                        <button onClick={() => { onAddElement(slide.id, 'card'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <Layout size={16} className="text-slate-400" />
                                            <span className="text-sm">Insight Card</span>
                                        </button>
                                        <button onClick={() => { onAddElement(slide.id, 'text'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <Type size={16} className="text-slate-400" />
                                            <span className="text-sm">Text Block</span>
                                        </button>
                                        <button onClick={() => { onAddElement(slide.id, 'heading'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <Heading1 size={16} className="text-slate-400" />
                                            <span className="text-sm">Heading</span>
                                        </button>
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-3 py-2 mt-2">Visualization</div>
                                        <button onClick={() => { onAddElement(slide.id, 'bar'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <BarChart2 size={16} className="text-slate-400" />
                                            <span className="text-sm">Bar Chart</span>
                                        </button>
                                        <button onClick={() => { onAddElement(slide.id, 'pie'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <PieIcon size={16} className="text-slate-400" />
                                            <span className="text-sm">Pie Chart</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {showAddMenu && <div className="fixed inset-0 z-10" onClick={() => setShowAddMenu(false)} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Component ---
const QuickBriefWorkspace = () => {
    const [slides, setSlides] = useState(initialSlides);
    const [isRuning, setIsRunning] = useState(false);

    // Slide Management
    const addSlide = () => {
        const newSlide = {
            id: `slide-${Date.now()}`,
            topic: '',
            prompts: '',
            code: '',
            elements: [
                { id: `intro-${Date.now()}`, type: 'text', content: 'Start analyzing...' }
            ]
        };
        setSlides([...slides, newSlide]);
    };

    const updateSlide = (id, updates) => {
        setSlides(slides.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleRunBlock = (id) => {
        setIsRunning(true);
        setTimeout(() => {
            setIsRunning(false);
            console.log(`Running block ${id}`);
        }, 1000);
    };

    const handleReorderElements = (result) => {
        if (!result.destination) return;

        const sourceSlideId = result.source.droppableId;
        const destinationSlideId = result.destination.droppableId;

        if (sourceSlideId !== destinationSlideId) return;

        const slideIndex = slides.findIndex(s => s.id === sourceSlideId);
        if (slideIndex === -1) return;

        const slide = slides[slideIndex];
        const newElements = Array.from(slide.elements);
        const [reorderedItem] = newElements.splice(result.source.index, 1);
        newElements.splice(result.destination.index, 0, reorderedItem);

        const newSlides = [...slides];
        newSlides[slideIndex] = { ...slide, elements: newElements };
        setSlides(newSlides);
    };

    const addElementToSlide = (slideId, type) => {
        const newElement = {
            id: `${type}_${Date.now()}`,
            type: type === 'bar' || type === 'pie' || type === 'bar-vertical' ? 'chart' : type,
            chartType: type === 'bar' || type === 'pie' || type === 'bar-vertical' ? type : undefined,
            data: type === 'chart' || type === 'bar' || type === 'pie' ? ratingData : undefined,
            content: type === 'text' ? 'New Insight...' : type === 'card' ? 'Insight details...' : 'New Heading',
            title: type === 'card' ? 'New Insight' : type === 'chart' ? 'Analysis' : undefined,
            icon: type === 'card' ? 'info' : undefined,
            footer: type === 'card' ? 'Key takeaway' : undefined,
        };

        setSlides(slides.map(s => {
            if (s.id === slideId) {
                return { ...s, elements: [...s.elements, newElement] };
            }
            return s;
        }));
    };

    const updateElementInSlide = (elementId, updates) => {
        setSlides(slides.map(s => ({
            ...s,
            elements: s.elements.map(e => e.id === elementId ? { ...e, ...updates } : e)
        })));
    };

    const deleteElementFromSlide = (elementId) => {
        setSlides(slides.map(s => ({
            ...s,
            elements: s.elements.filter(e => e.id !== elementId)
        })));
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <div className="w-16 border-r border-slate-200 flex flex-col items-center py-6 bg-slate-50">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-8">
                    <Grid3x3 className="text-white" size={20} />
                </div>
                <div className="flex-1 space-y-4">
                    {slides.map((slide, i) => (
                        <div key={slide.id} className="w-2 h-2 rounded-full bg-slate-300 hover:bg-indigo-500 transition-colors cursor-pointer" title={slide.topic} />
                    ))}
                </div>
                <button onClick={addSlide} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Plus size={24} />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="max-w-5xl mx-auto px-12 py-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">Strategic Analysis Notebook</h1>
                        <p className="text-slate-500 text-lg">Interactive workspace for data exploration and insight generation.</p>
                    </div>

                    <DragDropContext onDragEnd={handleReorderElements}>
                        <div className="space-y-20">
                            {slides.map((slide) => (
                                <SlideBlock
                                    key={slide.id}
                                    slide={slide}
                                    onUpdate={updateSlide}
                                    onAddElement={addElementToSlide}
                                    onUpdateElement={updateElementInSlide}
                                    onDeleteElement={deleteElementFromSlide}
                                    onRun={handleRunBlock}
                                />
                            ))}
                        </div>
                    </DragDropContext>

                    {/* Add Slide Button at Bottom */}
                    <div className="py-12 border-t border-dashed border-slate-200 mt-12 text-center">
                        <button
                            onClick={addSlide}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-all font-medium"
                        >
                            <Plus size={20} />
                            Add New Analysis Block
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickBriefWorkspace;
