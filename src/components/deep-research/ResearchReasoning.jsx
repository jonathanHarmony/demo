import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ResearchReasoning - Text-based reasoning display during research
 * Shows flowing text of what the AI is thinking with a typing effect
 */
export default function ResearchReasoning({ currentStep, steps }) {
    if (!steps || steps.length === 0) return null;

    const activeStep = steps[currentStep] || steps[steps.length - 1];
    const [displayedText, setDisplayedText] = useState('');
    const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    // Reset when step changes
    useEffect(() => {
        setDisplayedText('');
        setCurrentParagraphIndex(0);
        setIsTyping(true);
    }, [currentStep]);

    // Typing effect logic
    useEffect(() => {
        if (!activeStep.reasoning) return;

        const fullText = activeStep.reasoning[currentParagraphIndex];
        if (!fullText) return;

        let charIndex = 0;
        const intervalId = setInterval(() => {
            if (charIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(intervalId);
                // Move to next paragraph after a pause
                setTimeout(() => {
                    if (currentParagraphIndex < activeStep.reasoning.length - 1) {
                        setCurrentParagraphIndex(prev => prev + 1);
                        setDisplayedText(''); // Clear for next paragraph or keep appending? 
                        // Let's append for a "long text" feel, but the design might be better if we just show the current one typing
                        // or type them sequentially into a list.
                        // The user said "long text typing animation". Let's try typing them sequentially.
                    } else {
                        setIsTyping(false);
                    }
                }, 200);
            }
        }, 5); // Faster typing speed

        return () => clearInterval(intervalId);
    }, [currentParagraphIndex, activeStep, currentStep]);

    // We want to show all previous paragraphs in the current step as fully visible, 
    // and the current one typing.

    return (
        <div className="flex-1 flex flex-col px-16 py-12 overflow-y-auto">
            <div className="max-w-3xl w-full mx-auto space-y-6">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-medium text-slate-900 mb-8 font-mono"
                >
                    {activeStep.title}...
                </motion.h2>

                {/* Typing Content */}
                <div className="space-y-4 font-mono text-sm leading-relaxed text-slate-600">
                    {activeStep.reasoning && activeStep.reasoning.map((text, idx) => {
                        if (idx < currentParagraphIndex) {
                            return (
                                <p key={idx} className="opacity-100">{text}</p>
                            );
                        } else if (idx === currentParagraphIndex) {
                            return (
                                <p key={idx} className="opacity-100">
                                    {displayedText}
                                    <span className="animate-pulse inline-block w-1.5 h-4 bg-blue-500 ml-1 align-middle" />
                                </p>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}
