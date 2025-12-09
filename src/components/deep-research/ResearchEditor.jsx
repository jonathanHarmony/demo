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

        let html = `<h1>${data.title}</h1>`;
        if (data.subtitle) html += `<h3>${data.subtitle}</h3>`;

        // Helper to process segments with citations
        const processSegments = (segments) => {
            if (!segments) return '';
            return segments.map(segment => {
                let text = segment.text;
                if (segment.citation) {
                    // Create citation node
                    text += `<citation number="${segment.citation.number}" source='${JSON.stringify(segment.citation.source)}'></citation>`;
                }
                return text;
            }).join('');
        };

        if (data.executiveSummary) {
            html += `<h2>Executive Summary</h2>`;
            let text = data.executiveSummary.text || '';
            if (data.executiveSummary.citations) {
                data.executiveSummary.citations.forEach(cit => {
                    text += `<citation number="${cit.number}" source='${JSON.stringify(cit.source)}'></citation>`;
                });
            }
            html += `<p>${text}</p>`;
        }

        const sections = [
            { key: 'findings', title: 'Key Findings' },
            { key: 'analysis', title: 'Detailed Analysis' },
            { key: 'recommendations', title: 'Strategic Recommendations' }
        ];

        sections.forEach(section => {
            if (data[section.key]) {
                html += `<h2>${section.title}`;
                if (data[section.key].citations) {
                    data[section.key].citations.forEach(cit => {
                        html += `<citation number="${cit.number}" source='${JSON.stringify(cit.source)}'></citation>`;
                    });
                }
                html += `</h2>`;
                data[section.key].forEach(item => {
                    if (item.segments) {
                        html += `<p>${processSegments(item.segments)}</p>`;
                    } else if (typeof item === 'string') {
                        html += `<p>${item}</p>`;
                    }
                });
            }
        });

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

