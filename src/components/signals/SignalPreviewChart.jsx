import React from "react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function SignalPreviewChart({ data }) {
  if (!data || !data.data || data.data.length === 0) return null;

  const chartData = data.data;
  const chartType = data.type || 'line';
  const label = data.label || '';

  const renderLineChart = () => (
    <div className="space-y-2">
      {label && <div className="text-xs text-slate-500">{label}</div>}
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 10, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#14b8a6" 
            strokeWidth={2}
            dot={{ fill: '#14b8a6', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderBarChart = () => (
    <div className="space-y-2">
      {label && <div className="text-xs text-slate-500">{label}</div>}
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 10, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <Bar dataKey="value" fill="#14b8a6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderSparkline = () => (
    <div className="space-y-2">
      {label && <div className="text-xs text-slate-500">{label}</div>}
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#14b8a6" 
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderTable = () => (
    <div className="space-y-2">
      {label && <div className="text-xs text-slate-500 mb-2">{label}</div>}
      <div className="border border-slate-200 rounded overflow-hidden">
        <table className="w-full text-xs">
          <tbody>
            {chartData.map((item, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                <td className="px-3 py-2 text-slate-700">{item.label}</td>
                <td className="px-3 py-2 text-right font-medium text-slate-900">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  switch (chartType) {
    case 'bar':
      return renderBarChart();
    case 'sparkline':
      return renderSparkline();
    case 'table':
      return renderTable();
    case 'line':
    default:
      return renderLineChart();
  }
}