import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AskBar({ value, onChange, onNext }) {
  return (
    <div className="text-center py-20">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-4xl font-semibold text-slate-900 mb-4">
          What would you like to research?
        </h1>
        
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          Harmony will interpret your question automatically.
        </p>

        <div className="relative max-w-3xl mx-auto mb-8 group">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="What are enterprises in Europe saying about AI compliance?"
            className="w-full px-8 py-6 rounded-3xl glass-card border-2 border-slate-200 focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all duration-220 text-lg text-slate-700 placeholder:text-slate-400 resize-none"
            rows={4}
            autoFocus
          />
          <div className="absolute inset-0 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-220 pointer-events-none">
            <div className="absolute inset-0 rounded-3xl bg-teal-400/5" />
          </div>
        </div>

        <Button
          onClick={onNext}
          disabled={!value.trim()}
          className="gradient-button text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-280"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}