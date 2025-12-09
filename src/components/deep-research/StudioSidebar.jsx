import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Presentation,
    Headphones,
    FileText,
    Network,
    BookOpen,
    Sparkles,
    X,
    ArrowLeft
} from 'lucide-react';

/**
 * StudioSidebar - Clean, simple transformation menu
 */
export default function StudioSidebar({ isOpen, onClose, onTransform, currentMode }) {
    const options = [
        {
            id: 'notebook',
            title: 'Visual Notebook',
            icon: BookOpen,
            description: 'Card-based dashboard view',
            primary: true,
            hidden: currentMode === 'notebook'
        },
        {
            id: 'document',
            title: 'Back to Document',
            icon: ArrowLeft,
            description: 'Return to text editor',
            primary: false,
            hidden: currentMode !== 'notebook'
        },
        {
            id: 'deck',
            title: 'Generate Slide Deck',
            icon: Presentation,
            description: 'Transform into slides',
            primary: false
        },
        {
            id: 'audio',
            title: 'Audio Overview',
            icon: Headphones,
            description: 'Podcast-style summary',
            disabled: true
        },
        {
            id: 'pdf',
            title: 'Briefing PDF',
            icon: FileText,
            description: 'Formatted report',
            disabled: true
        },
        {
            id: 'mindmap',
            title: 'Mind Map',
            icon: Network,
            description: 'Visual connections',
            disabled: true
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-[400px] z-50 bg-white shadow-2xl border-l border-slate-100"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-2 text-slate-900">
                                <Sparkles className="w-4 h-4 text-slate-900" />
                                <h2 className="font-semibold text-sm tracking-wide">STUDIO</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Options List */}
                        <div className="p-6 space-y-2">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-slate-900">Transform Research</h3>
                                <p className="text-sm text-slate-500">Choose a format to visualize your findings.</p>
                            </div>

                            {options.filter(o => !o.hidden).map((option) => {
                                const Icon = option.icon;
                                return (
                                    <button
                                        key={option.id}
                                        id={`studio-option-${option.id}`}
                                        onClick={() => {
                                            if (!option.disabled) {
                                                onTransform(option.id);
                                                setTimeout(onClose, 0);
                                            }
                                        }}
                                        disabled={option.disabled}
                                        className={`
                                            w-full text-left p-4 rounded-lg transition-all border group
                                            ${option.primary
                                                ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                                                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }
                                            ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`
                                                p-2 rounded-md
                                                ${option.primary
                                                    ? 'bg-white/10 text-white'
                                                    : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-900'
                                                }
                                            `}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className={`font-medium text-sm ${option.primary ? 'text-white' : 'text-slate-900'}`}>
                                                    {option.title}
                                                </h3>
                                                <p className={`text-xs ${option.primary ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    {option.description}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
