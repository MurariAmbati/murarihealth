'use client';

import { useHealthData } from '@/lib/DataContext';
import { 
  Shield, AlertTriangle,
  CheckCircle, Activity, Heart, Brain, Zap, Droplets, Flame
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,

} from 'recharts';

const systemIcons: Record<string, React.ElementType> = {
  cardiovascular: Heart,
  metabolic: Flame,
  immune: Shield,
  endocrine: Zap,
  hepatic: Droplets,
  renal: Droplets,
  hematologic: Activity,
  nutritional: Zap,
  mental: Brain,
};

const systemDescriptions: Record<string, string> = {
  cardiovascular: 'Heart, blood vessels, circulation — Elevated CRP & LDL contribute to lower score',
  metabolic: 'Glucose regulation, insulin sensitivity — Pre-diabetic markers trending upward',
  immune: 'Immune response, inflammation markers — ESR normal, CRP elevated',
  endocrine: 'Hormones, thyroid function — Thyroid normal, testosterone adequate',
  hepatic: 'Liver function, detoxification — All liver markers within normal range',
  renal: 'Kidney function, filtration — eGFR and creatinine optimal',
  hematologic: 'Blood cells, hemoglobin, platelets — CBC fully within range',
  nutritional: 'Vitamins, minerals, micronutrients — Vitamin D insufficient, others normal',
  mental: 'Mood, cognition, sleep quality — Sleep disruption, anxiety, brain fog reported',
};

export default function HealthModelPanel() {
  const { healthScore, riskFactors, labTrends, vitalSigns } = useHealthData();
  const radarData = Object.entries(healthScore)
    .filter(([key]) => key !== 'overall')
    .map(([key, value]) => ({
      subject: key.charAt(0).toUpperCase() + key.slice(1),
      score: value,
      fullMark: 100,
    }));

  const riskBarData = riskFactors.map(r => ({
    name: r.name.replace(' Risk', ''),
    score: r.score,
    risk: r.risk,
  }));

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#22c55e';
    if (score >= 75) return '#84cc16';
    if (score >= 60) return '#f59e0b';
    if (score >= 45) return '#f97316';
    return '#ef4444';
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low': return 'badge-normal';
      case 'moderate': return 'badge-warning';
      case 'high': return 'badge-danger';
      case 'critical': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  // Worsening trends count
  const worseningTrends = labTrends.filter(t => t.trend === 'worsening');
  const criticalSystems = Object.entries(healthScore).filter(([k, v]) => k !== 'overall' && v < 65);

  // Projected scores (simple linear regression)
  const projectedScore = Math.max(50, healthScore.overall - Math.round(worseningTrends.length * 1.5));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Health Model & Risk Assessment</h1>
        <p className="text-zinc-500 text-sm mt-1">Comprehensive risk modeling based on labs, symptoms, vitals, and clinical data</p>
      </div>

      {/* Overall Score + Projection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <h3 className="text-xs text-zinc-500 uppercase tracking-wide mb-3">Current Score</h3>
          <div className="relative w-28 h-28 mx-auto">
            <svg className="w-28 h-28" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#27272a" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={getScoreColor(healthScore.overall)}
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(healthScore.overall / 100) * 326.7} 326.7`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: getScoreColor(healthScore.overall) }}>{healthScore.overall}</span>
              <span className="text-xs text-zinc-600">/ 100</span>
            </div>
          </div>
          <p className="text-sm text-zinc-400 mt-3">
            {healthScore.overall >= 80 ? 'Good Health' :
             healthScore.overall >= 65 ? 'Moderate — Needs Attention' :
             'Below Optimal — Action Required'}
          </p>
        </div>

        <div className="glass-card p-6 text-center">
          <h3 className="text-xs text-zinc-500 uppercase tracking-wide mb-3">3-Month Projection</h3>
          <div className="relative w-28 h-28 mx-auto">
            <svg className="w-28 h-28" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#27272a" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={getScoreColor(projectedScore)}
                strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(projectedScore / 100) * 326.7} 326.7`}
                transform="rotate(-90 60 60)"
                strokeOpacity={0.6}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: getScoreColor(projectedScore) }}>{projectedScore}</span>
              <span className="text-xs text-zinc-600">projected</span>
            </div>
          </div>
          <p className="text-sm text-zinc-400 mt-3">
            Without intervention: <span className="text-red-400">-{healthScore.overall - projectedScore} pts</span>
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xs text-zinc-500 uppercase tracking-wide mb-3">Key Indicators</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Worsening Trends</span>
              <span className="text-sm font-bold text-red-400">{worseningTrends.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Critical Systems</span>
              <span className="text-sm font-bold text-orange-400">{criticalSystems.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Active Risks</span>
              <span className="text-sm font-bold text-yellow-400">{riskFactors.filter(r => r.risk !== 'low').length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Flagged Labs</span>
              <span className="text-sm font-bold text-orange-400">{labTrends.filter(t => t.currentFlag !== 'normal').length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Vital Signs Elevated</span>
              <span className="text-sm font-bold text-yellow-400">{vitalSigns.filter(v => v.status !== 'normal').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Radar + Risk Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">System Health Radar</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#52525b', fontSize: 10 }} />
                <Radar name="Current" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Risk Assessment Scores</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskBarData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip
                  contentStyle={{ background: '#111118', border: '1px solid #27272a', borderRadius: '8px' }}
                  formatter={(value) => [`${value}/100`, 'Risk Score']}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {riskBarData.map((entry, i) => (
                    <Cell key={i} fill={
                      entry.risk === 'high' ? '#ef4444' :
                      entry.risk === 'moderate' ? '#f59e0b' : '#22c55e'
                    } fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Breakdown */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-zinc-300 mb-4">System-by-System Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(healthScore)
            .filter(([key]) => key !== 'overall')
            .sort(([, a], [, b]) => a - b)
            .map(([system, score]) => {
              const Icon = systemIcons[system] || Activity;
              const desc = systemDescriptions[system] || '';
              return (
                <div key={system} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: getScoreColor(score) }} />
                      <span className="text-sm font-medium text-white capitalize">{system}</span>
                    </div>
                    <span className="text-lg font-bold" style={{ color: getScoreColor(score) }}>{score}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{desc}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Risk Factors Detail */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Detailed Risk Analysis</h3>
        <div className="space-y-4">
          {riskFactors.map(risk => (
            <div key={risk.name} className="glass-card p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className={`w-5 h-5 ${
                      risk.risk === 'high' ? 'text-red-400' :
                      risk.risk === 'moderate' ? 'text-yellow-400' : 'text-green-400'
                    }`} />
                    <h4 className="text-sm font-semibold text-white">{risk.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-lg font-medium ${getRiskBadge(risk.risk)}`}>
                      {risk.risk.toUpperCase()}
                    </span>
                    <span className="text-xs text-zinc-500">{risk.category}</span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{risk.description}</p>

                  <div className="mb-3">
                    <p className="text-xs text-zinc-500 mb-1">Risk Score</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-zinc-800 rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${risk.score}%`,
                            backgroundColor: risk.risk === 'high' ? '#ef4444' : risk.risk === 'moderate' ? '#f59e0b' : '#22c55e'
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-zinc-300">{risk.score}/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        Recommendations
                      </p>
                      <ul className="space-y-1">
                        {risk.recommendations.map((rec, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex items-start gap-1">
                            <span className="text-green-400 mt-0.5">→</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-indigo-400" />
                        Related Biomarkers
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {risk.relatedLabs.map(lab => (
                          <span key={lab} className="text-xs px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                            {lab}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
