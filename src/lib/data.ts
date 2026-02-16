import { LabResult, LabTrend, Symptom, DoctorAppointment, ClinicianNote, TimelineEvent, HealthScore, RiskFactor, VitalSign, Medication } from './types';

// ========== COMPREHENSIVE LAB DATA ==========
export const labResults: LabResult[] = [
  // Complete Blood Count
  { id: 'l1', testName: 'WBC', value: 6.8, unit: 'K/uL', normalMin: 4.5, normalMax: 11.0, date: '2026-02-10', category: 'CBC', flag: 'normal' },
  { id: 'l2', testName: 'RBC', value: 4.9, unit: 'M/uL', normalMin: 4.5, normalMax: 5.5, date: '2026-02-10', category: 'CBC', flag: 'normal' },
  { id: 'l3', testName: 'Hemoglobin', value: 14.2, unit: 'g/dL', normalMin: 13.5, normalMax: 17.5, date: '2026-02-10', category: 'CBC', flag: 'normal' },
  { id: 'l4', testName: 'Hematocrit', value: 42.1, unit: '%', normalMin: 38.3, normalMax: 48.6, date: '2026-02-10', category: 'CBC', flag: 'normal' },
  { id: 'l5', testName: 'Platelets', value: 245, unit: 'K/uL', normalMin: 150, normalMax: 400, date: '2026-02-10', category: 'CBC', flag: 'normal' },
  { id: 'l6', testName: 'MCV', value: 86, unit: 'fL', normalMin: 80, normalMax: 100, date: '2026-02-10', category: 'CBC', flag: 'normal' },
  { id: 'l7', testName: 'MCH', value: 29.0, unit: 'pg', normalMin: 27, normalMax: 33, date: '2026-02-10', category: 'CBC', flag: 'normal' },
  { id: 'l8', testName: 'MCHC', value: 33.7, unit: 'g/dL', normalMin: 32, normalMax: 36, date: '2026-02-10', category: 'CBC', flag: 'normal' },

  // Metabolic Panel
  { id: 'l9', testName: 'Glucose (Fasting)', value: 102, unit: 'mg/dL', normalMin: 70, normalMax: 100, date: '2026-02-10', category: 'Metabolic', flag: 'high', notes: 'Slightly elevated — pre-diabetic range' },
  { id: 'l10', testName: 'HbA1c', value: 5.8, unit: '%', normalMin: 4.0, normalMax: 5.7, date: '2026-02-10', category: 'Metabolic', flag: 'high', notes: 'Pre-diabetic range (5.7-6.4%)' },
  { id: 'l11', testName: 'BUN', value: 16, unit: 'mg/dL', normalMin: 7, normalMax: 20, date: '2026-02-10', category: 'Metabolic', flag: 'normal' },
  { id: 'l12', testName: 'Creatinine', value: 1.0, unit: 'mg/dL', normalMin: 0.7, normalMax: 1.3, date: '2026-02-10', category: 'Metabolic', flag: 'normal' },
  { id: 'l13', testName: 'eGFR', value: 95, unit: 'mL/min', normalMin: 90, normalMax: 120, date: '2026-02-10', category: 'Metabolic', flag: 'normal' },
  { id: 'l14', testName: 'Sodium', value: 140, unit: 'mEq/L', normalMin: 136, normalMax: 145, date: '2026-02-10', category: 'Metabolic', flag: 'normal' },
  { id: 'l15', testName: 'Potassium', value: 4.2, unit: 'mEq/L', normalMin: 3.5, normalMax: 5.0, date: '2026-02-10', category: 'Metabolic', flag: 'normal' },
  { id: 'l16', testName: 'Calcium', value: 9.4, unit: 'mg/dL', normalMin: 8.5, normalMax: 10.5, date: '2026-02-10', category: 'Metabolic', flag: 'normal' },
  { id: 'l17', testName: 'CO2', value: 24, unit: 'mEq/L', normalMin: 23, normalMax: 29, date: '2026-02-10', category: 'Metabolic', flag: 'normal' },
  { id: 'l18', testName: 'Chloride', value: 101, unit: 'mEq/L', normalMin: 98, normalMax: 106, date: '2026-02-10', category: 'Metabolic', flag: 'normal' },

  // Lipid Panel
  { id: 'l19', testName: 'Total Cholesterol', value: 218, unit: 'mg/dL', normalMin: 0, normalMax: 200, date: '2026-02-10', category: 'Lipids', flag: 'high', notes: 'Borderline high' },
  { id: 'l20', testName: 'LDL Cholesterol', value: 138, unit: 'mg/dL', normalMin: 0, normalMax: 130, date: '2026-02-10', category: 'Lipids', flag: 'high', notes: 'Above optimal range' },
  { id: 'l21', testName: 'HDL Cholesterol', value: 48, unit: 'mg/dL', normalMin: 40, normalMax: 60, date: '2026-02-10', category: 'Lipids', flag: 'normal' },
  { id: 'l22', testName: 'Triglycerides', value: 162, unit: 'mg/dL', normalMin: 0, normalMax: 150, date: '2026-02-10', category: 'Lipids', flag: 'high', notes: 'Elevated' },
  { id: 'l23', testName: 'VLDL', value: 32, unit: 'mg/dL', normalMin: 5, normalMax: 40, date: '2026-02-10', category: 'Lipids', flag: 'normal' },
  { id: 'l24', testName: 'LDL/HDL Ratio', value: 2.88, unit: 'ratio', normalMin: 0, normalMax: 3.0, date: '2026-02-10', category: 'Lipids', flag: 'normal' },

  // Liver Panel
  { id: 'l25', testName: 'ALT', value: 28, unit: 'U/L', normalMin: 7, normalMax: 56, date: '2026-02-10', category: 'Liver', flag: 'normal' },
  { id: 'l26', testName: 'AST', value: 24, unit: 'U/L', normalMin: 10, normalMax: 40, date: '2026-02-10', category: 'Liver', flag: 'normal' },
  { id: 'l27', testName: 'ALP', value: 72, unit: 'U/L', normalMin: 44, normalMax: 147, date: '2026-02-10', category: 'Liver', flag: 'normal' },
  { id: 'l28', testName: 'Bilirubin (Total)', value: 0.9, unit: 'mg/dL', normalMin: 0.1, normalMax: 1.2, date: '2026-02-10', category: 'Liver', flag: 'normal' },
  { id: 'l29', testName: 'Albumin', value: 4.2, unit: 'g/dL', normalMin: 3.4, normalMax: 5.4, date: '2026-02-10', category: 'Liver', flag: 'normal' },
  { id: 'l30', testName: 'Total Protein', value: 7.1, unit: 'g/dL', normalMin: 6.0, normalMax: 8.3, date: '2026-02-10', category: 'Liver', flag: 'normal' },

  // Thyroid
  { id: 'l31', testName: 'TSH', value: 2.8, unit: 'mIU/L', normalMin: 0.4, normalMax: 4.0, date: '2026-02-10', category: 'Thyroid', flag: 'normal' },
  { id: 'l32', testName: 'Free T4', value: 1.2, unit: 'ng/dL', normalMin: 0.8, normalMax: 1.8, date: '2026-02-10', category: 'Thyroid', flag: 'normal' },
  { id: 'l33', testName: 'Free T3', value: 3.1, unit: 'pg/mL', normalMin: 2.3, normalMax: 4.2, date: '2026-02-10', category: 'Thyroid', flag: 'normal' },

  // Vitamins & Minerals
  { id: 'l34', testName: 'Vitamin D (25-OH)', value: 28, unit: 'ng/mL', normalMin: 30, normalMax: 100, date: '2026-02-10', category: 'Vitamins', flag: 'low', notes: 'Insufficient — supplement recommended' },
  { id: 'l35', testName: 'Vitamin B12', value: 480, unit: 'pg/mL', normalMin: 200, normalMax: 900, date: '2026-02-10', category: 'Vitamins', flag: 'normal' },
  { id: 'l36', testName: 'Folate', value: 14, unit: 'ng/mL', normalMin: 2.7, normalMax: 17, date: '2026-02-10', category: 'Vitamins', flag: 'normal' },
  { id: 'l37', testName: 'Iron', value: 85, unit: 'ug/dL', normalMin: 60, normalMax: 170, date: '2026-02-10', category: 'Vitamins', flag: 'normal' },
  { id: 'l38', testName: 'Ferritin', value: 120, unit: 'ng/mL', normalMin: 20, normalMax: 250, date: '2026-02-10', category: 'Vitamins', flag: 'normal' },
  { id: 'l39', testName: 'Magnesium', value: 1.9, unit: 'mg/dL', normalMin: 1.7, normalMax: 2.2, date: '2026-02-10', category: 'Vitamins', flag: 'normal' },
  { id: 'l40', testName: 'Zinc', value: 78, unit: 'ug/dL', normalMin: 60, normalMax: 120, date: '2026-02-10', category: 'Vitamins', flag: 'normal' },

  // Inflammatory Markers
  { id: 'l41', testName: 'CRP (hs)', value: 2.4, unit: 'mg/L', normalMin: 0, normalMax: 1.0, date: '2026-02-10', category: 'Inflammatory', flag: 'high', notes: 'Elevated — cardiovascular risk marker' },
  { id: 'l42', testName: 'ESR', value: 12, unit: 'mm/hr', normalMin: 0, normalMax: 20, date: '2026-02-10', category: 'Inflammatory', flag: 'normal' },
  { id: 'l43', testName: 'Homocysteine', value: 11.2, unit: 'umol/L', normalMin: 4, normalMax: 15, date: '2026-02-10', category: 'Inflammatory', flag: 'normal' },

  // Hormones
  { id: 'l44', testName: 'Testosterone (Total)', value: 520, unit: 'ng/dL', normalMin: 300, normalMax: 1000, date: '2026-02-10', category: 'Hormones', flag: 'normal' },
  { id: 'l45', testName: 'Cortisol (AM)', value: 16, unit: 'ug/dL', normalMin: 6, normalMax: 23, date: '2026-02-10', category: 'Hormones', flag: 'normal' },
  { id: 'l46', testName: 'DHEA-S', value: 340, unit: 'ug/dL', normalMin: 80, normalMax: 560, date: '2026-02-10', category: 'Hormones', flag: 'normal' },
  { id: 'l47', testName: 'Insulin (Fasting)', value: 12, unit: 'uIU/mL', normalMin: 2.6, normalMax: 24.9, date: '2026-02-10', category: 'Hormones', flag: 'normal' },
];

