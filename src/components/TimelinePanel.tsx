'use client';

import { timelineEvents } from '@/lib/data';
import { 
  Clock, FlaskConical, Calendar, Brain, FileText, Pill, 
  Flag, AlertTriangle 
} from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  lab: FlaskConical,
  appointment: Calendar,
  symptom: Brain,
  note: FileText,
  medication: Pill,
  milestone: Flag,
};

const typeColors: Record<string, string> = {
  lab: 'text-purple-400 bg-purple-500/15 border-purple-500/20',
  appointment: 'text-blue-400 bg-blue-500/15 border-blue-500/20',
  symptom: 'text-orange-400 bg-orange-500/15 border-orange-500/20',
  note: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20',
  medication: 'text-green-400 bg-green-500/15 border-green-500/20',
  milestone: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/20',
};

const severityDotColors: Record<string, string> = {
  normal: 'bg-green-400',
  warning: 'bg-yellow-400',
  danger: 'bg-red-400',
  info: 'bg-blue-400',
};

export default function TimelinePanel() {
  const sortedEvents = [...timelineEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by month
  const monthGroups: Record<string, typeof sortedEvents> = {};
  sortedEvents.forEach(event => {
    const month = event.date.slice(0, 7);
    if (!monthGroups[month]) monthGroups[month] = [];
    monthGroups[month].push(event);
  });

  const typeCounts: Record<string, number> = {};
  timelineEvents.forEach(e => {
    typeCounts[e.type] = (typeCounts[e.type] || 0) + 1;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Health Timeline</h1>
        <p className="text-zinc-500 text-sm mt-1">Comprehensive chronological view of all health events</p>
      </div>

      {/* Type Summary */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(typeCounts).map(([type, count]) => {
          const Icon = typeIcons[type] || Clock;
          return (
            <div key={type} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${typeColors[type]}`}>
              <Icon className="w-3.5 h-3.5" />
              <span className="text-xs font-medium whitespace-nowrap">{type} ({count})</span>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800" />

        {Object.entries(monthGroups).map(([month, events]) => (
          <div key={month} className="mb-8">
            {/* Month Header */}
            <div className="relative flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#111118] border border-zinc-800 flex items-center justify-center z-10">
                <Clock className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-sm font-bold text-zinc-300">
                {new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </h3>
              <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded">
                {events.length} events
              </span>
            </div>

            {/* Events */}
            <div className="space-y-3 pl-14">
              {events.map(event => {
                const Icon = typeIcons[event.type] || Clock;
                const colors = typeColors[event.type] || 'text-zinc-400 bg-zinc-500/15 border-zinc-500/20';
                const dotColor = severityDotColors[event.severity || 'info'];

                return (
                  <div key={event.id} className="glass-card p-4 relative animate-slide-in">
                    {/* Connector dot */}
                    <div className={`absolute -left-[2.25rem] top-5 w-3 h-3 rounded-full ${dotColor} border-2 border-[#0a0a0f]`} />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${colors}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">{event.title}</span>
                            {event.severity === 'danger' && (
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            )}
                            {event.severity === 'warning' && (
                              <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                            )}
                          </div>
                          <p className="text-sm text-zinc-400">{event.description}</p>
                          {event.details && (
                            <div className="flex gap-3 mt-2">
                              {Object.entries(event.details).map(([key, val]) => (
                                <span key={key} className="text-xs text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">
                                  {key}: <strong className="text-zinc-300">{val}</strong>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-zinc-500">{event.date}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded mt-1 inline-block ${
                          event.severity === 'danger' ? 'badge-danger' :
                          event.severity === 'warning' ? 'badge-warning' :
                          event.severity === 'normal' ? 'badge-normal' : 'badge-info'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
