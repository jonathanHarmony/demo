import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Sparkles, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import OmniBar from '@/components/deep-research/OmniBar';
import TemplateModal from '@/components/deep-research/TemplateModal';
import AgentOrchestrator from '@/components/deep-research/AgentOrchestrator';
import ResearchCanvas from '@/components/deep-research/ResearchCanvas';
import ResearchDocument from '@/components/deep-research/ResearchDocument';
import ResearchEditor from '@/components/deep-research/ResearchEditor';
import NotebookView from '@/components/deep-research/NotebookView';
import StudioSidebar from '@/components/deep-research/StudioSidebar';
import ResearchReasoning from '@/components/deep-research/ResearchReasoning';
import NotebookSkeleton from '@/components/deep-research/NotebookSkeleton';
import AddBlockDialog from '@/components/deep-research/AddBlockDialog';

/**
 * DeepResearch Page - Text-First Research Experience
 */
export default function DeepResearch() {
  const [viewState, setViewState] = useState('zero');
  const [question, setQuestion] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);
  const [researchScope, setResearchScope] = useState('quick');
  const [mode, setMode] = useState('hybrid');
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Execution state data
  const [thinkingSteps, setThinkingSteps] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [researchResults, setResearchResults] = useState(null);
  const [visualizeMode, setVisualizeMode] = useState('document'); // document | notebook
  const [showStudioDrawer, setShowStudioDrawer] = useState(false);

  // New Workflow State
  const [researchPlan, setResearchPlan] = useState(null);
  const [researchProgress, setResearchProgress] = useState({
    isActive: false,
    currentStep: 0,
    visitedSites: []
  });
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showAddBlockDialog, setShowAddBlockDialog] = useState(false);

  // Listen for Studio button clicks
  useEffect(() => {
    const handleOpenStudio = () => {
      setShowStudioDrawer(true);
    };

    window.addEventListener('open-studio', handleOpenStudio);
    return () => window.removeEventListener('open-studio', handleOpenStudio);
  }, []);

  const handleFileUpload = (files) => {
    console.log('Files uploaded:', files);
  };

  // API Helper
  const callDeepResearchAPI = async (query, history = []) => {
    try {
      const response = await fetch('http://localhost:8000/deep-research/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          history: history.map(h => ({ role: h.role, content: h.content })),
          model_id: 'gemini-2.5-pro'
        })
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("API Error:", error);
      return "I apologize, but I encountered an error connecting to the research engine. Please try again.";
    }
  };

  const handleStartResearch = (q, sources, scope) => {
    setQuestion(q);
    setSelectedSources(sources);
    setResearchScope(scope);
    setViewState('execution');

    // Initial user message
    setConversation([
      { role: 'user', content: q, timestamp: new Date().toISOString() }
    ]);

    // Simulate Plan Generation
    setIsProcessing(true);
    setThinkingSteps([{ id: 1, title: 'Analyzing request...', status: 'active' }]);

    setTimeout(() => {
      setThinkingSteps(prev => prev.map(s => ({ ...s, status: 'complete' })));
      setIsProcessing(false);

      // Propose Plan
      setResearchPlan({
        title: 'Harmony AI: Success, Problems, Clients, Usage',
        steps: [
          'Search Google for "Harmony AI research firm" and "Harmony AI consumer market intelligence"',
          'Identify key reasons for Harmony\'s potential success (market momentum, competitive advantages)',
          'Extract specific problems Harmony AI aims to solve (gap between data and decisions)',
          'Analyze target clients and usage patterns'
        ]
      });
    }, 1500);
  };

  const handleStartPlan = () => {
    setResearchPlan(null); // Hide plan in chat (optional, or keep it)
    setIsProcessing(true);
    setResearchProgress({ isActive: true, currentStep: 0, visitedSites: [] });

    // Simulate Research Progress with detailed reasoning
    const steps = [
      {
        title: 'Understanding the research landscape',
        reasoning: [
          "I'm initiating a comprehensive scan of the digital ecosystem to map out the primary information nodes relevant to Harmony AI. This involves querying high-authority industry databases, academic repositories, and real-time news aggregators to establish a baseline of available data.",
          "Simultaneously, I'm configuring search parameters to filter for recent developments, specifically targeting the last 12 months to capture the most current market shifts. I'm looking for keywords associated with 'AI market research', 'synthetic sampling', and 'consumer intelligence automation'.",
          "I'm also identifying key opinion leaders and influencers in the market research space who have recently discussed Harmony AI or similar disruptive technologies. This will help in triangulating sentiment and identifying qualitative data points that might be missed in purely quantitative sweeps.",
          "Preliminary signals suggest a high concentration of relevant discussions on platforms like LinkedIn, specialized market research forums, and tech-focused publications. I'm prioritizing these channels for deeper extraction."
        ]
      },
      {
        title: 'Analyzing competitive dynamics',
        reasoning: [
          "Transitioning to a deep-dive competitive analysis. I'm constructing a comparative matrix to evaluate Harmony AI against legacy incumbents like Nielsen and Kantar, as well as emerging AI-native challengers.",
          "I'm dissecting their pricing models, feature sets, and claimed value propositions. Specifically, I'm looking for evidence of 'speed-to-insight' claims and how they stack up against Harmony's promise of compressing research cycles.",
          "Analyzing patent filings and technical whitepapers to understand the underlying technology stack. This is crucial to determine if Harmony's 'AI First' approach is a genuine technological moat or merely a marketing veneer.",
          "I'm also tracking recent funding rounds and investor sentiment for the sector. This financial context helps in understanding the growth trajectory and the resources available to competitors for R&D and market expansion."
        ]
      },
      {
        title: 'Extracting customer perspectives',
        reasoning: [
          "Now shifting focus to the voice of the customer. I'm aggregating user reviews from G2, Capterra, and TrustRadius, applying sentiment analysis algorithms to quantify user satisfaction.",
          "I'm specifically isolating feedback related to 'data accuracy', 'ease of use', and 'ROI'. These are critical success factors for enterprise adoption of new market research tools.",
          "I'm also analyzing case studies and testimonials published by Harmony AI to identify their ideal customer profile (ICP). I'm cross-referencing these success stories with independent user discussions to validate the claims.",
          "Emerging patterns indicate a strong positive sentiment regarding the speed of report generation, but some users are raising questions about the representativeness of synthetic samples. I'm flagging this as a key area for further investigation."
        ]
      },
      {
        title: 'Validating with expert analysis',
        reasoning: [
          "Synthesizing findings with third-party expert analysis. I'm reviewing reports from Gartner, Forrester, and IDC to see where they place Harmony AI on their respective hype cycles and market guides.",
          "I'm looking for 'Contrarian' viewpoints—analysts who are skeptical of the AI-first approach. Understanding the bear case is just as important as the bull case for a balanced strategic analysis.",
          "I'm also examining academic papers on the efficacy of Large Language Models (LLMs) in simulating consumer behavior. This theoretical underpinning is essential for validating the scientific rigor of Harmony's methodology.",
          "The consensus among forward-looking analysts seems to be that while the technology is nascent, the efficiency gains are undeniable. The key debate is shifting from 'if' AI will replace traditional methods to 'when' and 'how much'."
        ]
      },
      {
        title: 'Synthesizing comprehensive insights',
        reasoning: [
          "Entering the final synthesis phase. I'm collating all the structured and unstructured data points into a cohesive narrative. The goal is to move beyond simple observation to strategic foresight.",
          "I'm structuring the final report to address the core 'Validation Problem'. I'll be highlighting how Harmony AI's approach fundamentally changes the economics of decision-making for brands.",
          "Drafting the executive summary to be punchy and action-oriented. I want to ensure that the 'Structural Decay of Legacy Intelligence' argument is supported by the hard data I've gathered on cost and time inefficiencies in traditional models.",
          "Finalizing the citations and ensuring every claim is backlinked to a verifiable source. Accuracy and transparency are paramount for this level of strategic analysis."
        ]
      }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps.length) {
        clearInterval(interval);
        finishResearch();
        return;
      }

      const currentStepData = steps[step];
      setResearchProgress(prev => ({
        isActive: true,
        currentStep: step,
        visitedSites: []
      }));

      setThinkingSteps([{
        id: step,
        title: currentStepData.title,
        reasoning: currentStepData.reasoning,
        status: 'active'
      }]);
      step++;
    }, 4500);
  };

  const finishResearch = () => {
    setIsProcessing(false);
    setResearchProgress({ isActive: false, currentStep: 0, visitedSites: [] });
    setResearchResults({
      title: 'Strategic Analysis: The Ascendance of Harmony AI',
      summary: 'The global market research industry, valued at approximately $140 billion, stands at the precipice of structural dissolution. Harmony AI has emerged not merely as an iteration but as an architect of a new category: the AI First Market Research Firm.',
      marketShare: [
        { name: 'Harmony AI', value: 15 },
        { name: 'Legacy Firms', value: 45 },
        { name: 'New Entrants', value: 25 },
        { name: 'In-House', value: 15 }
      ],
      growthTrend: [
        { name: 'Q1', value: 10 },
        { name: 'Q2', value: 25 },
        { name: 'Q3', value: 45 },
        { name: 'Q4', value: 80 }
      ],
      findings: [
        'Harmony AI addresses the "Validation Problem" where 60% of brand decisions are based on outdated research. Traditional cycles take 4-8 weeks; Harmony compresses this to days.',
        'The platform\'s "Synthetic User Panels" have achieved a 98% correlation with human focus groups in blind tests, effectively rendering the $40B sample recruitment market obsolete.'
      ],
      sections: [
        { title: '1. The Structural Decay of Legacy Intelligence', content: 'For over a century, the mechanism for understanding consumer intent has remained static: identifying demographics, recruiting samples, and manual synthesis. This model is incompatible with the modern digital economy.' },
        { title: '2. The "AI First" Moat', content: 'Unlike competitors layering AI on top of survey tools, Harmony generates insights from first principles using a proprietary "Behavioral Large Language Model" (B-LLM).' }
      ]
    });

    // Add assistant message after research completes
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: "I've completed the research on Harmony AI. The analysis reveals they're pioneering a new category in market research...",
        timestamp: new Date().toISOString()
      }]);
    }, 500);
  };

  const handleSendMessage = async (message) => {
    // Add user message
    const newConversation = [...conversation, { role: 'user', content: message, timestamp: new Date().toISOString() }];
    setConversation(newConversation);

    // Simulate AI response based on state
    if (!researchPlan && viewState === 'zero') { // Changed 'initial' to 'zero' to match existing state
      setIsProcessing(true);
      setTimeout(() => {
        setResearchPlan({
          title: `Research Plan: ${message}`,
          steps: [
            { id: 1, title: 'Market Analysis', description: 'Analyze current market trends and competitors' },
            { id: 2, title: 'Consumer Sentiment', description: 'Gather user feedback and sentiment analysis' },
            { id: 3, title: 'Technical Review', description: 'Evaluate technical feasibility and requirements' }
          ]
        });
        setIsProcessing(false);
        setConversation(prev => [...prev, {
          role: 'assistant',
          content: "I've created a research plan based on your request. Please review it on the right.",
          timestamp: new Date().toISOString()
        }]);
        setViewState('execution');
      }, 1500);
    } else {
      // Real Backend Call for Chat
      setIsProcessing(true);
      try {
        const responseText = await callDeepResearchAPI(message, conversation);
        setConversation(prev => [...prev, {
          role: 'assistant',
          content: responseText,
          timestamp: new Date().toISOString()
        }]);
      } catch (e) {
        setConversation(prev => [...prev, {
          role: 'assistant',
          content: "Error connecting to backend.",
          timestamp: new Date().toISOString()
        }]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSelectTemplate = (template) => {
    setShowTemplateModal(false);
    handleStartResearch(template.query, [], 'deep');
  };

  const handleTransform = (type) => {
    console.log('Transforming to:', type); // Debug log
    if (type === 'notebook') {
      setIsThinking(true);

      // Add thinking message to chat
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: "I'm restructuring the findings into a visual notebook format...",
        isThinking: true, // Special flag if we want to style it differently, or just use content
        timestamp: new Date().toISOString()
      }]);

      // Simulate AI thinking time
      setTimeout(() => {
        setVisualizeMode('notebook');
        setIsThinking(false);
      }, 2500);
    } else if (type === 'document') {
      setVisualizeMode('document');
    }
  };

  const handleBlockAdded = ({ source, question }) => {
    // Send message to chat to generate the block
    handleSendMessage(`Add a new block using ${source} to answer: ${question}`);
  };

  // ZERO STATE
  if (viewState === 'zero') {
    return (
      <div className="h-screen flex flex-col bg-[#FAFAFA]">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-4 shadow-lg shadow-slate-900/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-serif text-slate-900">
                What do you want to research?
              </h1>
              <p className="text-slate-500">
                Deep research powered by AI agents. Start with a question or use a template.
              </p>
            </div>

            <OmniBar
              value={question}
              onChange={setQuestion}
              onSubmit={() => handleStartResearch(question, [], 'quick')}
              selectedSources={selectedSources}
              onSourcesChange={setSelectedSources}
              researchScope={researchScope}
              onScopeChange={setResearchScope}
              mode={mode}
              onModeChange={setMode}
              onFileUpload={handleFileUpload}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <button onClick={() => setShowTemplateModal(true)} className="p-4 text-left bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-slate-900 mb-1">Market Analysis</h3>
                <p className="text-xs text-slate-500">Analyze competitors and trends</p>
              </button>
              {/* Other templates... */}
            </div>
          </motion.div>
        </div>

        <TemplateModal
          isOpen={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
          onSelectTemplate={handleSelectTemplate}
        />
      </div>
    );
  }

  // EXECUTION STATE
  if (viewState === 'execution') {
    return (
      <div className="h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden bg-white">
        <ResizablePanelGroup direction="horizontal" className="flex-1 h-full">
          <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className="flex flex-col border-r border-slate-200">
            <AgentOrchestrator
              thinkingSteps={thinkingSteps}
              conversation={conversation}
              plan={researchPlan}
              onSendMessage={handleSendMessage}
              onStartPlan={handleStartPlan}
              onEditPlan={() => console.log('Edit plan')}
              isProcessing={isProcessing}
              selectedBlock={selectedBlock}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={70} className="flex flex-col overflow-hidden relative bg-[#FAFAFA]">
            {/* Thinking Overlay - Scoped to Content Area */}
            <AnimatePresence>
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-white"
                >
                  <NotebookSkeleton />
                </motion.div>
              )}
            </AnimatePresence>

            <StudioSidebar
              isOpen={showStudioDrawer}
              onClose={() => setShowStudioDrawer(false)}
              onTransform={handleTransform}
              currentMode={visualizeMode}
            />

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative">
              {researchProgress.isActive ? (
                <ResearchReasoning
                  currentStep={researchProgress.currentStep}
                  steps={thinkingSteps}
                />
              ) : visualizeMode === 'notebook' ? (
                <NotebookView
                  content={researchResults}
                  onAddBlock={() => setShowAddBlockDialog(true)}
                  onSelectBlock={setSelectedBlock}
                />
              ) : (
                <ResearchEditor
                  initialContent={researchResults}
                  isReadOnly={isProcessing}
                />
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        <AddBlockDialog
          isOpen={showAddBlockDialog}
          onClose={() => setShowAddBlockDialog(false)}
          onAdd={handleBlockAdded}
        />
      </div>
    );
  }
  return null;
}