// ========== LAB TRENDS (historical data) ==========
export const labTrends: LabTrend[] = [
  {
    testName: 'Glucose (Fasting)', category: 'Metabolic', unit: 'mg/dL', normalMin: 70, normalMax: 100,
    currentFlag: 'high', percentChange: 4.1, trend: 'worsening',
    data: [
      { date: '2025-02', value: 88 }, { date: '2025-05', value: 92 }, { date: '2025-08', value: 96 },
      { date: '2025-11', value: 98 }, { date: '2026-02', value: 102 }
    ]
  },
  {
    testName: 'HbA1c', category: 'Metabolic', unit: '%', normalMin: 4.0, normalMax: 5.7,
    currentFlag: 'high', percentChange: 3.6, trend: 'worsening',
    data: [
      { date: '2025-02', value: 5.3 }, { date: '2025-05', value: 5.4 }, { date: '2025-08', value: 5.5 },
      { date: '2025-11', value: 5.6 }, { date: '2026-02', value: 5.8 }
    ]
  },
  {
    testName: 'Total Cholesterol', category: 'Lipids', unit: 'mg/dL', normalMin: 0, normalMax: 200,
    currentFlag: 'high', percentChange: 5.3, trend: 'worsening',
    data: [
      { date: '2025-02', value: 195 }, { date: '2025-05', value: 201 }, { date: '2025-08', value: 208 },
      { date: '2025-11', value: 212 }, { date: '2026-02', value: 218 }
    ]
  },
  {
    testName: 'LDL Cholesterol', category: 'Lipids', unit: 'mg/dL', normalMin: 0, normalMax: 130,
    currentFlag: 'high', percentChange: 7.0, trend: 'worsening',
    data: [
      { date: '2025-02', value: 118 }, { date: '2025-05', value: 124 }, { date: '2025-08', value: 129 },
      { date: '2025-11', value: 133 }, { date: '2026-02', value: 138 }
    ]
  },
  {
    testName: 'HDL Cholesterol', category: 'Lipids', unit: 'mg/dL', normalMin: 40, normalMax: 60,
    currentFlag: 'normal', percentChange: -2.0, trend: 'stable',
    data: [
      { date: '2025-02', value: 52 }, { date: '2025-05', value: 50 }, { date: '2025-08', value: 49 },
      { date: '2025-11', value: 48 }, { date: '2026-02', value: 48 }
    ]
  },
  {
    testName: 'Triglycerides', category: 'Lipids', unit: 'mg/dL', normalMin: 0, normalMax: 150,
    currentFlag: 'high', percentChange: 12.5, trend: 'worsening',
    data: [
      { date: '2025-02', value: 128 }, { date: '2025-05', value: 135 }, { date: '2025-08', value: 142 },
      { date: '2025-11', value: 155 }, { date: '2026-02', value: 162 }
    ]
  },
  {
    testName: 'Vitamin D', category: 'Vitamins', unit: 'ng/mL', normalMin: 30, normalMax: 100,
    currentFlag: 'low', percentChange: -12.5, trend: 'worsening',
    data: [
      { date: '2025-02', value: 35 }, { date: '2025-05', value: 38 }, { date: '2025-08', value: 34 },
      { date: '2025-11', value: 30 }, { date: '2026-02', value: 28 }
    ]
  },
  {
    testName: 'CRP (hs)', category: 'Inflammatory', unit: 'mg/L', normalMin: 0, normalMax: 1.0,
    currentFlag: 'high', percentChange: 33.3, trend: 'worsening',
    data: [
      { date: '2025-02', value: 1.2 }, { date: '2025-05', value: 1.5 }, { date: '2025-08', value: 1.8 },
      { date: '2025-11', value: 2.1 }, { date: '2026-02', value: 2.4 }
    ]
  },
  {
    testName: 'TSH', category: 'Thyroid', unit: 'mIU/L', normalMin: 0.4, normalMax: 4.0,
    currentFlag: 'normal', percentChange: 3.7, trend: 'stable',
    data: [
      { date: '2025-02', value: 2.5 }, { date: '2025-05', value: 2.6 }, { date: '2025-08', value: 2.7 },
      { date: '2025-11', value: 2.7 }, { date: '2026-02', value: 2.8 }
    ]
  },
  {
    testName: 'Hemoglobin', category: 'CBC', unit: 'g/dL', normalMin: 13.5, normalMax: 17.5,
    currentFlag: 'normal', percentChange: -0.7, trend: 'stable',
    data: [
      { date: '2025-02', value: 14.8 }, { date: '2025-05', value: 14.5 }, { date: '2025-08', value: 14.3 },
      { date: '2025-11', value: 14.3 }, { date: '2026-02', value: 14.2 }
    ]
  },
  {
    testName: 'Creatinine', category: 'Metabolic', unit: 'mg/dL', normalMin: 0.7, normalMax: 1.3,
    currentFlag: 'normal', percentChange: 0, trend: 'stable',
    data: [
      { date: '2025-02', value: 1.0 }, { date: '2025-05', value: 1.0 }, { date: '2025-08', value: 1.0 },
      { date: '2025-11', value: 1.0 }, { date: '2026-02', value: 1.0 }
    ]
  },
  {
    testName: 'Testosterone (Total)', category: 'Hormones', unit: 'ng/dL', normalMin: 300, normalMax: 1000,
    currentFlag: 'normal', percentChange: -3.7, trend: 'stable',
    data: [
      { date: '2025-02', value: 560 }, { date: '2025-05', value: 548 }, { date: '2025-08', value: 535 },
      { date: '2025-11', value: 528 }, { date: '2026-02', value: 520 }
    ]
  },
];

