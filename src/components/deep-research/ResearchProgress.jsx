import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle2, Circle, Loader2, FileText, ArrowRight } from 'lucide-react';

/**
 * ResearchProgress - Visualizes the active research process
 */
export default function ResearchProgress({ plan, currentStepIndex = 0, visitedSites = [] }) {
    if (!plan) return null;

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Researching in progress...
                </div>
                <h1 className="text-2xl font-serif font-medium text-slate-900">
                    {plan.title}
                </h1>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
                {plan.steps.map((step, idx) => {
                    const isActive = idx === currentStepIndex;
                    const isComplete = idx < currentStepIndex;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-4 rounded-xl border transition-colors ${isActive
                                    ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-50'
                                    : isComplete
                                        ? 'bg-slate-50 border-slate-100'
                                        : 'bg-white border-slate-100 opacity-60'
                                }`}
                        >
                            <div className="flex gap-4">
                                <div className="mt-0.5">
                                    {isComplete ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : isActive ? (
                                        <div className="relative">
                                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    ) : (
                                        <Circle className="w-5 h-5 text-slate-300" />
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className={`font-medium ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                                        {step.title || step}
                                    </h3>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm text-slate-500"
                                        >
                                            Analyzing sources and extracting key insights...
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Visited Sites */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    <Globe className="w-4 h-4 text-slate-500" />
                    Researching websites
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {visitedSites.map((site, idx) => (
                        <motion.a
                            key={idx}
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all group"
                        >
                            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500 text-xs font-bold uppercase">
                                {site.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                                    {site.name}
                                </div>
                                <div className="text-xs text-slate-500 truncate">
                                    {site.url}
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-400 -ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                        </motion.a>
                    ))}

                    {/* Loading placeholders */}
                    {[1, 2].map((i) => (
                        <div key={`skeleton-${i}`} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 rounded bg-slate-200 animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                                <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
