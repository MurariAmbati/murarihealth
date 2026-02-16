'use client';

import { useState } from 'react';
import { useHealthData } from '@/lib/DataContext';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Area, AreaChart, CartesianGrid
} from 'recharts';

const categories = ['All', 'Metabolic', 'Lipids', 'Vitamins', 'Inflammatory', 'Thyroid', 'CBC', 'Hormones'];

export default function TrendsPanel() {
  const { labTrends } = useHealthData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const filtered = selectedCategory === 'All'
    ? labTrends
    : labTrends.filter(t => t.category === selectedCategory);

  const selected = selectedTest
    ? labTrends.find(t => t.testName === selectedTest)
    : filtered[0];

  const worseningCount = labTrends.filter(t => t.trend === 'worsening').length;
  const improvingCount = labTrends.filter(t => t.trend === 'improving').length;
  const stableCount = labTrends.filter(t => t.trend === 'stable').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Trends Engine</h1>
        <p className="text-zinc-500 text-sm mt-1">Longitudinal analysis of {labTrends.length} tracked biomarkers over 12 months</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpRight className="w-4 h-4 text-red-400" />
            <span className="text-xs text-zinc-500">Worsening</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{worseningCount}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Minus className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-zinc-500">Stable</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">{stableCount}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownRight className="w-4 h-4 text-green-400" />
            <span className="text-xs text-zinc-500">Improving</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{improvingCount}</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => { setSelectedCategory(c); setSelectedTest(null); }}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === c
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Main Trend Chart */}
      {selected && (
        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">{selected.testName}</h3>
              <p className="text-xs text-zinc-500">{selected.category} • {selected.unit} • Normal: {selected.normalMin}–{selected.normalMax}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                selected.trend === 'worsening' ? 'badge-danger' :
                selected.trend === 'improving' ? 'badge-normal' : 'badge-warning'
              }`}>
                {selected.trend === 'worsening' ? <TrendingUp className="w-3 h-3" /> :
                 selected.trend === 'improving' ? <TrendingDown className="w-3 h-3" /> :
                 <Minus className="w-3 h-3" />}
                {selected.trend}
              </span>
              <span className={`text-sm font-bold ${
                selected.percentChange > 0 && selected.currentFlag !== 'normal' ? 'text-red-400' :
                selected.percentChange < 0 && selected.currentFlag !== 'normal' ? 'text-green-400' : 'text-zinc-400'
              }`}>
                {selected.percentChange > 0 ? '+' : ''}{selected.percentChange}%
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selected.data}>
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selected.currentFlag !== 'normal' ? '#ef4444' : '#6366f1'} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={selected.currentFlag !== 'normal' ? '#ef4444' : '#6366f1'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#111118', border: '1px solid #27272a', borderRadius: '8px' }}
                  labelStyle={{ color: '#a1a1aa' }}
                  formatter={(value) => [`${value} ${selected.unit}`, selected.testName]}
                />
                {selected.normalMax > 0 && (
                  <ReferenceLine y={selected.normalMax} stroke="#22c55e" strokeDasharray="5 5" label={{ value: `Max: ${selected.normalMax}`, fill: '#22c55e', fontSize: 10, position: 'insideTopRight' }} />
                )}
                {selected.normalMin > 0 && (
                  <ReferenceLine y={selected.normalMin} stroke="#3b82f6" strokeDasharray="5 5" label={{ value: `Min: ${selected.normalMin}`, fill: '#3b82f6', fontSize: 10, position: 'insideBottomRight' }} />
                )}
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={selected.currentFlag !== 'normal' ? '#ef4444' : '#6366f1'}
                  fill="url(#trendGrad)"
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: '#111118', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* All Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(trend => (
          <div
            key={trend.testName}
            onClick={() => setSelectedTest(trend.testName)}
            className={`glass-card p-4 cursor-pointer transition-all hover:border-indigo-500/30 ${
              selectedTest === trend.testName ? 'border-indigo-500/50 bg-indigo-500/5' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-sm font-medium text-white">{trend.testName}</h4>
                <p className="text-xs text-zinc-600">{trend.category}</p>
              </div>
              <div className="flex items-center gap-2">
                {trend.currentFlag !== 'normal' && <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />}
                <span className={`text-xs font-bold ${
                  trend.percentChange > 0 && trend.currentFlag !== 'normal' ? 'text-red-400' :
                  trend.percentChange < 0 ? 'text-green-400' : 'text-zinc-400'
                }`}>
                  {trend.percentChange > 0 ? '+' : ''}{trend.percentChange}%
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span className={`text-lg font-bold ${
                trend.currentFlag !== 'normal' ? 'text-red-400' : 'text-white'
              }`}>
                {trend.data[trend.data.length - 1].value}
              </span>
              <span className="text-xs text-zinc-600">{trend.unit}</span>
            </div>

            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend.data}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={trend.currentFlag !== 'normal' ? '#ef4444' : '#6366f1'}
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-zinc-600">
                Range: {trend.normalMin}–{trend.normalMax} {trend.unit}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs ${
                trend.trend === 'worsening' ? 'text-red-400' :
                trend.trend === 'improving' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {trend.trend === 'worsening' ? <TrendingUp className="w-3 h-3" /> :
                 trend.trend === 'improving' ? <TrendingDown className="w-3 h-3" /> :
                 <Minus className="w-3 h-3" />}
                {trend.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
