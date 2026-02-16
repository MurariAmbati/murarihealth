export interface LabResult {
  id: string;
  testName: string;
  value: number;
  unit: string;
  normalMin: number;
  normalMax: number;
  date: string;
  category: string;
  flag: 'normal' | 'low' | 'high' | 'critical';
  notes?: string;
}

export interface LabTrend {
  testName: string;
  category: string;
  data: { date: string; value: number }[];
  unit: string;
  normalMin: number;
  normalMax: number;
  currentFlag: 'normal' | 'low' | 'high' | 'critical';
  percentChange: number;
  trend: 'improving' | 'worsening' | 'stable';
}

export interface Symptom {
  id: string;
  text: string;
  severity: number; // 1-10
  category: string;
  bodySystem: string;
  date: string;
  tags: string[];
  sentiment: number; // -1 to 1
  duration?: string;
  frequency?: string;
}

export interface DoctorAppointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'overdue';
  notes?: string;
  followUp?: string;
  priority: 'routine' | 'urgent' | 'emergency';
}

export interface ClinicianNote {
  id: string;
  clinician: string;
  specialty: string;
  date: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  diagnoses: string[];
  medications?: string[];
  followUpDate?: string;
}

export interface TimelineEvent {
  id: string;
  type: 'lab' | 'appointment' | 'symptom' | 'note' | 'medication' | 'milestone';
  title: string;
  description: string;
  date: string;
  severity?: 'normal' | 'warning' | 'danger' | 'info';
  details?: Record<string, string | number>;
}

export interface HealthScore {
  overall: number;
  cardiovascular: number;
  metabolic: number;
  immune: number;
  endocrine: number;
  hepatic: number;
  renal: number;
  hematologic: number;
  nutritional: number;
  mental: number;
}

export interface RiskFactor {
  name: string;
  category: string;
  risk: 'low' | 'moderate' | 'high' | 'critical';
  score: number;
  description: string;
  recommendations: string[];
  relatedLabs: string[];
}

export interface VitalSign {
  type: string;
  value: number;
  unit: string;
  date: string;
  status: 'normal' | 'elevated' | 'low' | 'critical';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescriber: string;
  startDate: string;
  endDate?: string;
  renewalDate?: string;
  status: 'active' | 'discontinued' | 'pending-renewal';
  sideEffects?: string[];
}
