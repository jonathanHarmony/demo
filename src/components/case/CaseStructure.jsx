import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GripVertical, Circle, Clock, CheckCircle2 } from "lucide-react";
import EnhancedQuestionInput from "./EnhancedQuestionInput";
import { detectIntent } from "./IntentDetection";

export default function CaseStructure({ caseData, questions, selectedQuestion, onAddQuestion, onSelectQuestion }) {
  const [newQuestion, setNewQuestion] = useState("");

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const detectedMode = detectIntent(newQuestion);
    
    onAddQuestion({
      text: newQuestion,
      mode: detectedMode,
      status: "pending"
    });
    
    setNewQuestion("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "processing":
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <Circle className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Case Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="text-[10px] font-medium text-slate-500 mb-3 uppercase tracking-wider">Case</div>
        <div className="text-lg font-semibold text-slate-900 mb-2 leading-tight">{caseData.title}</div>
        {caseData.objective && (
          <div className="text-xs text-slate-600 leading-relaxed mt-3">{caseData.objective}</div>
        )}
      </div>

      {/* Enhanced Question Input */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="text-[10px] font-medium text-slate-500 mb-3 uppercase tracking-wider">Add Question</div>
        <EnhancedQuestionInput
          value={newQuestion}
          onChange={setNewQuestion}
          onAdd={handleAddQuestion}
          disabled={false}
        />
      </div>

      {/* Questions List */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="text-[10px] font-medium text-slate-500 mb-3 uppercase tracking-wider">
          Questions ({questions.length})
        </div>
        
        {questions.length === 0 ? (
          <div className="text-xs text-slate-500 text-center py-10">
            No questions added yet
          </div>
        ) : (
          <div className="space-y-2">
            {questions.map((question) => (
              <button
                key={question.id}
                onClick={() => onSelectQuestion(question)}
                className={`w-full text-left p-3.5 rounded border transition-colors ${
                  selectedQuestion?.id === question.id
                    ? "border-slate-300 bg-slate-50"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {getStatusIcon(question.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-900 leading-relaxed mb-1">
                      {question.text}
                    </div>
                    {question.mode && (
                      <div className="text-[10px] text-slate-500">
                        {question.mode === 'qualitative' ? '🧠 Understanding' :
                         question.mode === 'quantitative' ? '📊 Validation' :
                         '⚡ Blend'}
                      </div>
                    )}
                  </div>
                  <GripVertical className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Case Settings */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="text-[10px] font-medium text-slate-500 mb-3 uppercase tracking-wider">Settings</div>
        <div className="space-y-3 text-xs text-slate-600">
          <div className="flex justify-between items-start gap-3">
            <span className="flex-shrink-0">Sources:</span>
            <span className="text-slate-900 font-medium text-right">{caseData.sources.join(', ')}</span>
          </div>
          <div className="flex justify-between items-start gap-3">
            <span className="flex-shrink-0">Regions:</span>
            <span className="text-slate-900 font-medium text-right">
              {caseData.regions.length > 0 ? caseData.regions.join(', ') : 'Global'}
            </span>
          </div>
          <div className="flex justify-between items-start gap-3">
            <span className="flex-shrink-0">Language:</span>
            <span className="text-slate-900 font-medium text-right">{caseData.language}</span>
          </div>
        </div>
      </div>
    </div>
  );
}