import React from 'react';
import { Link2, Wrench, Sparkles, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

/**
 * ControlDock - Minimal Text-Based Controls
 * Clean design inspired by the reference image
 */
export default function ControlDock({
    selectedSources = [],
    onSourcesChange,
    researchScope = 'quick',
    onScopeChange,
    mode = 'hybrid',
    onModeChange,
    onFileUpload,
}) {
    const fileInputRef = React.useRef(null);

    const dataSources = [
        { id: 'social', label: 'Social Media' },
        { id: 'reviews', label: 'Product Reviews' },
        { id: 'internal', label: 'Internal Data' },
        { id: 'web', label: 'Public Web' },
    ];

    const handleSourceToggle = (sourceId) => {
        if (selectedSources.includes(sourceId)) {
            onSourcesChange(selectedSources.filter(id => id !== sourceId));
        } else {
            onSourcesChange([...selectedSources, sourceId]);
        }
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            onFileUpload(files);
        }
    };

    const sourceLabel = selectedSources.length === 0
        ? 'Auto-Select'
        : selectedSources.length === dataSources.length
            ? 'All Sources'
            : `${selectedSources.length} selected`;

    return (
        <div className="flex items-center justify-center gap-6 mt-3">
            {/* Connectors */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Connectors</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <div className="px-2 py-1.5 text-xs font-medium text-slate-500">
                        Data Sources
                    </div>
                    <DropdownMenuSeparator />
                    {dataSources.map((source) => (
                        <DropdownMenuCheckboxItem
                            key={source.id}
                            checked={selectedSources.includes(source.id)}
                            onCheckedChange={() => handleSourceToggle(source.id)}
                        >
                            {source.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Tools */}
            <button
                onClick={handleFileClick}
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
                <Wrench className="w-3.5 h-3.5" />
                <span>Tools</span>
            </button>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.csv,.pptx,.docx,.xlsx"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Agent Mode */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Agent</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem onClick={() => onModeChange('qualitative')}>
                        Qualitative Analysis
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onModeChange('quantitative')}>
                        Quantitative Analysis
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onModeChange('hybrid')}>
                        Hybrid Approach
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Scope Selector */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        <span>{researchScope === 'quick' ? 'Auto' : 'Deep'}</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => onScopeChange('quick')}>
                        <div>
                            <div className="font-medium">Quick Brief</div>
                            <div className="text-xs text-slate-500">1-2 minutes</div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onScopeChange('deep')}>
                        <div>
                            <div className="font-medium">Deep Strategy</div>
                            <div className="text-xs text-slate-500">5-10 minutes</div>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
