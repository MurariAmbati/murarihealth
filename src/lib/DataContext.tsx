'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  LabResult, LabTrend, Symptom, DoctorAppointment, ClinicianNote,
  TimelineEvent, HealthScore, RiskFactor, VitalSign, Medication,
} from './types';
import * as defaults from './data';

const STORAGE_KEY = 'murarihealth_data';

export interface HealthData {
  labResults: LabResult[];
  labTrends: LabTrend[];
  symptoms: Symptom[];
  appointments: DoctorAppointment[];
  clinicianNotes: ClinicianNote[];
  timelineEvents: TimelineEvent[];
  healthScore: HealthScore;
  riskFactors: RiskFactor[];
  vitalSigns: VitalSign[];
  medications: Medication[];
}

interface DataContextValue extends HealthData {
  setLabResults: (v: LabResult[] | ((prev: LabResult[]) => LabResult[])) => void;
  setLabTrends: (v: LabTrend[] | ((prev: LabTrend[]) => LabTrend[])) => void;
  setSymptoms: (v: Symptom[] | ((prev: Symptom[]) => Symptom[])) => void;
  setAppointments: (v: DoctorAppointment[] | ((prev: DoctorAppointment[]) => DoctorAppointment[])) => void;
  setClinicianNotes: (v: ClinicianNote[] | ((prev: ClinicianNote[]) => ClinicianNote[])) => void;
  setTimelineEvents: (v: TimelineEvent[] | ((prev: TimelineEvent[]) => TimelineEvent[])) => void;
  setHealthScore: (v: HealthScore | ((prev: HealthScore) => HealthScore)) => void;
  setRiskFactors: (v: RiskFactor[] | ((prev: RiskFactor[]) => RiskFactor[])) => void;
  setVitalSigns: (v: VitalSign[] | ((prev: VitalSign[]) => VitalSign[])) => void;
  setMedications: (v: Medication[] | ((prev: Medication[]) => Medication[])) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

function loadFromStorage(): Partial<HealthData> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<HealthData>;
  } catch {
    return {};
  }
}

function saveToStorage(data: HealthData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [labResults, setLabResults] = useState<LabResult[]>(defaults.labResults);
  const [labTrends, setLabTrends] = useState<LabTrend[]>(defaults.labTrends);
  const [symptoms, setSymptoms] = useState<Symptom[]>(defaults.symptoms);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(defaults.appointments);
  const [clinicianNotes, setClinicianNotes] = useState<ClinicianNote[]>(defaults.clinicianNotes);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(defaults.timelineEvents);
  const [healthScore, setHealthScore] = useState<HealthScore>(defaults.healthScore);
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>(defaults.riskFactors);
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>(defaults.vitalSigns);
  const [medications, setMedications] = useState<Medication[]>(defaults.medications);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored.labResults) setLabResults(stored.labResults);
    if (stored.labTrends) setLabTrends(stored.labTrends);
    if (stored.symptoms) setSymptoms(stored.symptoms);
    if (stored.appointments) setAppointments(stored.appointments);
    if (stored.clinicianNotes) setClinicianNotes(stored.clinicianNotes);
    if (stored.timelineEvents) setTimelineEvents(stored.timelineEvents);
    if (stored.healthScore) setHealthScore(stored.healthScore);
    if (stored.riskFactors) setRiskFactors(stored.riskFactors);
    if (stored.vitalSigns) setVitalSigns(stored.vitalSigns);
    if (stored.medications) setMedications(stored.medications);
    setLoaded(true);
  }, []);

  // Save to localStorage whenever data changes (but only after initial load)
  useEffect(() => {
    if (!loaded) return;
    saveToStorage({
      labResults, labTrends, symptoms, appointments, clinicianNotes,
      timelineEvents, healthScore, riskFactors, vitalSigns, medications,
    });
  }, [loaded, labResults, labTrends, symptoms, appointments, clinicianNotes, timelineEvents, healthScore, riskFactors, vitalSigns, medications]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DataContext.Provider value={{
      labResults, setLabResults,
      labTrends, setLabTrends,
      symptoms, setSymptoms,
      appointments, setAppointments,
      clinicianNotes, setClinicianNotes,
      timelineEvents, setTimelineEvents,
      healthScore, setHealthScore,
      riskFactors, setRiskFactors,
      vitalSigns, setVitalSigns,
      medications, setMedications,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useHealthData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useHealthData must be used within DataProvider');
  return ctx;
}
