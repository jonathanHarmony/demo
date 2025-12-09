import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUp, Link2, Wrench, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

/**
 * OmniBar - Clean Input with Controls Inside
 * All controls integrated into the bar like Harvey.ai
 */
export default function OmniBar({
  value,
  onChange,
  onSubmit,
  disabled = false,
  selectedSources = [],
  onSourcesChange,
  researchScope = 'quick',
  onScopeChange,
  mode = 'hybrid',
  onModeChange,
  onFileUpload,
}) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isRefining, setIsRefining] = useState(false);

  const dataSources = [
    { id: 'social', label: 'Social Media' },
    { id: 'reviews', label: 'Product Reviews' },
    { id: 'internal', label: 'Internal Data' },
    { id: 'web', label: 'Public Web' },
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(Math.max(scrollHeight, 56), 200) + 'px';
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit();
      }
    }
  };

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

  const handleRefine = async () => {
    if (!value.trim() || value.length < 10) return;
    setIsRefining(true);

    // Simulate AI refinement
    await new Promise(resolve => setTimeout(resolve, 800));

    const refined = `Analyze ${value.toLowerCase().replace(/what|how|why|analyze/gi, '').trim()} in detail. Provide comprehensive insights including market trends, consumer sentiment, and competitive analysis.`;
    onChange(refined);
    setIsRefining(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Input Container */}
      <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-end gap-2 p-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Harmony anything..."
            disabled={disabled || isRefining}
            className="flex-1 text-base bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-slate-900 placeholder:text-slate-400"
            style={{
              minHeight: '32px',
              maxHeight: '200px',
            }}
            rows={1}
          />

          {/* Submit Button */}
          <button
            onClick={onSubmit}
            disabled={!value.trim() || disabled}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition-colors flex items-center justify-center"
          >
            <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Controls Bar - Inside the input */}
        <div className="flex items-center justify-between px-3 pb-2 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-3">
            {/* Refine Button */}
            <button
              onClick={handleRefine}
              disabled={value.length < 10 || isRefining}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 disabled:text-slate-400 transition-colors"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isRefining ? 'animate-spin' : ''}`} />
              <span>{isRefining ? 'Refining...' : 'Refine'}</span>
            </button>

            {/* Connectors Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors">
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

            {/* Tools Dropdown */}
            <button
              onClick={handleFileClick}
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors"
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

            {/* Agent Mode Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors">
                  <span>Agent</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => onModeChange('qualitative')}>
                  Qualitative
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onModeChange('quantitative')}>
                  Quantitative
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onModeChange('hybrid')}>
                  Hybrid
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Scope Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors">
                <span>{researchScope === 'quick' ? 'Auto' : 'Deep'}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={() => onScopeChange('quick')}>
                Auto
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onScopeChange('deep')}>
                Deep
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
