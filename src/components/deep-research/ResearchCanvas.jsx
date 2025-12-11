import React from 'react';
import { motion } from 'framer-motion';

/**
 * ResearchCanvas - Right Panel (70% width)
 * 
 * Displays:
 * - Skeleton loader during analysis
 * - Structured document in text mode
 * - Visual notebook in block mode
 */
export default function ResearchCanvas({
    isLoading = false,
    children,
}) {
    return (
        <div className="h-full overflow-y-auto bg-slate-50" dir="rtl">
            {isLoading ? (
                <SkeletonLoader />
            ) : (
                <div className="p-8 text-right" dir="rtl">
                    {children}
                </div>
            )}
        </div>
    );
}

/**
 * SkeletonLoader - Shimmer effect for loading state
 */
function SkeletonLoader() {
    return (
        <div className="p-8 space-y-6 max-w-5xl mx-auto">
            {/* Title Skeleton */}
            <div className="space-y-3">
                <div className="h-10 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-lg w-3/4 animate-pulse"
                    style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                <div className="h-6 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-lg w-1/2 animate-pulse"
                    style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite', animationDelay: '0.1s' }} />
            </div>

            {/* Content Blocks */}
            {[1, 2, 3].map((block) => (
                <motion.div
                    key={block}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: block * 0.1 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4"
                >
                    {/* Block Header */}
                    <div className="space-y-2">
                        <div className="h-6 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded w-1/3"
                            style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                        <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded w-1/2"
                            style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite', animationDelay: '0.2s' }} />
                    </div>

                    {/* Block Content Lines */}
                    <div className="space-y-3 pt-2">
                        {[1, 2, 3, 4].map((line) => (
                            <div
                                key={line}
                                className="h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded"
                                style={{
                                    width: line === 4 ? '60%' : '100%',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer 2s infinite',
                                    animationDelay: `${line * 0.1}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Chart Placeholder */}
                    {block === 2 && (
                        <div className="mt-4 h-48 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-xl"
                            style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                    )}
                </motion.div>
            ))}

            {/* Add shimmer keyframes to global styles */}
            <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </div>
    );
}
