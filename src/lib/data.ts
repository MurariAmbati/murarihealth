import { LabResult, LabTrend, Symptom, DoctorAppointment, ClinicianNote, TimelineEvent, HealthScore, RiskFactor, VitalSign, Medication } from './types';

// ========== LAB DATA ==========
export const labResults: LabResult[] = [];

// ========== LAB TRENDS (historical data) ==========
export const labTrends: LabTrend[] = [];

// ========== SYMPTOMS ==========
export const symptoms: Symptom[] = [];

// ========== DOCTOR APPOINTMENTS ==========
export const appointments: DoctorAppointment[] = [];

// ========== CLINICIAN NOTES ==========
export const clinicianNotes: ClinicianNote[] = [];

// ========== TIMELINE EVENTS ==========
export const timelineEvents: TimelineEvent[] = [];

// ========== HEALTH SCORES ==========
export const healthScore: HealthScore = {
  overall: 0,
  cardiovascular: 0,
  metabolic: 0,
  immune: 0,
  endocrine: 0,
  hepatic: 0,
  renal: 0,
  hematologic: 0,
  nutritional: 0,
  mental: 0,
};

// ========== RISK FACTORS ==========
export const riskFactors: RiskFactor[] = [];

// ========== VITAL SIGNS ==========
export const vitalSigns: VitalSign[] = [];

// ========== MEDICATIONS ==========
export const medications: Medication[] = [];

// ========== NLP SYMPTOM ANALYSIS KEYWORDS ==========
export const symptomKeywords: Record<string, { category: string; bodySystem: string; urgency: number; relatedSpecialties: string[] }> = {
  'fatigue': { category: 'Energy', bodySystem: 'Endocrine/Metabolic', urgency: 5, relatedSpecialties: ['Internal Medicine', 'Endocrinology'] },
  'tired': { category: 'Energy', bodySystem: 'Endocrine/Metabolic', urgency: 4, relatedSpecialties: ['Internal Medicine'] },
  'headache': { category: 'Neurological', bodySystem: 'Nervous System', urgency: 5, relatedSpecialties: ['Neurology', 'Internal Medicine'] },
  'migraine': { category: 'Neurological', bodySystem: 'Nervous System', urgency: 7, relatedSpecialties: ['Neurology'] },
  'chest pain': { category: 'Cardiovascular', bodySystem: 'Cardiovascular', urgency: 9, relatedSpecialties: ['Cardiology', 'Emergency Medicine'] },
  'palpitations': { category: 'Cardiovascular', bodySystem: 'Cardiovascular', urgency: 6, relatedSpecialties: ['Cardiology'] },
  'anxiety': { category: 'Mental Health', bodySystem: 'Nervous System', urgency: 5, relatedSpecialties: ['Psychiatry', 'Psychology'] },
  'depression': { category: 'Mental Health', bodySystem: 'Nervous System', urgency: 7, relatedSpecialties: ['Psychiatry', 'Psychology'] },
  'insomnia': { category: 'Sleep', bodySystem: 'Nervous System', urgency: 6, relatedSpecialties: ['Sleep Medicine', 'Psychiatry'] },
  'sleep': { category: 'Sleep', bodySystem: 'Nervous System', urgency: 5, relatedSpecialties: ['Sleep Medicine'] },
  'bloating': { category: 'Gastrointestinal', bodySystem: 'Digestive', urgency: 4, relatedSpecialties: ['Gastroenterology'] },
  'nausea': { category: 'Gastrointestinal', bodySystem: 'Digestive', urgency: 5, relatedSpecialties: ['Gastroenterology'] },
  'pain': { category: 'Pain', bodySystem: 'Musculoskeletal', urgency: 5, relatedSpecialties: ['Rheumatology', 'Pain Management'] },
  'joint': { category: 'Musculoskeletal', bodySystem: 'Musculoskeletal', urgency: 5, relatedSpecialties: ['Rheumatology', 'Orthopedics'] },
  'stiff': { category: 'Musculoskeletal', bodySystem: 'Musculoskeletal', urgency: 4, relatedSpecialties: ['Rheumatology'] },
  'brain fog': { category: 'Cognitive', bodySystem: 'Nervous System', urgency: 5, relatedSpecialties: ['Neurology', 'Internal Medicine'] },
  'dizzy': { category: 'Neurological', bodySystem: 'Nervous System', urgency: 6, relatedSpecialties: ['Neurology', 'ENT'] },
  'rash': { category: 'Dermatological', bodySystem: 'Integumentary', urgency: 4, relatedSpecialties: ['Dermatology', 'Allergy'] },
  'breathing': { category: 'Respiratory', bodySystem: 'Respiratory', urgency: 7, relatedSpecialties: ['Pulmonology', 'Emergency Medicine'] },
  'cough': { category: 'Respiratory', bodySystem: 'Respiratory', urgency: 4, relatedSpecialties: ['Pulmonology', 'Internal Medicine'] },
  'thirst': { category: 'Endocrine', bodySystem: 'Endocrine/Metabolic', urgency: 5, relatedSpecialties: ['Endocrinology'] },
  'urination': { category: 'Endocrine', bodySystem: 'Renal/Endocrine', urgency: 5, relatedSpecialties: ['Urology', 'Endocrinology'] },
  'weight': { category: 'Metabolic', bodySystem: 'Endocrine/Metabolic', urgency: 4, relatedSpecialties: ['Endocrinology', 'Internal Medicine'] },
  'vision': { category: 'Ophthalmologic', bodySystem: 'Sensory', urgency: 6, relatedSpecialties: ['Ophthalmology'] },
  'numbness': { category: 'Neurological', bodySystem: 'Nervous System', urgency: 6, relatedSpecialties: ['Neurology'] },
  'tingling': { category: 'Neurological', bodySystem: 'Nervous System', urgency: 5, relatedSpecialties: ['Neurology'] },
};
