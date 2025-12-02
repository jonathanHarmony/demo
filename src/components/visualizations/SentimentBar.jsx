import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function SentimentBar({ data }) {
  const sentimentData = data || [
    { name: "Positive", value: 58, color: "#14B8A6" },
    { name: "Neutral", value: 28, color: "#94A3B8" },
    { name: "Negative", value: 14, color: "#EF4444" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-slate-200 rounded-lg p-5"
    >
      <div className="mb-4">
        <div className="text-xs font-medium text-slate-900 mb-1">Sentiment Distribution</div>
        <div className="text-[10px] text-slate-500">Distribution across analyzed sources</div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={sentimentData}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 11 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'white'
            }}
            formatter={(value) => [`${value}%`, 'Share']}
          />
          <Bar 
            dataKey="value" 
            fill="#14B8A6"
            radius={[6, 6, 0, 0]}
            animationDuration={600}
            animationEasing="ease-out"
          >
            {sentimentData.map((entry, index) => (
              <motion.rect
                key={`bar-${index}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}