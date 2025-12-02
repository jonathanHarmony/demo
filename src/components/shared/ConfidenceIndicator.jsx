import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Database } from "lucide-react";

export default function ConfidenceIndicator({ score, dataPoints }) {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="glass-card rounded-3xl p-6 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-slate-600" />
            <div>
              <div className="text-sm text-slate-500">Data Points</div>
              <div className="text-lg font-semibold text-slate-900">
                {formatNumber(dataPoints)}
              </div>
            </div>
          </div>

          <div className="w-px h-10 bg-slate-200" />

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-slate-500">Confidence</div>
              <div className="text-lg font-semibold text-slate-900">
                {score}%
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="flex-1 max-w-md ml-8">
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-teal-400 to-blue-600 rounded-full relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}