// ========== SYMPTOMS ==========
export const symptoms: Symptom[] = [
  { id: 's1', text: 'Feeling fatigued in the afternoon, especially after lunch. Energy crashes around 2-3pm.', severity: 6, category: 'Energy', bodySystem: 'Endocrine/Metabolic', date: '2026-02-14', tags: ['fatigue', 'energy', 'afternoon crash', 'postprandial'], sentiment: -0.6, duration: '2-3 hours', frequency: 'Daily' },
  { id: 's2', text: 'Mild headache on the right temple, comes and goes. Seems worse when dehydrated.', severity: 4, category: 'Neurological', bodySystem: 'Nervous System', date: '2026-02-13', tags: ['headache', 'tension', 'dehydration'], sentiment: -0.4, duration: '1-2 hours', frequency: '3x/week' },
  { id: 's3', text: 'Joint stiffness in knees when waking up, takes about 20 minutes to loosen up.', severity: 5, category: 'Musculoskeletal', bodySystem: 'Musculoskeletal', date: '2026-02-12', tags: ['joint stiffness', 'morning', 'knee'], sentiment: -0.5, duration: '20 minutes', frequency: 'Daily' },
  { id: 's4', text: 'Sleep quality has been poor. Waking up 2-3 times during the night. Not feeling rested.', severity: 7, category: 'Sleep', bodySystem: 'Nervous System', date: '2026-02-11', tags: ['insomnia', 'sleep disruption', 'fatigue'], sentiment: -0.7, duration: 'All night', frequency: 'Most nights' },
  { id: 's5', text: 'Occasional heart palpitations, usually when stressed or after coffee.', severity: 5, category: 'Cardiovascular', bodySystem: 'Cardiovascular', date: '2026-02-10', tags: ['palpitations', 'stress', 'caffeine'], sentiment: -0.5, duration: 'Few seconds', frequency: '2-3x/week' },
  { id: 's6', text: 'Dry eyes, especially when working on computer. Using eye drops frequently.', severity: 3, category: 'Ophthalmologic', bodySystem: 'Sensory', date: '2026-02-09', tags: ['dry eyes', 'screen time', 'eye strain'], sentiment: -0.3, duration: 'Throughout day', frequency: 'Daily' },
  { id: 's7', text: 'Brain fog and difficulty concentrating during work. Hard to focus on complex tasks.', severity: 6, category: 'Cognitive', bodySystem: 'Nervous System', date: '2026-02-08', tags: ['brain fog', 'concentration', 'cognitive'], sentiment: -0.6, duration: '3-4 hours', frequency: 'Most days' },
  { id: 's8', text: 'Mild anxiety before meetings and social situations. Tightness in chest.', severity: 5, category: 'Mental Health', bodySystem: 'Nervous System', date: '2026-02-07', tags: ['anxiety', 'social', 'chest tightness'], sentiment: -0.5, duration: '30-60 min', frequency: 'Several times/week' },
  { id: 's9', text: 'Digestive discomfort after eating, bloating and gas. Worse with dairy and gluten.', severity: 5, category: 'Gastrointestinal', bodySystem: 'Digestive', date: '2026-02-06', tags: ['bloating', 'gas', 'dairy', 'gluten', 'food sensitivity'], sentiment: -0.5, duration: '2-3 hours', frequency: 'After most meals' },
  { id: 's10', text: 'Occasional lower back pain when sitting for long periods. Improves with stretching.', severity: 4, category: 'Musculoskeletal', bodySystem: 'Musculoskeletal', date: '2026-02-05', tags: ['back pain', 'sedentary', 'posture'], sentiment: -0.4, duration: 'Variable', frequency: 'Most work days' },
  { id: 's11', text: 'Feeling generally good today, good energy and mood. Slept 7.5 hours.', severity: 1, category: 'General', bodySystem: 'General', date: '2026-02-04', tags: ['well-being', 'good energy', 'positive'], sentiment: 0.8, duration: 'All day', frequency: 'Occasional' },
  { id: 's12', text: 'Increased thirst and frequent urination. Drinking more water than usual.', severity: 4, category: 'Endocrine', bodySystem: 'Endocrine/Metabolic', date: '2026-02-03', tags: ['polydipsia', 'polyuria', 'metabolic'], sentiment: -0.4, duration: 'All day', frequency: '3-4 days/week' },
];

