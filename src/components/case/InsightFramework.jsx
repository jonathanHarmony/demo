
import React from "react";
import { TrendingUp, TrendingDown, Minus, Database, BarChart3, MessageCircle, Globe, Newspaper, Star } from "lucide-react";

export default function HarmonyMetricsBlock({ metrics }) {
  const defaultMetrics = metrics || [
    { name: "Share of Voice", value: "34%", delta: "+12%", trend: "up", source: "social" },
    { name: "Trend Velocity", value: "2.4x", delta: "+140%", trend: "up", source: "harmony_graph" },
    { name: "Sentiment Index", value: "72/100", delta: "-3%", trend: "down", source: "reviews" },
    { name: "Market Readiness", value: "High", delta: "Stable", trend: "neutral", source: "news" }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3.5 h-3.5 text-teal-600" />;
      case 'down': return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
      default: return <Minus className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'social': return <MessageCircle className="w-4 h-4" />;
      case 'harmony_graph': return <Globe className="w-4 h-4" />;
      case 'reviews': return '⭐';
      case 'news': return <Newspaper className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {defaultMetrics.map((metric, index) => (
        <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">
              {metric.name}
            </div>
            <div className="text-sm">{getSourceIcon(metric.source)}</div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-2xl font-semibold text-slate-900">
              {metric.value}
            </div>
            {getTrendIcon(metric.trend)}
          </div>

          <div className="flex items-center justify-between">
            <div className={`text - xs font - medium ${metric.trend === 'up' ? 'text-teal-600' :
                metric.trend === 'down' ? 'text-red-500' :
                  'text-slate-500'
              } `}>
              {metric.delta}
            </div>

            {/* Simple sparkline representation */}
            <div className="flex items-end gap-0.5 h-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w - 1 rounded - sm ${metric.trend === 'up'
                      ? 'bg-teal-200'
                      : metric.trend === 'down'
                        ? 'bg-red-200'
                        : 'bg-slate-200'
                    } `}
                  style={{ height: `${Math.random() * 16 + 4} px` }}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}