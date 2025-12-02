import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function QuoteStream({ quotes }) {
  const defaultQuotes = quotes || [
    {
      text: "AI compliance is becoming critical for enterprise adoption",
      author: "Product Manager",
      source: "LinkedIn",
      confidence: 94
    },
    {
      text: "The regulatory landscape is evolving faster than implementation",
      author: "Legal Director",
      source: "Twitter",
      confidence: 89
    },
    {
      text: "We need clearer guidelines before scaling AI initiatives",
      author: "CTO",
      source: "Tech Forum",
      confidence: 91
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white border border-slate-200 rounded-lg p-5"
    >
      <div className="mb-4">
        <div className="text-xs font-medium text-slate-900 mb-1">Key Quotes</div>
        <div className="text-[10px] text-slate-500">Representative voices from the discussion</div>
      </div>

      <div className="space-y-3">
        {defaultQuotes.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-slate-50 rounded-lg p-4 border border-slate-100 hover:border-slate-200 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center flex-shrink-0 border border-slate-200">
                <Quote className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 mb-2 leading-relaxed italic">
                  "{quote.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    {quote.author} · {quote.source}
                  </div>
                  <div className="text-xs text-slate-400">
                    {quote.confidence}% confidence
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}