// ========== DOCTOR APPOINTMENTS ==========
export const appointments: DoctorAppointment[] = [
  { id: 'a1', doctor: 'Dr. Sarah Chen', specialty: 'Internal Medicine / PCP', date: '2026-02-20', time: '10:00 AM', location: 'NYC Medical Associates, 450 Park Ave', reason: 'Annual Physical + Lab Review', status: 'scheduled', priority: 'routine', notes: 'Bring recent lab results. Discuss pre-diabetic markers and lipid panel.' },
  { id: 'a2', doctor: 'Dr. Michael Torres', specialty: 'Endocrinology', date: '2026-02-25', time: '2:30 PM', location: 'NYU Langone Endocrine Center', reason: 'Metabolic Assessment - Glucose/HbA1c Trending Up', status: 'scheduled', priority: 'urgent', notes: 'Specialist referral from PCP. Elevated fasting glucose trend. Bring CGM data if available.' },
  { id: 'a3', doctor: 'Dr. Lisa Park', specialty: 'Cardiology', date: '2026-03-05', time: '11:00 AM', location: 'Mount Sinai Heart, 1 Gustave Levy Pl', reason: 'Cardiovascular Risk Assessment - Elevated CRP & Lipids', status: 'scheduled', priority: 'urgent', notes: 'hs-CRP trending up. LDL elevated. Need assessment for statin therapy and lifestyle intervention.' },
  { id: 'a4', doctor: 'Dr. James Kim', specialty: 'Dermatology', date: '2026-03-10', time: '9:00 AM', location: 'Dermatology Associates NYC', reason: 'Annual Skin Check', status: 'scheduled', priority: 'routine' },
  { id: 'a5', doctor: 'Dr. Anna Volkov', specialty: 'Ophthalmology', date: '2026-03-15', time: '3:00 PM', location: 'NYC Eye Care, 321 E 42nd St', reason: 'Eye Exam - Dry Eyes & Screen Strain', status: 'scheduled', priority: 'routine', notes: 'Chronic dry eye symptoms. Excessive screen time. Consider prescription eye drops.' },
  { id: 'a6', doctor: 'Dr. Robert Harris', specialty: 'Gastroenterology', date: '2026-03-20', time: '1:00 PM', location: 'GI Associates of Manhattan', reason: 'Digestive Issues - Bloating & Food Sensitivities', status: 'scheduled', priority: 'routine', notes: 'Chronic bloating, possible dairy/gluten sensitivity. Discuss H. pylori test, food allergy panel.' },
  { id: 'a7', doctor: 'Dr. Emily Nguyen', specialty: 'Rheumatology', date: '2026-03-25', time: '10:30 AM', location: 'HSS - Hospital for Special Surgery', reason: 'Joint Stiffness Evaluation', status: 'scheduled', priority: 'routine', notes: 'Morning knee stiffness. Rule out early inflammatory arthritis. ANA panel pending.' },
  { id: 'a8', doctor: 'Dr. David Patel', specialty: 'Psychiatry', date: '2026-02-28', time: '4:00 PM', location: 'Mindful Health NYC', reason: 'Anxiety & Sleep Assessment', status: 'scheduled', priority: 'urgent', notes: 'Sleep disruption, anxiety episodes, brain fog. Evaluate for GAD. CBT referral.' },
  // Past appointments
  { id: 'a9', doctor: 'Dr. Sarah Chen', specialty: 'Internal Medicine / PCP', date: '2025-11-15', time: '10:00 AM', location: 'NYC Medical Associates, 450 Park Ave', reason: 'Follow-up - Lab Review', status: 'completed', priority: 'routine', notes: 'Labs mostly normal. Glucose slightly trending up. Recheck in 3 months.' },
  { id: 'a10', doctor: 'Dr. Sarah Chen', specialty: 'Internal Medicine / PCP', date: '2025-08-20', time: '10:00 AM', location: 'NYC Medical Associates, 450 Park Ave', reason: 'Annual Physical', status: 'completed', priority: 'routine', notes: 'Overall healthy. Vitamin D low, started supplementation. Lipids borderline.' },
];

