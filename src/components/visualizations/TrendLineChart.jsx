import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

export default function TrendLineChart({ data, title }) {
  const trendData = data || [
    { month: "Jan", value: 420 },
    { month: "Feb", value: 580 },
    { month: "Mar", value: 720 },
    { month: "Apr", value: 890 },
    { month: "May", value: 1150 },
    { month: "Jun", value: 1420 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white border border-slate-200 rounded-lg p-5"
    >
      <div className="mb-4">
        <div className="text-xs font-medium text-slate-900 mb-1">
          {title || "Trend Over Time"}
        </div>
        <div className="text-[10px] text-slate-500">Mentions per month</div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={trendData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#14B8A6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748B', fontSize: 11 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'white'
            }}
            formatter={(value) => [value.toLocaleString(), 'Mentions']}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#14B8A6"
            strokeWidth={2}
            fill="url(#colorValue)"
            animationDuration={800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}