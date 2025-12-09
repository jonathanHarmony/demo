import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    Save, FileDown, FileText, Printer, Download,
    AlignLeft, Type, BarChart2, Bot, GripVertical,
    Database, Columns, LayoutGrid, Maximize2, Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SafeComponentRenderer from "../reports/SafeComponentRenderer";

/**
 * NotebookView - Fully Interactive Visual Workspace
 * Replicates QuickBriefWorkspace features exactly
 */
export default function NotebookView({ content, onAddBlock, onSelectBlock }) {
    const [reportComponents, setReportComponents] = useState([]);
    const [activeComponentId, setActiveComponentId] = useState(null);

    // Initialize components from content
    useEffect(() => {
        if (content && reportComponents.length === 0) {
            const initialComponents = [];

            // Title
            initialComponents.push({
                id: 'comp_title',
                title: 'Report Title',
                width: 'full',
                visualization: { type: 'headline' },
                result: { visualization_data: content.title }
            });

            // Summary
            if (content.executiveSummary || content.summary) {
                initialComponents.push({
                    id: 'comp_summary',
                    title: 'Executive Summary',
                    width: 'full',
                    visualization: { type: 'text' },
                    result: {
                        visualization_data: { content: (content.executiveSummary?.text || content.summary) }
                    }
                });
            }

            // Market Share Chart (Mock)
            if (content.marketShare) {
                initialComponents.push({
                    id: 'comp_market_share',
                    title: 'Market Share Analysis',
                    width: 'half',
                    visualization: { type: 'pie' },
                    result: {
                        visualization_data: {
                            items: content.marketShare
                        },
                        narrative: "Harmony AI has captured 15% of the market in just 12 months, disrupting legacy players."
                    }
                });
            }

            // Growth Chart (Mock)
            if (content.growthTrend) {
                initialComponents.push({
                    id: 'comp_growth',
                    title: 'Growth Trajectory',
                    width: 'half',
                    visualization: { type: 'line' },
                    result: {
                        visualization_data: {
                            items: content.growthTrend
                        },
                        narrative: "Projected growth indicates a 300% increase in user adoption by Q4 2025."
                    }
                });
            }

            // Findings
            if (content.findings) {
                content.findings.forEach((finding, idx) => {
                    initialComponents.push({
                        id: `comp_finding_${idx}`,
                        title: `Key Finding ${idx + 1}`,
                        width: 'half',
                        visualization: { type: 'text' },
                        result: {
                            visualization_data: {
                                content: finding.segments?.map(s => {
                                    if (s.citation) {
                                        return `${s.text} [${s.citation.number}]`;
                                    }
                                    return s.text;
                                }).join('') || finding
                            }
                        }
                    });
                });
            }

            // Sections
            if (content.sections) {
                content.sections.forEach((section, idx) => {
                    initialComponents.push({
                        id: `comp_section_${idx}`,
                        title: section.title,
                        width: 'half',
                        visualization: { type: 'text' },
                        result: {
                            visualization_data: {
                                content: section.content
                            }
                        }
                    });
                });
            }

            setReportComponents(initialComponents);
        }
    }, [content]);

    // Update active component when clicked
    const handleBlockClick = (id) => {
        setActiveComponentId(id);
        if (onSelectBlock) {
            const block = reportComponents.find(c => c.id === id);
            onSelectBlock(block);
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(reportComponents);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setReportComponents(items);
    };

    const updateComponentWidth = (id, width) => {
        setReportComponents(prev => prev.map(c => c.id === id ? { ...c, width } : c));
    };

    const updateComponentConfig = (id, key, value) => {
        setReportComponents(prev => prev.map(c => {
            if (c.id !== id) return c;
            if (key === 'visualization_type') {
                return { ...c, visualization: { ...c.visualization, type: value } };
            }
            return { ...c, [key]: value };
        }));
    };

    const insertComponent = (index, type) => {
        const newId = `comp_${Date.now()}`;
        const newComponent = {
            id: newId,
            title: type === 'headline' ? 'New Section' : 'New Component',
            width: type === 'headline' || type === 'text' ? 'full' : 'half',
            visualization: { type: type },
            result: {
                visualization_data: type === 'headline' ? "New Section Title" :
                    type === 'text' ? { content: "Add your analysis or findings here..." } :
                        null
            }
        };
        const items = Array.from(reportComponents);
        items.splice(index, 0, newComponent);
        setReportComponents(items);
        handleBlockClick(newId);
    };

    if (!content) return null;

    return (
        <div className="h-full overflow-y-auto bg-[#FAFAFA] p-6">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Toolbar */}
                <div className="sticky top-0 z-20 bg-[#FAFAFA]/95 backdrop-blur py-2 mb-6 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Research Notebook</h2>
                        <p className="text-xs text-slate-500">Interactive Workspace</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-slate-500">
                            <Save className="w-4 h-4 mr-2" />
                            Save View
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="default" size="sm" className="bg-slate-900 text-white hover:bg-slate-800 h-8">
                                    <FileDown className="w-4 h-4 mr-2" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuItem className="gap-2">
                                    <FileText className="w-4 h-4" />
                                    <span>Download as PDF</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2">
                                    <Printer className="w-4 h-4" />
                                    <span>Print Report</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Page Guides */}
                <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-0 overflow-hidden opacity-10">
                    <div className="w-full border-b border-dashed border-slate-900 absolute top-[1000px]" />
                    <div className="w-full border-b border-dashed border-slate-900 absolute top-[2000px]" />
                </div>

                {/* Grid */}
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="report-components" direction="vertical">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="grid grid-cols-12 gap-4 pb-20"
                            >
                                {reportComponents.map((component, index) => {
                                    const width = component.width || 'full';
                                    const colSpan = width === 'full' ? 'col-span-12' : width === 'half' ? 'col-span-6' : 'col-span-4';

                                    return (
                                        <Draggable key={component.id} draggableId={component.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`${colSpan} relative`}
                                                    style={{ ...provided.draggableProps.style }}
                                                    onClick={() => handleBlockClick(component.id)}
                                                >
                                                    {/* Insert Zone */}
                                                    <div className="h-4 -mt-2 -mb-2 relative z-30 group/insert opacity-0 hover:opacity-100 transition-opacity">
                                                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-teal-500/50" />
                                                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-1 bg-white shadow-sm border border-slate-200 rounded-full p-1 scale-90 hover:scale-100">
                                                            <button onClick={(e) => { e.stopPropagation(); insertComponent(index, 'text'); }} className="p-1 hover:bg-slate-100 rounded-full text-slate-500" title="Add Text"><AlignLeft className="w-3.5 h-3.5" /></button>
                                                            <button onClick={(e) => { e.stopPropagation(); insertComponent(index, 'headline'); }} className="p-1 hover:bg-slate-100 rounded-full text-slate-500" title="Add Headline"><Type className="w-3.5 h-3.5" /></button>
                                                            <button onClick={(e) => { e.stopPropagation(); insertComponent(index, 'bar'); }} className="p-1 hover:bg-slate-100 rounded-full text-slate-500" title="Add Chart"><BarChart2 className="w-3.5 h-3.5" /></button>
                                                        </div>
                                                    </div>

                                                    {/* Component Card */}
                                                    <div className={`group relative transition-all rounded-xl z-0 my-2 ${['headline', 'text'].includes(component.visualization?.type)
                                                        ? 'bg-transparent'
                                                        : `bg-white border ${activeComponentId === component.id ? 'border-teal-500 shadow-md ring-1 ring-teal-500' : 'border-slate-200 shadow-sm'}`
                                                        } ${snapshot.isDragging ? 'shadow-xl z-50 bg-white ring-2 ring-teal-500/20' : ''}`}>

                                                        {/* Hover Controls */}
                                                        <div className={`absolute -top-9 left-0 right-0 h-9 flex items-center justify-between px-3 bg-white border-x border-t border-slate-200 rounded-t-lg shadow-sm z-20 transition-all duration-200 ${snapshot.isDragging || activeComponentId === component.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                                                            }`}>
                                                            <div className="flex items-center gap-2">
                                                                <div {...provided.dragHandleProps} className="p-1 hover:bg-slate-100 rounded cursor-grab active:cursor-grabbing text-slate-400">
                                                                    <GripVertical className="w-4 h-4" />
                                                                </div>
                                                                <div className="h-4 w-px bg-slate-200 mx-1" />

                                                                <Select
                                                                    value={component.visualization?.type || 'text'}
                                                                    onValueChange={(v) => updateComponentConfig(component.id, 'visualization_type', v)}
                                                                >
                                                                    <SelectTrigger className="h-6 text-[10px] px-2 gap-1.5 w-auto min-w-[90px] border-none shadow-none bg-transparent hover:bg-slate-50">
                                                                        <BarChart2 className="w-3 h-3 text-slate-500" />
                                                                        <SelectValue placeholder="Visual" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="bar">Bar Chart</SelectItem>
                                                                        <SelectItem value="line">Line Chart</SelectItem>
                                                                        <SelectItem value="pie">Pie Chart</SelectItem>
                                                                        <SelectItem value="text">Text Only</SelectItem>
                                                                        <SelectItem value="headline">Headline</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                            <div className="flex items-center gap-0.5">
                                                                <button onClick={(e) => { e.stopPropagation(); updateComponentWidth(component.id, 'third'); }} className={`p-1 rounded ${width === 'third' ? 'text-slate-900 bg-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}><Columns className="w-3.5 h-3.5" /></button>
                                                                <button onClick={(e) => { e.stopPropagation(); updateComponentWidth(component.id, 'half'); }} className={`p-1 rounded ${width === 'half' ? 'text-slate-900 bg-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}><LayoutGrid className="w-3.5 h-3.5" /></button>
                                                                <button onClick={(e) => { e.stopPropagation(); updateComponentWidth(component.id, 'full'); }} className={`p-1 rounded ${width === 'full' ? 'text-slate-900 bg-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}><Maximize2 className="w-3.5 h-3.5" /></button>
                                                            </div>
                                                        </div>

                                                        {/* Content Renderer */}
                                                        <div className="p-6">
                                                            <SafeComponentRenderer component={component} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}

                                {/* Add New Block Card */}
                                <div className="col-span-6 min-h-[200px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-teal-500 hover:text-teal-500 hover:bg-teal-50/50 transition-all cursor-pointer group"
                                    onClick={onAddBlock}
                                >
                                    <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-teal-100 flex items-center justify-center mb-3 transition-colors">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium">Add Research Block</span>
                                    <span className="text-sm opacity-70 mt-1">Ask a question to generate new insights</span>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}
