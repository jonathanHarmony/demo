import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, Bookmark, MessageSquare } from "lucide-react";
import ConfidenceIndicator from "../shared/ConfidenceIndicator";
import EvidenceCard from "../shared/EvidenceCard";

export default function ResultsView({ brief }) {
  const [followUpQuestion, setFollowUpQuestion] = useState("");

  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">Research Brief</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full">
              <Bookmark className="w-4 h-4 mr-2" />
              Save to Case
            </Button>
            <Button variant="outline" className="rounded-full">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button className="gradient-button text-white rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Question */}
        <div className="glass-card rounded-3xl p-8 mb-6">
          <div className="text-sm text-slate-500 mb-2">Your Question</div>
          <h2 className="text-2xl font-semibold text-slate-900">{brief.question}</h2>
        </div>

        {/* Confidence Indicator */}
        <ConfidenceIndicator
          score={brief.confidence_score}
          dataPoints={brief.data_points}
        />

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="glass-card rounded-3xl p-8 mb-6"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Summary</h3>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            {brief.summary}
          </p>
          
          {brief.why_it_matters && (
            <>
              <h4 className="text-lg font-semibold text-slate-900 mb-3">Why It Matters</h4>
              <p className="text-slate-700 leading-relaxed">
                {brief.why_it_matters}
              </p>
            </>
          )}
        </motion.div>

        {/* Evidence Cards */}
        {brief.evidence && brief.evidence.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Supporting Evidence</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {brief.evidence.map((evidence, index) => (
                <EvidenceCard key={index} evidence={evidence} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Follow-Up Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="glass-card rounded-3xl p-8"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Ask a Follow-Up Question</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              placeholder="Dig deeper into this research..."
              className="flex-1 px-6 py-4 rounded-full glass-card border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-220"
            />
            <Button className="gradient-button text-white rounded-full px-8">
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}