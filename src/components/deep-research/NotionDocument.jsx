import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Mark, mergeAttributes } from '@tiptap/core';
import { Sparkles, FileText } from 'lucide-react';

// Custom Citation Mark Extension
const CitationSpan = Mark.create({
    name: 'citationSpan',
    addAttributes() {
        return {
            source: {
                default: null,
                parseHTML: element => element.getAttribute('data-source'),
                renderHTML: attributes => {
                    return {
                        'data-source': attributes.source,
                    }
                },
            },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'span.citation-text',
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes, { class: 'citation-text' }), 0]
    },
});

// Mock sources for citations
const CITATION_SOURCES = [
    'Israel Ministry of Health – Oral Health Surveys',
    'WHO Oral Health Database',
    'OECD Health at a Glance',
    'Central Bureau of Statistics – Child Health Data',
    'Social Graph Facebook Analysis',
    'Amazon Customer Reviews',
    'Boots Customer Reviews',
];

// Citation Tooltip Component
const CitationTooltip = ({ x, y, source, visible }) => {
    if (!visible) return null;

    return (
        <div
            className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm text-gray-700 pointer-events-none"
            style={{
                left: x,
                top: y - 40,
                transform: 'translateX(-50%)',
            }}
        >
            <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span>{source}</span>
            </div>
        </div>
    );
};

/**
 * NotionDocument - Notion-style WYSIWYG editor using Tiptap
 * Provides true inline editing experience
 */
