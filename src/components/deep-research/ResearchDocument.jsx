import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
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
        <div className="relative h-full flex flex-col bg-[#FAFAFA]">
            {/* Sticky Header with Studio Button */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-medium text-slate-900">Research Report</h2>
                    <p className="text-xs text-slate-500">Reading & Evidence Mode</p>
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
                    {content.subtitle && (
                        <p className="text-lg text-slate-600 mb-8 font-normal">
                            {content.subtitle}
                        </p>
                    )}

                    {/* Main Content - Continuous Prose */}
                    <div className="space-y-6 text-slate-800 leading-relaxed">

                        {/* Summary */}
                        {(content.summary || content.executiveSummary) && (
                            <section>
                                <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Executive Summary
                                </h2>
                                <div className="text-base leading-relaxed">
                                    <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                        {typeof content.summary === 'string' ? content.summary : content.executiveSummary?.text}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        )}

                        {/* Findings Section */}
                        {content.findings && content.findings.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Key Findings
                                </h2>
                                {content.findings.map((finding, index) => (
                                    <div key={index} className="text-base leading-relaxed mb-4">
                                        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                            {typeof finding === 'string' ? finding : finding.segments.map(s => s.text).join('')}
                                        </ReactMarkdown>
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* Dynamic Sections */}
                        {content.sections && content.sections.map((section, index) => (
                            <section key={index}>
                                <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    {section.title}
                                </h2>
                                <div className="text-base leading-relaxed markdown-content">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkBreaks]}
                                        components={{
                                            h3: ({ node, ...props }) => <h3 className="text-xl font-medium mt-6 mb-2 text-slate-900" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
                                            li: ({ node, ...props }) => <li className="text-slate-800" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-4 text-slate-800" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900" {...props} />
                                        }}
                                    >
                                        {section.content}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        ))}

                        {/* Legacy Analysis Section (fallback) */}
                        {content.analysis && !content.sections && (
                            <section>
                                <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Detailed Analysis
                                </h2>
                                {content.analysis.map((paragraph, index) => (
                                    <p key={index} className="text-base leading-relaxed mb-4">
                                        {paragraph.segments.map(s => s.text).join('')}
                                    </p>
                                ))}
                            </section>
                        )}

                        {/* Legacy Recommendations Section (fallback) */}
                        {content.recommendations && !content.sections && (
                            <section>
                                <h2 className="text-2xl font-serif text-slate-900 mt-8 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Strategic Recommendations
                                </h2>
                                {content.recommendations.map((paragraph, index) => (
                                    <p key={index} className="text-base leading-relaxed mb-4">
                                        {paragraph.segments.map(s => s.text).join('')}
                                    </p>
                                ))}
                            </section>
                        )}

                    </div>
                </article>
            </div>
        </div>
    );
}
