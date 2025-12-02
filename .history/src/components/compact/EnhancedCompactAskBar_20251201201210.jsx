import React from "react";
import { motion } from "framer-motion";
import { Target, Globe, Users, Zap, FileText, Sparkles } from "lucide-react";
import ContextSummary from "../playground/ContextSummary";

export default function EnhancedCompactAskBar({ context }) {
  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      className="fixed right-0 top-14 bottom-0 w-80 bg-white border-l border-slate-200 overflow-y-auto"
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-2">
            Conversation Context
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            This summary captures your research direction as we build it together.
          </p>
        </div>

        {/* Context Fields */}
        <div className="space-y-4">
          {/* Goal */}
          {context.goal && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-3.5 h-3.5 text-slate-600" />
                <div className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">
                  Goal
                </div>
              </div>
              <div className="text-xs text-slate-900 leading-relaxed">
                {context.goal}
              </div>
            </div>
          )}

          {/* Market */}
          {context.market && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-3.5 h-3.5 text-slate-600" />
                <div className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">
                  Market
                </div>
              </div>
              <div className="text-xs text-slate-900 leading-relaxed">
                {context.market}
              </div>
            </div>
          )}

          {/* Focus */}
          {context.focus && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-3.5 h-3.5 text-slate-600" />
                <div className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">
                  Focus
                </div>
              </div>
              <div className="text-xs text-slate-900 leading-relaxed">
                {context.focus}
              </div>
            </div>
          )}

          {/* Mode */}
          {context.mode && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3.5 h-3.5 text-slate-600" />
                <div className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">
                  Research Mode
                </div>
              </div>
              <div className="text-xs text-slate-900 leading-relaxed">
                {context.mode === 'qual' ? '🧠 Qualitative (Understanding)' :
                 context.mode === 'quant' ? '📊 Quantitative (Measuring)' :
                 context.mode === 'both' ? '⚡ Mixed (Qual + Quant)' : 'Not set'}
              </div>
            </div>
          )}
        </div>

        {/* Final Questions */}
        {context.finalQuestions && context.finalQuestions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <div className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">
                Questions Built ({context.finalQuestions.length})
              </div>
            </div>
            <div className="space-y-2">
              {context.finalQuestions.map((question, index) => (
                <div key={index} className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                  <div className="text-[10px] font-medium text-teal-900 mb-1">
                    Question {index + 1}
                  </div>
                  <div className="text-xs text-slate-900 leading-relaxed">
                    {question.text}
                  </div>
                  <div className="mt-2 text-[10px] text-teal-700">
                    {question.mode === 'qual' ? '🧠 Qualitative' :
                     question.mode === 'quant' ? '📊 Quantitative' :
                     '⚡ Mixed'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!context.goal && !context.market && !context.focus && !context.mode && (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-slate-400" />
            </div>
            <div className="text-xs text-slate-500">
              Start chatting to build your research context
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}