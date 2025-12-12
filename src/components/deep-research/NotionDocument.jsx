import React, { useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Mark, mergeAttributes } from '@tiptap/core';
import { Sparkles } from 'lucide-react';

// Custom Citation Mark extension
const Citation = Mark.create({
    name: 'citation',

    addAttributes() {
        return {
            source: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-citation]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'span',
            mergeAttributes(HTMLAttributes, {
                'data-citation': '',
                'class': 'citation-icon',
                'title': HTMLAttributes.source,
            }),
            '¹',
        ];
    },
});

/**
 * NotionDocument - Notion-style WYSIWYG editor using Tiptap
 * Provides true inline editing experience
 */
export default function NotionDocument({ content, onOpenStudio, onContentChange }) {

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
                    result += `<h3>${headerText}</h3>`;
                }
                // Check if it's a bullet point (• or -)
                else if (trimmedLine.match(/^[•\-]\s/)) {
                    inList = true;
                    let itemText = trimmedLine.replace(/^[•\-]\s*/, '')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    listItems.push(itemText);
                }
                // Regular text line
                else {
                    flushList();
                    let formatted = trimmedLine
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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
            Citation,
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
        <div className="h-full bg-[#f8f9fa] flex flex-col">
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