// ========== CLINICIAN NOTES ==========
export const clinicianNotes: ClinicianNote[] = [
  {
    id: 'cn1', clinician: 'Dr. Sarah Chen', specialty: 'Internal Medicine', date: '2025-11-15',
    subjective: 'Patient reports intermittent fatigue, particularly post-prandial. Sleep quality declining. Notes occasional afternoon energy crashes. Denies chest pain, SOB. Reports mild joint stiffness in AM.',
    objective: 'VS: BP 128/82, HR 72, RR 16, Temp 98.4°F, BMI 25.8. HEENT normal. Heart RRR, no murmurs. Lungs CTA bilaterally. Abdomen soft, NT. Extremities no edema. MSK: mild crepitus bilateral knees.',
    assessment: '1. Pre-diabetes: Fasting glucose 98, HbA1c 5.6 — trending upward.\n2. Dyslipidemia: Total cholesterol 212, LDL 133 — borderline high.\n3. Vitamin D insufficiency: 30 ng/mL.\n4. Fatigue: Likely multifactorial — metabolic, sleep quality, possible subclinical inflammation.\n5. Knee stiffness: Early degenerative vs. inflammatory — monitor.',
    plan: '1. Recheck metabolic panel and HbA1c in 3 months.\n2. Lifestyle modifications: Mediterranean diet, reduce refined carbs.\n3. Continue Vitamin D 2000 IU daily.\n4. Consider endocrinology referral if glucose continues to trend.\n5. Sleep hygiene counseling provided.\n6. Cardiology referral for lipid management if no improvement.\n7. Return in 3 months for follow-up.',
    diagnoses: ['Pre-diabetes (E11.65)', 'Dyslipidemia (E78.5)', 'Vitamin D deficiency (E55.9)', 'Fatigue (R53.83)'],
    medications: ['Vitamin D3 2000 IU daily', 'Fish Oil 1000mg daily'],
    followUpDate: '2026-02-20'
  },
  {
    id: 'cn2', clinician: 'Dr. Sarah Chen', specialty: 'Internal Medicine', date: '2025-08-20',
    subjective: 'Patient presents for annual physical. Generally feels well. Reports mild fatigue. Diet has been inconsistent. Exercise 2-3x/week. Denies significant complaints.',
    objective: 'VS: BP 124/78, HR 68, RR 14, Temp 98.6°F, BMI 25.2. Physical exam unremarkable. Labs reviewed — see attached.',
    assessment: '1. Overweight: BMI 25.2, borderline.\n2. Vitamin D deficiency: 22 ng/mL.\n3. Lipids: Borderline — Total cholesterol 201, LDL 124.\n4. Glucose: Normal but at upper end (92).\n5. Otherwise healthy male.',
    plan: '1. Start Vitamin D3 2000 IU daily.\n2. Dietary counseling — increase vegetables, lean protein.\n3. Exercise goal: 150 min/week moderate intensity.\n4. Recheck labs in 3 months.\n5. Annual flu vaccine administered.',
    diagnoses: ['Vitamin D deficiency (E55.9)', 'Overweight (E66.3)'],
    medications: ['Vitamin D3 2000 IU daily'],
    followUpDate: '2025-11-15'
  }
];

