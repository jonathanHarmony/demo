import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

/**
 * ResearchDocument - Rich Text Document with Active Citations
 * Text-first research paper experience with evidence popovers
 */
export default function ResearchDocument({ content, onVisualize }) {
    const [hoveredCitation, setHoveredCitation] = useState(null);

    if (!content) return null;

    // Citation component with popover
    const Citation = ({ number, source }) => (
        <Popover>
            <PopoverTrigger asChild>
                <sup
                    className="citation text-purple-600 cursor-pointer hover:text-purple-700 font-medium mx-0.5"
                    onMouseEnter={() => setHoveredCitation(number)}
                    onMouseLeave={() => setHoveredCitation(null)}
                >
                    [{number}]
                </sup>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" side="top">
                <div className="space-y-2">
                    <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-medium">
                            {number}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-slate-900 mb-1">
                                {source.platform}
                            </div>
                            <div className="text-xs text-slate-600 italic leading-relaxed">
                                "{source.quote}"
                            </div>
                            <div className="text-xs text-slate-400 mt-2">
                                {source.author} • {source.date}
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );

    return (
        <div className="relative h-full flex flex-col bg-[#FAFAFA]" dir="rtl">
            {/* Sticky Header with Studio Button */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-medium text-slate-900 text-right">Research Report</h2>
                    <p className="text-xs text-slate-500 text-right">Reading & Evidence Mode</p>
                </div>
                <button
                    onClick={onVisualize}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                >
                    <Sparkles className="w-4 h-4" />
                    Open Studio
                </button>
            </div>

            {/* Document Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-12 py-8">
                <article className="max-w-3xl mx-auto prose prose-slate">
                    {/* Title - Serif Font */}
                    <h1 className="text-4xl font-serif text-slate-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {content.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-slate-600 mb-8 font-normal">
                        {content.subtitle}
                    </p>

                    {/* Main Content - Continuous Prose */}
                    <div className="space-y-6 text-slate-800 leading-relaxed">
                        {/* Executive Summary Section */}
                        <section>
                            <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Executive Summary
                            </h2>
                            <p className="text-base leading-relaxed">
                                {content.executiveSummary.text}
                                {content.executiveSummary.citations?.map((citation, i) => (
                                    <Citation key={i} number={citation.number} source={citation.source} />
                                ))}
                            </p>
                        </section>

                        {/* Findings Section */}
                        <section>
                            <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Key Findings
                            </h2>

                            {content.findings.map((finding, index) => (
                                <p key={index} className="text-base leading-relaxed mb-4">
                                    {finding.segments.map((segment, segIndex) => (
                                        <React.Fragment key={segIndex}>
                                            {segment.text}
                                            {segment.citation && (
                                                <Citation number={segment.citation.number} source={segment.citation.source} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>
                            ))}
                        </section>

                        {/* Analysis Section */}
                        <section>
                            <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Detailed Analysis
                            </h2>

                            {content.analysis?.map((paragraph, index) => (
                                <p key={index} className="text-base leading-relaxed mb-4">
                                    {paragraph.segments.map((segment, segIndex) => (
                                        <React.Fragment key={segIndex}>
                                            {segment.text}
                                            {segment.citation && (
                                                <Citation number={segment.citation.number} source={segment.citation.source} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>
                            ))}
                        </section>

                        {/* Recommendations */}
                        <section>
                            <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Strategic Recommendations
                            </h2>

                            {content.recommendations?.map((rec, index) => (
                                <p key={index} className="text-base leading-relaxed mb-4">
                                    {rec.segments.map((segment, segIndex) => (
                                        <React.Fragment key={segIndex}>
                                            {segment.text}
                                            {segment.citation && (
                                                <Citation number={segment.citation.number} source={segment.citation.source} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </p>
                            ))}
                        </section>
                    </div>
                </article>
            </div>
        </div>
    );
}
