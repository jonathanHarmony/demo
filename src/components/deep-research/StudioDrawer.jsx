import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, BarChart3, Presentation, FileSpreadsheet, BookOpen } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

/**
 * StudioDrawer - NotebookLM-style transformation menu
 * Clean options for visualizing research in different formats
 */
export default function StudioDrawer({ isOpen, onClose, onTransform, currentView }) {
    const transformOptions = [
        {
            id: 'document',
            title: 'Text Document',
            icon: FileText,
            description: 'Rich text with citations',
            color: 'slate'
        },
        {
            id: 'notebook',
            title: 'Visual Notebook',
            icon: BookOpen,
            description: 'Block-based cards',
            color: 'blue'
        },
        {
            id: 'infographic',
            title: 'Infographic',
            icon: BarChart3,
            description: 'Data visualizations',
            color: 'teal',
            disabled: true
        },
        {
            id: 'deck',
            title: 'Slide Deck',
            icon: Presentation,
            description: 'Presentation slides',
            color: 'purple',
            disabled: true
        },
        {
            id: 'report',
            title: 'Executive Report',
            icon: FileSpreadsheet,
            description: 'PDF summary',
            color: 'amber',
            disabled: true
        }
    ];

    const handleSelect = (optionId) => {
        if (transformOptions.find(o => o.id === optionId)?.disabled) return;
        onTransform(optionId);
        onClose();
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="text-xl font-semibold">Studio</SheetTitle>
                    <SheetDescription className="text-sm text-slate-500">
                        Transform your research into different formats
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    {transformOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = currentView === option.id;
                        const isDisabled = option.disabled;

                        return (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                disabled={isDisabled}
                                className={`
                  relative p-4 rounded-lg border-2 text-left transition-all
                  ${isActive
                                        ? 'border-purple-500 bg-purple-50'
                                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                                    }
                  ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`
                    flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                    ${isActive ? 'bg-purple-100' : 'bg-slate-100'}
                  `}>
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-slate-600'}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-medium text-slate-900">
                                                {option.title}
                                            </h3>
                                            {isActive && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                                {isDisabled && (
                                    <div className="absolute top-2 right-2 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                        Soon
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-600">
                        💡 <span className="font-medium">Tip:</span> Each format is optimized for different use cases.
                        Text documents are best for detailed analysis, while visual notebooks help with presentations.
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}
