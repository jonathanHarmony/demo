import React from "react";
import { motion } from "framer-motion";
import { Save, FolderOpen, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreditIndicator from "../shared/CreditIndicator";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function QuestionActions({ questions }) {
  const navigate = useNavigate();

  const handleSaveAll = () => {
    // TODO: Implement save functionality
    alert(`Saving ${questions.length} questions to your library`);
  };

  const handleAddToCase = () => {
    // Navigate to case builder with questions
    navigate(createPageUrl("Home") + "?tab=case");
  };

  const handleRunNow = () => {
    // Navigate to Quick Brief with first question
    navigate(createPageUrl("Home") + "?tab=quick");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-t border-slate-200 px-6 py-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-5">
          {/* Questions Summary */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <div className="text-sm font-semibold text-slate-900">
                Ready to Launch
              </div>
            </div>
            <div className="space-y-2">
              {questions.map((question, index) => (
                <div key={index} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="text-teal-600 font-medium">{index + 1}.</span>
                  <span className="leading-relaxed">{question.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-teal-200">
            <div className="flex items-center gap-2">
              <CreditIndicator cost={questions.length * 2} showLabel size="sm" />
              <span className="text-[10px] text-slate-500">per question</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-9"
                onClick={handleSaveAll}
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Save All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-9"
                onClick={handleAddToCase}
              >
                <FolderOpen className="w-3.5 h-3.5 mr-1.5" />
                Add to Case
              </Button>
              <Button 
                className="bg-slate-900 text-white hover:bg-slate-800 text-xs h-9"
                onClick={handleRunNow}
              >
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                Run Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}