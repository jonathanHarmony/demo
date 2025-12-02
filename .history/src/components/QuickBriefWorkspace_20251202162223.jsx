import React, { useState, useRef } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    MessageSquare, Plus, GripVertical, MoreHorizontal, Trash2, Send, X,
    BarChart2, PieChart as PieIcon, Activity, Grid3x3, Type, Heading1, Image as ImageIcon, FileText
} from 'lucide-react';

// --- Mock Data ---
const generateData = (count = 5) => Array.from({ length: count }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 100) + 10,
    value2: Math.floor(Math.random() * 100) + 10,
}));

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#3b82f6'];

const initialBlocks = [
    { id: 'title', type: 'heading', level: 1, content: 'Q1 Performance Analysis' },
    { id: 'intro', type: 'text', content: 'This workspace provides a comprehensive overview of our quarterly performance metrics and key insights.' },
    { id: 'bar1', type: 'chart', chartType: 'bar', data: generateData(6), title: 'Revenue by Quarter' },
    { id: 'text1', type: 'text', content: 'Revenue shows consistent growth with a 24% increase compared to last quarter.' },
    { id: 'bar2', type: 'chart', chartType: 'bar', data: generateData(6), title: 'User Growth Metrics' },
    { id: 'pie1', type: 'chart', chartType: 'pie', data: generateData(4), title: 'Market Share Distribution' },
    { id: 'heading1', type: 'heading', level: 2, content: 'Detailed Performance Breakdown' },
    { id: 'line1', type: 'chart', chartType: 'line', data: generateData(10), title: 'Traffic Trends Over Time' },
    { id: 'radar1', type: 'chart', chartType: 'radar', data: generateData(6), title: 'Skill Matrix Assessment' },
    { id: 'table1', type: 'table', data: generateData(8), title: 'Top Products by Revenue' },
    { id: 'bar3', type: 'chart', chartType: 'bar', data: generateData(6), title: 'Sales by Region' },
    { id: 'text2', type: 'text', content: 'Regional analysis indicates strongest performance in North America and Europe, with emerging opportunities in APAC markets.' },
];

