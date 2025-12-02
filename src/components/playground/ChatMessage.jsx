import React from "react";
import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatMessage({ message, onOptionClick }) {
  const isHarmony = message.type === 'harmony';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex items-start gap-3 ${isHarmony ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isHarmony ? 'bg-teal-100' : 'bg-slate-200'
      }`}>
        {isHarmony ? (
          <Sparkles className="w-4 h-4 text-teal-600" />
        ) : (
          <User className="w-4 h-4 text-slate-600" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 max-w-2xl">
        <div className={`rounded-2xl px-4 py-3 ${
          isHarmony 
            ? 'bg-teal-50 border border-teal-200 rounded-tl-sm' 
            : 'bg-slate-100 border border-slate-200 rounded-tr-sm'
        }`}>
          <div className={`text-sm leading-relaxed whitespace-pre-line ${
            isHarmony ? 'text-slate-900' : 'text-slate-900'
          }`}>
            {message.text}
          </div>
        </div>

        {/* Option Buttons */}
        {message.options && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionClick(option)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                {option.icon && <span className="mr-1.5">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons (Save/Case/Run) */}
        {message.actions && (
          <div className="mt-3 flex gap-2">
            {message.actions.includes('save') && (
              <Button size="sm" variant="outline" className="text-xs">
                💾 Save All
              </Button>
            )}
            {message.actions.includes('case') && (
              <Button size="sm" variant="outline" className="text-xs">
                ➕ Add to Case
              </Button>
            )}
            {message.actions.includes('run') && (
              <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 text-xs">
                🚀 Run Now
              </Button>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className={`mt-2 text-[10px] text-slate-400 ${isHarmony ? 'text-left' : 'text-right'}`}>
          {message.timestamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}