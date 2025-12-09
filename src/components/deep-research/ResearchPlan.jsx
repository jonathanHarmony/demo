import React from 'react';
import { FileText, ListFilter, Play, Edit2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

/**
 * ResearchPlan - Card displaying the proposed research plan
 */
export default function ResearchPlan({ plan, onStart, onEdit }) {
    if (!plan) return null;

    return (
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden mb-4">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200 bg-white flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <FileText className="w-4 h-4" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">{plan.title}</h3>
                    <p className="text-xs text-slate-500">Research Plan</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <ListFilter className="w-3 h-3" />
                        Proposed Steps
                    </div>
                    <div className="space-y-3 pl-1">
                        {plan.steps.map((step, idx) => (
                            <div key={idx} className="flex gap-3 text-sm">
                                <span className="text-slate-400 font-mono text-xs mt-0.5">({idx + 1})</span>
                                <span className="text-slate-700 leading-relaxed">{step}</span>
                            </div>
                        ))}
                        <button className="text-blue-600 text-sm font-medium hover:underline pl-7">
                            More
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="px-5 py-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                    className="text-slate-600"
                >
                    <Edit2 className="w-3.5 h-3.5 mr-2" />
                    Edit plan
                </Button>
                <Button
                    size="sm"
                    onClick={onStart}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                    <Play className="w-3.5 h-3.5 mr-2" />
                    Start research
                </Button>
            </div>
        </div>
    );
}
