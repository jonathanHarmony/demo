import React from "react";
import { FileText, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeBasedResults from "./ModeBasedResults";
import StrategicActionsTable from "./StrategicActionsTable";

export default function CaseReport({ caseData, questions, selectedQuestion }) {
  if (selectedQuestion) {
    // Show selected question with mode-based results
    return (
      <div className="space-y-5">
        <ModeBasedResults 
          question={selectedQuestion} 
          mode={selectedQuestion.mode || 'mixed'}
        />
      </div>
    );
  }

  // Show full case overview
  return (
    <div className="space-y-5">
      {/* Case Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-slate-500" />
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Full Case Report</div>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-3 leading-tight">{caseData.title}</h1>
            {caseData.objective && (
              <p className="text-sm text-slate-600 leading-relaxed">{caseData.objective}</p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-xs h-8 px-3">
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-8 px-3">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export
            </Button>
          </div>
        </div>

        {/* Case Metadata */}
        <div className="flex items-center gap-6 text-xs text-slate-600 border-t border-slate-200 pt-4">
          <div>
            <span className="text-slate-500">Type:</span>{" "}
            <span className="font-medium text-slate-900">
              {caseData.caseType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
          <div>
            <span className="text-slate-500">Questions:</span>{" "}
            <span className="font-medium text-slate-900">{questions.length}</span>
          </div>
          <div>
            <span className="text-slate-500">Status:</span>{" "}
            <span className="font-medium text-slate-900">
              {questions.filter(q => q.status === "done").length} / {questions.length} Complete
            </span>
          </div>
        </div>
      </div>

      {/* Report Sections */}
      {questions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-20 text-center">
          <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center mx-auto mb-5">
            <FileText className="w-7 h-7 text-slate-400" />
          </div>
          <h3 className="text-sm font-medium text-slate-900 mb-2">No questions added</h3>
          <p className="text-sm text-slate-600">Add questions to start building your case report</p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Executive Summary */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="text-[10px] font-medium text-slate-500 mb-4 uppercase tracking-wider">Executive Summary</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              This case analyzes {questions.length} research {questions.length === 1 ? 'question' : 'questions'} across {caseData.sources.length} data sources
              {caseData.regions.length > 0 && ` in ${caseData.regions.join(', ')}`}.
              Complete analysis will appear here once all questions are processed.
            </p>
          </div>

          {/* Questions Overview */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="text-[10px] font-medium text-slate-500 mb-5 uppercase tracking-wider">Key Insights</div>
            <div className="space-y-5">
              {questions.map((question, index) => (
                <div key={question.id} className="border-l-2 border-slate-200 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      Question {index + 1}
                    </div>
                    {question.mode && (
                      <div className="text-xs text-slate-500">
                        {question.mode === 'qualitative' ? '🧠' :
                         question.mode === 'quantitative' ? '📊' : '⚡'}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-slate-900 leading-relaxed mb-2">
                    {question.text}
                  </div>
                  {question.result?.summary && (
                    <div className="text-sm text-slate-600 leading-relaxed mt-3">
                      {question.result.summary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Actions Table */}
          {questions.filter(q => q.status === "done").length > 0 && (
            <StrategicActionsTable />
          )}
        </div>
      )}
    </div>
  );
}