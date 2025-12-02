import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ParameterCards({ question, parameters, onChange, onGenerate, onBack }) {
  const sources = [
    { id: "social", label: "Social", emoji: "💬" },
    { id: "interviews", label: "Interviews", emoji: "🎤" },
    { id: "reviews", label: "Reviews", emoji: "⭐" },
    { id: "news", label: "News", emoji: "📰" },
    { id: "harmony_graph", label: "Harmony Graph", emoji: "🔗" },
  ];

  const focuses = [
    { id: "sentiment_pulse", label: "Sentiment Pulse", desc: "How people feel" },
    { id: "trend_pulse", label: "Trend Pulse", desc: "What's changing" },
    { id: "brand_view", label: "Brand View", desc: "Perception analysis" },
    { id: "competitive_snapshot", label: "Competitive Snapshot", desc: "Market position" },
  ];

  const languages = ["English", "Japanese", "French", "German", "Spanish", "Chinese", "Arabic"];
  const regions = ["Global", "North America", "Europe", "Asia Pacific", "Latin America", "Middle East", "Africa"];

  const toggleSource = (sourceId) => {
    const newSources = parameters.sources.includes(sourceId)
      ? parameters.sources.filter(s => s !== sourceId)
      : [...parameters.sources, sourceId];
    onChange({ ...parameters, sources: newSources });
  };

  const toggleLanguage = (lang) => {
    const newLangs = parameters.languages.includes(lang)
      ? parameters.languages.filter(l => l !== lang)
      : [...parameters.languages, lang];
    onChange({ ...parameters, languages: newLangs });
  };

  const toggleRegion = (region) => {
    const newRegions = parameters.regions.includes(region)
      ? parameters.regions.filter(r => r !== region)
      : [...parameters.regions, region];
    onChange({ ...parameters, regions: newRegions });
  };

  return (
    <div className="py-12">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-8 text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="glass-card rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Your Question</h2>
          <p className="text-lg text-slate-700">{question}</p>
        </div>

        <h3 className="text-xl font-semibold text-slate-900 mb-6">Choose Parameters</h3>

        {/* Sources */}
        <div className="glass-card rounded-3xl p-8 mb-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Data Sources</h4>
          <div className="flex flex-wrap gap-3">
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => toggleSource(source.id)}
                className={`px-6 py-3 rounded-full transition-all duration-220 ${
                  parameters.sources.includes(source.id)
                    ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="mr-2">{source.emoji}</span>
                {source.label}
              </button>
            ))}
          </div>
        </div>

        {/* Focus */}
        <div className="glass-card rounded-3xl p-8 mb-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Research Focus</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {focuses.map((focus) => (
              <button
                key={focus.id}
                onClick={() => onChange({ ...parameters, focus: focus.id })}
                className={`p-6 rounded-2xl text-left transition-all duration-220 ${
                  parameters.focus === focus.id
                    ? 'bg-gradient-to-br from-teal-400 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="font-semibold mb-1">{focus.label}</div>
                <div className={`text-sm ${parameters.focus === focus.id ? 'text-white/90' : 'text-slate-600'}`}>
                  {focus.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="glass-card rounded-3xl p-8 mb-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Languages</h4>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-5 py-2 rounded-full transition-all duration-220 ${
                  parameters.languages.includes(lang)
                    ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="glass-card rounded-3xl p-8 mb-8">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Regions</h4>
          <div className="flex flex-wrap gap-3">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => toggleRegion(region)}
                className={`px-5 py-2 rounded-full transition-all duration-220 ${
                  parameters.regions.includes(region)
                    ? 'bg-gradient-to-r from-teal-400 to-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onGenerate}
            className="gradient-button text-white px-12 py-6 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-280"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Brief
          </Button>
        </div>
      </motion.div>
    </div>
  );
}