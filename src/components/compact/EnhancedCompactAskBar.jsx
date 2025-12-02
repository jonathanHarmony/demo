import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Sparkles, FileText, ChevronDown, X, Link, Trash2, Plus, Paperclip, Zap, Box, ArrowUp } from "lucide-react";
import { detectIntent, getModeIcon, getModeLabel, generateSuggestions } from "../case/IntentDetection";
import CreditIndicator from "../shared/CreditIndicator";
import { useLanguage } from "../shared/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function EnhancedCompactAskBar({ 
  value, 
  onChange, 
  onGenerate, 
  disabled, 
  isGenerating,
  attachedSources = [],
  onRemoveSource,
  onAddSourceClick
  }) {
    const { t, isRTL } = useLanguage();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [detectedMode, setDetectedMode] = useState('mixed');
  const [selectedMode, setSelectedMode] = useState('auto');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (value.length > 2) {
      const intent = detectIntent(value);
      setDetectedMode(intent);
      setSuggestions(generateSuggestions(value, intent));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate({ mode: selectedMode === 'auto' ? detectedMode : selectedMode });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const modes = [
    { id: 'auto', label: 'Auto', icon: Sparkles },
    { id: 'report', label: 'Report', icon: FileText },
    { id: 'qualitative', label: 'Qual', icon: Zap },
    { id: 'quantitative', label: 'Quant', icon: Box }
  ];

  const selectedModeLabel = modes.find(m => m.id === selectedMode)?.label || 'Auto';

  return (
    <div className="space-y-3">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 transition-shadow hover:shadow-md focus-within:shadow-md">
        <div className="relative mb-4">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Analyze and visualize patterns in my data..."
            className={`w-full text-base bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-400 resize-none min-h-[50px] ${isRTL ? 'text-right' : ''}`}
            rows={1}
            autoFocus
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{ height: 'auto', minHeight: '50px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
          
          {selectedMode === 'auto' && value.length > 2 && (
            <div className="absolute bottom-2 right-0">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-full px-2 py-1">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-[10px] font-medium text-slate-500">{getModeLabel(detectedMode)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex items-center gap-4">
            {/* Attachment / Source Trigger */}
            <button 
              onClick={onAddSourceClick}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-50 rounded-full"
              title="Attach file or source"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Connectors Dropdown (Integrated Sources) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                  attachedSources.length > 0 ? 'text-teal-600' : 'text-slate-500 hover:text-slate-700'
                }`}>
                  {attachedSources.length > 0 ? (
                    <span className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center text-[9px]">
                        {attachedSources.length}
                      </div>
                      Sources
                    </span>
                  ) : (
                    <>
                      <Link className="w-3.5 h-3.5" />
                      Connectors
                    </>
                  )}
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                 {attachedSources.length > 0 && (
                    <>
                      <div className="px-2 py-1.5 text-xs font-medium text-slate-500">Attached Sources</div>
                      {attachedSources.map((source) => (
                        <div key={source.id} className="flex items-center justify-between px-2 py-1.5 text-xs hover:bg-slate-50 rounded group">
                          <span className="truncate max-w-[140px] text-slate-700">{source.name}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveSource?.(source.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 hover:text-red-500 rounded transition-all"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="h-px bg-slate-100 my-1" />
                    </>
                  )}
                  <DropdownMenuItem onClick={onAddSourceClick} className="text-xs cursor-pointer gap-2">
                    <Plus className="w-3 h-3" />
                    Add Source...
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tools / Modes Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors">
                  <Box className="w-3.5 h-3.5" />
                  Tools
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <DropdownMenuItem 
                      key={mode.id} 
                      onClick={() => setSelectedMode(mode.id)}
                      className="flex items-center gap-2 text-xs"
                    >
                      <Icon className={`w-3.5 h-3.5 ${selectedMode === mode.id ? 'text-teal-600' : 'text-slate-400'}`} />
                      <span className={selectedMode === mode.id ? 'font-medium text-slate-900' : 'text-slate-600'}>
                        {mode.label}
                      </span>
                      {selectedMode === mode.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

             {/* Placeholders for other options from image */}
             <button className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                Agent
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>

          </div>

          <div className="flex items-center gap-3">
             {/* Default / Mode Display */}
             <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
                <span>{selectedModeLabel}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
             </div>

            <Button
              onClick={() => onGenerate({ mode: selectedMode === 'auto' ? detectedMode : selectedMode })}
              disabled={disabled}
              size="icon"
              className={`rounded-full h-8 w-8 ${
                disabled ? 'bg-slate-100 text-slate-400' : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm'
              } transition-all`}
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Auto-complete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <Sparkles className="w-3 h-3 text-slate-400" />
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">Smart Suggestions</div>
          </div>
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded px-2 py-1.5 transition-colors leading-relaxed"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}