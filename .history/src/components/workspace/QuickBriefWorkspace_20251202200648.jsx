import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Sparkles, ArrowRight, ArrowUp, Loader2, MessageSquare, Save, Plus, FileText, Settings, Trash2, GripVertical, Columns, BarChart2, Database, Maximize2, Minimize2, LayoutGrid, Type, AlignLeft, Download, Printer, Bot, File as FileIcon, FileDown, User, RefreshCw, ChevronDown, Play } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ModeBasedResults from "../case/ModeBasedResults";
import SafeComponentRenderer from "../reports/SafeComponentRenderer";
import DeepResearchThinking from "../compact/DeepResearchThinking";
import InterviewsThinking from "../compact/InterviewsThinking";
import VoiceBubbleAnimation from "../compact/VoiceBubbleAnimation";
import EnhancedCompactAskBar from "../compact/EnhancedCompactAskBar";
import AddSourceModal from "../sources/AddSourceModal";
import { useLanguage } from "../shared/LanguageProvider";
import { useModelSelector } from "../shared/ModelSelectorContext";

// ============ DEMO MODE CONFIGURATION ============
const USE_DEMO_MODE = true;
const DEMO_QUESTION = "What is the customer satisfaction for Oral-B iO models?";

// Demo Chat Messages Flow
const DEMO_CHAT_MESSAGES = [
    { delay: 800, text: "Breaking down question...", type: 'status' },
    { delay: 2500, text: "Creating subquestions and prompts...", type: 'status' },
    { delay: 4500, text: "Creating blocks...", type: 'status' },
    { delay: 8000, text: "Analyzing market data...", type: 'status' },
];

// Demo Blocks
const DEMO_BLOCKS = [
    { 
        id: 'block-1', 
        title: 'Executive Summary',
        subtitle: 'Key findings and overall satisfaction metrics',
        prompts: 'Analyze overall customer satisfaction scores across all Oral-B iO models. Include average ratings, sentiment distribution, and comparison between models.',
        showAt: 5000 
    },
    { 
        id: 'block-2', 
        title: 'Satisfaction Leaderboard',
        subtitle: 'Model-by-model performance comparison',
        prompts: 'Create a ranked comparison of all Oral-B iO models based on customer satisfaction. Include purchase volume data and rating distributions.',
        showAt: 5500 
    },
    { 
        id: 'block-3', 
        title: 'Feature Deep Dive',
        subtitle: 'Analysis of key product features',
        prompts: 'Analyze customer feedback on specific features: cleaning performance, battery life, smart features, brush head design, and noise level.',
        showAt: 6000 
    },
    { 
        id: 'block-4', 
        title: 'Key Drivers Analysis',
        subtitle: 'What drives satisfaction and dissatisfaction',
        prompts: 'Identify the top drivers of customer satisfaction and dissatisfaction. Include sentiment analysis and quote examples.',
        showAt: 6500 
    },
    { 
        id: 'block-5', 
        title: 'Strategic Recommendations',
        subtitle: 'Actionable insights and next steps',
        prompts: 'Based on the analysis, provide strategic recommendations for product improvement, marketing positioning, and customer communication.',
        showAt: 7000 
    },
];

