import React from "react";
import { Brain, BarChart3, Zap, Quote, Users, ThumbsUp, FileText } from "lucide-react";
import HarmonyMetricsBlock from "./HarmonyMetricsBlock";
import { getModeIcon } from "./IntentDetection";
import InsightFramework from "./InsightFramework";
import EvidenceCard from "../shared/EvidenceCard";

export default function ModeBasedResults({ question, mode = 'mixed', evidence = [] }) {
  const renderQualitativeSection = () => (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-purple-600" />
        <h3 className="text-sm font-semibold text-slate-900">Qualitative Insights</h3>
      </div>

      {/* Emotional Drivers */}
      <div>
        <div className="text-xs font-medium text-slate-700 mb-3">Top Emotional Drivers</div>
        <div className="space-y-2">
          {['Trust & Authenticity', 'Environmental Concern', 'Cost Savings', 'Convenience', 'Social Influence'].map((driver, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${100 - i * 15}%` }}
                />
              </div>
              <span className="text-xs text-slate-600 w-32 text-right">{driver}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Themes */}
      <div>
        <div className="text-xs font-medium text-slate-700 mb-3">Key Themes</div>
        <div className="flex flex-wrap gap-2">
          {['Sustainability', 'Waste Reduction', 'Brand Trust', 'Price Sensitivity', 'Ease of Use'].map((theme, i) => (
            <div key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs">
              {theme}
            </div>
          ))}
        </div>
      </div>

      {/* Representative Quotes */}
      <div>
        <div className="text-xs font-medium text-slate-700 mb-3 flex items-center gap-2">
          <Quote className="w-3.5 h-3.5" />
          Representative Quotes
        </div>
        <div className="space-y-3">
          {[
            { text: "I love the idea but the refill stations are too far from my home", source: "Reddit • English", sentiment: "mixed" },
            { text: "Finally a brand that cares about the planet and makes it easy", source: "Reviews • English", sentiment: "positive" },
            { text: "The quality dropped after switching to refills", source: "Social • English", sentiment: "negative" }
          ].map((quote, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded p-3">
              <div className="text-sm text-slate-900 mb-2 leading-relaxed">"{quote.text}"</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{quote.source}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  quote.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                  quote.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {quote.sentiment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuantitativeSection = () => (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm font-semibold text-slate-900">Quantitative Analysis</h3>
      </div>

      {/* Metrics Block */}
      <HarmonyMetricsBlock />

      {/* Volume Chart */}
      <div>
        <div className="text-xs font-medium text-slate-700 mb-3">Conversation Volume (6 months)</div>
        <div className="bg-slate-50 border border-slate-200 rounded p-4">
          <div className="flex items-end justify-between gap-1 h-32">
            {[42, 55, 48, 67, 72, 89].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-blue-500 rounded-t" style={{ height: `${height}%` }} />
                <span className="text-[10px] text-slate-500">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demographic Breakdown */}
      <div>
        <div className="text-xs font-medium text-slate-700 mb-3">Geographic Distribution</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { region: 'North America', value: '45%', color: 'bg-blue-500' },
            { region: 'Europe', value: '32%', color: 'bg-teal-500' },
            { region: 'Asia Pacific', value: '18%', color: 'bg-purple-500' },
            { region: 'Other', value: '5%', color: 'bg-slate-400' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${item.color}`} />
              <span className="text-xs text-slate-600">{item.region}</span>
              <span className="text-xs font-semibold text-slate-900 ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMixedSection = () => (
    <div className="space-y-6">
      {/* Unified Insight */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-slate-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-900">Unified Insight</h3>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Consumer interest in refill packaging is growing rapidly (+140% trend velocity) 
          with 34% share of voice, driven primarily by environmental concerns and cost savings. 
          However, convenience barriers and quality perception issues remain key adoption challenges, 
          particularly in North America where 45% of the conversation originates.
        </p>
      </div>

      {/* Split View */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          {renderQualitativeSection()}
        </div>
        <div>
          {renderQuantitativeSection()}
        </div>
      </div>

      {/* Integrated Confidence */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-medium text-slate-700">Confidence Index</div>
          <div className="text-xl font-semibold text-slate-900">88%</div>
        </div>
        <div className="bg-slate-100 rounded-full h-2 mb-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '88%' }} />
        </div>
        <div className="text-xs text-slate-600">
          Based on 2.4M data points across qualitative and quantitative sources
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      {/* Mode Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-lg">{getModeIcon(mode)}</div>
            <h2 className="text-base font-semibold text-slate-900">
              {mode === 'qualitative' ? 'Understanding Analysis' :
               mode === 'quantitative' ? 'Validation Analysis' :
               'Blended Analysis'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{question.text}</p>
        </div>
      </div>

      {/* Mode-specific Content */}
      {mode === 'qualitative' && renderQualitativeSection()}
      {mode === 'quantitative' && renderQuantitativeSection()}
      {mode === 'mixed' && renderMixedSection()}

      {/* Insight Framework */}
      <InsightFramework
        what={mode === 'mixed' 
          ? "Consumer interest in refill packaging growing +140% with 34% share of voice, but convenience and quality concerns limit adoption."
          : mode === 'qualitative'
          ? "Top emotional drivers are trust, environmental concern, and cost savings. Key barrier: perceived inconvenience."
          : "Refill packaging conversations up 140% trend velocity, 34% share of voice, 2.4M data points analyzed."
        }
        soWhat={mode === 'mixed'
          ? "The sustainability narrative is resonating but practical execution falls short—brands risk losing early adopters to frustration."
          : mode === 'qualitative'
          ? "Consumers want to participate in sustainability but won't sacrifice convenience. Emotional buy-in exists, but behavioral friction remains."
          : "Rapid growth signals market readiness, but regional concentration (45% North America) suggests uneven brand execution or awareness."
        }
        nowWhat={mode === 'mixed'
          ? "Launch simplified refill starter kit in North America. Shift messaging from 'eco-benefit' to 'effortless reuse.' Test in-store demos to reduce perceived complexity."
          : mode === 'qualitative'
          ? "Reframe messaging to emphasize ease over environmental impact. Pilot a subscription model that delivers refills to doorsteps to eliminate inconvenience."
          : "Prioritize North American expansion with targeted campaigns. Establish partnerships with local retailers to increase refill station density by 30%."
        }
      />

      {/* Supporting Evidence Section */}
      {evidence && evidence.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-900">Supporting Evidence</h3>
            <span className="text-xs text-slate-500">({evidence.length} items)</span>
          </div>
          <div className="grid gap-3">
            {evidence.map((item, index) => (
              <EvidenceCard key={index} evidence={item} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="mt-6 pt-5 border-t border-slate-200 flex gap-2">
        <button className="text-xs px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors">
          Export Data
        </button>
        <button className="text-xs px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors">
          Share Insight
        </button>
        <button className="text-xs px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors ml-auto">
          Pin to Actions Table
        </button>
        {mode !== 'quantitative' && (
          <button className="text-xs px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors">
            Add Quant Data
          </button>
        )}
        {mode !== 'qualitative' && (
          <button className="text-xs px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors">
            Explain Further
          </button>
        )}
      </div>
    </div>
  );
}