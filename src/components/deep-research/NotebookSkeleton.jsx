import React from 'react';

export default function NotebookSkeleton() {
    return (
        <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header Skeleton */}
                <div className="space-y-2 mb-8">
                    <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse" />
                    <div className="h-4 w-1/4 bg-slate-200 rounded animate-pulse" />
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
                                <div className="h-5 w-1/2 bg-slate-200 rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                                <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
                                <div className="h-4 w-4/6 bg-slate-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