// ========== TIMELINE EVENTS ==========
export const timelineEvents: TimelineEvent[] = [
  { id: 't1', type: 'lab', title: 'Comprehensive Lab Panel', description: 'Full labs drawn — CBC, CMP, Lipids, Thyroid, Vitamins, Hormones, Inflammatory markers', date: '2026-02-10', severity: 'warning', details: { flaggedTests: 6, totalTests: 47 } },
  { id: 't2', type: 'symptom', title: 'Afternoon Energy Crash', description: 'Persistent fatigue pattern — post-prandial energy crashes', date: '2026-02-14', severity: 'warning' },
  { id: 't3', type: 'symptom', title: 'Sleep Disruption', description: 'Waking 2-3x per night, poor sleep quality', date: '2026-02-11', severity: 'danger' },
  { id: 't4', type: 'appointment', title: 'PCP Visit Scheduled', description: 'Dr. Chen — Annual Physical + Lab Review', date: '2026-02-20', severity: 'info' },
  { id: 't5', type: 'appointment', title: 'Endocrinology Referral', description: 'Dr. Torres — Metabolic assessment for glucose trend', date: '2026-02-25', severity: 'warning' },
  { id: 't6', type: 'appointment', title: 'Cardiology Consult', description: 'Dr. Park — CV risk, CRP elevation, lipid management', date: '2026-03-05', severity: 'warning' },
  { id: 't7', type: 'note', title: 'PCP Follow-up Note', description: 'Dr. Chen reviewed labs. Pre-diabetic markers noted. Endocrine referral placed.', date: '2025-11-15', severity: 'warning' },
  { id: 't8', type: 'medication', title: 'Started Vitamin D3', description: '2000 IU daily — for Vitamin D insufficiency', date: '2025-08-20', severity: 'info' },
  { id: 't9', type: 'medication', title: 'Started Fish Oil', description: '1000mg daily — for lipid support', date: '2025-11-15', severity: 'info' },
  { id: 't10', type: 'lab', title: 'Previous Lab Panel', description: 'Labs showed Vitamin D deficiency, borderline lipids, glucose trending', date: '2025-11-15', severity: 'warning' },
  { id: 't11', type: 'milestone', title: 'Annual Physical', description: 'Full physical exam. Started Vitamin D supplementation.', date: '2025-08-20', severity: 'normal' },
  { id: 't12', type: 'symptom', title: 'Digestive Issues Onset', description: 'Bloating and gas becoming more frequent, especially with dairy', date: '2026-02-06', severity: 'warning' },
  { id: 't13', type: 'appointment', title: 'Psychiatry Consult', description: 'Dr. Patel — anxiety & sleep assessment', date: '2026-02-28', severity: 'warning' },
  { id: 't14', type: 'symptom', title: 'Brain Fog Episodes', description: 'Difficulty concentrating on complex tasks, cognitive fatigue', date: '2026-02-08', severity: 'warning' },
];

