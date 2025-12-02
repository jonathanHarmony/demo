import React from "react";
import { motion } from "framer-motion";
import { Brain, BarChart3 } from "lucide-react";

export default function AnalysisMode({ mode, reasoning }) {
  const modes = {
    qualitative: {
      icon: Brain,
      label: "Qualitative Analysis",
      description: "Focusing on opinions, themes, and sentiment",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    quantitative: {
      icon: BarChart3,
      label: "Quantitative Analysis",
      description: "Focusing on metrics, trends, and data patterns",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    hybrid: {
      icon: Brain,
      label: "Hybrid Analysis",
      description: "Combining qualitative insights with quantitative data",
      color: "text-teal-600",
      bg: "bg-teal-50"
    }
  };

  const selectedMode = modes[mode] || modes.qualitative;
  const Icon = selectedMode.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-slate-200 rounded-lg p-4 mb-6"
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${selectedMode.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${selectedMode.color}`} />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-slate-900 mb-1">
            {selectedMode.label}
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            {selectedMode.description}
          </div>
          {reasoning && (
            <div className="mt-2 text-[10px] text-slate-500 bg-slate-50 rounded px-2 py-1.5 inline-block">
              {reasoning}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}