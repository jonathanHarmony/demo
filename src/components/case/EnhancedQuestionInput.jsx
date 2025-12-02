import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { detectIntent, getModeIcon, getModeLabel, generateSuggestions } from "./IntentDetection";
import CreditIndicator from "../shared/CreditIndicator";

export default function EnhancedQuestionInput({ value, onChange, onAdd, disabled }) {
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

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const modes = [
    { id: 'auto', label: 'Blend (Auto)', icon: '⚡' },
    { id: 'qualitative', label: 'Understanding', icon: '🧠' },
    { id: 'quantitative', label: 'Validation', icon: '📊' }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onAdd();
            }
          }}
          placeholder="Ask Harmony... (e.g., Why are consumers abandoning refill packaging?)"
          className="w-full text-sm bg-slate-50 border border-slate-200 rounded px-3 py-2.5 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-300 resize-none leading-relaxed"
          rows={3}
        />
        
        {selectedMode === 'auto' && value.length > 2 && (
          <div className="absolute top-2 right-2">
            <div className="text-[10px] px-2 py-1 bg-slate-100 rounded-full text-slate-600 flex items-center gap-1">
              <span>{getModeIcon(detectedMode)}</span>
              <span>{getModeLabel(detectedMode)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Mode Toggle */}
      <div>
        <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">Focus Mode:</div>
        <div className="flex flex-col gap-1.5">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`text-[11px] px-3 py-2 rounded transition-colors text-left ${
                selectedMode === mode.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="mr-1.5">{mode.icon}</span>
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-complete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded p-2.5 space-y-1">
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <Sparkles className="w-3 h-3 text-slate-400" />
            <div className="text-[9px] text-slate-500 uppercase tracking-wider">Smart Suggestions</div>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left text-xs text-slate-700 hover:text-slate-900 hover:bg-white rounded px-2.5 py-2 transition-colors leading-relaxed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <CreditIndicator cost={2} showLabel size="md" />
        <Button
          onClick={onAdd}
          disabled={disabled || !value.trim()}
          size="sm"
          className="flex-1 bg-slate-900 text-white hover:bg-slate-800 h-9 text-xs"
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          Add Question
        </Button>
      </div>
    </div>
  );
}