// ========== HEALTH SCORES ==========
export const healthScore: HealthScore = {
  overall: 72,
  cardiovascular: 65,
  metabolic: 58,
  immune: 78,
  endocrine: 70,
  hepatic: 92,
  renal: 95,
  hematologic: 88,
  nutritional: 68,
  mental: 62,
};

// ========== RISK FACTORS ==========
export const riskFactors: RiskFactor[] = [
  {
    name: 'Type 2 Diabetes Risk', category: 'Metabolic', risk: 'moderate', score: 45,
    description: 'Fasting glucose and HbA1c are trending upward into pre-diabetic range. Insulin resistance may be developing.',
    recommendations: ['Reduce refined carbohydrate intake', 'Increase physical activity to 150+ min/week', 'Mediterranean diet adoption', 'Consider CGM monitoring', 'Endocrinology follow-up Feb 25'],
    relatedLabs: ['Glucose (Fasting)', 'HbA1c', 'Insulin (Fasting)']
  },
  {
    name: 'Cardiovascular Disease Risk', category: 'Cardiovascular', risk: 'moderate', score: 42,
    description: 'Elevated LDL, triglycerides, and hs-CRP indicate increased cardiovascular risk. HDL is adequate but could be higher.',
    recommendations: ['Increase omega-3 fatty acids', 'Regular aerobic exercise', 'Consider statin therapy evaluation', 'Reduce saturated fat intake', 'Cardiology consult Mar 5'],
    relatedLabs: ['Total Cholesterol', 'LDL Cholesterol', 'HDL Cholesterol', 'Triglycerides', 'CRP (hs)']
  },
  {
    name: 'Chronic Inflammation', category: 'Inflammatory', risk: 'moderate', score: 38,
    description: 'hs-CRP is elevated at 2.4 mg/L, indicating systemic low-grade inflammation. This can drive multiple disease processes.',
    recommendations: ['Anti-inflammatory diet (turmeric, omega-3, berries)', 'Stress reduction techniques', 'Improve sleep quality', 'Rule out autoimmune causes', 'Exercise regularly'],
    relatedLabs: ['CRP (hs)', 'ESR', 'Homocysteine']
  },
  {
    name: 'Sleep Disorder Risk', category: 'Mental Health', risk: 'high', score: 55,
    description: 'Frequent nighttime awakenings, poor sleep quality, and daytime fatigue suggest possible sleep disorder.',
    recommendations: ['Sleep study evaluation', 'Sleep hygiene optimization', 'Limit caffeine after 12pm', 'Blue light blocking glasses', 'Psychiatry consult Feb 28'],
    relatedLabs: ['Cortisol (AM)', 'TSH']
  },
  {
    name: 'Nutritional Deficiency Risk', category: 'Nutritional', risk: 'low', score: 25,
    description: 'Vitamin D is below optimal despite supplementation. Other nutritional markers are within range.',
    recommendations: ['Increase Vitamin D dose to 4000 IU', 'Sun exposure 15 min daily', 'Recheck levels in 6 weeks', 'Consider Vitamin D + K2 combination'],
    relatedLabs: ['Vitamin D (25-OH)', 'B12', 'Folate', 'Iron', 'Ferritin']
  },
  {
    name: 'Anxiety / Mental Health Risk', category: 'Mental Health', risk: 'moderate', score: 40,
    description: 'Reports anxiety symptoms, brain fog, and cognitive difficulties. May be related to sleep disruption and metabolic factors.',
    recommendations: ['CBT therapy referral', 'Mindfulness meditation practice', 'Regular exercise for mental health', 'Consider SSRI evaluation', 'Reduce caffeine intake'],
    relatedLabs: ['Cortisol (AM)', 'TSH', 'Testosterone (Total)']
  }
];

