import React, { useState, useRef } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    MessageSquare, Plus, GripVertical, MoreHorizontal, Trash2, Send, X,
    BarChart2, PieChart as PieIcon, Activity, Grid3x3, Type, Heading1,
    FileText, Play, Code, Layout, Sparkles, Check
} from 'lucide-react';

// --- Mock Data ---
const generateData = (count = 5) => Array.from({ length: count }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 100) + 10,
    value2: Math.floor(Math.random() * 100) + 10,
}));

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#3b82f6'];

// --- Initial State ---
const initialSlides = [
    {
        id: 'slide-1',
        topic: 'Quarterly Performance Overview',
        prompts: 'Analyze the Q1 revenue data and identify key growth drivers compared to the previous quarter.',
        code: '<div class="analysis-widget">\n  <h2>Performance Metric</h2>\n  <p>Revenue exceeded targets by 15%.</p>\n</div>',
        elements: [
            { id: 'title', type: 'heading', level: 1, content: 'Q1 Performance Analysis' },
            { id: 'intro', type: 'text', content: 'This workspace provides a comprehensive overview of our quarterly performance metrics and key insights.' },
            { id: 'bar1', type: 'chart', chartType: 'bar', data: generateData(6), title: 'Revenue by Quarter' },
        ]
    },
    {
        id: 'slide-2',
        topic: 'Regional Breakdown',
        prompts: 'Break down the sales figures by region and highlight underperforming areas.',
        code: '// Custom visualization logic here...',
        elements: [
            { id: 'pie1', type: 'chart', chartType: 'pie', data: generateData(4), title: 'Market Share Distribution' },
            { id: 'text2', type: 'text', content: 'North America continues to lead in market share, while APAC shows promising growth potential.' },
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
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'line') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6' }} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'pie') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                </PieChart>
            </ResponsiveContainer>
        );
    }
    if (type === 'radar') {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar name="Value" dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.5} />
                    <RechartsTooltip contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                </RadarChart>
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

// --- Canvas Element Component (Charts/Text inside Grid) ---
const CanvasElement = ({ element, onUpdate, onDelete, isHovered, onHover }) => {
    const handleContentChange = (e) => {
        onUpdate(element.id, { content: e.target.innerText });
    };

    const handleTitleChange = (e) => {
        onUpdate(element.id, { title: e.target.innerText });
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
                    className={`outline-none w-full ${element.level === 1
                        ? 'text-3xl font-bold text-slate-900 mb-4'
                        : 'text-xl font-bold text-slate-900 mb-2'
                        }`}
                >
                    {element.content}
                </div>
            )}

            {element.type === 'text' && (
                <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleContentChange}
                    className="outline-none text-base text-slate-700 leading-relaxed flex-1 min-h-[60px]"
                >
                    {element.content}
                </div>
            )}

            {element.type === 'chart' && (
                <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-200 transition-all flex flex-col h-full">
                    {element.title && (
                        <h3
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleTitleChange}
                            className="text-sm font-semibold text-slate-800 mb-2 outline-none"
                        >
                            {element.title}
                        </h3>
                    )}
                    <div className="flex-1 min-h-[200px]">
                        <ChartRenderer type={element.chartType} data={element.data} />
                    </div>
                </div>
            )}

            {element.type === 'table' && (
                <div className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors h-full overflow-hidden">
                    {element.title && (
                        <h3
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={handleTitleChange}
                            className="text-sm font-semibold text-slate-800 mb-2 outline-none"
                        >
                            {element.title}
                        </h3>
                    )}
                    <TableRenderer data={element.data} />
                </div>
            )}
        </div>
    );
};

// --- Slide Block Component ---
const SlideBlock = ({ slide, onUpdate, onAddElement, onDeleteElement, onUpdateElement, onRun, isActive, onReorder }) => {
    const [activeTab, setActiveTab] = useState('preview'); // 'topic', 'prompts', 'code', 'preview'
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
            {/* Slide Divider & Header */}
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
                                    className="grid grid-cols-2 gap-6 auto-rows-min"
                                >
                                    {slide.elements.map((element, index) => (
                                        <Draggable key={element.id} draggableId={element.id} index={index}>
                                            {(providedDrag, snapshot) => (
                                                <div
                                                    ref={providedDrag.innerRef}
                                                    {...providedDrag.draggableProps}
                                                    {...providedDrag.dragHandleProps}
                                                    className={`${element.type === 'heading' || element.type === 'text' ? 'col-span-2' : 'col-span-1 min-h-[300px]'}`}
                                                    style={{
                                                        ...providedDrag.draggableProps.style,
                                                        // Preserve grid layout during drag if needed, though standard DND lifts it out
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
                                        <button onClick={() => { onAddElement(slide.id, 'table'); setShowAddMenu(false); }} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700">
                                            <FileText size={16} className="text-slate-400" />
                                            <span className="text-sm">Data Table</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Backdrop for menu */}
                            {showAddMenu && (
                                <div className="fixed inset-0 z-10" onClick={() => setShowAddMenu(false)} />
                            )}
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
        // Simulate execution
        setTimeout(() => {
            setIsRunning(false);
            // In a real app, this would execute code or process prompts
            console.log(`Running block ${id}`);
        }, 1000);
    };

    // Element Management within Slides
    const addElementToSlide = (slideId, type) => {
        const newElement = {
            id: `${type}_${Date.now()}`,
            type: type === 'bar' || type === 'line' || type === 'pie' || type === 'radar' ? 'chart' : type,
            chartType: type === 'bar' || type === 'line' || type === 'pie' || type === 'radar' ? type : undefined,
            data: type === 'table' || type === 'bar' || type === 'line' || type === 'pie' || type === 'radar' ? generateData(6) : undefined,
            content: type === 'text' ? 'Start typing...' : type === 'heading' ? 'New Heading' : undefined,
            level: type === 'heading' ? 2 : undefined,
            title: type === 'table' || type === 'bar' || type === 'line' || type === 'pie' || type === 'radar' ? 'New Analysis' : undefined,
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
            {/* Sidebar (Optional - could be used for navigation between slides) */}
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

                    {/* Slides List */}
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
