import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Sparkles, Plus, TrendingUp } from "lucide-react";
import { generateFollowUps } from "./IntentDetection";

export default function FollowUpAssistant({ selectedQuestion, caseData, onAddFollowUp }) {
  const [followUpInput, setFollowUpInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [suggestedFollowUps, setSuggestedFollowUps] = useState([]);

  useEffect(() => {
    if (selectedQuestion) {
      const followUps = generateFollowUps(
        selectedQuestion.text,
        selectedQuestion.mode || 'mixed',
        !!selectedQuestion.result
      );
      setSuggestedFollowUps(followUps);
    } else {
      setSuggestedFollowUps([
        "What are the key market trends?",
        "Which demographics are most engaged?",
        "Compare sentiment across regions"
      ]);
    }
  }, [selectedQuestion]);

  const handleAsk = () => {
    if (!followUpInput.trim()) return;
    
    const newMessage = {
      type: 'user',
      text: followUpInput,
      timestamp: new Date()
    };
    
    setConversation([...conversation, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [...prev, {
        type: 'ai',
        text: "I can help you analyze that. Would you like me to add this as a new question to your case?",
        actions: ['Add to Case', 'Generate Data', 'Explain Further'],
        timestamp: new Date()
      }]);
    }, 1000);
    
    setFollowUpInput("");
  };

  const handleSuggestionClick = (suggestion) => {
    setFollowUpInput(suggestion);
  };

  const handleAction = (action, message) => {
    if (action === 'Add to Case' && onAddFollowUp) {
      onAddFollowUp(message.text);
    }
  };

  return (
    <div className="space-y-4">
      {/* Assistant Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-teal-600" />
          <div className="text-[10px] font-medium text-slate-900 uppercase tracking-wider">
            Harmony Follow-Up Assistant
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {selectedQuestion 
            ? "Ask follow-up questions to expand or validate insights"
            : "Get help building and analyzing your case"}
        </p>
      </div>

      {/* Conversation Feed */}
      {conversation.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 max-h-60 overflow-y-auto space-y-3">
          {conversation.map((message, index) => (
            <div key={index} className={`${message.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-[85%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-900'
              }`}>
                <div className="text-xs leading-relaxed">{message.text}</div>
                {message.actions && (
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {message.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleAction(action, message)}
                        className="text-[10px] px-2 py-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-50"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Follow-up Input */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="text-[10px] font-medium text-slate-500 mb-3 uppercase tracking-wider">Ask Follow-up</div>
        <div className="space-y-3">
          <textarea
            value={followUpInput}
            onChange={(e) => setFollowUpInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAsk();
              }
            }}
            placeholder="Ask a follow-up question..."
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded px-3 py-2.5 outline-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-300 resize-none leading-relaxed"
            rows={3}
          />
          <Button
            onClick={handleAsk}
            disabled={!followUpInput.trim()}
            size="sm"
            className="w-full bg-slate-900 text-white hover:bg-slate-800 h-9 text-xs"
          >
            <ArrowRight className="w-3.5 h-3.5 mr-2" />
            Ask Harmony
          </Button>
        </div>
      </div>

      {/* Smart Suggestions with So What / Now What */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-slate-500" />
          <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Suggestions</div>
        </div>
        <div className="space-y-2">
          {suggestedFollowUps.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left p-3 rounded border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                  <Sparkles className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex-1 text-xs text-slate-700 group-hover:text-slate-900 leading-relaxed">
                  {suggestion}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-generated Insight Suggestions */}
      {selectedQuestion?.result && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-1.5 mb-3">
            <Brain className="w-3.5 h-3.5 text-slate-500" />
            <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Generated Insights</div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[10px] font-semibold text-slate-900 mb-1 uppercase tracking-wide">So What</div>
              <div className="text-xs text-slate-700 leading-relaxed">
                The sustainability narrative is resonating but practical execution falls short
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <div className="text-[10px] font-semibold text-slate-900 mb-1 uppercase tracking-wide">Now What</div>
              <div className="text-xs text-slate-700 leading-relaxed mb-2">
                Launch simplified refill starter kit in North America region
              </div>
              <button 
                onClick={() => onAddFollowUp && onAddFollowUp("What metrics should we track for the refill starter kit launch?")}
                className="text-[10px] px-2 py-1 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
              >
                Create Validation Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Metrics */}
      {selectedQuestion?.result && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-[10px] font-medium text-slate-500 mb-4 uppercase tracking-wider">Quick Metrics</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Share of Conversation</span>
              <span className="text-base font-semibold text-slate-900">34%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Trend Velocity</span>
              <span className="text-base font-semibold text-teal-600">+12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Sentiment Score</span>
              <span className="text-base font-semibold text-slate-900">72/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">Confidence Level</span>
              <span className="text-base font-semibold text-slate-900">91%</span>
            </div>
          </div>
        </div>
      )}

      {/* Context Info */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
        <div className="text-[10px] font-medium text-slate-500 mb-3 uppercase tracking-wider">Context</div>
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
          <div>Sources: {caseData.sources.join(', ')}</div>
          <div>Language: {caseData.language}</div>
          {caseData.regions.length > 0 && (
            <div>Regions: {caseData.regions.join(', ')}</div>
          )}
        </div>
      </div>
    </div>
  );
}