// ========== VITAL SIGNS ==========
export const vitalSigns: VitalSign[] = [
  { type: 'Blood Pressure (Systolic)', value: 128, unit: 'mmHg', date: '2026-02-10', status: 'elevated' },
  { type: 'Blood Pressure (Diastolic)', value: 82, unit: 'mmHg', date: '2026-02-10', status: 'normal' },
  { type: 'Heart Rate', value: 72, unit: 'bpm', date: '2026-02-10', status: 'normal' },
  { type: 'Temperature', value: 98.4, unit: '°F', date: '2026-02-10', status: 'normal' },
  { type: 'Respiratory Rate', value: 16, unit: 'breaths/min', date: '2026-02-10', status: 'normal' },
  { type: 'BMI', value: 25.8, unit: 'kg/m²', date: '2026-02-10', status: 'elevated' },
  { type: 'Weight', value: 178, unit: 'lbs', date: '2026-02-10', status: 'normal' },
  { type: 'SpO2', value: 98, unit: '%', date: '2026-02-10', status: 'normal' },
];

// ========== MEDICATIONS ==========
export const medications: Medication[] = [
  { id: 'm1', name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Daily', prescriber: 'Dr. Sarah Chen', startDate: '2025-08-20', status: 'active', renewalDate: '2026-08-20' },
  { id: 'm2', name: 'Fish Oil (Omega-3)', dosage: '1000mg', frequency: 'Daily', prescriber: 'Dr. Sarah Chen', startDate: '2025-11-15', status: 'active', renewalDate: '2026-11-15' },
];

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
