import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, FileText, Pen, Loader2, ChevronRight } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * ThinkingStream - Vertical Timeline Component
 * 
 * Displays the agent's thinking process as a timeline with:
 * - Step-by-step status indicators
 * - Icons for each step type
 * - Loading states for active steps
 * - Interactive tooltips with data previews
 */
export default function ThinkingStream({ steps = [] }) {
    const scrollRef = useRef(null);

    // Auto-scroll to latest step
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [steps.length]);

    const getStepIcon = (type) => {
        switch (type) {
            case 'planning':
                return Brain;
            case 'sourcing':
                return Search;
            case 'reading':
                return FileText;
            case 'synthesizing':
                return Pen;
            default:
                return Brain;
        }
    };

    const getStepColor = (status) => {
        switch (status) {
            case 'complete':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'active':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'pending':
                return 'text-slate-400 bg-slate-50 border-slate-200';
            default:
                return 'text-slate-400 bg-slate-50 border-slate-200';
        }
    };

    return (
        <div className="space-y-3">
            {steps.map((step, index) => {
                const Icon = getStepIcon(step.type);
                const colorClass = getStepColor(step.status);
                const isLast = index === steps.length - 1;

                return (
                    <div key={step.id} className="relative">
                        {/* Connecting Line */}
                        {!isLast && (
                            <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200" />
                        )}

                        {/* Step Card */}
                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative bg-white border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${step.status === 'active' ? 'ring-2 ring-blue-200' : ''
                                            }`}
                                    >
                                        {/* Step Header */}
                                        <div className="flex items-start gap-3">
                                            {/* Icon */}
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${colorClass}`}>
                                                {step.status === 'active' ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <Icon className="w-5 h-5" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h4 className="text-sm font-semibold text-slate-900">
                                                        {step.title}
                                                    </h4>
                                                    {step.status === 'complete' && (
                                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-600 mt-0.5">
                                                    {step.description}
                                                </p>

                                                {/* Progress indicator for active step */}
                                                {step.status === 'active' && step.progress && (
                                                    <div className="mt-2">
                                                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                                            <span>{step.progress.label}</span>
                                                            <span>{step.progress.current} / {step.progress.total}</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className="h-full bg-blue-500 rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(step.progress.current / step.progress.total) * 100}%` }}
                                                                transition={{ duration: 0.3 }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </TooltipTrigger>

                                {/* Tooltip with Data Preview */}
                                {step.preview && (
                                    <TooltipContent side="right" className="max-w-sm">
                                        <div className="space-y-2">
                                            <div className="font-medium text-sm">{step.preview.title}</div>
                                            <div className="text-xs text-slate-600 leading-relaxed">
                                                {step.preview.content}
                                            </div>
                                            {step.preview.items && (
                                                <div className="mt-2 space-y-1">
                                                    {step.preview.items.slice(0, 3).map((item, i) => (
                                                        <div key={i} className="text-xs text-slate-500 flex items-start gap-2">
                                                            <span className="text-blue-500">•</span>
                                                            <span className="flex-1">{item}</span>
                                                        </div>
                                                    ))}
                                                    {step.preview.items.length > 3 && (
                                                        <div className="text-xs text-slate-400 italic">
                                                            +{step.preview.items.length - 3} more...
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                );
            })}
            <div ref={scrollRef} />
        </div>
    );
}