export default function NotionDocument({ content, onOpenStudio, onContentChange }) {
    const editorContainerRef = useRef(null);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, source: '' });

    // Handle hover events for tooltips
    const handleMouseOver = useCallback((e) => {
        const target = e.target.closest('.citation-text');
        if (target) {
            const rect = target.getBoundingClientRect();
            const source = target.getAttribute('data-source');
            setTooltip({
                visible: true,
                x: rect.left + rect.width / 2,
                y: rect.top,
                source: source
            });
        }
    }, []);

    const handleMouseOut = useCallback(() => {
        setTooltip(prev => ({ ...prev, visible: false }));
    }, []);

    // Format text with citations
    const addCitations = (text) => {
        let result = text;

        // Percentages
        result = result.replace(/(\d+(?:\.\d+)?%)/g, (match) => {
            const source = CITATION_SOURCES[Math.floor(Math.random() * CITATION_SOURCES.length)];
            return `<span class="citation-text" data-source="${source}">${match}</span>`;
        });

        // Age references
        result = result.replace(/(age[s]?\s+\d+(?:[–-]\d+)?)/gi, (match) => {
            const source = CITATION_SOURCES[Math.floor(Math.random() * CITATION_SOURCES.length)];
            return `<span class="citation-text" data-source="${source}">${match}</span>`;
        });

        return result;
    };

    // Convert structured content to HTML for Tiptap
    const contentToHTML = useCallback((data) => {
        if (!data) return '<p></p>';

        let html = '';

        // Title
        html += `<h1>${data.title || ''}</h1>`;

        // Subtitle
        if (data.subtitle) {
            html += `<p class="subtitle">${data.subtitle}</p>`;
        }

        // Executive Summary (reduced top margin via inline style handled in CSS)
        if (data.summary) {
            html += '<h2 class="first-section">Executive Summary</h2>';
            // Convert markdown paragraphs to HTML
            const paragraphs = data.summary.split(/\n\n+/);
            paragraphs.forEach(p => {
                let formatted = p.trim()
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                formatted = addCitations(formatted);
                if (formatted) {
                    html += `<p>${formatted}</p>`;
                }
            });
        }

        // Divider
        html += '<hr />';

        // Process a content block (handles ### headers, bullets, and paragraphs)
        const processContentBlock = (contentText) => {
            let result = '';
            const lines = contentText.split('\n');
            let inList = false;
            let listItems = [];

            const flushList = () => {
                if (listItems.length > 0) {
                    result += '<ul>';
                    listItems.forEach(item => {
                        result += `<li><p>${item}</p></li>`;
                    });
                    result += '</ul>';
                    listItems = [];
                }
                inList = false;
            };

            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (!trimmedLine) {
                    flushList();
                    return;
                }

                // Check if it's a ### header
                if (trimmedLine.startsWith('### ')) {
                    flushList();
                    let headerText = trimmedLine.substring(4)
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    headerText = addCitations(headerText);
                    result += `<h3>${headerText}</h3>`;
                }
                // Check if it's a bullet point (• or -)
                else if (trimmedLine.match(/^[•\-]\s/)) {
                    inList = true;
                    let itemText = trimmedLine.replace(/^[•\-]\s*/, '')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    itemText = addCitations(itemText);
                    listItems.push(itemText);
                }
                // Regular text line
                else {
                    flushList();
                    let formatted = trimmedLine
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    formatted = addCitations(formatted);
                    result += `<p>${formatted}</p>`;
                }
            });

            flushList(); // Flush any remaining list items
            return result;
        };

        // Sections
        if (data.sections && data.sections.length > 0) {
            data.sections.forEach((section, index) => {
                html += `<h2>${section.title}</h2>`;
                html += processContentBlock(section.content);

                // Add divider between sections
                if (index < data.sections.length - 1) {
                    html += '<hr />';
                }
            });
        }

        return html;
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder: 'Start writing...',
            }),
            CitationSpan,
        ],
        content: contentToHTML(content),
        editorProps: {
            attributes: {
                class: 'notion-editor outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            onContentChange?.(editor.getHTML());
        },
    });

    // Update editor when content prop changes
    useEffect(() => {
        if (editor && content) {
            const newHTML = contentToHTML(content);
            // Only update if significantly different to avoid cursor jumping
            if (editor.isEmpty) {
                editor.commands.setContent(newHTML);
            }
        }
    }, [content, editor, contentToHTML]);

    if (!editor) {
        return null;
    }

    return (
        <div
            className="h-full bg-[#f8f9fa] flex flex-col relative"
            ref={editorContainerRef}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <CitationTooltip {...tooltip} />

            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#f8f9fa] border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-medium text-gray-900">Research Canvas</h2>
                    <p className="text-xs text-gray-500">Click anywhere to edit</p>
                </div>
                <button
                    onClick={onOpenStudio}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-white transition-colors text-xs font-medium"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    Studio
                </button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-8 py-12">
                    <style>{`
                        .notion-editor {
                            font-family: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
                            counter-reset: citation;
                        }
                        .notion-editor h1 {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            font-size: 1.75rem;
                            font-weight: 600;
                            color: #1f2937;
                            margin-bottom: 0.75rem;
                            line-height: 1.3;
                            letter-spacing: -0.02em;
                        }
                        .notion-editor h2 {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            font-size: 1.25rem;
                            font-weight: 600;
                            color: #1f2937;
                            margin-top: 2rem;
                            margin-bottom: 0.75rem;
                            line-height: 1.3;
                        }
                        .notion-editor .citation-text {
                            text-decoration: underline;
                            text-decoration-style: dotted;
                            text-decoration-color: #9ca3af;
                            text-underline-offset: 4px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                        }
                        .notion-editor .citation-text:hover {
                            color: #2563eb;
                            text-decoration-color: #2563eb;
                            background-color: rgba(37, 99, 235, 0.05); 
                            border-radius: 4px;
                        }
                        .notion-editor .citation-text::after {
                            counter-increment: citation;
                            content: "[" counter(citation) "]";
                            font-size: 0.65em;
                            vertical-align: super;
                            margin-left: 1px;
                            color: #6b7280;
                            display: inline-block;
                            text-decoration: none;
                            line-height: 1;
                        }
                        .notion-editor h2.first-section {
                            margin-top: 1.5rem;
                        }
                        .notion-editor h3 {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            font-size: 1rem;
                            font-weight: 600;
                            color: #374151;
                            margin-top: 1.25rem;
                            margin-bottom: 0.5rem;
                            line-height: 1.4;
                        }
                        .notion-editor p {
                            font-size: 0.9rem;
                            color: #4b5563;
                            line-height: 1.7;
                            margin-bottom: 0.625rem;
                            letter-spacing: 0.01em;
                        }
                        .notion-editor p.subtitle {
                            font-family: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
                            font-size: 0.85rem;
                            color: #6b7280;
                            margin-bottom: 1.5rem;
                            font-style: italic;
                        }
                        .notion-editor strong {
                            font-weight: 600;
                            color: #1f2937;
                        }
                        .notion-editor ul {
                            list-style-type: disc;
                            padding-left: 1.5rem;
                            margin-bottom: 0.75rem;
                        }
                        .notion-editor ul li {
                            margin-bottom: 0.375rem;
                        }
                        .notion-editor ul li p {
                            margin-bottom: 0;
                        }
                        .notion-editor ol {
                            list-style-type: decimal;
                            padding-left: 1.5rem;
                            margin-bottom: 1rem;
                        }
                        .notion-editor hr {
                            border: none;
                            border-top: 1px solid #e5e7eb;
                            margin: 1.5rem 0;
                        }
                        .notion-editor blockquote {
                            border-left: 3px solid #e5e7eb;
                            padding-left: 1rem;
                            margin: 1rem 0;
                            color: #6b7280;
                        }
                        .notion-editor code {
                            background-color: #e5e7eb;
                            padding: 0.125rem 0.25rem;
                            border-radius: 0.25rem;
                            font-family: 'SF Mono', 'Menlo', monospace;
                            font-size: 0.85em;
                        }
                        .notion-editor pre {
                            background-color: #1f2937;
                            color: #f9fafb;
                            padding: 1rem;
                            border-radius: 0.5rem;
                            overflow-x: auto;
                            margin: 1rem 0;
                        }
                        .notion-editor pre code {
                            background: none;
                            padding: 0;
                            color: inherit;
                        }
                        .notion-editor p.is-editor-empty:first-child::before {
                            content: attr(data-placeholder);
                            float: left;
                            color: #9ca3af;
                            pointer-events: none;
                            height: 0;
                        }
                    `}</style>
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}
