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
import NotionDocument from '@/components/deep-research/NotionDocument';
import NotebookView from '@/components/deep-research/NotebookView';
import StudioSidebar from '@/components/deep-research/StudioSidebar';
import ResearchReasoning from '@/components/deep-research/ResearchReasoning';
import NotebookSkeleton from '@/components/deep-research/NotebookSkeleton';
import AddBlockDialog from '@/components/deep-research/AddBlockDialog';

/**
 * DeepResearch Page - Text-First Research Experience
 */
export default function DeepResearch({ isFinished = false }) {
  const [viewState, setViewState] = useState(isFinished ? 'execution' : 'zero');
  const [question, setQuestion] = useState(isFinished ? 'Oral-B Disney iO Kids Launch Strategy' : '');
  const [selectedSources, setSelectedSources] = useState([]);
  const [researchScope, setResearchScope] = useState('quick');
  const [mode, setMode] = useState('hybrid');
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Execution state data
  const [thinkingSteps, setThinkingSteps] = useState(isFinished ? [{ id: 1, title: 'Complete', status: 'complete' }] : []);
  const [conversation, setConversation] = useState(isFinished ? [{
    role: 'assistant',
    content: "The report is ready. Here is the recommended strategy for launching Oral-B Disney iO Kids in Israel.",
    timestamp: new Date().toISOString()
  }] : []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [visualizeMode, setVisualizeMode] = useState('document'); // document | notebook
  const [showStudioDrawer, setShowStudioDrawer] = useState(false);

  // New Workflow State
  const [researchPlan, setResearchPlan] = useState(null);
  const [researchProgress, setResearchProgress] = useState({
    isActive: false,
    currentStep: 0,
    visitedSites: []
  });

  // Hardcoded results to display if isFinished is true
  const hardcodedReport = {
    title: 'Oral-B Disney iO Kids',
    subtitle: 'Israel Launch Strategy — A report based on parent discourse, child development expertise, dental professionals, and European consumer review analysis',
    summary: `Children's oral health in Israel faces a significant challenge: approximately **50% of children suffer from caries by ages 6–8**, despite broad access to subsidized dental care.

Analysis of parent discussions on Facebook shows that the core barrier is **not medical but behavioral**: child resistance, power struggles, parental burnout, early abandonment of supervision, and inconsistent brushing routines.

European consumer reviews demonstrate that the Oral-B Disney toothbrush has already proven effective in changing children's behavior. Timers, music, characters, and a sense of independence transform brushing from a battle into a game.`,
    marketShare: [
      { name: 'Colgate', value: 35 },
      { name: 'Oral-B', value: 30 },
      { name: 'Elmex', value: 15 },
      { name: 'Private Label', value: 20 }
    ],
    growthTrend: [
      { name: '2022', value: 64 },
      { name: '2023', value: 68 },
      { name: '2024', value: 73 },
      { name: '2025', value: 75 }
    ],
    findings: [],
    sections: [
      {
        title: 'State of Children\'s Oral Health in Israel',
        content: `• Approximately **50% of children under age 8** suffer from caries (Israel Ministry of Health).
• **Untreated caries in peripheral regions:** 61%–69%.
• **27% of children** do not brush twice daily consistently.
• **60% of parents** report daily conflict around brushing.
• **37% of parents** report emotional burnout caused by brushing struggles.

These data indicate a **failure of home-based prevention**, rather than lack of treatment access.`
      },
      {
        title: 'Israel vs. Europe Comparison',
        content: `### Caries Index
• **Israel:** Average of **2.56** decayed/missing/filled teeth at age 6.
• **Western Europe:** Below **1.0** at age 12 (Netherlands, Denmark, Sweden).

This gap reflects a **behavioral issue**, not a purely educational one: children brush ineffectively, for too little time, and parental conflict leads to early surrender.`
      },
      {
        title: 'Key Barriers Faced by Israeli Parents',
        content: `Based on analysis of Facebook parent groups and professional forums:

### Daily Conflict
Repeated language includes: "war," "nightmare," "no energy," "he screams," "she runs away."

### Physical Resistance
Locked mouths, pushing hands away, escaping, crying, refusal.

### Parental Surrender
Approximately **30–35% of parents** report letting children brush alone as early as ages 3–6. Typical language: "I gave up," "he brushes alone," "I can't fight anymore."

### Sensory Sensitivity
Difficulty with vibration, taste, noise, and texture. Common among children with **SPD or ADHD**.

### Emotional Load
Parents report that brushing struggles damage evening routines and overall family atmosphere.`
      },
      {
        title: 'Voices from the Field – Parents',
        content: `### Two Distinct Parent Voices in the Data
Analysis of parent discourse clearly reveals two different parent roles that appear repeatedly and consistently:
• **Parents Asking for Help** (Problem-Seeking Voice)
• **Parents Offering Solutions** (Peer-Expert Voice)

This distinction is critical, as it shows that the solution does not need to be invented — it already exists organically within the parent community.

### Parents Asking for Help: Expressions of Loss of Control
These parents describe confusion, exhaustion, and helplessness. Their language reflects a breakdown of authority and routine:
• "What do I do when he refuses every night?"
• "Nothing works anymore."
• "How do you get them to cooperate?"
• "He just won't let me brush."
• "She screams and runs away."

This group represents parents who are actively looking for a system, not advice. They want something that works without negotiation.

### Parents Offering Solutions: Modeling and Participation
A second, highly consistent voice comes from parents who respond with practical, experience-based solutions. The most common recommendation is not force — but **participation and modeling**:
• "Brush together with them."
• "Let them see you brushing."
• "Make it a family thing."
• "I brush at the same time — it changed everything."
• "When they see us do it, they want to copy."

### Alignment With Child Development Expertise
These parent-led solutions closely match recommendations from child development experts:
• Children at ages 4–8 learn primarily through **imitation and joint action**, not instruction.
• Shared routines reduce anxiety and opposition by removing power struggles.
• Modeling desired behavior builds intrinsic motivation and competence.
• Participation supports autonomy without removing parental scaffolding.

### Strategic Implication
The data does not suggest inventing a new behavior. Instead, it shows an opportunity to:
• Formalize an existing parent instinct: "do it together".
• Transform peer advice into a branded, structured system.
• Support parents who are asking for help by amplifying what already works.`
      },
      {
        title: 'Voices from the Field – Dentists',
        content: `Based on pediatric dental professional groups:

### Problems Observed
• Parents stop brushing for children too early.
• Poor understanding of the importance of nighttime brushing.
• Parents seek treatment only when pain appears.

### Professional Recommendations
• **Parental supervision is required until age 8.**
• **Timers are essential** for learning brushing duration.
• **Electric toothbrushes** improve cleaning quality and reduce resistance.
• When guidance comes from a dentist, children comply.

### Key Qualitative Insights
• Parents seek **immediate relief**, not long explanations.
• Giving up during conflict is a **widespread behavioral pattern**.
• External authority influences children more than parents.
• Peer recommendations strongly shape purchasing decisions.
• Electric toothbrushes are perceived as **problem-solvers** for resistance.`
      },
      {
        title: 'European Amazon & Boots Review Insights',
        content: `### Quantitative Findings
• Over **120 reviews** analyzed.
• **80%** mention behavioral improvement.
• **65%** cite timer/music as the primary motivator.
• **35%** emphasize suitability for sensitive children.

### Qualitative Positives
• Disney characters increase motivation.
• Music and timers create routine.
• Children feel independent.
• More effective cleaning than manual brushes.
• Sensitive mode suits loose teeth and sensory sensitivity.

### Negative Feedback
• Power adapter issues.
• High price and expensive replacement heads.
• Vibration too strong for younger children.`
      },
      {
        title: 'Translating Insights into an Israel Launch Strategy',
        content: `### A Family-Based Game as the Core Behavioral Mechanism
Based on the data, a parent–child shared game is the most natural extension of the Oral-B Disney iO Kids proposition in Israel.

The evidence strongly supports a model in which brushing shifts from an individual child task to a **family ritual**, reducing chaos, increasing consistency, and embedding Oral-B iO across the household.

### Why a Parent–Child Game Works (Data-Backed)
• **60% of parents** report daily conflict around brushing → shared play reframes brushing from authority conflict to collaboration.
• **30–35% parental surrender rate** → a game structure keeps parents involved without direct enforcement.
• Parents repeatedly state they are "exhausted" and "out of energy" → a game replaces negotiation with rules.
• Peer-based motivation already works (stickers, charts, rewards) → a digital/brand-led game formalizes an existing behavior.

**Core Insight:** Children resist orders but respond to systems. A game creates a neutral system that removes the parent as the antagonist.

### The Family iO Ecosystem (Strategic Proposal)
Position Oral-B iO not as a single child's product, but as a **family brushing platform**:
• Parents use Oral-B iO adult brushes.
• Children use Oral-B Disney iO Kids.
• Each family member has a dedicated brush head.
• The family participates in a shared brushing game.

### The Game Concept (High-Level)
**Game Structure:**
• Every brushing session earns points.
• Points accumulate at the family level, not only the child level.
• Completing a full two-minute session unlocks rewards.
• Parents brushing alongside children accelerates progress.

**Behavioral Effects:**
• Removes daily decision-making ("Did we brush?").
• Reinforces consistency and duration (two-minute compliance).
• Shifts motivation from avoidance to achievement.
• Reduces emotional load on parents.

### Why This Is Particularly Powerful in Israel
• Israeli households are **family-centric and routine-driven**.
• Parents actively seek shared solutions rather than child-only tools.
• Social proof and family recommendations dominate purchasing decisions.
• A shared game reframes brushing as a positive family moment, not a nightly battle.`
      },
      {
        title: 'Messaging Framework',
        content: `### Messaging for Parents
• Finally, brushing without battles.
• The child wants to brush.
• Routine, control, and peace of mind.

### Messaging for Children
• Brush like a superhero.
• Defeat bacteria while the music plays.`
      },
      {
        title: 'Measuring Launch Success Through Parent Discourse',
        content: `• Decrease in conflict-related language.
• Decrease in surrender-related language.
• Increase in positive brushing mentions.
• Increase in recommendation-seeking posts.
• Mentions of dentist-driven purchase decisions.
• Overall sentiment improvement.`
      },
      {
        title: 'What / So What / Now What',
        content: `### What
Daily brushing conflict leads to poor oral health outcomes.

### So What
The market needs a **genuine behavioral solution**, not just a better brush.

### Now What
Launch with a focus on routine, autonomy, and conflict reduction, supported by dental authority.`
      },
      {
        title: 'Conclusion',
        content: `Oral-B Disney iO Kids functions as a **behavioral intervention** where parents consistently struggle.

The product reshapes household dynamics and enables healthy routines **without conflict**, positioning Oral-B as a partner in everyday parenting — not just oral hygiene.`
      }
    ]
  };

  const [researchResults, setResearchResults] = useState(isFinished ? hardcodedReport : null);
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

  // API Helper for Report Q&A (uses report content as context)
  const callReportQA = async (query, reportContent, history = []) => {
    try {
      // Convert report object to text for context
      let reportText = `# ${reportContent.title}\n`;
      if (reportContent.subtitle) reportText += `${reportContent.subtitle}\n\n`;
      if (reportContent.summary) reportText += `## Executive Summary\n${reportContent.summary}\n\n`;
      if (reportContent.sections) {
        reportContent.sections.forEach(section => {
          reportText += `## ${section.title}\n${section.content}\n\n`;
        });
      }

      const response = await fetch('http://localhost:8000/deep-research/report-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          report_content: reportText,
          history: history.map(h => ({ role: h.role, content: h.content })),
          model_id: 'gemini-2.5-flash'
        })
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Report Q&A API Error:", error);
      return "I apologize, but I encountered an error. Please try again.";
    }
  };

  const handleStartResearch = async (q, sources, scope) => {
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

    try {
      const response = await fetch('http://localhost:8000/deep-research/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          model_id: 'gemini-2.5-flash'
        })
      });

      const data = await response.json();

      setTimeout(() => {
        setThinkingSteps(prev => prev.map(s => ({ ...s, status: 'complete' })));
        setIsProcessing(false);
        if (data.plan) {
          setResearchPlan(data.plan);
        }
      }, 1000); // Keep a small delay for UI smoothness

    } catch (error) {
      console.error("Plan generation error:", error);
      setIsProcessing(false);
      // Fallback
      setResearchPlan({
        title: 'Research Plan',
        steps: ['Analyze market trends', 'Evaluate competitors', 'Assess consumer sentiment']
      });
    }
  };

  const handleStartPlan = () => {
    setResearchPlan(null); // Hide plan in chat (optional, or keep it)
    setIsProcessing(true);
    setResearchProgress({ isActive: true, currentStep: 0, visitedSites: [] });

    // Simulate Research Progress with detailed reasoning
    // Simulate Research Progress with Harmony Research–style reasoning
    const steps = [
      {
        title: 'Understanding the research landscape',
        reasoning: [
          "I'm starting by translating the business question into a research map: which consumer segments matter, which behaviors we need to explain, and what decisions this research must support (launch, messaging, pricing sensitivity, channel strategy).",
          "Next, I’m indexing the available evidence across Harmony’s source layers: public consumer voice (social + communities), public product feedback (reviews), and official statistics. In parallel, I’m separating customer-owned data into an isolated workspace so nothing mixes across clients.",
          "I’m building an initial taxonomy for the project: key themes (e.g., routine friction, parent-child dynamics, sensory barriers), moments (morning vs. bedtime), and outcome variables (compliance, conflict, motivation). This becomes the backbone for quant + qual extraction.",
          "Early signals show where the highest-signal conversations live for this category (parent groups, dentist forums, review platforms). I’m prioritizing those channels for deeper extraction and stronger quotes."
        ]
      },
      {
        title: 'Analyzing category and market dynamics',
        reasoning: [
          "I’m shifting into category context: what is structurally true about this market in Israel—oral health outcomes, prevention behaviors, and how parental routines differ by segment, geography, and socio-economic factors.",
          "I’m benchmarking Israel against leading European markets to quantify the gap and understand if the issue is awareness, execution, or behavioral resistance. The goal is to isolate what is uniquely Israeli vs. globally universal.",
          "I’m identifying market barriers and adoption friction: affordability, replacement head economics, power/charging constraints, and trust drivers (dentist recommendation, pediatric guidance, brand credibility).",
          "I’m mapping adjacent alternatives parents mention (manual brushes, basic electric brushes, apps, reward charts) to understand what parents are already trying and where they still fail—this is where the premium product must win."
        ]
      },
      {
        title: 'Extracting parent and caregiver perspectives',
        reasoning: [
          "Now I’m focusing on the voice of parents: I’m separating the discourse into distinct roles—parents asking 'what do I do?' versus parents sharing what worked—because the community itself contains the behavioral playbook.",
          "I’m quantifying the dominant friction points (refusal, locking mouth, gag reflex, ADHD/SPD sensitivity, bedtime exhaustion) and capturing representative quotes that preserve the emotional reality without over-indexing on outliers.",
          "I’m also extracting the recurring solutions parents propose: modeling, brushing together, turning it into a game, timers/music, dentist authority. These are signals of what will actually change behavior in real households.",
          "I’m tagging each insight by who it affects (child, parent, family system), when it happens (morning vs night), and what it implies for product positioning (behavioral tool vs hygiene device)."
        ]
      },
      {
        title: 'Validating with clinical and child-development expertise',
        reasoning: [
          "I’m validating the behavioral claims against clinical guidance: dental professionals repeatedly stress supervision until age 8 and highlight the critical importance of nighttime brushing. I’m using this as the medical backbone for the narrative.",
          "In parallel, I’m mapping the parent-child dynamic to child-development principles: autonomy vs authority, co-regulation before self-regulation, and why participation and modeling outperform commands and threats at ages 4–8.",
          "I’m looking for converging evidence across sources: when parents, dentists, and developmental logic point to the same mechanism (shared routine + externalized authority like a timer), it becomes a high-confidence strategic lever.",
          "Finally, I’m translating expert guidance into market strategy language: how we partner with pediatric dentists, what claims we can safely make, and how to avoid messaging that feels like blame or judgment."
        ]
      },
      {
        title: 'Synthesizing comprehensive insights and launch narrative',
        reasoning: [
          "I’m entering synthesis: consolidating quantitative signals (prevalence, compliance, frequency of friction themes) with qualitative evidence (quotes, repeated story patterns) into a single cohesive storyline.",
          "I’m structuring the output as a McKinsey-style narrative: Situation → Root Cause → Implications → Strategic Options → Recommended Playbook, ending with What / So What / Now What.",
          "I’m converting insights into actionable launch assets: the barrier map, target segments, messaging pillars for parents vs kids, risk mitigations, and a measurement framework based on parent discourse (conflict language down, positive routine language up).",
          "I’m finalizing traceability: every key claim in the story is tied back to a source type (official stats, parent discourse, dentist discourse, European reviews) so the report is transparent, defensible, and decision-ready."
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

    // Hardcoded results to immediately display without API call
    const hardcodedReport = {
      title: 'Oral-B Disney iO Kids: Israel Launch Strategy',
      summary: 'A comprehensive report based on parent discourse, child development expertise, dental professionals, and European consumer review analysis. The core finding is that children’s oral health in Israel faces a significant challenge (~50% caries by age 8) due to behavioral barriers like conflict and parental burnout, not medical access. The Oral-B launch should position the product as a behavioral intervention tool that transforms "battle" into "play" and empowers children.',
      marketShare: [
        { name: 'Colgate', value: 35 },
        { name: 'Oral-B', value: 30 },
        { name: 'Elmex', value: 15 },
        { name: 'Private Label', value: 20 }
      ],
      growthTrend: [
        { name: '2022', value: 64 },
        { name: '2023', value: 68 },
        { name: '2024', value: 73 },
        { name: '2025', value: 75 }
      ],

      findings: [], // Intentionally empty as specific findings are covered in sections
      sections: [
        {
          title: 'State of Children’s Oral Health in Israel',
          content: `• Approximately **50% of children under age 8** suffer from caries (Israel Ministry of Health).
• **Untreated caries in peripheral regions:** 61%–69%.
• **27% of children** do not brush twice daily consistently.
• **60% of parents** report daily conflict around brushing.
• **37% of parents** report emotional burnout caused by brushing struggles.
• Lack of routine and insufficient brushing duration are core contributors.

These data indicate a **failure of home-based prevention**, rather than lack of treatment access.`
        },
        {
          title: 'Israel vs. Europe Comparison',
          content: `### Caries Index
• **Israel:** Average of **2.56** decayed/missing/filled teeth at age 6.
• **Western Europe:** Below **1.0** at age 12 (Netherlands, Denmark, Sweden).

This gap reflects a **behavioral issue**, not a purely educational one: children brush ineffectively, for too little time, and parental conflict leads to early surrender.`
        },
        {
          title: 'Key Barriers Faced by Israeli Parents',
          content: `Based on analysis of Facebook parent groups and professional forums:

### 1. Daily Conflict
Repeated language includes: “war,” “nightmare,” “no energy,” “he screams,” “she runs away.”

### 2. Physical Resistance
Locked mouths, pushing hands away, escaping, crying, refusal.

### 3. Parental Surrender
Approximately **30–35% of parents** report letting children brush alone as early as ages 3–6.
Typical language: “I gave up,” “he brushes alone,” “I can’t fight anymore.”

### 4. Sensory Sensitivity
Difficulty with vibration, taste, noise, and texture. Common among children with **SPD or ADHD**.

### 5. Emotional Load
Parents report that brushing struggles damage evening routines and overall family atmosphere.`
        },
        {
          title: 'Voices from the Field – Parents',
          content: `Direct quotes from analyzed sources:

- “Every night is the same nightmare – he runs and I chase.”
- “She locks her mouth. I can’t even start.”
- “I gave up. After a workday I have no energy to fight.”
- “He screams like I’m hurting him.”
- “Only when the dentist says it does he listen.”
- “Brushing triggers his gag reflex – we can’t get close.”`
        },
        {
          title: 'Voices from the Field – Dentists',
          content: `Based on pediatric dental professional groups:

### Problems Observed
- Parents stop brushing for children too early.
- Poor understanding of the importance of nighttime brushing.
- Parents seek treatment only when pain appears.

### Professional Recommendations
- **Parental supervision is required until age 8.**
- **Timers are essential** for learning brushing duration.
- **Electric toothbrushes** improve cleaning quality and reduce resistance.
- When guidance comes from a dentist, children comply.`
        },
        {
          title: 'Key Qualitative Insights',
          content: `- Parents seek **immediate relief**, not long explanations.
- Giving up during conflict is a **widespread behavioral pattern**.
- External authority influences children more than parents.
- Peer recommendations strongly shape purchasing decisions.
- Electric toothbrushes are perceived as **problem-solvers** for resistance.`
        },
        {
          title: 'European Amazon & Boots Review Insights',
          content: `### Quantitative Findings
- Over **120 reviews** analyzed.
- **80%** mention behavioral improvement.
- **65%** cite timer/music as the primary motivator.
- **35%** emphasize suitability for sensitive children.

### Qualitative Positives
- Disney characters increase motivation.
- Music and timers create routine.
- Children feel independent.
- More effective cleaning than manual brushes.
- Sensitive mode suits loose teeth and sensory sensitivity.

### Negative Feedback
- Power adapter issues.
- High price and expensive replacement heads.
- Vibration too strong for younger children.`
        },
        {
          title: 'Translating Insights into an Israel Launch Strategy',
          content: `- Position the product as a **conflict-replacement behavioral tool**.
- Empower children while maintaining effective parental supervision.
- Leverage **dentists as trusted authority figures**.
- Adapt power supply, pricing, and language to local expectations.`
        },
        {
          title: 'Messaging Framework',
          content: `### Messaging for Parents
- Finally, brushing without battles.
- The child wants to brush.
- Routine, control, and peace of mind.

### Messaging for Children
- Brush like a superhero.
- Defeat bacteria while the music plays.`
        },
        {
          title: 'Measuring Launch Success Through Parent Discourse',
          content: `- Decrease in conflict-related language.
- Decrease in surrender-related language.
- Increase in positive brushing mentions.
- Increase in recommendation-seeking posts.
- Mentions of dentist-driven purchase decisions.
- Overall sentiment improvement.`
        },
        {
          title: 'What / So What / Now What',
          content: `### What
Daily brushing conflict leads to poor oral health outcomes.

### So What
The market needs a **genuine behavioral solution**, not just a better brush.

### Now What
Launch with a focus on routine, autonomy, and conflict reduction, supported by dental authority.`
        },
        {
          title: 'Sources and Data Foundations',
          content: `- Israel Ministry of Health – Oral Health Surveys.
- Central Bureau of Statistics – Child Health Data.
- WHO Oral Health Database.
- OECD Health at a Glance.
- Facebook parent group discourse analysis.
- Pediatric dentist professional groups.
- reviews_amazon_uk.md
- reviews_boots_uk.md`
        },
        {
          title: 'Conclusion',
          content: `Oral-B Disney iO Kids functions as a **behavioral intervention** where parents consistently struggle.

The product reshapes household dynamics and enables healthy routines **without conflict**, positioning Oral-B as a partner in everyday parenting — not just oral hygiene.`
        }
      ]
    };

    setResearchResults(hardcodedReport);

    // Add assistant message after research completes
    setTimeout(() => {
      setConversation(prev => [...prev, {
        role: 'assistant',
        content: "The report is ready. Here is the recommended strategy for launching Oral-B Disney iO Kids in Israel.",
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
    } else if (researchResults) {
      // Use Report Q&A when we have a finished report
      setIsProcessing(true);
      try {
        const responseText = await callReportQA(message, researchResults, conversation);
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
    } else {
      // Regular Deep Research API call
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
                <NotionDocument
                  content={researchResults}
                  onOpenStudio={() => setShowStudioDrawer(true)}
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
