import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Download, ArrowRight } from "lucide-react";
import AnalysisMode from "../visualizations/AnalysisMode";
import MetricCards from "../visualizations/MetricCards";
import SentimentBar from "../visualizations/SentimentBar";
import TrendLineChart from "../visualizations/TrendLineChart";
import ThemeCluster from "../visualizations/ThemeCluster";
import QuoteStream from "../visualizations/QuoteStream";

export default function CompactResult({ brief }) {
  const [followUp, setFollowUp] = useState("");

  if (!brief) return null;

  // Determine analysis mode based on question
  const determineAnalysisMode = (question) => {
    const lowerQ = (question || '').toLowerCase();
    const quantKeywords = ['how many', 'share', 'growth', 'trend', 'percentage', 'number', 'count'];
    const qualKeywords = ['why', 'believe', 'feel', 'prefer', 'think', 'opinion', 'sentiment'];
    
    const hasQuant = quantKeywords.some(kw => lowerQ.includes(kw));
    const hasQual = qualKeywords.some(kw => lowerQ.includes(kw));
    
    if (hasQuant && hasQual) return 'hybrid';
    if (hasQuant) return 'quantitative';
    return 'qualitative';
  };

  const analysisMode = determineAnalysisMode(brief.question);

  const metricsData = [
    { label: "Data Points", value: `${((brief.data_points || 0) / 1000000).toFixed(1)}M` },
    { label: "Confidence", value: `${brief.confidence_score || 0}%` },
    { label: "Sources", value: String(brief.sources?.length || 0) },
    { label: "Languages", value: String(brief.languages?.length || 0) }
  ];

  return (
    <div className="space-y-4">
      {/* Analysis Mode */}
      <AnalysisMode 
        mode={analysisMode}
        reasoning="Question focuses on opinions and perspectives rather than numeric trends"
      />

      {/* Metric Cards */}
      <MetricCards metrics={metricsData} />

      {/* Summary */}
      {brief.summary && (
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-[10px] font-medium text-slate-500 mb-2 uppercase tracking-wider">Summary</div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {brief.summary}
          </p>
        </div>
      )}

      {/* Visualizations based on mode */}
      {(analysisMode === 'qualitative' || analysisMode === 'hybrid') && (
        <div className="grid md:grid-cols-2 gap-4">
          <SentimentBar />
          <ThemeCluster />
        </div>
      )}

      {(analysisMode === 'quantitative' || analysisMode === 'hybrid') && (
        <TrendLineChart title="Mentions Over Time" />
      )}

      {/* Quote Stream */}
      <QuoteStream />

      {/* Evidence from brief */}
      {brief.evidence && brief.evidence.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Additional Evidence</div>
          {brief.evidence.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-4"
            >
              <p className="text-sm text-slate-700 leading-relaxed">
                {item.content}
              </p>
              {item.value !== undefined && (
                <div className="mt-2 inline-flex items-center px-2 py-1 rounded bg-slate-100 text-xs font-medium text-slate-700">
                  {typeof item.value === 'number' ? `${item.value}%` : item.value}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Source Summary */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div className="text-xs text-slate-600">
          Based on <span className="font-medium text-slate-900">{((brief.data_points || 0) / 1000000).toFixed(1)}M data points</span> from {brief.sources?.join(', ') || 'multiple sources'} • 
          Confidence: <span className="font-medium text-slate-900">{brief.confidence_score || 0}%</span>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            placeholder="Follow-up question..."
            className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded px-3 py-2 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-300"
          />
          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-slate-600 hover:text-slate-900">
            <Save className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs text-slate-600 hover:text-slate-900">
            <Download className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 h-8 px-3 text-xs rounded">
            Ask
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}