// Demo Research Assistant Component
const DemoResearchAssistant = ({ messages, isTyping, loadingMessage }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    return (
        <div className="w-96 flex flex-col h-full overflow-hidden bg-white border-r border-slate-200">
            {/* Header */}
            <div className="shrink-0 p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-full">
                        <Sparkles className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 text-sm">Research Assistant</h3>
                        <p className="text-xs text-slate-500">Connected to analysis data</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-slate-50/50">
                <div className="space-y-4">
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3"
                        >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                                msg.role === 'user' 
                                    ? 'bg-slate-900 text-white' 
                                    : 'bg-white border border-slate-200 text-slate-600'
                            }`}>
                                {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className={`p-3 rounded-xl text-sm leading-relaxed ${
                                    msg.role === 'user'
                                        ? 'bg-slate-900 text-white rounded-tl-none'
                                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                                }`}>
                                    {msg.type === 'status' ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                                            <span>{msg.content}</span>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3 items-center pl-2"
                        >
                            <div className="flex items-center gap-2">
                                <div className="relative w-4 h-4">
                                    <div className="absolute inset-0 rounded-full bg-slate-400 animate-ping opacity-75"></div>
                                    <div className="absolute inset-0 rounded-full bg-slate-500"></div>
                                </div>
                                <span className="text-sm text-slate-500">
                                    {loadingMessage}
                                </span>
                            </div>
                        </motion.div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </div>

            {/* Input - Disabled during demo */}
            <div className="shrink-0 p-4 bg-white border-t border-slate-100">
                <div className="flex items-end gap-2">
                    <div className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 opacity-50">
                        <textarea
                            placeholder="Analysis in progress..."
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-sm p-0"
                            rows={1}
                            disabled
                        />
                    </div>
                    <button
                        disabled
                        className="bg-slate-300 text-white rounded-full h-10 w-10 shrink-0 flex items-center justify-center cursor-not-allowed"
                    >
                        <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Demo Block Component
const DemoBlock = ({ block, index, isAnalyzing }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full bg-white group/slide relative"
        >
            {/* Full Width Divider */}
            <div className="w-full h-px bg-slate-200 mb-8"></div>
            
            {/* Block Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                        <GripVertical size={12} className="text-slate-400" />
                        <span className="text-xs font-medium text-slate-500">Block {index + 1}</span>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-400 rounded-lg cursor-not-allowed text-sm">
                    <Play size={14} />
                    Run Block
                </button>
            </div>

            {/* Block Title & Subtitle */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{block.title}</h2>
                <p className="text-slate-500">{block.subtitle}</p>
            </div>

            {/* Prompt Running State */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-200 rounded-lg">
                        <Sparkles className="w-4 h-4 text-slate-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Prompt</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{block.prompts}</p>
                
                {isAnalyzing && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 pt-4 border-t border-slate-200"
                    >
                        <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                        <span className="text-sm text-slate-500">Running analysis...</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

// Analysis Progress Bar Component
const AnalysisProgressBar = ({ progress, estimatedTime }) => {
    return (
        <div className="bg-white border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Analysis in Progress</span>
                </div>
                <span className="text-sm text-slate-500">Estimated Time: {estimatedTime}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-slate-900 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );
};

// Demo Workspace Component
function DemoQuickBriefWorkspace() {
    const [hasStarted, setHasStarted] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [visibleBlocks, setVisibleBlocks] = useState([]);
    const [progress, setProgress] = useState(0);
    const [currentLoadingMessage, setCurrentLoadingMessage] = useState('');
    const { isRTL } = useLanguage();

    const startDemo = () => {
        setHasStarted(true);
        setIsAnalyzing(true);
        
        // Add user question
        setChatMessages([{ role: 'user', content: DEMO_QUESTION }]);
        
        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 15) {
                    clearInterval(progressInterval);
                    return 15;
                }
                return prev + 0.3;
            });
        }, 300);

        // Chat messages flow
        DEMO_CHAT_MESSAGES.forEach((msg) => {
            setTimeout(() => {
                setChatMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: msg.text,
                    type: msg.type 
                }]);
                setCurrentLoadingMessage(msg.text);
            }, msg.delay);
        });

        // Show blocks progressively
        DEMO_BLOCKS.forEach((block) => {
            setTimeout(() => {
                setVisibleBlocks(prev => [...prev, block]);
            }, block.showAt);
        });
    };

    // Initial state - show question input
    if (!hasStarted) {
        return (
            <div className="fixed inset-0 top-14 flex bg-[#FAFAFA]" style={{ left: isRTL ? '0' : '256px', right: isRTL ? '256px' : '0' }}>
                <div className="flex-1 flex flex-col items-center justify-center px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl font-semibold text-slate-900 mb-2">
                            What would you like to research?
                        </h1>
                    </motion.div>

                    <div className="w-full max-w-2xl">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-4">
                            <div className="flex items-end gap-3">
                                <textarea
                                    value={DEMO_QUESTION}
                                    readOnly
                                    className="flex-1 text-lg bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-slate-900"
                                    rows={2}
                                />
                                <button
                                    onClick={startDemo}
                                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full h-12 w-12 shrink-0 flex items-center justify-center transition-colors"
                                >
                                    <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Analysis in progress state
    return (
        <div className="fixed inset-0 top-14 flex flex-col bg-white" style={{ left: isRTL ? '0' : '256px', right: isRTL ? '256px' : '0' }}>
            {/* Progress Bar */}
            <AnalysisProgressBar progress={progress} estimatedTime="3h" />
            
            <div className="flex flex-1 overflow-hidden">
                {/* Research Assistant Sidebar */}
                <DemoResearchAssistant 
                    messages={chatMessages}
                    isTyping={isAnalyzing}
                    loadingMessage={currentLoadingMessage}
                />

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="max-w-5xl mx-auto px-12 py-12">
                        {/* Header */}
                        <div className="mb-12 flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-slate-900 mb-3">Oral-B IO Models Analysis</h1>
                                <p className="text-slate-500 text-lg">Interactive workspace for Oral-B iO customer satisfaction analysis.</p>
                            </div>
                            
                            {/* Action Buttons - Disabled during analysis */}
                            <div className="flex items-center gap-3 opacity-50">
                                <button
                                    disabled
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg cursor-not-allowed"
                                >
                                    <Download size={16} />
                                    <span className="font-medium text-sm">Export</span>
                                    <ChevronDown size={14} />
                                </button>
                                
                                <button
                                    disabled
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-300 text-white rounded-lg cursor-not-allowed"
                                >
                                    <RefreshCw size={16} />
                                    <span className="font-medium text-sm">Rerun</span>
                                </button>
                            </div>
                        </div>

                        {/* Blocks */}
                        <div className="space-y-16">
                            <AnimatePresence>
                                {visibleBlocks.map((block, index) => (
                                    <DemoBlock 
                                        key={block.id} 
                                        block={block} 
                                        index={index}
                                        isAnalyzing={isAnalyzing}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        {visibleBlocks.length === 0 && (
                            <div className="flex items-center justify-center py-20">
                                <div className="text-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-slate-400 mx-auto mb-4" />
                                    <p className="text-slate-500">Creating analysis blocks...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============ END DEMO MODE ============

export default function QuickBriefWorkspace() {
  // Demo mode check
  if (USE_DEMO_MODE) {
    return <DemoQuickBriefWorkspace />;
  }
  const [question, setQuestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentBrief, setCurrentBrief] = useState(null);
  const [currentMode, setCurrentMode] = useState('mixed');
  const [conversation, setConversation] = useState([]);
  const [showChatMode, setShowChatMode] = useState(false);
  const [attachedSources, setAttachedSources] = useState([]);
  const [reportComponents, setReportComponents] = useState([]);
  const [activeComponentId, setActiveComponentId] = useState(null);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const { t, isRTL } = useLanguage();
  const { selectedModel } = useModelSelector();

  const queryClient = useQueryClient();

  const { data: templates = [] } = useQuery({
    queryKey: ['report-templates'],
    queryFn: () => base44.entities.ReportTemplate.list('-created_date'),
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(reportComponents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setReportComponents(items);
  };

  const addComponent = (type) => {
    const newId = `comp_${Date.now()}`;
    const newComponent = {
      id: newId,
      title: type === 'headline' ? 'New Section' : 'New Component',
      data_source: 'social',
      width: type === 'headline' || type === 'text' ? 'full' : 'half',
      visualization: { type: type },
      narrative: { enabled: true },
      result: {
        visualization_data: type === 'headline' ? "New Section Title" :
          type === 'text' ? "Add your analysis or findings here..." :
            null,
        narrative: null
      }
    };
    setReportComponents(prev => [...prev, newComponent]);
    setActiveComponentId(newId);

    // Scroll to bottom
    setTimeout(() => {
      const element = document.getElementById('report-components-container');
      if (element) element.scrollTop = element.scrollHeight;
    }, 100);
  };

  const insertComponent = (index, type) => {
    const newId = `comp_${Date.now()}`;
    const newComponent = {
      id: newId,
      title: type === 'headline' ? 'New Section' : type === 'prompt' ? 'AI Prompt' : 'New Component',
      data_source: 'social',
      width: type === 'headline' || type === 'text' || type === 'prompt' ? 'full' : 'half',
      visualization: { type: type },
      narrative: { enabled: true },
      result: {
        visualization_data: type === 'headline' ? "New Section Title" :
          type === 'text' ? "Add your analysis or findings here..." :
            null,
        narrative: null
      }
    };
    const items = Array.from(reportComponents);
    items.splice(index, 0, newComponent);
    setReportComponents(items);
    setActiveComponentId(newId);
  };

  const updateComponentWidth = (id, width) => {
    setReportComponents(prev => prev.map(c => c.id === id ? { ...c, width } : c));
  };

  const updateComponentConfig = (id, key, value) => {
    setReportComponents(prev => prev.map(c => {
      if (c.id !== id) return c;
      // Deep merge for visualization config if needed, or just top level property
      if (key === 'visualization_type') {
        return { ...c, visualization: { ...c.visualization, type: value } };
      }
      return { ...c, [key]: value };
    }));
  };

  const deleteComponent = (id) => {
    setReportComponents(prev => prev.filter(c => c.id !== id));
  };

  const handleSelectTemplate = (template) => {
    setReportComponents(template.components.map(c => ({
      ...c,
      id: c.id || `comp_${Date.now()}_${Math.random()}`,
      width: 'full', // Default width
      result: null // Reset results as they need to be generated for specific question if needed, or maybe we keep them if template has default data? Usually templates have structure not data.
    })));

    setConversation([{
      id: Date.now(),
      type: 'harmony',
      text: `I've loaded the "${template.name}" template. What specific question or topic should we research using this structure?`,
      timestamp: new Date()
    }]);

    // Clear any previous generation state
    setIsGenerating(false);
    setQuestion("");
  };

  const generateReportMutation = useMutation({
    mutationFn: async (data) => {
      // Add artificial delay to match the step-by-step animation (about 13 seconds total)
      await new Promise(resolve => setTimeout(resolve, 13000));

      // If refining a specific component
      if (data.componentId) {
        const component = reportComponents.find(c => c.id === data.componentId);
        const response = await base44.integrations.Core.InvokeLLM({
          prompt: `Refine this report component based on user feedback.
  Component: ${JSON.stringify(component)}
  User Request: "${data.question}"

  Return the updated component configuration and full data analysis.`,
          response_json_schema: {
            type: "object",
            properties: {
              component: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  data_source: { type: "string" },
                  visualization: { type: "object" },
                  narrative: { type: "object" }
                }
              },
              result: {
                type: "object",
                properties: {
                  visualization_data: { type: "array", items: { type: "object" } },
                  narrative: { type: "string" }
                }
              }
            }
          }
        });
        return {
          type: 'update_component',
          componentId: data.componentId,
          updates: response.component,
          result: response.result
        };
      }

      // Using existing template or generating new structure
      const isTemplate = !!data.templateComponents;
      const templateContext = isTemplate
        ? `Using the following report structure (template): ${JSON.stringify(data.templateComponents.map(c => ({ title: c.title, data_source: c.data_source, visualization: c.visualization })))}`
        : "Create 4-5 distinct analytic components that form a comprehensive research report. Include a mix of quantitative (charts) and qualitative (text/analysis) components.";

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a comprehensive modular research report for: "${data.question}"
  ${templateContext}

  For each component:
  1. Provide a clear title and appropriate data source.
  2. Select the best visualization type (bar, line, pie, table, text, etc.).
  3. GENERATE REALISTIC, DETAILED DATA for the result. 
     - For Charts/Tables: Return an object with an "items" array: { "items": [{ "name": "X", "value": 10 }, ...] }
     - For Text/Headlines: Return an object with a "content" string: { "content": "Your text here..." }
  4. Include a narrative analysis explaining the data.

  ${isTemplate ? "IMPORTANT: Maintain the exact structure/visualization types of the template but generate new data relevant to the question." : ""}`,
        response_json_schema: {
          type: "object",
          properties: {
            components: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  data_source: { type: "string" },
                  visualization: { type: "object" },
                  narrative: { type: "object" },
                  width: { type: "string", enum: ["full", "half", "third"], default: "half" },
                  result: {
                    type: "object",
                    properties: {
                      visualization_data: { type: "object", additionalProperties: true },
                      narrative: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      });
      return { type: 'new_report', components: response.components };
    },
    onSuccess: (data) => {
      setIsGenerating(false);
      if (data.type === 'new_report') {
        // Validate components existence
        const components = Array.isArray(data.components) ? data.components : [];

        // Add logging to debug
        console.log('LLM Response:', data);
        console.log('Components:', components);

        if (components.length === 0) {
          setConversation(prev => [...prev, {
            id: Date.now(),
            type: 'harmony',
            text: "I couldn't generate the report components. Please try again with a different request.",
            timestamp: new Date()
          }]);
          return;
        }

        setReportComponents(components.map(c => ({
          ...c,
          id: c.id || `comp_${Date.now()}_${Math.random()}`,
          result: c.result // Store initial result with component for preview
        })));
        // Add completion message
        setConversation(prev => [...prev, {
          id: Date.now(),
          type: 'harmony',
          text: "I've generated a report structure with components based on your request. You can click on any component to refine it individually.",
          timestamp: new Date()
        }]);
      } else if (data.type === 'update_component') {
        setReportComponents(prev => prev.map(c =>
          c.id === data.componentId
            ? { ...c, ...data.updates, result: data.result }
            : c
        ));
        setConversation(prev => [...prev, {
          id: Date.now(),
          type: 'harmony',
          text: "I've updated the component based on your feedback.",
          timestamp: new Date()
        }]);
      }
    },
    onError: (error) => {
      console.error("Report generation error:", error);
      setIsGenerating(false);
      setConversation(prev => [...prev, {
        id: Date.now(),
        type: 'harmony',
        text: `Sorry, I encountered an error while generating the report: ${error.message || "Unknown error"}. Please try again.`,
        timestamp: new Date()
      }]);
    }
  });

  const saveTemplateMutation = useMutation({
    mutationFn: async (name) => {
      return base44.entities.ReportTemplate.create({
        name,
        components: reportComponents.map(({ result, ...c }) => c), // Strip results
        description: `Generated from prompt: ${question}`,
        version: 1
      });
    },
    onSuccess: () => {
      setIsSavingTemplate(false);
      setConversation(prev => [...prev, {
        id: Date.now(),
        type: 'harmony',
        text: `✅ Template "${templateName}" saved successfully! You can reuse it later.`,
        timestamp: new Date()
      }]);
    }
  });

  const generateMutation = useMutation({
    mutationFn: async (data) => {
      // Add artificial delay to match the step-by-step animation (about 13 seconds total)
      await new Promise(resolve => setTimeout(resolve, 13000));

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
        text: "✅ Research complete! I've analyzed the data and generated your brief.\n\n💳 This research cost 1 credit.\n\nWould you like to ask a follow-up question to dive deeper? (Follow-ups also cost 1 credit each)",
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

    // If template is selected, use it to initialize report components
    if (selectedTemplateId && reportComponents.length === 0) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template) {
        // Initialize components from template but without data, then let mutation fill them?
        // Or better: pass template structure to mutation to fill data
        // For now, let's set them and then call mutation to fill data.
        // Actually, generateReportMutation logic for 'new_report' generates structure.
        // We need a way to 'fill_data_for_structure'.
        // Let's hack it: we'll just manually set components and then call mutation as if we are refining them? 
        // No, that's per component.

        // Let's modify generateReportMutation to handle 'fill_template'
        // Or just assume if components exist, we are refining?
        // But here we want to generate data for ALL of them based on new question.

        // For MVP: Just use the standard flow but pass template info to prompt?
        // No, user wants to USE the template structure.

        // Let's do this:
        // 1. Set report components from template
        // 2. Trigger "refine" on all of them? No that's too many calls.

        // Correct approach: Pass template components to generateReportMutation
        generateReportMutation.mutate({
          question,
          templateComponents: template.components
        });
        setQuestion("");
        return;
      }
    }

    // Always use the component-based report generation for the main interaction
    // This ensures we get the modular view with data filled out
    if (reportComponents.length > 0 && activeComponentId) {
      // Refining a specific component
      generateReportMutation.mutate({
        question,
        componentId: activeComponentId
      });
    } else {
      // Generating a new report or adding to existing (conceptually)
      // For now, treat main input as generating a report structure
      generateReportMutation.mutate({
        question,
        templateComponents: selectedTemplateId ? templates.find(t => t.id === selectedTemplateId)?.components : null
      });
    }
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
        <AddSourceModal
          open={isAddSourceOpen}
          onClose={() => setIsAddSourceOpen(false)}
          onAddSource={handleAddSource}
        />

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-semibold text-slate-900 mb-2">
              Ask Harmony anything..
            </h1>
          </motion.div>

          <div className="w-full max-w-4xl space-y-8">
            <EnhancedCompactAskBar
              value={question}
              onChange={setQuestion}
              onGenerate={handleGenerate}
              disabled={isGenerating || !question.trim()}
              isGenerating={isGenerating}
              attachedSources={attachedSources}
              onRemoveSource={handleRemoveSource}
              onAddSourceClick={() => setIsAddSourceOpen(true)}
            />

            {/* Template Selector Grid */}
            <div className="space-y-3">
              <div className="text-sm text-slate-500">or select a template...</div>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-slate-400 hover:shadow-sm transition-all cursor-pointer text-left group"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                        <FileText className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">
                        {template.category || 'General'}
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                ))}

                {/* Fallback if no templates */}
                {templates.length === 0 && (
                  <div className="col-span-2 p-8 text-center border border-dashed border-slate-200 rounded-xl text-slate-400">
                    No templates available. Create one from a report!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Canvas layout - conversation left, results right
  return (
    <div className="fixed inset-0 top-14 flex bg-[#FAFAFA]" style={{ left: isRTL ? '0' : '256px', right: isRTL ? '256px' : '0' }}>
      <AddSourceModal
        open={isAddSourceOpen}
        onClose={() => setIsAddSourceOpen(false)}
        onAddSource={handleAddSource}
      />

      {/* Left: Conversation */}
      <div className="w-[400px] lg:w-[450px] shrink-0 bg-white flex flex-col border-r border-slate-200">
        {/* Conversation Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {conversation.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${message.type === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'} rounded-lg px-4 py-3`}>
                {message.type === 'harmony' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-xs font-medium text-slate-600">Harmony</span>
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-line">{message.text}</div>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-lg px-4 py-3 min-w-[400px]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-xs font-medium text-slate-600">Harmony</span>
                </div>
                {isInterviewsModel ? (
                  <InterviewsThinking />
                ) : (
                  <DeepResearchThinking selectedModel={selectedModel} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input at bottom */}
        <div className="border-t border-slate-200 p-4 bg-white">
          {!showChatMode && (
            <div className="mb-2 text-xs text-slate-500 px-1">
              💳 Each follow-up question costs 1 credit
            </div>
          )}
          {showChatMode && (
            <div className="mb-2 text-xs text-teal-600 px-1 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Chat mode: Ask questions freely about the report
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
              placeholder={
                activeComponentId
                  ? `Refining "${reportComponents.find(c => c.id === activeComponentId)?.title}"...`
                  : showChatMode
                    ? "Ask me anything about this report..."
                    : reportComponents.length > 0
                      ? "Refine the report or add components..."
                      : "Ask a follow-up question..."
              }
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

      {/* Right: Results (Preview) */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">
        <AnimatePresence mode="wait">
          {reportComponents.length > 0 ? (
            <motion.div
              key="report-components"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Report Header Toolbar */}
              <div className="sticky top-0 z-20 bg-[#FAFAFA]/95 backdrop-blur py-2 mb-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Research Report</h2>
                  <p className="text-xs text-slate-500">Last updated just now</p>
                </div>

                <div className="flex items-center gap-2">
                  <Dialog open={isSavingTemplate} onOpenChange={setIsSavingTemplate}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 text-slate-500">
                        <Save className="w-4 h-4 mr-2" />
                        Save Template
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Report Template</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Template Name</label>
                        <Input
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          placeholder="e.g., Monthly Brand Health"
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={() => saveTemplateMutation.mutate(templateName)}>Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="default" size="sm" className="bg-slate-900 text-white hover:bg-slate-800 h-8">
                        <FileDown className="w-4 h-4 mr-2" />
                        Export & Generate
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem className="gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Download as PDF</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Printer className="w-4 h-4" />
                        <span>Print Report</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <FileIcon className="w-4 h-4" />
                        <span>Generate Presentation</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Download className="w-4 h-4" />
                        <span>Export Data (CSV)</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Page Break Guide (Visual Only) */}
              <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-0 overflow-hidden opacity-10">
                {/* Dashed line every ~1000px to simulate pages */}
                <div className="w-full border-b border-dashed border-slate-900 absolute top-[1000px]" />
                <div className="w-full border-b border-dashed border-slate-900 absolute top-[2000px]" />
                <div className="w-full border-b border-dashed border-slate-900 absolute top-[3000px]" />
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="report-components" direction="vertical">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-12 gap-4"
                    >
                      {reportComponents.map((component, index) => {
                        const width = component.width || 'full';
                        const colSpan = width === 'full' ? 'col-span-12' : width === 'half' ? 'col-span-6' : 'col-span-4';

                        return (
                          <Draggable key={component.id} draggableId={component.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`${colSpan} relative`}
                                style={{ ...provided.draggableProps.style }}
                              >
                                {/* Insert Zone (Inside Draggable) */}
                                <div className="h-4 -mt-2 -mb-2 relative z-30 group/insert opacity-0 hover:opacity-100 transition-opacity">
                                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-teal-500/50" />
                                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-1 bg-white shadow-sm border border-slate-200 rounded-full p-1 scale-90 hover:scale-100">
                                    <button onClick={() => insertComponent(index, 'text')} className="p-1 hover:bg-slate-100 rounded-full text-slate-500" title="Add Text"><AlignLeft className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => insertComponent(index, 'headline')} className="p-1 hover:bg-slate-100 rounded-full text-slate-500" title="Add Headline"><Type className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => insertComponent(index, 'bar')} className="p-1 hover:bg-slate-100 rounded-full text-slate-500" title="Add Chart"><BarChart2 className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => insertComponent(index, 'prompt')} className="p-1 hover:bg-teal-50 rounded-full text-teal-600" title="AI Prompt"><Bot className="w-3.5 h-3.5" /></button>
                                  </div>
                                </div>

                                {/* Component Container */}
                                <div className={`group relative transition-all rounded-xl z-0 my-2 ${['headline', 'text', 'prompt'].includes(component.visualization?.type)
                                  ? 'bg-transparent'
                                  : `bg-white border ${activeComponentId === component.id ? 'border-teal-500 shadow-md' : 'border-slate-200 shadow-sm'}`
                                  } ${snapshot.isDragging ? 'shadow-xl z-50 bg-white ring-2 ring-teal-500/20' : ''}`}>

                                  {/* Attached Hover Controls */}
                                  <div
                                    className={`absolute -top-9 left-0 right-0 h-9 flex items-center justify-between px-3 bg-white border-x border-t border-slate-200 rounded-t-lg shadow-sm z-20 transition-all duration-200 ${snapshot.isDragging || activeComponentId === component.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                                      }`}
                                  >
                                    <div className="flex items-center gap-2 overflow-hidden">
                                      <div {...provided.dragHandleProps} className="p-1 hover:bg-slate-100 rounded cursor-grab active:cursor-grabbing text-slate-400">
                                        <GripVertical className="w-4 h-4" />
                                      </div>

                                      <div className="h-4 w-px bg-slate-200 mx-1" />

                                      {/* Config Controls */}
                                      <div className="flex items-center gap-2">
                                        <Select
                                          value={component.data_source}
                                          onValueChange={(v) => updateComponentConfig(component.id, 'data_source', v)}
                                        >
                                          <SelectTrigger className="h-6 text-[10px] px-2 gap-1.5 w-auto min-w-[100px] border-none shadow-none bg-transparent hover:bg-slate-50">
                                            <Database className="w-3 h-3 text-slate-500" />
                                            <SelectValue placeholder="Source" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="social">Social Media</SelectItem>
                                            <SelectItem value="news">News & PR</SelectItem>
                                            <SelectItem value="reviews">Product Reviews</SelectItem>
                                            <SelectItem value="search">Search Trends</SelectItem>
                                          </SelectContent>
                                        </Select>

                                        <Select
                                          value={component.visualization?.type || 'bar'}
                                          onValueChange={(v) => updateComponentConfig(component.id, 'visualization_type', v)}
                                        >
                                          <SelectTrigger className="h-6 text-[10px] px-2 gap-1.5 w-auto min-w-[90px] border-none shadow-none bg-transparent hover:bg-slate-50">
                                            <BarChart2 className="w-3 h-3 text-slate-500" />
                                            <SelectValue placeholder="Visual" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="bar">Bar Chart</SelectItem>
                                            <SelectItem value="line">Line Chart</SelectItem>
                                            <SelectItem value="area">Area Chart</SelectItem>
                                            <SelectItem value="pie">Pie Chart</SelectItem>
                                            <SelectItem value="table">Table</SelectItem>
                                            <SelectItem value="text">Text Only</SelectItem>
                                            <SelectItem value="headline">Headline</SelectItem>
                                            <SelectItem value="prompt">AI Prompt</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                      {/* Width Controls */}
                                      <div className="flex items-center gap-0.5">
                                        <button
                                          onClick={() => updateComponentWidth(component.id, 'third')}
                                          className={`p-1 rounded ${width === 'third' ? 'text-slate-900 bg-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                                          title="1/3 Width"
                                        >
                                          <Columns className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          onClick={() => updateComponentWidth(component.id, 'half')}
                                          className={`p-1 rounded ${width === 'half' ? 'text-slate-900 bg-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                                          title="1/2 Width"
                                        >
                                          <LayoutGrid className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          onClick={() => updateComponentWidth(component.id, 'full')}
                                          className={`p-1 rounded ${width === 'full' ? 'text-slate-900 bg-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                                          title="Full Width"
                                        >
                                          <Maximize2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>

                                      <div className="w-px h-4 bg-slate-200 mx-1" />

                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md"
                                        onClick={() => deleteComponent(component.id)}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div
                                    className={`transition-all ${['headline', 'text', 'prompt'].includes(component.visualization?.type) ? 'p-2' : 'p-0 bg-white rounded-xl'
                                      }`}
                                    onClick={() => {
                                      setActiveComponentId(activeComponentId === component.id ? null : component.id);
                                    }}
                                  >
                                    <SafeComponentRenderer
                                      component={component}
                                      result={component.result}
                                      isLoading={false}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* Final Add Zone (Outside Droppable) */}
              <div className="col-span-12 h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer group mt-4" onClick={() => insertComponent(reportComponents.length, 'prompt')}>
                <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-slate-600">
                  <Plus className="w-6 h-6" />
                  <span className="text-sm font-medium">Add component or AI prompt</span>
                </div>
              </div>

              {/* Bottom spacer */}
              <div className="h-24" />
            </motion.div>
          ) : isGenerating && isInterviewsModel ? (
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
          ) : (
            /* Empty state placeholder for results side when nothing is generated yet */
            <div className="h-full flex items-center justify-center text-slate-400">
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm">Preview will appear here</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}