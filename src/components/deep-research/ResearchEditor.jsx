import React, { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { Sparkles, Scissors, Wand2 } from 'lucide-react';
import CitationExtension from './editor/CitationExtension';

/**
 * ResearchEditor - Tiptap-based Rich Text Editor
 * Replaces static document viewer with interactive canvas
 */
export default function ResearchEditor({
    initialContent,
    onUpdate,
    isReadOnly = false
}) {
    // Convert structured content to HTML for Tiptap
    const generateHTML = (data) => {
        if (!data) return '';

        // Helper to convert markdown to HTML
        const markdownToHtml = (text) => {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
        };

        // Helper to convert text with paragraphs
        const textToParagraphs = (text) => {
            const paragraphs = text.split(/\n\n+/);
            return paragraphs
                .map(p => `<p style="line-height: 1.8; color: #1a1a1a; margin-bottom: 1rem;">${markdownToHtml(p.trim())}</p>`)
                .join('');
        };

        // Main title
        let html = `<h1 style="font-size: 1.875rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">${data.title}</h1>`;

        // Subtitle if present
        if (data.subtitle) {
            html += `<p style="font-size: 1rem; color: #6b7280; margin-bottom: 2.5rem; line-height: 1.6;">${data.subtitle}</p>`;
        }

        // Executive Summary
        if (data.summary) {
            html += `<h2 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-top: 2.5rem; margin-bottom: 1rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">Executive Summary</h2>`;
            html += textToParagraphs(data.summary);
        } else if (data.executiveSummary) {
            html += `<h2 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-top: 2.5rem; margin-bottom: 1rem;">Executive Summary</h2>`;
            html += `<p style="line-height: 1.8; color: #1a1a1a; margin-bottom: 1rem;">${data.executiveSummary.text || ''}</p>`;
        }

        // Handle sections array
        if (data.sections && data.sections.length > 0) {
            data.sections.forEach(section => {
                // Section title
                html += `<h2 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-top: 2.5rem; margin-bottom: 1rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">${section.title}</h2>`;

                // Process section content
                let content = section.content;

                // Split by double newlines for paragraphs
                const blocks = content.split(/\n\n+/);

                blocks.forEach(block => {
                    block = block.trim();
                    if (!block) return;

                    // Check if it's a ### header
                    if (block.startsWith('### ')) {
                        const headerText = block.substring(4);
                        html += `<h3 style="font-size: 1.125rem; font-weight: 600; color: #1a1a1a; margin-top: 1.5rem; margin-bottom: 0.75rem;">${markdownToHtml(headerText)}</h3>`;
                    }
                    // Check if it's a list (starts with - or •)
                    else if (block.match(/^[-•]/m)) {
                        const items = block.split(/\n/).filter(line => line.trim());
                        html += '<ul style="margin: 0.5rem 0 1rem 0; padding-left: 0;">';
                        items.forEach(item => {
                            // Clean the bullet point
                            const cleanItem = item.replace(/^[-•]\s*/, '').trim();
                            if (cleanItem) {
                                html += `<li style="line-height: 1.8; color: #1a1a1a; margin-bottom: 0.5rem; margin-left: 1.5rem;">${markdownToHtml(cleanItem)}</li>`;
                            }
                        });
                        html += '</ul>';
                    }
                    // Regular paragraph
                    else {
                        // Handle single-line text that might have ### headers mixed in
                        const lines = block.split(/\n/);
                        lines.forEach(line => {
                            line = line.trim();
                            if (!line) return;

                            if (line.startsWith('### ')) {
                                const headerText = line.substring(4);
                                html += `<h3 style="font-size: 1.125rem; font-weight: 600; color: #1a1a1a; margin-top: 1.5rem; margin-bottom: 0.75rem;">${markdownToHtml(headerText)}</h3>`;
                            } else {
                                html += `<p style="line-height: 1.8; color: #1a1a1a; margin-bottom: 1rem;">${markdownToHtml(line)}</p>`;
                            }
                        });
                    }
                });
            });
        }

        // Handle findings if present and not empty
        if (data.findings && data.findings.length > 0) {
            html += `<h2 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-top: 2.5rem; margin-bottom: 1rem;">Key Findings</h2>`;
            data.findings.forEach(finding => {
                const text = typeof finding === 'string' ? finding : (finding.segments?.map(s => s.text).join('') || '');
                html += `<p style="line-height: 1.8; color: #1a1a1a; margin-bottom: 1rem;">${markdownToHtml(text)}</p>`;
            });
        }

        return html;
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Start writing...',
            }),
            Typography,
            CitationExtension,
        ],
        content: generateHTML(initialContent),
        editable: !isReadOnly,
        onUpdate: ({ editor }) => {
            onUpdate?.(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-slate max-w-none focus:outline-none prose-headings:font-serif prose-h1:text-4xl prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-slate-700',
                style: 'font-family: "Inter", sans-serif;',
            },
        },
    });

    // Update content if initialContent changes (e.g. new research)
    useEffect(() => {
        if (editor && initialContent) {
            const newContent = generateHTML(initialContent);
            if (editor.getHTML() !== newContent) {
                editor.commands.setContent(newContent);
            }
        }
    }, [initialContent, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="relative h-full bg-white flex flex-col">
            {/* Sticky Header with Studio Button */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-medium text-slate-900">Research Canvas</h2>
                    <p className="text-xs text-slate-500">Interactive Editor</p>
                </div>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-studio'))}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-xs font-medium"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    Studio
                </button>
            </div>

            {/* Floating Toolbar (Bubble Menu) */}
            {editor && (
                <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 100 }}
                    className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-lg border border-slate-200"
                >
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-1.5 rounded hover:bg-slate-100 ${editor.isActive('bold') ? 'text-purple-600 bg-purple-50' : 'text-slate-600'}`}
                        title="Bold"
                    >
                        <span className="font-bold text-xs">B</span>
                    </button>

                    <div className="w-px h-4 bg-slate-200 mx-1" />

                    <button
                        onClick={() => {/* TODO: AI Rewrite */ }}
                        className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-colors"
                    >
                        <Wand2 className="w-3 h-3" />
                        <span className="text-xs font-medium">Rewrite</span>
                    </button>

                    <button
                        onClick={() => {/* TODO: AI Shorten */ }}
                        className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-colors"
                    >
                        <Scissors className="w-3 h-3" />
                        <span className="text-xs font-medium">Shorten</span>
                    </button>
                </BubbleMenu>
            )}

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto px-16 py-8 min-h-0">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

