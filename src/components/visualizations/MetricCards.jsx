import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Database, Target, Layers } from "lucide-react";

export default function MetricCards({ metrics }) {
  const getIcon = (label) => {
    if (label.toLowerCase().includes('data') || label.toLowerCase().includes('points')) return Database;
    if (label.toLowerCase().includes('growth') || label.toLowerCase().includes('yoy')) return TrendingUp;
    if (label.toLowerCase().includes('confidence')) return Target;
    return Layers;
  };

  const getColor = (index) => {
    const colors = ["text-blue-600", "text-teal-600", "text-slate-600", "text-purple-600"];
    return colors[index % colors.length];
  };

  const metricsData = metrics || [
    { label: "Mentions Analyzed", value: "7.2M" },
    { label: "YoY Growth", value: "+48%" },
    { label: "Confidence", value: "92%" },
    { label: "Data Sources", value: "4" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {metricsData.map((metric, index) => {
        const Icon = getIcon(metric.label);
        const color = getColor(index);
        
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
            <div className="text-2xl font-semibold text-slate-900">
              {metric.value}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}