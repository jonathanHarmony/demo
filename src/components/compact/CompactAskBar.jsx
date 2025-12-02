import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

export default function CompactAskBar({ value, onChange, onGenerate, disabled, isGenerating }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onGenerate();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a research question..."
          className="flex-1 text-sm bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-400"
          autoFocus
        />
        
        <Button
          onClick={onGenerate}
          disabled={disabled}
          size="sm"
          className="bg-slate-900 text-white hover:bg-slate-800 px-4 h-8 text-xs rounded disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Generating
            </>
          ) : (
            <>
              Generate
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}