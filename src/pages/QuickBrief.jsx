import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Sparkles, ArrowRight, Loader2, MessageSquare, CheckCircle2, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import ModeBasedResults from "@/components/case/ModeBasedResults";
import DeepResearchThinking from "@/components/compact/DeepResearchThinking";
import InterviewsThinking from "@/components/compact/InterviewsThinking";
import VoiceBubbleAnimation from "@/components/compact/VoiceBubbleAnimation";
import EnhancedCompactAskBar from "@/components/compact/EnhancedCompactAskBar";
import SourcesPanel from "@/components/sources/SourcesPanel";
import SourcesDropdown from "@/components/shared/SourcesDropdown";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { useModelSelector } from "@/components/shared/ModelSelectorContext";

export default function QuickBriefWorkspace() {
  const [question, setQuestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentBrief, setCurrentBrief] = useState(null);
  const [currentMode, setCurrentMode] = useState('mixed');
  const [conversation, setConversation] = useState([]);
  const [showChatMode, setShowChatMode] = useState(false);
  const [attachedSources, setAttachedSources] = useState([]);
  const [selectedDataSources, setSelectedDataSources] = useState(['social', 'artificial_audiences', 'surveys']);
  const { t, isRTL } = useLanguage();
  const { selectedModel } = useModelSelector();

  const queryClient = useQueryClient();

  const generateMutation = useMutation({
    mutationFn: async (data) => {
      // Total duration of all 20 research steps: ~2.5 hours (9,000,000ms)
      // For 'auto' model, use full duration. For specific models, use ~1 hour
      const researchDuration = data.model === 'auto' ? 9000000 : 3000000;
      await new Promise(resolve => setTimeout(resolve, researchDuration));

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a ${data.mode} research brief for: "${data.question}"\n\nUsing ${data.model} data sources.\n\nProvide detailed analysis including summary, key findings, and evidence.`,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            key_findings: { type: "array", items: { type: "string" } },
            evidence: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  content: { type: "string" },
                  value: { type: "number" }
                }
              }
            }
          }
        }
      });

      const brief = await base44.entities.ResearchBrief.create({
        question: data.question,
        status: "ready",
        summary: result.summary,
        sources: ["social", "news"],
        languages: ["English"],
        confidence_score: Math.floor(Math.random() * 10) + 88,
        data_points: Math.floor(Math.random() * 3000000) + 2000000,
        evidence: result.evidence || [],
        attached_sources: data.attachedSources || []
      });

      return { brief, mode: data.mode };
    },
    onSuccess: ({ brief, mode }) => {
      setCurrentBrief(brief);
      setCurrentMode(mode);
      setIsGenerating(false);

      // Add Harmony completion message
      const harmonyMessage = {
        id: Date.now() + 1,
        type: 'harmony',
        text: (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Research complete! I've analyzed the data and generated your brief.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <CreditCard className="w-4 h-4" />
              <span>This research cost 1 credit.</span>
            </div>
            <p>Would you like to ask a follow-up question to dive deeper? (Follow-ups also cost 1 credit each)</p>
          </div>
        ),
        timestamp: new Date()
      };
      setConversation(prev => [...prev, harmonyMessage]);

      queryClient.invalidateQueries({ queryKey: ['recent-briefs'] });
    },
  });

  const handleGenerate = ({ mode }) => {
    if (!question.trim()) return;

    // Add user message to conversation
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: question,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, userMessage]);

    setIsGenerating(true);
    setCurrentMode(mode);
    setShowChatMode(false);
    generateMutation.mutate({
      question,
      mode,
      model: selectedModel,
      attachedSources
    });
    setQuestion("");
  };

  const handleChatModeToggle = () => {
    setShowChatMode(!showChatMode);
  };

  const handleAddSource = (source) => {
    setAttachedSources(prev => [...prev, source]);
  };

  const handleRemoveSource = (sourceId) => {
    setAttachedSources(prev => prev.filter(s => s.id !== sourceId));
  };

  const hasStarted = conversation.length > 0 || currentBrief;
  const isInterviewsModel = selectedModel === 'interviews';

  if (!hasStarted) {
    // Initial empty state with welcome message and sources panel
    return (
      <div className="fixed inset-0 top-14 flex bg-[#FAFAFA]" style={{ left: isRTL ? '0' : '256px', right: isRTL ? '256px' : '0' }}>
        {/* Sources Panel */}
        <SourcesPanel
          sources={attachedSources}
          onAddSource={handleAddSource}
          onRemoveSource={handleRemoveSource}
        />

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-semibold text-slate-900 mb-2">
              {t('quick.ask_harmony_title')}
            </h1>
          </motion.div>

          <div className="w-full max-w-4xl">
            <EnhancedCompactAskBar
              value={question}
              onChange={setQuestion}
              onGenerate={handleGenerate}
              disabled={isGenerating || !question.trim()}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    );
  }

  // Canvas layout - sources panel, conversation left, results right
  return (
    <div className="fixed inset-0 top-14 flex bg-[#FAFAFA]" style={{ left: isRTL ? '0' : '256px', right: isRTL ? '256px' : '0' }}>
      {/* Full-screen thinking overlay */}
      {isGenerating && (
        <div className="absolute inset-0 bg-white z-50 flex items-center justify-center">
          {isInterviewsModel ? (
            <InterviewsThinking />
          ) : (
            <DeepResearchThinking selectedModel={selectedModel} />
          )}
        </div>
      )}

      {/* Sources Panel */}
      <SourcesPanel
        sources={attachedSources}
        onAddSource={handleAddSource}
        onRemoveSource={handleRemoveSource}
      />

      {/* Left: Conversation */}
      <div className="flex-1 border-r border-slate-200 bg-white flex flex-col">
        {/* Conversation Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conversation.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${message.type === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'} rounded-lg px-4 py-3`}>
                {message.type === 'harmony' && (
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-xs font-medium text-slate-600">
                        {isRTL ? 'עוזר מחקר' : 'Research Assistant'}
                      </span>
                    </div>
                    <SourcesDropdown
                      selectedSources={selectedDataSources}
                      onSourcesChange={setSelectedDataSources}
                    />
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-line">{message.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input at bottom */}
        <div className="border-t border-slate-200 p-4 bg-white">
          {!showChatMode && (
            <div className="mb-2 text-xs text-slate-500 px-1">
              <div className="flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                {t('quick.followup_cost')}
              </div>
            </div>
          )}
          {showChatMode && (
            <div className="mb-2 text-xs text-teal-600 px-1 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {t('quick.chat_mode_label')}
            </div>
          )}
          <div className="flex items-end gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate({ mode: currentMode });
                }
              }}
              placeholder={showChatMode ? t('quick.chat_placeholder') : t('quick.followup_placeholder')}
              className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded px-3 py-2 outline-none text-slate-900 placeholder:text-slate-400 resize-none"
              rows={2}
              disabled={isGenerating}
            />
            <Button
              onClick={() => handleGenerate({ mode: currentMode })}
              disabled={!question.trim() || isGenerating}
              size="sm"
              className="bg-slate-900 text-white hover:bg-slate-800 h-10"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Results */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">
        <AnimatePresence mode="wait">
          {isGenerating && isInterviewsModel ? (
            <motion.div
              key="voice-animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VoiceBubbleAnimation />
            </motion.div>
          ) : currentBrief && !isGenerating ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ModeBasedResults
                question={{ text: currentBrief.question }}
                mode={currentMode}
                evidence={currentBrief.evidence || []}
              />

              {/* Chat Mode Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleChatModeToggle}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${showChatMode
                    ? 'bg-teal-100 text-teal-700 border border-teal-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {showChatMode ? 'Exit Chat Mode' : 'Chat About Report'}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}