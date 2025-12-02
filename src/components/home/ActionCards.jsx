import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Brain, BookOpen, ArrowRight, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActionCards() {
  const cards = [
    {
      id: "quick-brief",
      title: "Quick Brief",
      icon: Brain,
      description: "Ask one question and get a concise, data-backed report.",
      features: ["Single question", "Fast results", "5-10 min delivery"],
      cta: "Start Quick Brief",
      link: createPageUrl("QuickBrief"),
      gradient: true,
    },
    {
      id: "full-case",
      title: "Full Case",
      icon: BookOpen,
      description: "Combine multiple questions to build a complete research case.",
      features: ["Multi-question", "Deep analysis", "Export deck"],
      cta: "Start New Case",
      link: createPageUrl("FullCase"),
      gradient: false,
    },
  ];

  return (
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.2, 0.6, 0.2, 1],
              }}
            >
              <Link to={card.link}>
                <div className="glass-card rounded-3xl p-8 hover-glow transition-all duration-280 h-full group cursor-pointer">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      card.gradient 
                        ? 'bg-gradient-to-br from-teal-400 to-blue-600' 
                        : 'bg-gradient-to-br from-indigo-400 to-purple-600'
                    } shadow-lg group-hover:shadow-xl transition-all duration-280`}>
                      <card.icon className="w-7 h-7 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all duration-280" />
                  </div>

                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    {card.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {card.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      card.gradient
                        ? 'gradient-button text-white hover:opacity-90'
                        : 'border-2 border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50'
                    } rounded-full py-6 font-medium transition-all duration-280`}
                  >
                    {card.cta}
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}