import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Brain, BarChart3, Hand, Save, FolderOpen, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/playground/ChatMessage";
import ContextSummary from "@/components/playground/ContextSummary";
import QuestionActions from "@/components/playground/QuestionActions";

export default function Playground() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'harmony',
      text: "Hey there — what are you trying to figure out today?\nIt can be anything: a product challenge, a campaign result, or a market question.",
      timestamp: new Date()
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(true);
  const [conversationContext, setConversationContext] = useState({
    goal: null,
    market: null,
    focus: null,
    mode: null,
    finalQuestions: []
  });
  const [stage, setStage] = useState('greeting'); // greeting, mode_select, refining, formulating, review

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (text, type = 'user', options = null, actions = null) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      options,
      actions,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateHarmonyResponse = (text, options = null, actions = null, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, 'harmony', options, actions);
    }, delay);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    const userInput = inputValue.toLowerCase();
    setInputValue("");

    // Stage 1: Initial problem statement
    if (stage === 'greeting') {
      const currentGoal = inputValue;
      setConversationContext(prev => ({ ...prev, goal: currentGoal }));
      simulateHarmonyResponse(
        "Got it. So you're seeing challenges here.\nIs this more about *understanding why* it's happening or *measuring how big* the issue is?",
        [
          { id: 'qual', label: 'Understanding (Qual)', icon: <Brain className="w-4 h-4" /> },
          { id: 'quant', label: 'Measuring (Quant)', icon: <BarChart3 className="w-4 h-4" /> },
        ]
      );
      setStage('mode_select');
    }
    // Stage 3: After mode selection, ask for focus
    else if (stage === 'focus_select') {
      const currentFocus = inputValue;
      setConversationContext(prev => ({ ...prev, focus: currentFocus }));
      simulateHarmonyResponse(
        `Perfect. Let me think about this for a moment...`,
        null,
        null,
        1500
      );

      setTimeout(() => {
        setStage('formulating');
        setConversationContext(prev => {
          const modeText = prev.mode === 'qual' ? 'Qualitative' : prev.mode === 'quant' ? 'Quantitative' : 'Mixed (Qual + Quant)';
          simulateHarmonyResponse(
            `Based on what you told me:\n🧩 Goal: ${prev.goal}\n📍 Market: ${prev.market || 'Global'}\n🎯 Focus: ${currentFocus}\n💬 Type: ${modeText}\n\nHere are a few research directions we could explore:`,
            [
              { id: 'q1', label: `Why do consumers hesitate with this approach?`, type: 'refine' },
              { id: 'q2', label: `How many are actually using this regularly?`, type: 'refine' },
              { id: 'q3', label: `Which formats have the best adoption and why?`, type: 'refine' },
              { id: 'custom', label: 'Write My Own', type: 'custom' }
            ],
            null,
            500
          );
          return prev;
        });
      }, 2000);
    }
    // Handle custom question or refining stage
    else if (stage === 'refining' || stage === 'custom_question') {
      const refinedQuestion = inputValue;
      setConversationContext(prev => ({
        ...prev,
        finalQuestions: [
          ...prev.finalQuestions,
          {
            text: refinedQuestion,
            mode: prev.mode,
            market: prev.market,
            focus: prev.focus
          }
        ]
      }));

      simulateHarmonyResponse(
        `Got it. Then your question could be:\n\n"${refinedQuestion}"\n\nThis is an exploratory question. I'd recommend a **${conversationContext.mode === 'qual' ? 'Qualitative' : 'Quantitative'}** approach.\nWould you like to also add another dimension or finalize this question?`,
        [
          { id: 'add_quant', label: 'Add Quantitative Layer', type: 'enhance' },
          { id: 'finalize', label: 'Finalize This Question', type: 'finalize' },
          { id: 'add_more', label: 'Add Another Question', type: 'more' }
        ]
      );
      setStage('finalizing');
    }
  };

  const handleOptionClick = (option) => {
    addMessage(option.label, 'user');

    // Mode selection
    if (stage === 'mode_select') {
      setConversationContext(prev => ({ ...prev, mode: option.id }));

      if (option.id === 'qual') {
        simulateHarmonyResponse(
          "Okay, let's unpack this a bit.\nWho are you most curious about — consumers, retailers, or competitors?",
          null
        );
      } else if (option.id === 'quant') {
        simulateHarmonyResponse(
          "Good — let's find the right angle to size it.\nDo you want to focus on adoption rates, sentiment change, or market penetration?",
          null
        );
      } else {
        simulateHarmonyResponse(
          "Perfect — we'll explore the *why* and the *how big*.\nLet's narrow it down together. What market or region are you focused on?",
          null
        );
      }
      setStage('focus_select');
    }
    // Question refinement
    else if (stage === 'formulating' && option.type === 'refine') {
      const baseQuestion = option.label;
      setConversationContext(prev => ({
        ...prev,
        selectedQuestion: baseQuestion,
        finalQuestions: [
          ...prev.finalQuestions,
          {
            text: baseQuestion,
            mode: prev.mode,
            market: prev.market,
            focus: prev.focus
          }
        ]
      }));

      simulateHarmonyResponse(
        `Perfect! I've added that question.\n\n"${baseQuestion}"\n\nWould you like to refine it further, add another question, or finalize?`,
        [
          { id: 'add_more', label: 'Add Another Question', type: 'more' },
          { id: 'finalize', label: 'Finalize & Review', type: 'finalize' }
        ]
      );
      setStage('finalizing');
    }
    else if (stage === 'formulating' && option.type === 'custom') {
      simulateHarmonyResponse(
        "Perfect! Type your question below and I'll help refine it.",
        null
      );
      setStage('custom_question');
    }
    // Finalization actions
    else if (stage === 'finalizing') {
      if (option.type === 'finalize') {
        setStage('review');
        simulateHarmonyResponse(
          `Here's what we built together 👇\n\nYou can now save these, add them to a Case, or run one immediately.`,
          null,
          ['save', 'case', 'run']
        );
      } else if (option.type === 'more') {
        setStage('formulating');
        simulateHarmonyResponse(
          "Great! What's your next question?\n\nHere are some more directions we could explore:",
          [
            { id: 'q4', label: `What drives satisfaction with this solution?`, type: 'refine' },
            { id: 'q5', label: `Which competitors are winning and why?`, type: 'refine' },
            { id: 'custom', label: 'Write My Own', type: 'custom' }
          ]
        );
      } else if (option.type === 'enhance') {
        simulateHarmonyResponse(
          "Great! I'll add a quantitative dimension to validate the scale.\nWhat would you like to measure?",
          null
        );
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-56px)] bg-[#FAFAFA] flex">
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${showSummary ? 'mr-80' : 'mr-0'}`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h1 className="text-sm font-semibold text-slate-900">Question Playground</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs h-8">
              <Save className="w-3.5 h-3.5 mr-1.5" />
              Saved
            </Button>
            <Button variant="ghost" size="sm" className="text-xs h-8">
              <FolderOpen className="w-3.5 h-3.5 mr-1.5" />
              Cases
            </Button>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="w-8 h-8 rounded flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              {showSummary ? <ChevronRight className="w-4 h-4 text-slate-600" /> : <ChevronLeft className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onOptionClick={handleOptionClick}
                />
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Question Actions (when in review stage) */}
        {stage === 'review' && conversationContext.finalQuestions.length > 0 && (
          <QuestionActions questions={conversationContext.finalQuestions} />
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus-within:bg-white focus-within:border-slate-300 transition-colors">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your challenge or question..."
                  className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none"
                  rows={1}
                  style={{ minHeight: '20px', maxHeight: '120px' }}
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-slate-900 text-white hover:bg-slate-800 px-6 h-11"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Summary Panel */}
      <AnimatePresence>
        {showSummary && (
          <ContextSummary context={conversationContext} />
        )}
      </AnimatePresence>
    </div>
  );
}