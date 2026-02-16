'use client';

import { useState } from 'react';
import { useHealthData } from '@/lib/DataContext';
import { symptomKeywords } from '@/lib/data';
import { Symptom } from '@/lib/types';
import { Brain, Search, Plus, Lightbulb, Tag, Activity, Thermometer } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function SymptomsPanel() {
  const { symptoms: allSymptoms, setSymptoms: setAllSymptoms } = useHealthData();
  const [newSymptomText, setNewSymptomText] = useState('');
  const [newSeverity, setNewSeverity] = useState(5);
  const [nlpResult, setNlpResult] = useState<{
    tags: string[];
    category: string;
    bodySystem: string;
    urgency: number;
    specialists: string[];
    sentiment: number;
  } | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  // NLP Analysis function
  const analyzeSymptom = (text: string) => {
    const lower = text.toLowerCase();
    const matchedTags: string[] = [];
    const matchedSpecialists: Set<string> = new Set();
    let maxUrgency = 3;
    let category = 'General';
    let bodySystem = 'General';

    Object.entries(symptomKeywords).forEach(([keyword, info]) => {
      if (lower.includes(keyword)) {
        matchedTags.push(keyword);
        info.relatedSpecialties.forEach(s => matchedSpecialists.add(s));
        if (info.urgency > maxUrgency) {
          maxUrgency = info.urgency;
          category = info.category;
          bodySystem = info.bodySystem;
        }
      }
    });

    // Sentiment analysis (simple)
    const negativeWords = ['pain', 'bad', 'worse', 'terrible', 'severe', 'awful', 'horrible', 'can\'t', 'difficulty', 'hard', 'struggling'];
    const positiveWords = ['good', 'better', 'improving', 'great', 'excellent', 'normal', 'fine', 'well'];
    let sentiment = 0;
    negativeWords.forEach(w => { if (lower.includes(w)) sentiment -= 0.2; });
    positiveWords.forEach(w => { if (lower.includes(w)) sentiment += 0.2; });
    sentiment = Math.max(-1, Math.min(1, sentiment));

    // Additional keyword extraction
    const words = lower.split(/\s+/);
    const durationPatterns = lower.match(/(\d+\s*(hours?|minutes?|days?|weeks?|months?))/);
    const frequencyPatterns = lower.match(/(daily|weekly|monthly|constantly|occasionally|sometimes|always|never|often|rarely|every\s+\w+)/);

    if (matchedTags.length === 0) {
      matchedTags.push(...words.filter(w => w.length > 4).slice(0, 3));
    }

    return {
      tags: matchedTags.length > 0 ? matchedTags : ['unspecified'],
      category,
      bodySystem,
      urgency: maxUrgency,
      specialists: Array.from(matchedSpecialists),
      sentiment,
      duration: durationPatterns ? durationPatterns[0] : undefined,
      frequency: frequencyPatterns ? frequencyPatterns[0] : undefined,
    };
  };

  const handleAnalyze = () => {
    if (!newSymptomText.trim()) return;
    const result = analyzeSymptom(newSymptomText);
    setNlpResult(result);
  };

  const handleAddSymptom = () => {
    if (!newSymptomText.trim() || !nlpResult) return;
    const analysis = analyzeSymptom(newSymptomText);
    const newSymptom: Symptom = {
      id: `s${Date.now()}`,
      text: newSymptomText,
      severity: newSeverity,
      category: analysis.category,
      bodySystem: analysis.bodySystem,
      date: new Date().toISOString().split('T')[0],
      tags: analysis.tags,
      sentiment: analysis.sentiment,
      duration: analysis.duration,
      frequency: analysis.frequency,
    };
    setAllSymptoms([newSymptom, ...allSymptoms]);
    setNewSymptomText('');
    setNlpResult(null);
    setNewSeverity(5);
  };

  // Analytics
  const categoryCounts: Record<string, number> = {};
  const systemCounts: Record<string, number> = {};
  const severityByCategory: { category: string; avgSeverity: number; count: number }[] = [];

  allSymptoms.forEach(s => {
    categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1;
    systemCounts[s.bodySystem] = (systemCounts[s.bodySystem] || 0) + 1;
  });

  Object.entries(categoryCounts).forEach(([cat, count]) => {
    const catSymptoms = allSymptoms.filter(s => s.category === cat);
    const avg = catSymptoms.reduce((sum, s) => sum + s.severity, 0) / count;
    severityByCategory.push({ category: cat, avgSeverity: Math.round(avg * 10) / 10, count });
  });

  const pieData = Object.entries(systemCounts).map(([name, value]) => ({ name, value }));

  const filteredSymptoms = allSymptoms.filter(s =>
    s.text.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.tags.some(t => t.includes(searchFilter.toLowerCase())) ||
    s.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const scatterData = allSymptoms.map(s => ({
    severity: s.severity,
    sentiment: Math.round((s.sentiment + 1) * 50),
    date: s.date,
    text: s.text.slice(0, 40),
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Symptom NLP Tracker</h1>
        <p className="text-zinc-500 text-sm mt-1">Natural language symptom analysis with auto-categorization and specialist matching</p>
      </div>

      {/* NLP Input */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-semibold text-zinc-300">Log a Symptom — NLP Analysis</h3>
        </div>
        <textarea
          value={newSymptomText}
          onChange={e => { setNewSymptomText(e.target.value); setNlpResult(null); }}
          placeholder="Describe your symptom in natural language... e.g., 'I've been having severe headaches for the past 3 days, especially in the morning. The pain is behind my eyes and gets worse with bright light.'"
          className="w-full h-28 p-4 bg-[#0a0a0f] border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none focus:border-indigo-500/50 resize-none"
        />
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-500">Severity:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={newSeverity}
              onChange={e => setNewSeverity(parseInt(e.target.value))}
              className="w-32 accent-indigo-500"
            />
            <span className={`text-sm font-bold ${
              newSeverity >= 7 ? 'text-red-400' : newSeverity >= 4 ? 'text-yellow-400' : 'text-green-400'
            }`}>{newSeverity}/10</span>
          </div>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleAnalyze}
              className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium border border-indigo-500/30 hover:bg-indigo-500/30 transition-all"
            >
              <Brain className="w-4 h-4 inline mr-1" />
              Analyze
            </button>
            <button
              onClick={handleAddSymptom}
              disabled={!nlpResult}
              className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30 hover:bg-green-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Log Symptom
            </button>
          </div>
        </div>

        {/* NLP Result */}
        {nlpResult && (
          <div className="mt-4 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 animate-fade-in">
            <h4 className="text-sm font-semibold text-indigo-300 mb-3">NLP Analysis Result</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Category</p>
                <p className="text-sm text-white font-medium">{nlpResult.category}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Body System</p>
                <p className="text-sm text-white font-medium">{nlpResult.bodySystem}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Urgency Level</p>
                <p className={`text-sm font-bold ${
                  nlpResult.urgency >= 7 ? 'text-red-400' : nlpResult.urgency >= 5 ? 'text-yellow-400' : 'text-green-400'
                }`}>{nlpResult.urgency}/10</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Sentiment</p>
                <p className={`text-sm font-bold ${
                  nlpResult.sentiment < -0.3 ? 'text-red-400' : nlpResult.sentiment > 0.3 ? 'text-green-400' : 'text-yellow-400'
                }`}>{nlpResult.sentiment > 0 ? '+' : ''}{nlpResult.sentiment.toFixed(1)}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-zinc-500 mb-1">Detected Tags</p>
              <div className="flex gap-1 flex-wrap">
                {nlpResult.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs">{t}</span>
                ))}
              </div>
            </div>
            {nlpResult.specialists.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-zinc-500 mb-1">
                  <Lightbulb className="w-3 h-3 inline mr-1 text-yellow-400" />
                  Suggested Specialists
                </p>
                <div className="flex gap-1 flex-wrap">
                  {nlpResult.specialists.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-yellow-500/15 text-yellow-300 text-xs">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Severity by Category */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Avg Severity by Category</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityByCategory} layout="vertical">
                <XAxis type="number" domain={[0, 10]} tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip
                  contentStyle={{ background: '#111118', border: '1px solid #27272a', borderRadius: '8px' }}
                  formatter={(value) => [`${value}/10`, 'Avg Severity']}
                />
                <Bar dataKey="avgSeverity" radius={[0, 4, 4, 0]}>
                  {severityByCategory.map((entry, i) => (
                    <Cell key={i} fill={entry.avgSeverity >= 6 ? '#ef4444' : entry.avgSeverity >= 4 ? '#f59e0b' : '#22c55e'} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Body System Distribution */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Body System Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.7} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#111118', border: '1px solid #27272a', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {pieData.map((d, i) => (
              <span key={d.name} className="text-xs text-zinc-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {d.name} ({d.value})
              </span>
            ))}
          </div>
        </div>

        {/* Severity vs Sentiment Scatter */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Severity vs Sentiment</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="severity" name="Severity" tick={{ fill: '#71717a', fontSize: 10 }} domain={[0, 10]} label={{ value: 'Severity', fill: '#52525b', fontSize: 10, position: 'insideBottom' }} />
                <YAxis dataKey="sentiment" name="Sentiment" tick={{ fill: '#71717a', fontSize: 10 }} domain={[0, 100]} label={{ value: 'Sentiment', fill: '#52525b', fontSize: 10, angle: -90, position: 'insideLeft' }} />
                <ZAxis range={[40, 120]} />
                <Tooltip
                  contentStyle={{ background: '#111118', border: '1px solid #27272a', borderRadius: '8px' }}
                  formatter={(value, name) => [String(value), String(name)]}
                />
                <Scatter data={scatterData} fill="#6366f1" fillOpacity={0.7} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Search & Symptoms List */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
          placeholder="Search symptoms, tags, categories..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#111118] border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none focus:border-indigo-500/50"
        />
      </div>

      <div className="space-y-3">
        {filteredSymptoms.map(s => (
          <div key={s.id} className="glass-card p-4 animate-slide-in">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-zinc-500">{s.date}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    s.severity >= 7 ? 'badge-danger' : s.severity >= 4 ? 'badge-warning' : 'badge-normal'
                  }`}>
                    Severity: {s.severity}/10
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    s.sentiment < -0.3 ? 'badge-danger' : s.sentiment > 0.3 ? 'badge-normal' : 'badge-warning'
                  }`}>
                    Sentiment: {s.sentiment > 0 ? '+' : ''}{s.sentiment.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-zinc-300">{s.text}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {s.bodySystem}
                  </span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {s.category}
                  </span>
                  {s.duration && (
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Thermometer className="w-3 h-3" />
                      {s.duration}
                    </span>
                  )}
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {s.tags.map(t => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-6 rounded-sm ${
                      i < s.severity
                        ? s.severity >= 7 ? 'bg-red-400' : s.severity >= 4 ? 'bg-yellow-400' : 'bg-green-400'
                        : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
