'use client';

import { useState } from 'react';
import { useHealthData } from '@/lib/DataContext';
import { DoctorAppointment } from '@/lib/types';
import {
  Calendar, Clock, MapPin, Plus, AlertTriangle,
  CheckCircle, XCircle, ChevronDown, ChevronUp, User, FileText
} from 'lucide-react';

export default function AppointmentsPanel() {
  const { appointments: allAppts, setAppointments: setAllAppts } = useHealthData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [view, setView] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [newAppt, setNewAppt] = useState<{
    doctor: string; specialty: string; date: string; time: string; location: string; reason: string; 
    priority: 'routine' | 'urgent' | 'emergency'; notes: string;
  }>({
    doctor: '', specialty: '', date: '', time: '', location: '', reason: '', priority: 'routine', notes: ''
  });

  const now = new Date();
  const filteredAppts = allAppts.filter(a => {
    if (view === 'upcoming') return a.status === 'scheduled';
    if (view === 'past') return a.status === 'completed' || a.status === 'cancelled';
    return true;
  }).sort((a, b) => {
    if (view === 'past') return new Date(b.date).getTime() - new Date(a.date).getTime();
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const upcomingCount = allAppts.filter(a => a.status === 'scheduled').length;
  const urgentCount = allAppts.filter(a => a.status === 'scheduled' && a.priority === 'urgent').length;
  const nextAppt = allAppts
    .filter(a => a.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const daysUntilNext = nextAppt
    ? Math.ceil((new Date(nextAppt.date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const handleAddAppt = () => {
    if (!newAppt.doctor || !newAppt.date) return;
    const appt: DoctorAppointment = {
      id: `a${Date.now()}`,
      ...newAppt,
      status: 'scheduled',
    };
    setAllAppts([appt, ...allAppts]);
    setShowAddForm(false);
    setNewAppt({ doctor: '', specialty: '', date: '', time: '', location: '', reason: '', priority: 'routine', notes: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    }
  };

  // Group by month for calendar view
  const monthGroups: Record<string, DoctorAppointment[]> = {};
  filteredAppts.forEach(a => {
    const month = a.date.slice(0, 7);
    if (!monthGroups[month]) monthGroups[month] = [];
    monthGroups[month].push(a);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Doctor Appointments</h1>
          <p className="text-zinc-500 text-sm mt-1">Schedule, track, and manage all medical appointments</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium border border-indigo-500/30 hover:bg-indigo-500/30 transition-all self-start"
        >
          <Plus className="w-4 h-4 inline mr-1" />
          New Appointment
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Upcoming</p>
          <p className="text-2xl font-bold text-white">{upcomingCount}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Urgent</p>
          <p className="text-2xl font-bold text-orange-400">{urgentCount}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Next Appt</p>
          <p className="text-lg font-bold text-indigo-400">{nextAppt?.date || 'N/A'}</p>
          {daysUntilNext !== null && <p className="text-xs text-zinc-600">in {daysUntilNext} days</p>}
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Total (All Time)</p>
          <p className="text-2xl font-bold text-white">{allAppts.length}</p>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="glass-card p-6 animate-fade-in">
          <h3 className="text-sm font-semibold text-zinc-300 mb-4">Schedule New Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Doctor Name *</label>
              <input
                type="text"
                value={newAppt.doctor}
                onChange={e => setNewAppt({ ...newAppt, doctor: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500/50"
                placeholder="Dr. ..."
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Specialty</label>
              <input
                type="text"
                value={newAppt.specialty}
                onChange={e => setNewAppt({ ...newAppt, specialty: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500/50"
                placeholder="e.g., Cardiology"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Date *</label>
              <input
                type="date"
                value={newAppt.date}
                onChange={e => setNewAppt({ ...newAppt, date: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Time</label>
              <input
                type="text"
                value={newAppt.time}
                onChange={e => setNewAppt({ ...newAppt, time: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500/50"
                placeholder="e.g., 10:00 AM"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Location</label>
              <input
                type="text"
                value={newAppt.location}
                onChange={e => setNewAppt({ ...newAppt, location: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500/50"
                placeholder="Address"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Priority</label>
              <select
                value={newAppt.priority}
                onChange={e => setNewAppt({ ...newAppt, priority: e.target.value as DoctorAppointment['priority'] })}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500/50"
              >
                <option value="routine">Routine</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-500 block mb-1">Reason</label>
              <input
                type="text"
                value={newAppt.reason}
                onChange={e => setNewAppt({ ...newAppt, reason: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500/50"
                placeholder="Reason for visit"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-500 block mb-1">Notes</label>
              <textarea
                value={newAppt.notes}
                onChange={e => setNewAppt({ ...newAppt, notes: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0f] border border-zinc-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500/50 resize-none h-20"
                placeholder="Any notes or things to bring..."
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddAppt}
              className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30 hover:bg-green-500/30 transition-all"
            >
              Schedule Appointment
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm border border-zinc-700 hover:bg-zinc-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* View Tabs */}
      <div className="flex gap-2">
        {(['upcoming', 'past', 'all'] as const).map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === v
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Appointments List grouped by month */}
      {Object.entries(monthGroups).map(([month, appts]) => (
        <div key={month}>
          <h3 className="text-sm font-semibold text-zinc-400 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            <span className="text-xs text-zinc-600">({appts.length} appointments)</span>
          </h3>
          <div className="space-y-3">
            {appts.map(appt => (
              <div key={appt.id} className="glass-card overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-zinc-800/20 transition-colors"
                  onClick={() => setExpandedId(expandedId === appt.id ? null : appt.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(appt.status)}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white">{appt.doctor}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                            appt.priority === 'urgent' ? 'badge-warning' :
                            appt.priority === 'emergency' ? 'badge-danger' : 'badge-info'
                          }`}>{appt.priority}</span>
                        </div>
                        <p className="text-xs text-zinc-400">{appt.specialty}</p>
                        <p className="text-sm text-zinc-300 mt-1">{appt.reason}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="text-sm text-indigo-400 font-medium">{appt.date}</p>
                        <p className="text-xs text-zinc-500">{appt.time}</p>
                      </div>
                      {expandedId === appt.id ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                    </div>
                  </div>
                </div>

                {expandedId === appt.id && (
                  <div className="px-4 pb-4 pt-0 border-t border-zinc-800/50 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-zinc-500 mt-0.5" />
                        <div>
                          <p className="text-xs text-zinc-500">Location</p>
                          <p className="text-sm text-zinc-300">{appt.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-zinc-500 mt-0.5" />
                        <div>
                          <p className="text-xs text-zinc-500">Status</p>
                          <p className={`text-sm font-medium ${
                            appt.status === 'scheduled' ? 'text-blue-400' :
                            appt.status === 'completed' ? 'text-green-400' : 'text-red-400'
                          }`}>{appt.status}</p>
                        </div>
                      </div>
                    </div>
                    {appt.notes && (
                      <div className="mt-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                        <div className="flex items-center gap-1 mb-1">
                          <FileText className="w-3 h-3 text-zinc-500" />
                          <span className="text-xs text-zinc-500">Notes</span>
                        </div>
                        <p className="text-sm text-zinc-400">{appt.notes}</p>
                      </div>
                    )}
                    {appt.status === 'scheduled' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAllAppts(allAppts.map(a => a.id === appt.id ? { ...a, status: 'completed' } : a));
                          }}
                          className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-xs border border-green-500/30 hover:bg-green-500/30"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAllAppts(allAppts.map(a => a.id === appt.id ? { ...a, status: 'cancelled' } : a));
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs border border-red-500/30 hover:bg-red-500/30"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredAppts.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Calendar className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">No appointments found for this view</p>
        </div>
      )}
    </div>
  );
}
