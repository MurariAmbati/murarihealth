'use client';

import { healthScore, riskFactors, vitalSigns, labResults, appointments, symptoms, medications } from '@/lib/data';
import {
  Heart, Activity, Droplets, Zap, Shield,
  AlertTriangle, TrendingUp, TrendingDown, Calendar,
  Pill, ArrowRight, FlaskConical
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip
} from 'recharts';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const flaggedLabs = labResults.filter(l => l.flag !== 'normal');
  const upcomingAppts = appointments.filter(a => a.status === 'scheduled').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
  const recentSymptoms = symptoms.slice(0, 4);
  const highRisks = riskFactors.filter(r => r.risk === 'high' || r.risk === 'moderate');

  const radarData = [
    { subject: 'Cardiovascular', score: healthScore.cardiovascular },
    { subject: 'Metabolic', score: healthScore.metabolic },
    { subject: 'Immune', score: healthScore.immune },
    { subject: 'Endocrine', score: healthScore.endocrine },
    { subject: 'Hepatic', score: healthScore.hepatic },
    { subject: 'Renal', score: healthScore.renal },
    { subject: 'Hematologic', score: healthScore.hematologic },
    { subject: 'Nutritional', score: healthScore.nutritional },
    { subject: 'Mental', score: healthScore.mental },
  ];

  // Symptom severity trend (last 12 entries)
  const symptomTrend = [...symptoms].reverse().map(s => ({
    date: s.date.slice(5),
    severity: s.severity,
    sentiment: Math.round((s.sentiment + 1) * 50),
  }));

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 55) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'from-green-500/20 to-green-500/5';
    if (score >= 70) return 'from-yellow-500/20 to-yellow-500/5';
    if (score >= 55) return 'from-orange-500/20 to-orange-500/5';
    return 'from-red-500/20 to-red-500/5';
  };

  const vitalIcons: Record<string, React.ElementType> = {
    'Blood Pressure (Systolic)': Heart,
    'Heart Rate': Activity,
    'BMI': Zap,
    'SpO2': Droplets,
    'Temperature': Activity,
    'Weight': Zap,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Health Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Comprehensive health overview — Last updated Feb 16, 2026</p>
        </div>
        <div className="flex gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 text-xs font-medium border border-indigo-500/20">
            {flaggedLabs.length} Flagged Labs
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-yellow-500/15 text-yellow-400 text-xs font-medium border border-yellow-500/20">
            {upcomingAppts.length} Upcoming Appts
          </span>
        </div>
      </div>

      {/* Overall Health Score */}
      <div className={`glass-card p-6 bg-gradient-to-r ${getScoreBg(healthScore.overall)}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <svg className="w-32 h-32" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#27272a" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke={healthScore.overall >= 70 ? '#6366f1' : '#f59e0b'}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${(healthScore.overall / 100) * 339.3} 339.3`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor(healthScore.overall)}`}>{healthScore.overall}</span>
              <span className="text-xs text-zinc-500">/ 100</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-1">Overall Health Score</h2>
            <p className="text-zinc-400 text-sm mb-3">
              Based on {labResults.length} lab markers, {symptoms.length} symptom entries, vitals, and risk modeling
            </p>
            <div className="flex flex-wrap gap-2">
              {highRisks.map(r => (
                <span key={r.name} className={`px-2 py-1 rounded-md text-xs font-medium ${
                  r.risk === 'high' ? 'badge-danger' : 'badge-warning'
                }`}>
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  {r.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vital Signs Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {vitalSigns.slice(0, 8).map(v => {
          const Icon = vitalIcons[v.type] || Activity;
          return (
            <div key={v.type} className="glass-card p-4 card-glow">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-zinc-500" />
                <span className="text-xs text-zinc-500 truncate">{v.type}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-bold ${
                  v.status === 'normal' ? 'text-white' :
                  v.status === 'elevated' ? 'text-yellow-400' : 'text-red-400'
                }`}>{v.value}</span>
                <span className="text-xs text-zinc-600">{v.unit}</span>
              </div>
              <span className={`text-xs mt-1 inline-block px-1.5 py-0.5 rounded ${
                v.status === 'normal' ? 'badge-normal' :
                v.status === 'elevated' ? 'badge-warning' : 'badge-danger'
              }`}>{v.status}</span>
            </div>
          );
        })}
      </div>

      {/* Two Column: Radar + Flagged Labs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Radar */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">System Health Radar</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#52525b', fontSize: 10 }} />
                <Radar name="Health" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Flagged Labs */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-300">Flagged Lab Results</h3>
            <button onClick={() => onNavigate('labs')} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {flaggedLabs.map(lab => (
              <div key={lab.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <FlaskConical className={`w-4 h-4 ${lab.flag === 'high' ? 'text-red-400' : lab.flag === 'low' ? 'text-blue-400' : 'text-yellow-400'}`} />
                  <div>
                    <p className="text-sm text-white font-medium">{lab.testName}</p>
                    <p className="text-xs text-zinc-500">{lab.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${lab.flag === 'high' ? 'text-red-400' : lab.flag === 'low' ? 'text-blue-400' : 'text-yellow-400'}`}>
                    {lab.value} {lab.unit}
                  </p>
                  <p className="text-xs text-zinc-600">
                    {lab.flag === 'high' ? <TrendingUp className="w-3 h-3 inline text-red-400" /> : <TrendingDown className="w-3 h-3 inline text-blue-400" />}
                    {' '}{lab.flag === 'high' ? 'Above' : 'Below'} range ({lab.normalMin}-{lab.normalMax})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Symptom Severity Trend */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-zinc-300">Symptom Severity Trend (Last 12 Entries)</h3>
          <button onClick={() => onNavigate('symptoms')} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Symptom NLP <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={symptomTrend}>
              <defs>
                <linearGradient id="severityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sentimentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#52525b', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} />
              <Tooltip
                contentStyle={{ background: '#111118', border: '1px solid #27272a', borderRadius: '8px' }}
                labelStyle={{ color: '#a1a1aa' }}
              />
              <Area type="monotone" dataKey="severity" stroke="#ef4444" fill="url(#severityGrad)" strokeWidth={2} name="Severity (1-10)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid: Appointments + Symptoms + Meds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-300">Upcoming Appointments</h3>
            <button onClick={() => onNavigate('appointments')} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {upcomingAppts.map(appt => (
              <div key={appt.id} className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs text-indigo-400 font-medium">{appt.date} • {appt.time}</span>
                </div>
                <p className="text-sm text-white font-medium">{appt.doctor}</p>
                <p className="text-xs text-zinc-500">{appt.specialty}</p>
                <span className={`text-xs mt-1 inline-block px-1.5 py-0.5 rounded ${
                  appt.priority === 'urgent' ? 'badge-warning' : 'badge-info'
                }`}>{appt.priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Symptoms */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-300">Recent Symptoms</h3>
            <button onClick={() => onNavigate('symptoms')} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentSymptoms.map(s => (
              <div key={s.id} className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-500">{s.date}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    s.severity >= 7 ? 'badge-danger' : s.severity >= 4 ? 'badge-warning' : 'badge-normal'
                  }`}>{s.severity}/10</span>
                </div>
                <p className="text-sm text-zinc-300 line-clamp-2">{s.text}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {s.tags.slice(0, 3).map(t => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Medications */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Active Medications</h3>
          <div className="space-y-3">
            {medications.map(med => (
              <div key={med.id} className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <Pill className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-sm text-white font-medium">{med.name}</span>
                </div>
                <p className="text-xs text-zinc-400">{med.dosage} — {med.frequency}</p>
                <p className="text-xs text-zinc-600 mt-1">Prescribed by {med.prescriber}</p>
                <p className="text-xs text-zinc-600">Since {med.startDate}</p>
              </div>
            ))}
          </div>

          {/* Quick Health Tips */}
          <div className="mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300">Action Items</span>
            </div>
            <ul className="space-y-1">
              <li className="text-xs text-zinc-400 flex items-start gap-1">
                <span className="text-indigo-400 mt-0.5">•</span>
                Review metabolic trends with endocrinologist (Feb 25)
              </li>
              <li className="text-xs text-zinc-400 flex items-start gap-1">
                <span className="text-indigo-400 mt-0.5">•</span>
                Increase Vitamin D dose — levels still insufficient
              </li>
              <li className="text-xs text-zinc-400 flex items-start gap-1">
                <span className="text-indigo-400 mt-0.5">•</span>
                Schedule sleep study — persistent sleep disruption
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
