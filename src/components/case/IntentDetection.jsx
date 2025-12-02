import React from 'react';
import { Brain, BarChart3 } from 'lucide-react';

// Intent detection utility
export const detectIntent = (question) => {
  const text = question.toLowerCase().trim();

  // Qualitative indicators
  const qualKeywords = [
    'why', 'how do', 'what drives', 'what motivates', 'what factors',
    'feelings', 'attitudes', 'perceptions', 'behaviors', 'experience',
    'emotions', 'think about', 'feel about', 'believe', 'opinion'
  ];

  // Quantitative indicators
  const quantKeywords = [
    'how many', 'how much', 'what percentage', 'how big', 'compare',
    'volume', 'count', 'number', 'measure', 'trend', 'growth',
    'share', 'rate', 'metric', 'statistics', 'data points'
  ];

  let qualScore = 0;
  let quantScore = 0;

  qualKeywords.forEach(keyword => {
    if (text.includes(keyword)) qualScore++;
  });

  quantKeywords.forEach(keyword => {
    if (text.includes(keyword)) quantScore++;
  });

  // Determine mode
  if (qualScore > quantScore && qualScore > 0) return 'qualitative';
  if (quantScore > qualScore && quantScore > 0) return 'quantitative';
  if (qualScore > 0 && quantScore > 0) return 'mixed';

  return 'mixed'; // Default to mixed if unclear
};

export const getModeIcon = (mode) => {
  switch (mode) {
    case 'qualitative': return <Brain className="w-4 h-4" />;
    case 'quantitative': return <BarChart3 className="w-4 h-4" />;
    case 'mixed': return '⚡';
    default: return '⚡';
  }
};

export const getModeLabel = (mode) => {
  switch (mode) {
    case 'qualitative': return 'Understanding';
    case 'quantitative': return 'Validation';
    case 'mixed': return 'Blend';
    default: return 'Blend';
  }
};

export const generateSuggestions = (partialQuestion, mode = 'mixed') => {
  const suggestions = {
    qualitative: [
      "What emotional factors drive consumer behavior around",
      "Why are consumers abandoning refill packaging?",
      "What motivates people to switch to sustainable products?",
      "How do consumers feel about brand authenticity in",
      "What barriers prevent adoption of"
    ],
    quantitative: [
      "How big is the trend around refill packaging?",
      "What percentage of consumers are discussing",
      "How many people mention sustainability in",
      "Compare market share between brands in",
      "What is the growth rate of"
    ],
    mixed: [
      "Which brands are leading in this topic?",
      "What drives consumer preference and how large is the market?",
      "Analyze sentiment and volume trends for",
      "What are the key themes and their share of conversation?",
      "Understand behaviors and measure adoption rates of"
    ]
  };

  if (!partialQuestion || partialQuestion.length < 3) {
    return suggestions[mode].slice(0, 3);
  }

  // Return relevant suggestions based on partial input
  const allSuggestions = [...suggestions.qualitative, ...suggestions.quantitative, ...suggestions.mixed];
  return allSuggestions
    .filter(s => !s.toLowerCase().includes(partialQuestion.toLowerCase()))
    .slice(0, 3);
};

export const generateFollowUps = (question, mode, hasResults = false) => {
  const followUps = {
    qualitative: [
      "Can you quantify this behavior by region?",
      "What are the emotional drivers behind this?",
      "Show me representative quotes from consumers"
    ],
    quantitative: [
      "Break this down by demographic segments",
      "Show trend velocity over the last 6 months",
      "Add competitor comparison metrics"
    ],
    mixed: [
      "Add quantitative validation to this insight",
      "Explain the qualitative reasons behind the numbers",
      "Generate regional breakdown with sentiment"
    ]
  };

  if (!hasResults) {
    return [
      "Add context about target demographics",
      "Include regional analysis",
      "Compare with industry benchmarks"
    ];
  }

  return followUps[mode] || followUps.mixed;
};