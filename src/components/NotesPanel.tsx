'use client';

import { useState } from 'react';
import { useHealthData } from '@/lib/DataContext';
import { ChevronDown, ChevronUp, Clipboard, Stethoscope, Pill, Calendar, AlertCircle } from 'lucide-react';

export default function NotesPanel() {
  const { clinicianNotes } = useHealthData();
  const [expandedId, setExpandedId] = useState<string | null>(clinicianNotes[0]?.id || null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Clinician Notes</h1>
        <p className="text-zinc-500 text-sm mt-1">Complete SOAP notes from all clinical encounters</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Total Notes</p>
          <p className="text-2xl font-bold text-white">{clinicianNotes.length}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Clinicians</p>
          <p className="text-2xl font-bold text-indigo-400">
            {new Set(clinicianNotes.map(n => n.clinician)).size}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Active Diagnoses</p>
          <p className="text-2xl font-bold text-yellow-400">
            {new Set(clinicianNotes.flatMap(n => n.diagnoses)).size}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Last Visit</p>
          <p className="text-lg font-bold text-zinc-300">{clinicianNotes[0]?.date}</p>
        </div>
      </div>

      {/* Active Diagnoses */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-400" />
          Active Diagnoses
        </h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(clinicianNotes.flatMap(n => n.diagnoses))).map(dx => (
            <span key={dx} className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-300 text-xs font-medium border border-yellow-500/20">
              {dx}
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-4">
        {clinicianNotes.map(note => (
          <div key={note.id} className="glass-card overflow-hidden">
            {/* Header */}
            <div
              className="p-4 cursor-pointer hover:bg-zinc-800/20 transition-colors"
              onClick={() => setExpandedId(expandedId === note.id ? null : note.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{note.clinician}</p>
                    <p className="text-xs text-zinc-500">{note.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-indigo-400 font-medium">{note.date}</p>
                    {note.followUpDate && (
                      <p className="text-xs text-zinc-600">Follow-up: {note.followUpDate}</p>
                    )}
                  </div>
                  {expandedId === note.id
                    ? <ChevronUp className="w-4 h-4 text-zinc-500" />
                    : <ChevronDown className="w-4 h-4 text-zinc-500" />
                  }
                </div>
              </div>
            </div>

            {/* Expanded SOAP Note */}
            {expandedId === note.id && (
              <div className="px-4 pb-6 border-t border-zinc-800/50 animate-fade-in">
                {/* SOAP sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Subjective */}
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">S</span>
                      <span className="text-xs font-semibold text-blue-300 uppercase tracking-wide">Subjective</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{note.subjective}</p>
                  </div>

                  {/* Objective */}
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/15">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-md bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">O</span>
                      <span className="text-xs font-semibold text-green-300 uppercase tracking-wide">Objective</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{note.objective}</p>
                  </div>

                  {/* Assessment */}
                  <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/15">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-md bg-yellow-500/20 flex items-center justify-center text-xs font-bold text-yellow-400">A</span>
                      <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wide">Assessment</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{note.assessment}</p>
                  </div>

                  {/* Plan */}
                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/15">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">P</span>
                      <span className="text-xs font-semibold text-purple-300 uppercase tracking-wide">Plan</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{note.plan}</p>
                  </div>
                </div>

                {/* Diagnoses & Medications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clipboard className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs font-semibold text-zinc-400">Diagnoses</span>
                    </div>
                    <ul className="space-y-1">
                      {note.diagnoses.map((dx, i) => (
                        <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                          <span className="text-indigo-400 mt-0.5">•</span>
                          {dx}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {note.medications && note.medications.length > 0 && (
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Pill className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs font-semibold text-zinc-400">Medications</span>
                      </div>
                      <ul className="space-y-1">
                        {note.medications.map((med, i) => (
                          <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">•</span>
                            {med}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {note.followUpDate && (
                  <div className="mt-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm text-indigo-300">Follow-up scheduled: <strong>{note.followUpDate}</strong></span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
