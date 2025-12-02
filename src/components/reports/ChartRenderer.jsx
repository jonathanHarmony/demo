import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Maximize2, Minimize2, Download, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChartRenderer from "./ChartRenderer";
import NarrativeBlock from "./NarrativeBlock";
import ComponentQA from "./ComponentQA";

export default function ComponentRenderer({
    component,
    result,
    isLoading,
    onAskQuestion
}) {
    const [expanded, setExpanded] = useState(false);
    const [showQA, setShowQA] = useState(false);

    if (isLoading) {
        return (
            <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-48 bg-slate-100 rounded" />
                </div>
            </div>
        );
    }

    // Determine if we should show the standard widget header
    const isDocumentFlow = ['text', 'headline', 'prompt'].includes(component.visualization?.type);
    const showHeader = !isDocumentFlow;

    if (component.visualization?.type === 'prompt') {
        return (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-teal-100 rounded-lg shrink-0">
                        <Sparkles className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">AI Analysis Prompt</h3>
                        <p className="text-xs text-slate-500 mb-3">Ask Harmony to analyze data, compare trends, or summarize findings to add to your report.</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="e.g., Compare sentiment between Gen Z and Millennials..."
                                className="flex-1 text-sm px-3 py-2 rounded-md border border-slate-200 focus:border-teal-500 outline-none"
                            />
                            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                                <Send className="w-3.5 h-3.5 mr-2" />
                                Generate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            layout
            className={`${expanded ? 'col-span-full' : ''
                } ${isDocumentFlow ? '' : 'bg-white rounded-lg overflow-hidden h-full'}`}
        >
            {/* Widget Header - Only for charts/tables */}
            {showHeader && (
                <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800">{component.title}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                                {component.data_source}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowQA(!showQA)}
                            className="h-7 w-7 p-0 text-slate-400 hover:text-teal-600"
                        >
                            <MessageSquare className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpanded(!expanded)}
                            className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600"
                        >
                            {expanded ? (
                                <Minimize2 className="w-3.5 h-3.5" />
                            ) : (
                                <Maximize2 className="w-3.5 h-3.5" />
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className={isDocumentFlow ? 'py-2 px-1' : 'p-4'}>
                {result?.visualization_data && (
                    <ChartRenderer
                        type={component.visualization?.type || 'bar'}
                        data={result.visualization_data}
                        config={component.visualization}
                    />
                )}

                {result?.narrative && component.narrative?.enabled && (
                    <NarrativeBlock
                        narrative={result.narrative}
                        mode={component.narrative.mode}
                    />
                )}

                {!result?.visualization_data && !result?.narrative && (
                    <div className="h-48 flex items-center justify-center text-sm text-slate-400">
                        No data available
                    </div>
                )}
            </div>

            {/* Q&A Panel */}
            {showQA && (
                <div className="border-t border-slate-100 bg-slate-50/50">
                    <ComponentQA
                        component={component}
                        result={result}
                        onAsk={onAskQuestion}
                    />
                </div>
            )}
        </motion.div>
    );
}
