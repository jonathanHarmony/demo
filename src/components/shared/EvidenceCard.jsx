import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, MessageSquare, BarChart3, Quote, FileText, Sparkles } from "lucide-react";

export default function EvidenceCard({ evidence, index }) {
  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "trend":
        return TrendingUp;
      case "sentiment":
        return MessageSquare;
      case "data":
        return BarChart3;
      case "quote":
        return Quote;
      case "insight":
        return Sparkles;
      default:
        return FileText;
    }
  };

  const Icon = getIcon(evidence.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          {evidence.type && (
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
              {evidence.type}
            </div>
          )}
          <p className="text-sm text-slate-900 leading-relaxed">
            {evidence.content}
          </p>
          
          {evidence.value !== undefined && (
            <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
              <span className="text-sm font-semibold text-slate-900">
                {typeof evidence.value === 'number' 
                  ? `${evidence.value}%` 
                  : evidence.value}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}