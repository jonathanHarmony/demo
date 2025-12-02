import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CaseStructure from "../case/CaseStructure";
import CaseReport from "../case/CaseReport";
import AIAssistant from "../case/AIAssistant";
import CaseSetupModal from "../case/CaseSetupModal";

export default function FullCaseWorkspace() {
  const [currentCase, setCurrentCase] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showSetup, setShowSetup] = useState(false);

  const handleSetupComplete = (caseData) => {
    setCurrentCase(caseData);
    setShowSetup(false);
  };

  const handleAddQuestion = (questionData) => {
    const newQuestion = {
      id: Date.now().toString(),
      ...questionData,
      status: "pending",
      result: null
    };
    setQuestions([...questions, newQuestion]);
    
    // Simulate processing
    setTimeout(() => {
      setQuestions(prev => prev.map(q => 
        q.id === newQuestion.id 
          ? { ...q, status: "done", result: { summary: "Analysis complete" } }
          : q
      ));
    }, 2000);
  };

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
  };

  const handleAddFollowUp = (followUpText) => {
    handleAddQuestion({
      text: followUpText,
      mode: 'mixed',
      isFollowUp: true
    });
  };

  if (!currentCase) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
            <Plus className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">No active case</h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Create a new case to start building your research with multiple questions
          </p>
          <Button
            onClick={() => setShowSetup(true)}
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Case
          </Button>
        </div>

        {showSetup && (
          <CaseSetupModal
            onComplete={handleSetupComplete}
            onClose={() => setShowSetup(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)] -mt-2">
      {/* Left Panel - Case Structure */}
      <div className="w-64 flex-shrink-0 overflow-y-auto">
        <CaseStructure
          caseData={currentCase}
          questions={questions}
          selectedQuestion={selectedQuestion}
          onAddQuestion={handleAddQuestion}
          onSelectQuestion={handleSelectQuestion}
        />
      </div>

      {/* Center Panel - Report View */}
      <div className="flex-1 overflow-y-auto min-w-0 max-w-4xl mx-auto">
        <CaseReport
          caseData={currentCase}
          questions={questions}
          selectedQuestion={selectedQuestion}
        />
      </div>

      {/* Right Panel - AI Assistant */}
      <div className="w-64 flex-shrink-0 overflow-y-auto">
        <AIAssistant
          selectedQuestion={selectedQuestion}
          caseData={currentCase}
          onAddFollowUp={handleAddFollowUp}
        />
      </div>
    </div>
  );
}