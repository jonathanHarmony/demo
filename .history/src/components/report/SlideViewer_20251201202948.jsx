import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    LabelList
} from 'recharts';
import {
    MessageCircle, ThumbsUp, ThumbsDown, Minus, Activity,
    TrendingUp, Users, Globe, Award, FileText, Presentation, Check, X, AlertTriangle, Info
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Minimalist Color Palette (Grayscale/Monochrome)
const COLORS = ['#1e293b', '#475569', '#64748b', '#94a3b8', '#cbd5e1'];

const Placeholder = ({ className }) => (
    <div className={`bg-slate-100 border border-slate-200 flex items-center justify-center ${className}`}>
        <span className="text-slate-400 text-sm uppercase tracking-widest font-medium">Placeholder</span>
    </div>
);

const CustomTooltip = ({ active, payload, label, unit = '' }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-slate-200 shadow-sm">
                <p className="font-bold text-slate-900 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm text-slate-600">
                        {entry.name}: {entry.value}{unit}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function SlideViewer({ slide, index, total }) {
    switch (slide.type) {
        case 'title':
            return (
                <div className="flex h-[600px] w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden">
                    <div className="w-1/2 flex flex-col justify-center pl-12 bg-slate-50">
                        <div className="w-24 h-0.5 bg-slate-900 mb-8"></div>
                        <h1 className="text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                            {slide.title}
                        </h1>
                        <div className="w-full h-px bg-slate-200 mb-6"></div>
                        <p className="text-2xl text-slate-500 font-light tracking-wide">
                            {slide.subtitle}
                        </p>
                        {slide.footer && (
                            <p className="mt-12 text-sm text-slate-400 max-w-md leading-relaxed">
                                {slide.footer}
                            </p>
                        )}
                    </div>
                    <div className="w-1/2 h-full relative">
                        {slide.image ? (
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover grayscale" />
                        ) : (
                            <Placeholder className="w-full h-full" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent opacity-50" />
                    </div>
                </div>
            );

        case 'text':
            return (
                <div className="flex h-[500px] w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8 gap-12">
                    <div className="w-1/2 flex flex-col justify-center">
                        <div className="border-b border-slate-900 pb-6 mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                        </div>
                        <div className="space-y-6">
                            {slide.content.map((item, idx) => (
                                <div key={idx}>
                                    {item.type === 'bullet' && (
                                        <div className="flex items-start gap-4">
                                            <div className="mt-2.5 w-1.5 h-1.5 bg-slate-900 shrink-0"></div>
                                            <p className="text-lg text-slate-700 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    )}
                                    {item.type === 'text' && (
                                        <p className="text-lg text-slate-700 leading-relaxed">
                                            {item.text}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex items-center">
                        {slide.image ? (
                            <img src={slide.image} alt={slide.title} className="w-full aspect-square object-cover grayscale rounded-lg" />
                        ) : (
                            <Placeholder className="w-full aspect-square rounded-lg" />
                        )}
                    </div>
                </div>
            );

        case 'table':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-900 pb-6 mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                        {slide.subtitle && <p className="text-slate-500 mt-2 text-lg">{slide.subtitle}</p>}
                    </div>
                    <div className="overflow-hidden">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="border-b border-slate-900">
                                    {slide.columns.map((col, idx) => (
                                        <th key={idx} className="py-4 px-4 text-slate-900 font-bold text-lg tracking-wide">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {slide.data.map((row, idx) => (
                                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        {slide.columns.map((col, colIdx) => (
                                            <td key={colIdx} className="py-4 px-4 text-slate-700 text-lg">
                                                {row[col]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

        case 'methodology':
            return (
                <div className="flex h-[500px] w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8 gap-12">
                    <div className="w-1/2 flex flex-col justify-center">
                        <div className="border-b border-slate-900 pb-6 mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                        </div>
                        <div className="space-y-6">
                            {slide.points.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="mt-2.5 w-1.5 h-1.5 bg-slate-900 shrink-0"></div>
                                    <p className="text-lg text-slate-700 leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2 h-full flex items-center">
                        {slide.image ? (
                            <img src={slide.image} alt={slide.title} className="w-full aspect-[4/3] object-cover grayscale rounded-lg" />
                        ) : (
                            <Placeholder className="w-full aspect-[4/3] rounded-lg" />
                        )}
                    </div>
                </div>
            );

        case 'agenda':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-900 pb-6 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                        {slide.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-6 group">
                                <span className="text-sm font-mono text-slate-400 group-hover:text-slate-900 transition-colors">
                                    {(idx + 1).toString().padStart(2, '0')}
                                </span>
                                <span className="text-xl text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'problem_statement':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-900 pb-6 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        {slide.blocks.map((block, idx) => (
                            <div key={idx} className="border border-slate-200 p-8 flex flex-col justify-between hover:border-slate-900 transition-colors duration-300 h-64">
                                <span className="text-5xl font-bold text-slate-100">{block.title}</span>
                                <p className="text-xl font-bold text-slate-900 leading-tight">{block.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'framework':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-200 pb-6 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="flex flex-col gap-4 justify-center">
                        {slide.steps.map((step, idx) => (
                            <div key={idx} className="border border-slate-200 p-6 flex items-center gap-6 hover:border-slate-900 transition-colors duration-300 bg-slate-50">
                                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                                <span className="text-xl font-light text-slate-800">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'qualitative_grid':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-200 pb-6 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        {slide.items.map((item, idx) => (
                            <div key={idx} className="border border-slate-200 p-8 flex flex-col gap-6 bg-white hover:shadow-sm transition-shadow">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover grayscale rounded"
                                    />
                                ) : (
                                    <Placeholder className="w-full h-48 rounded" />
                                )}
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-lg text-slate-500 font-serif italic">{item.quote}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'sentiment_pie':
            if (!slide.data || slide.data.length === 0) return null;
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-200 pb-6 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div style={{ width: '100%', height: '500px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={slide.data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={180}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="#fff"
                                    strokeWidth={2}
                                >
                                    {slide.data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    <LabelList
                                        dataKey="value"
                                        position="inside"
                                        fill="#ffffff"
                                        fontSize={24}
                                        fontWeight="bold"
                                        formatter={(val) => `${val}%`}
                                    />
                                </Pie>
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    iconType="square"
                                    iconSize={16}
                                    wrapperStyle={{ paddingLeft: '40px' }}
                                    formatter={(value) => <span className="text-lg text-slate-900 font-medium tracking-wide">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            );

        case 'satisfaction_bar':
            if (!slide.data || slide.data.length === 0) return null;
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-200 pb-6 mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div style={{ width: '100%', height: '500px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={slide.data} barSize={120} margin={{ top: 40, right: 30, left: 30, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#64748b"
                                    tick={{ fill: '#1e293b', fontSize: 24, fontWeight: 'bold', dy: 10 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    tick={{ fill: '#64748b', fontSize: 16 }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={[0, 12]}
                                    hide={true}
                                />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {slide.data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    <LabelList
                                        dataKey="value"
                                        position="top"
                                        fill="#1e293b"
                                        fontSize={32}
                                        fontWeight="bold"
                                        formatter={(val) => `${val}%`}
                                        dy={-15}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            );

        case 'negative_bar':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-200 pb-6 mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="flex flex-col justify-center gap-8">
                        {slide.data.map((item, idx) => (
                            <div key={idx} className="mb-4">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xl font-bold text-slate-900">{item.name}</span>
                                    <span className="text-2xl font-bold text-slate-900">{item.value}%</span>
                                </div>
                                <div className="w-full h-10 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: `${item.value}%`, backgroundColor: item.fill || '#1e293b' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'single_bar_metric':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-200 pb-6 mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center relative h-[500px]">
                        <div className="w-full max-w-2xl relative">
                            {/* Big Number Centered */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <span className="text-8xl font-bold text-slate-900 drop-shadow-md">{slide.value}</span>
                            </div>

                            {/* Single Bar Background */}
                            <div className="w-full h-64 rounded-xl overflow-hidden relative opacity-90" style={{ backgroundColor: slide.barColor }}>
                            </div>

                            {/* Subtitle / Description */}
                            <div className="mt-8 text-center">
                                <p className="text-2xl font-bold text-slate-700 mb-2">{slide.subtitle}</p>
                                {slide.description && (
                                    <p className="text-xl text-slate-500">{slide.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'columns':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-900 pb-6 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-16">
                        {slide.columns.map((col, idx) => (
                            <div key={idx} className="space-y-8">
                                <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">{col.title}</h3>
                                <ul className="space-y-6">
                                    {col.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${idx === 0 ? 'bg-slate-900' : 'bg-slate-400'}`}></div>
                                            <span className="text-lg text-slate-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    {slide.footer && (
                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <p className="text-lg text-slate-700 leading-relaxed">{slide.footer}</p>
                        </div>
                    )}
                </div>
            );

        case 'quote_grid':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-900 pb-6 mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {slide.quotes.map((quote, idx) => (
                            <div key={idx} className="bg-slate-50 p-8 flex flex-col justify-between relative overflow-hidden group hover:bg-white hover:shadow-sm transition-all duration-300 border border-transparent hover:border-slate-200 rounded-lg">
                                <div className="absolute top-4 right-4 text-6xl text-slate-200 font-serif opacity-50 group-hover:opacity-100 transition-opacity">"</div>
                                <p className="text-xl text-slate-700 leading-relaxed relative z-10 font-medium">
                                    {quote.text}
                                </p>
                                <div className="mt-6 flex items-center gap-2">
                                    {quote.type === 'positive' ? (
                                        <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                                    ) : (
                                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                    )}
                                    <span className="text-xs uppercase tracking-widest text-slate-400">
                                        {quote.type === 'positive' ? 'Positive' : 'Negative'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'impact':
            return (
                <div className="w-full bg-white shadow-sm border border-slate-200 rounded-xl overflow-hidden p-8">
                    <div className="border-b border-slate-900 pb-6 mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{slide.title}</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        {slide.sections.map((section, idx) => (
                            <div key={idx} className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">{section.title}</h3>
                                <ul className="space-y-4">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="text-lg text-slate-700 leading-relaxed border-l-2 border-slate-200 pl-4">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            );

        default:
            return (
                <div className="flex items-center justify-center h-64 bg-slate-50 rounded-xl text-slate-400">
                    Slide type not implemented: {slide.type}
                </div>
            );
    }
}
