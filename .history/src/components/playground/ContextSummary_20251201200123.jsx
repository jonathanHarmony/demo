import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";
import { detectIntent, getModeIcon, getModeLabel, generateSuggestions } from "../case/IntentDetection";
import CreditIndicator from "../shared/CreditIndicator";
import { useLanguage } from "../shared/LanguageProvider";

export default function EnhancedCompactAskBar({ value, onChange, onGenerate, disabled, isGenerating }) {
  const { t, isRTL } = useLanguage();
  const [detectedMode, setDetectedMode] = useState('mixed');
  const [selectedMode, setSelectedMode] = useState('auto');

  // Keep detecting intent to show the small mode chip, but do not generate smart suggestions UI.
  useEffect(() => {
    if (value.length > 2) {
      const intent = detectIntent(value);
      setDetectedMode(intent);
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
    { id: 'auto', label: t('general.auto'), icon: '⚡' },
    { id: 'qualitative', label: t('general.qualitative'), icon: '🧠' },
    { id: 'quantitative', label: t('general.quantitative'), icon: '📊' }
  ];

  return (
    <div className="space-y-3">
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="relative mb-3">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('quick.ask_placeholder')}
            className={`w-full text-sm bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-400 resize-none ${isRTL ? 'text-right' : ''}`}
            rows={2}
            autoFocus
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          
          {selectedMode === 'auto' && value.length > 2 && (
            <div className="absolute top-0 right-0">
              <div className="text-[10px] px-2 py-1 bg-slate-100 rounded-full text-slate-600 flex items-center gap-1">
                <span>{getModeIcon(detectedMode)}</span>
                <span>{getModeLabel(detectedMode)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`text-[11px] px-2 py-1 rounded transition-colors ${
                    selectedMode === mode.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="mr-1">{mode.icon}</span>
                  {mode.label}
                </button>
              ))}
            </div>
            <CreditIndicator cost={2} />
          </div>

          <Button
            onClick={() => onGenerate({ mode: selectedMode === 'auto' ? detectedMode : selectedMode })}
            disabled={disabled}
            size="sm"
            className={`bg-slate-900 text-white hover:bg-slate-800 px-4 h-8 text-xs rounded disabled:opacity-50 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {isGenerating ? (
              <>
                <Loader2 className={`w-3.5 h-3.5 ${isRTL ? 'ml-1.5' : 'mr-1.5'} animate-spin`} />
                {t('quick.generating')}
              </>
            ) : (
              <>
                {t('quick.generate')}
                <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}