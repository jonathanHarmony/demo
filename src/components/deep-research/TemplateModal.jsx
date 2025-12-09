import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Grid3x3, Target } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

/**
 * TemplateModal - Clean, Minimal Template Cards
 * Simple text-based design without emojis
 */
export default function TemplateModal({ isOpen, onClose, onSelectTemplate }) {
    const templates = [
        {
            id: 'trend-detection',
            title: 'Trend Detection',
            description: 'Identify emerging trends and patterns in your market',
            icon: TrendingUp,
            prompt: 'Analyze emerging trends and patterns in the [CATEGORY] market over the past 12 months. Include: 1) Top 5 rising trends with growth metrics, 2) Sentiment analysis across social media platforms, 3) Geographic distribution of trend adoption, 4) Predicted trend trajectory for next 6 months.',
        },
        {
            id: 'category-mapping',
            title: 'Category Mapping',
            description: 'Map out the competitive landscape and market segments',
            icon: Grid3x3,
            prompt: 'Create a comprehensive category map for the [CATEGORY] market. Include: 1) All major product segments and sub-categories, 2) Market share distribution across segments, 3) Price positioning analysis, 4) Key differentiators and product attributes, 5) White space opportunities.',
        },
        {
            id: 'competitor-analysis',
            title: 'Competitor Analysis',
            description: 'Deep dive into competitive positioning and performance',
            icon: Target,
            prompt: 'Conduct a detailed competitor analysis for [BRAND/PRODUCT] in the [CATEGORY] space. Include: 1) Top 5 direct competitors with market positioning, 2) Competitive strengths and weaknesses, 3) Feature comparison matrix, 4) Pricing strategy analysis, 5) Customer satisfaction comparisons.',
        },
    ];

    const handleSelectTemplate = (template) => {
        onSelectTemplate(template.prompt);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-slate-900">
                        Research Templates
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                    {templates.map((template) => {
                        const Icon = template.icon;
                        return (
                            <button
                                key={template.id}
                                onClick={() => handleSelectTemplate(template)}
                                className="text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-sm transition-all group"
                            >
                                {/* Icon */}
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-slate-200 transition-colors">
                                    <Icon className="w-4 h-4 text-slate-600" />
                                </div>

                                {/* Content */}
                                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                                    {template.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {template.description}
                                </p>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 text-xs text-slate-500">
                    Tip: You can customize the template after selecting it
                </div>
            </DialogContent>
        </Dialog>
    );
}
