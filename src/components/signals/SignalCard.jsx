import React from "react";
import { motion } from "framer-motion";
import { MoreVertical, Radio } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const domainLabels = {
  consumer_sentiment: "Consumer Sentiment",
  competitive_intelligence: "Competitive Intelligence",
  trends_and_needs: "Trends & Needs",
  performance_and_messaging: "Performance",
  shopper_and_retail: "Shopper"
};

const frequencyLabels = {
  realtime: "Real-time",
  daily: "Daily",
  twice_weekly: "2x/week",
  weekly: "Weekly"
};

export default function SignalCard({ signal, onEdit, onToggleActive, onDelete, index }) {
  const scopeText = [
    ...(signal.scope?.products || []),
    ...(signal.scope?.competitors || [])
  ].filter(Boolean).join(", ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.03 }}
      className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-3 flex-1">
            <Radio className={`w-4 h-4 mt-0.5 ${signal.active ? 'text-teal-600' : 'text-slate-300'}`} />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-slate-900 mb-1">
                {signal.signal_type}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{domainLabels[signal.domain]}</span>
                <span>•</span>
                <span>{signal.scope?.category || "All categories"}</span>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleActive}>
                {signal.active ? 'Pause' : 'Activate'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {scopeText && (
          <div className="text-xs text-slate-600 mb-2 ml-7">
            {scopeText}
          </div>
        )}

        <div className="flex items-center gap-2 ml-7">
          <span className={`text-xs px-2 py-0.5 rounded ${
            signal.active 
              ? 'bg-teal-50 text-teal-700' 
              : 'bg-slate-100 text-slate-500'
          }`}>
            {frequencyLabels[signal.frequency]}
          </span>
          <span className="text-xs text-slate-400">
            {signal.format === "mixed_format" ? "Mixed format" : signal.format.replace(/_/g, " ")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}