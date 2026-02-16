'use client';

import { useState } from 'react';
import {
  LayoutDashboard, FlaskConical, Stethoscope, Calendar, FileText,
  Clock, Brain, Activity, Menu, X, LogOut, Heart
} from 'lucide-react';
import Dashboard from './Dashboard';
import LabsPanel from './LabsPanel';
import SymptomsPanel from './SymptomsPanel';
import AppointmentsPanel from './AppointmentsPanel';
import NotesPanel from './NotesPanel';
import TimelinePanel from './TimelinePanel';
import HealthModelPanel from './HealthModelPanel';
import TrendsPanel from './TrendsPanel';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'labs', label: 'Labs & Results', icon: FlaskConical },
  { id: 'trends', label: 'Trends Engine', icon: Activity },
  { id: 'symptoms', label: 'Symptom NLP', icon: Brain },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'notes', label: 'Clinician Notes', icon: FileText },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'model', label: 'Health Model', icon: Stethoscope },
];

export default function AppShell() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('murarihealth_auth');
    window.location.reload();
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'labs': return <LabsPanel />;
      case 'trends': return <TrendsPanel />;
      case 'symptoms': return <SymptomsPanel />;
      case 'appointments': return <AppointmentsPanel />;
      case 'notes': return <NotesPanel />;
      case 'timeline': return <TimelinePanel />;
      case 'model': return <HealthModelPanel />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#111118] border border-zinc-800"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#111118] border-r border-zinc-800/50
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">MurariHealth</h1>
              <p className="text-xs text-zinc-500">Health Intelligence</p>
            </div>
          </div>
        </div>

        <nav className="p-3 flex-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-1 ${
                activeTab === tab.id
                  ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <tab.icon className="w-4.5 h-4.5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-zinc-800/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8 max-w-[1600px] mx-auto">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}