// --- Chart Components ---
const ChartRenderer = ({ type, data }) => {
    if (type === 'bar') {
        return (
            <ResponsiveContainer width="100%" height={300}>
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
            <ResponsiveContainer width="100%" height={300}>
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
            <ResponsiveContainer width="100%" height={300}>
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
            <ResponsiveContainer width="100%" height={300}>
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

// --- Block Component ---
const Block = ({ block, onUpdate, onDelete, onTag, isHovered, onHover, onChangeChartType }) => {
    const [isEditing, setIsEditing] = useState(false);
    const contentRef = useRef(null);

    const handleContentChange = (e) => {
        onUpdate(block.id, { content: e.target.innerText });
    };

    const handleTitleChange = (e) => {
        onUpdate(block.id, { title: e.target.innerText });
    };

    return (
        <div
            className="group relative py-1 px-2 -mx-2"
            onMouseEnter={() => onHover(block.id)}
            onMouseLeave={() => onHover(null)}
        >
            {/* Left Controls */}
            <div className={`absolute -left-8 top-2 flex items-center gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <button className="p-0.5 hover:bg-slate-100 rounded cursor-grab active:cursor-grabbing">
                    <GripVertical size={14} className="text-slate-400" />
                </button>
                <button onClick={() => onTag(block.id)} className="p-0.5 hover:bg-slate-100 rounded">
                    <Plus size={14} className="text-slate-400" />
                </button>
            </div>

            {/* Block Content */}
            <div className="relative">
                {block.type === 'heading' && (
                    <div
                        ref={contentRef}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleContentChange}
                        className={`outline-none ${block.level === 1
                            ? 'text-4xl font-bold text-slate-900 mb-2'
                            : 'text-2xl font-bold text-slate-900 mt-8 mb-3'
                            }`}
                    >
                        {block.content}
                    </div>
                )}

                {block.type === 'text' && (
                    <div
                        ref={contentRef}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleContentChange}
                        className="outline-none text-base text-slate-700 leading-relaxed mb-1 py-1"
                    >
                        {block.content}
                    </div>
                )}

                {block.type === 'chart' && (
                    <div className="my-4 bg-white border border-slate-200 rounded-lg p-6 hover:border-indigo-200 transition-all relative group/chart">
                        {/* Chart Hover Toolbar */}
                        {isHovered && (
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur text-white rounded-full px-4 py-2 flex items-center gap-3 shadow-xl text-xs z-10">
                                <span className="font-mono text-slate-400">@{block.id}</span>
                                <div className="w-px h-4 bg-slate-700"></div>
                                <button
                                    onClick={() => onChangeChartType(block.id, 'bar')}
                                    className={`hover:text-indigo-400 transition-colors ${block.chartType === 'bar' ? 'text-indigo-400' : ''}`}
                                    title="Bar Chart"
                                >
                                    <BarChart2 size={16} />
                                </button>
                                <button
                                    onClick={() => onChangeChartType(block.id, 'line')}
                                    className={`hover:text-indigo-400 transition-colors ${block.chartType === 'line' ? 'text-indigo-400' : ''}`}
                                    title="Line Chart"
                                >
                                    <Activity size={16} />
                                </button>
                                <button
                                    onClick={() => onChangeChartType(block.id, 'pie')}
                                    className={`hover:text-indigo-400 transition-colors ${block.chartType === 'pie' ? 'text-indigo-400' : ''}`}
                                    title="Pie Chart"
                                >
                                    <PieIcon size={16} />
                                </button>
                                <button
                                    onClick={() => onChangeChartType(block.id, 'radar')}
                                    className={`hover:text-indigo-400 transition-colors ${block.chartType === 'radar' ? 'text-indigo-400' : ''}`}
                                    title="Radar Chart"
                                >
                                    <Grid3x3 size={16} />
                                </button>
                            </div>
                        )}

                        {block.title && (
                            <h3
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={handleTitleChange}
                                className="text-sm font-semibold text-slate-800 mb-4 outline-none"
                            >
                                {block.title}
                            </h3>
                        )}
                        <ChartRenderer type={block.chartType} data={block.data} />
                    </div>
                )}

                {block.type === 'table' && (
                    <div className="my-4 bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors relative">
                        {isHovered && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur text-white rounded-full px-3 py-1.5 text-xs z-10">
                                <span className="font-mono text-slate-400">@{block.id}</span>
                            </div>
                        )}
                        {block.title && (
                            <h3
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={handleTitleChange}
                                className="text-sm font-semibold text-slate-800 mb-4 outline-none"
                            >
                                {block.title}
                            </h3>
                        )}
                        <TableRenderer data={block.data} />
                    </div>
                )}

                {/* Right Controls */}
                {isHovered && (
                    <div className="absolute -right-10 top-1 flex items-center gap-1">
                        <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                            <MoreHorizontal size={14} />
                        </button>
                        <button onClick={() => onDelete(block.id)} className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600">
                            <Trash2 size={14} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Component ---
const QuickBriefWorkspace = () => {
    const [blocks, setBlocks] = useState(initialBlocks);
    const [hoveredBlock, setHoveredBlock] = useState(null);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'ai', text: 'Welcome to your notebook! Click the + icon next to any block to reference it in chat.' }
    ]);
    const [showAddMenu, setShowAddMenu] = useState(false);

    const handleUpdateBlock = (id, updates) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
    };

    const handleDeleteBlock = (id) => {
        setBlocks(blocks.filter(b => b.id !== id));
    };

    const handleTagBlock = (id) => {
        setChatInput(prev => {
            const tag = `@${id}`;
            return prev.includes(tag) ? prev : `${prev} ${tag} `.trimStart();
        });
    };

    const handleChangeChartType = (id, newChartType) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, chartType: newChartType } : b));
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;
        const newMessage = { id: Date.now(), sender: 'user', text: chatInput };
        setChatMessages([...chatMessages, newMessage]);
        setChatInput('');

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: `I can help you with ${newMessage.text.match(/@\w+/g)?.join(', ') || 'your request'}. What would you like to know?`
            }]);
        }, 800);
    };

    const addBlock = (type) => {
        const newBlock = {
            id: `${type}_${Date.now()}`,
            type: type === 'bar' || type === 'line' || type === 'pie' || type === 'radar' ? 'chart' : type,
            chartType: type === 'bar' || type === 'line' || type === 'pie' || type === 'radar' ? type : undefined,
            data: type === 'table' || type === 'bar' || type === 'line' || type === 'pie' || type === 'radar' ? generateData(6) : undefined,
            content: type === 'text' ? 'Start typing...' : type === 'heading' ? 'New Heading' : undefined,
            level: type === 'heading' ? 2 : undefined,
            title: type === 'table' || type === 'bar' || type === 'line' || type === 'pie' || type === 'radar' ? 'New Chart' : undefined,
        };
        setBlocks([...blocks, newBlock]);
        setShowAddMenu(false);
    };



    // --- Helper for reordering ---
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    // Inside QuickBriefWorkspace component (replace existing return block start)
    return (
        <div className="flex h-screen bg-white">
            {/* Main Document Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-24 py-12">
                    {/* Document Content with Drag & Drop */}
                    <DragDropContext onDragEnd={(result) => {
                        if (!result.destination) return;
                        const reordered = reorder(blocks, result.source.index, result.destination.index);
                        setBlocks(reordered);
                    }}>
                        <Droppable droppableId="workspace-droppable">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {blocks.map((block, index) => (
                                        <Draggable key={block.id} draggableId={block.id} index={index}>
                                            {(providedDrag, snapshot) => (
                                                <div
                                                    ref={providedDrag.innerRef}
                                                    {...providedDrag.draggableProps}
                                                    {...providedDrag.dragHandleProps}
                                                >
                                                    <Block
                                                        block={block}
                                                        onUpdate={handleUpdateBlock}
                                                        onDelete={handleDeleteBlock}
                                                        onTag={handleTagBlock}
                                                        onChangeChartType={handleChangeChartType}
                                                        isHovered={hoveredBlock === block.id}
                                                        onHover={setHoveredBlock}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    {/* Add Block Button */}
                    <div className="relative mt-4">
                        <button
                            onClick={() => setShowAddMenu(!showAddMenu)}
                            className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm py-2 px-1 hover:bg-slate-50 rounded transition-colors w-full"
                        >
                            <Plus size={16} />
                            <span>Add a block</span>
                        </button>

                        {showAddMenu && (
                            <div className="absolute left-0 top-10 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-2 z-10">
                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-2 py-1 mb-1">Basic Blocks</div>
                                <button onClick={() => addBlock('text')} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded">
                                    <Type size={16} className="text-slate-400" />
                                    <div>
                                        <div className="text-sm font-medium text-slate-900">Text</div>
                                        <div className="text-xs text-slate-500">Plain text paragraph</div>
                                    </div>
                                </button>
                                <button onClick={() => addBlock('heading')} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded">
                                    <Heading1 size={16} className="text-slate-400" />
                                    <div>
                                        <div className="text-sm font-medium text-slate-900">Heading</div>
                                        <div className="text-xs text-slate-500">Section heading</div>
                                    </div>
                                </button>

                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-2 py-1 mb-1 mt-2">Charts</div>
                                <button onClick={() => addBlock('bar')} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded">
                                    <BarChart2 size={16} className="text-slate-400" />
                                    <div className="text-sm font-medium text-slate-900">Bar Chart</div>
                                </button>
                                <button onClick={() => addBlock('line')} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded">
                                    <Activity size={16} className="text-slate-400" />
                                    <div className="text-sm font-medium text-slate-900">Line Chart</div>
                                </button>
                                <button onClick={() => addBlock('pie')} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded">
                                    <PieIcon size={16} className="text-slate-400" />
                                    <div className="text-sm font-medium text-slate-900">Pie Chart</div>
                                </button>
                                <button onClick={() => addBlock('radar')} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded">
                                    <Grid3x3 size={16} className="text-slate-400" />
                                    <div className="text-sm font-medium text-slate-900">Radar Chart</div>
                                </button>
                                <button onClick={() => addBlock('table')} className="flex items-center gap-3 w-full text-left px-3 py-2 hover:bg-slate-50 rounded">
                                    <FileText size={16} className="text-slate-400" />
                                    <div className="text-sm font-medium text-slate-900">Table</div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Chat Sidebar */}
            <div className="w-96 border-l border-slate-200 flex flex-col bg-white">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <MessageSquare size={14} className="text-white" />
                        </div>
                        <span className="font-semibold text-slate-900 text-sm">Assistant</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                    {chatMessages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'user'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-slate-700 border border-slate-200'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-white">
                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask about your data..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        />
                        <button type="submit" className="absolute right-2 top-2 p-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                            <Send size={14} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuickBriefWorkspace;
