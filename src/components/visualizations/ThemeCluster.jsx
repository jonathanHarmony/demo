import React from "react";
import { motion } from "framer-motion";

export default function ThemeCluster({ themes }) {
  const defaultThemes = themes || [
    { label: "Trust", size: 85, sentiment: "positive", x: 25, y: 30 },
    { label: "Adoption", size: 72, sentiment: "positive", x: 65, y: 25 },
    { label: "Compliance", size: 68, sentiment: "neutral", x: 45, y: 60 },
    { label: "Bias", size: 54, sentiment: "negative", x: 75, y: 70 },
    { label: "Innovation", size: 48, sentiment: "positive", x: 15, y: 75 }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive": return "#14B8A6";
      case "negative": return "#EF4444";
      default: return "#94A3B8";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white border border-slate-200 rounded-lg p-5"
    >
      <div className="mb-4">
        <div className="text-xs font-medium text-slate-900 mb-1">Theme Clusters</div>
        <div className="text-[10px] text-slate-500">
          Harmony detected {defaultThemes.length} dominant themes
        </div>
      </div>

      <div className="relative w-full h-64 bg-slate-50 rounded-lg overflow-hidden">
        {defaultThemes.map((theme, index) => (
          <motion.div
            key={theme.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
            className="absolute group cursor-pointer"
            style={{
              left: `${theme.x}%`,
              top: `${theme.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              className="rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                width: `${theme.size}px`,
                height: `${theme.size}px`,
                backgroundColor: `${getSentimentColor(theme.sentiment)}15`,
                border: `2px solid ${getSentimentColor(theme.sentiment)}40`
              }}
            >
              <div className="text-xs font-medium text-slate-900">
                {theme.label}
              </div>
            </div>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: getSentimentColor(theme.sentiment),
                opacity: 0
              }}
              animate={{
                scale: [1, 1.3],
                opacity: [0.2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded whitespace-nowrap">
                {theme.label} ({theme.sentiment})
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}