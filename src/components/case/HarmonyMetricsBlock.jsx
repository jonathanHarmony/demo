import React, { useState } from "react";
import { Brain, Lightbulb, Rocket, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../shared/LanguageProvider";

export default function InsightFramework({ what, soWhat, nowWhat, isExpanded = true }) {
  const [expanded, setExpanded] = useState(isExpanded);
  const { isRTL } = useLanguage();

  return (
    <div className="border-t border-slate-200 pt-6 mt-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Insight Summary
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* What */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 mt-0.5">
                  <Brain className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold text-slate-900 mb-1.5 uppercase tracking-wide ${isRTL ? 'text-right' : ''}`}>
                    What
                  </div>
                  <div className={`text-sm text-slate-700 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                    {what}
                  </div>
                </div>
              </div>
            </div>

            {/* So What */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold text-slate-900 mb-1.5 uppercase tracking-wide ${isRTL ? 'text-right' : ''}`}>
                    So What
                  </div>
                  <div className={`text-sm text-slate-700 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                    {soWhat}
                  </div>
                </div>
              </div>
            </div>

            {/* Now What */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 mt-0.5">
                  <Rocket className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold text-slate-900 mb-1.5 uppercase tracking-wide ${isRTL ? 'text-right' : ''}`}>
                    Now What
                  </div>
                  <div className={`text-sm text-slate-700 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                    {nowWhat}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}