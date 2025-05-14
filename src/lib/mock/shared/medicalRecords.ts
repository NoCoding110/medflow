import { MedicalRecord, UUID } from './types';
import { subDays, format } from 'date-fns';
import { doctors, patients } from './users';

// Helper functions for dates
const now = new Date();
const formatDate = (date: Date): string => format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
const pastDate = (days: number) => formatDate(subDays(now, days));

// Sample medical records
export const medicalRecords: MedicalRecord[] = [
  // Patient 1 (Michael Brown) - Hypertension
  {
    id: 'medrec-1234-abcd-5678',
    patientId: patients[0].id,
    doctorId: doctors[0].id,
    date: pastDate(180),
    type: 'diagnosis',
    title: 'Hypertension Diagnosis',
    content: 'Patient diagnosed with stage 1 hypertension. Blood pressure readings consistently above 135/85 over the past three visits. No evidence of end-organ damage. Family history positive for cardiovascular disease.',
    attachments: [
      {
        id: 'att-1234-hypertension-dx',
        filename: 'bp_readings.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/bp_readings.pdf',
        uploadedBy: doctors[0].id,
        uploadedAt: pastDate(180),
        size: 245000
      }
    ]
  },
  {
    id: 'medrec-2345-bcde-6789',
    patientId: patients[0].id,
    doctorId: doctors[0].id,
    date: pastDate(150),
    type: 'treatment',
    title: 'Hypertension Treatment Plan',
    content: 'Starting Lisinopril 10mg daily. Recommended DASH diet with sodium restriction. Advised to monitor blood pressure at home twice daily and keep a log. Follow-up in 4 weeks to assess medication response.',
    relatedRecords: ['medrec-1234-abcd-5678']
  },
  {
    id: 'medrec-3456-cdef-7890',
    patientId: patients[0].id,
    doctorId: doctors[0].id,
    date: pastDate(120),
    type: 'note',
    title: 'Medication Follow-up',
    content: 'Patient reports good tolerance to Lisinopril. Home BP readings averaging 128/82, which shows good response to treatment. No side effects reported. Continue current management and review in 3 months.',
    relatedRecords: ['medrec-2345-bcde-6789']
  },
  {
    id: 'medrec-4567-defg-8901',
    patientId: patients[0].id,
    doctorId: doctors[0].id,
    date: pastDate(30),
    type: 'note',
    title: 'Annual Physical Examination',
    content: 'Comprehensive physical examination performed. Blood pressure well-controlled on current medication regimen. Ordered routine labs including lipid panel and basic metabolic panel. Recommended annual eye examination.',
    relatedRecords: ['medrec-3456-cdef-7890'],
    attachments: [
      {
        id: 'att-4567-annual-physical',
        filename: 'physical_exam_notes.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/physical_exam_notes.pdf',
        uploadedBy: doctors[0].id,
        uploadedAt: pastDate(30),
        size: 320000
      }
    ]
  },
  {
    id: 'medrec-5678-efgh-9012',
    patientId: patients[0].id,
    doctorId: doctors[0].id,
    date: pastDate(15),
    type: 'lab-order',
    title: 'Cardiac Risk Assessment Labs',
    content: 'Ordered comprehensive lipid panel, high-sensitivity CRP, and HbA1c to assess overall cardiovascular risk profile. Fasting required for accurate results.',
    relatedRecords: ['medrec-4567-defg-8901']
  },
  
  // Patient 2 (Emily Davis) - Asthma
  {
    id: 'medrec-6789-fghi-0123',
    patientId: patients[1].id,
    doctorId: doctors[3].id,
    date: pastDate(365),
    type: 'diagnosis',
    title: 'Asthma Diagnosis',
    content: 'Patient diagnosed with mild persistent asthma. Reports episodic wheezing and shortness of breath, particularly with exercise and during allergy season. Family history positive for asthma. Pulmonary function tests show mild obstruction with good bronchodilator response.',
    attachments: [
      {
        id: 'att-6789-asthma-dx',
        filename: 'pft_results.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/pft_results.pdf',
        uploadedBy: doctors[3].id,
        uploadedAt: pastDate(365),
        size: 410000
      }
    ]
  },
  {
    id: 'medrec-7890-ghij-1234',
    patientId: patients[1].id,
    doctorId: doctors[3].id,
    date: pastDate(350),
    type: 'treatment',
    title: 'Asthma Treatment Plan',
    content: 'Prescribed albuterol inhaler as rescue medication and advised to use as needed for symptom relief. Provided asthma action plan with instructions for recognizing and managing exacerbations. Recommended avoiding known triggers.',
    relatedRecords: ['medrec-6789-fghi-0123']
  },
  {
    id: 'medrec-8901-hijk-2345',
    patientId: patients[1].id,
    doctorId: doctors[3].id,
    date: pastDate(180),
    type: 'note',
    title: 'Asthma Follow-up',
    content: 'Patient reports good symptom control with albuterol use approximately 1-2 times per week. No emergency visits or urgent care needs since diagnosis. Advised to continue current management and return for follow-up in 6 months.',
    relatedRecords: ['medrec-7890-ghij-1234']
  },
  {
    id: 'medrec-9012-ijkl-3456',
    patientId: patients[1].id,
    doctorId: doctors[3].id,
    date: pastDate(30),
    type: 'note',
    title: 'Seasonal Asthma Exacerbation',
    content: 'Patient reporting increased asthma symptoms coinciding with spring allergies. Using rescue inhaler 3-4 times per week. No nocturnal symptoms. Lungs clear on examination. Advised to use antihistamine during allergy season and return if symptoms worsen.',
    relatedRecords: ['medrec-8901-hijk-2345']
  },
  
  // Patient 3 (David Wilson) - Coronary Artery Disease & Diabetes
  {
    id: 'medrec-0123-jklm-4567',
    patientId: patients[2].id,
    doctorId: doctors[0].id,
    date: pastDate(1825), // ~5 years ago
    type: 'diagnosis',
    title: 'Coronary Artery Disease Diagnosis',
    content: 'Patient diagnosed with three-vessel coronary artery disease following cardiac catheterization. Significant stenosis in LAD (80%), RCA (75%), and LCx (70%). Left ventricular function preserved with EF of 55%. Plan for CABG surgery.',
    attachments: [
      {
        id: 'att-0123-cad-dx',
        filename: 'cardiac_cath_report.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/cardiac_cath_report.pdf',
        uploadedBy: doctors[0].id,
        uploadedAt: pastDate(1825),
        size: 520000
      }
    ]
  },
  {
    id: 'medrec-1234-klmn-5678',
    patientId: patients[2].id,
    doctorId: doctors[0].id,
    date: pastDate(1800), // Just after diagnosis
    type: 'treatment',
    title: 'CABG Surgical Report',
    content: 'Patient underwent successful three-vessel coronary artery bypass grafting. LIMA to LAD, SVG to RCA and LCx. No complications during procedure. Patient transferred to ICU in stable condition for post-operative monitoring.',
    relatedRecords: ['medrec-0123-jklm-4567'],
    attachments: [
      {
        id: 'att-1234-cabg-report',
        filename: 'cabg_operative_report.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/cabg_operative_report.pdf',
        uploadedBy: doctors[0].id,
        uploadedAt: pastDate(1800),
        size: 650000
      }
    ]
  },
  {
    id: 'medrec-2345-lmno-6789',
    patientId: patients[2].id,
    doctorId: doctors[2].id,
    date: pastDate(1095), // ~3 years ago
    type: 'diagnosis',
    title: 'Type 2 Diabetes Diagnosis',
    content: 'Patient diagnosed with Type 2 Diabetes Mellitus. Fasting blood glucose 162 mg/dL, HbA1c 7.8%. No symptoms of polyuria or polydipsia. BMI 29.5. Family history positive for diabetes.',
    attachments: [
      {
        id: 'att-2345-diabetes-dx',
        filename: 'diabetes_labs.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/diabetes_labs.pdf',
        uploadedBy: doctors[2].id,
        uploadedAt: pastDate(1095),
        size: 280000
      }
    ]
  },
  {
    id: 'medrec-3456-mnop-7890',
    patientId: patients[2].id,
    doctorId: doctors[2].id,
    date: pastDate(1080), // Just after diabetes diagnosis
    type: 'treatment',
    title: 'Diabetes Treatment Plan',
    content: 'Starting Metformin 500mg twice daily, to be titrated to 1000mg twice daily over two weeks as tolerated. Provided diabetes education regarding diet, exercise, and blood glucose monitoring. Nutritionist referral placed for medical nutrition therapy.',
    relatedRecords: ['medrec-2345-lmno-6789']
  },
  {
    id: 'medrec-4567-nopq-8901',
    patientId: patients[2].id,
    doctorId: doctors[0].id,
    date: pastDate(45),
    type: 'note',
    title: 'Cardiology Follow-up',
    content: 'Annual cardiology follow-up. Patient reports good exercise tolerance without angina. Stress test shows no evidence of ischemia. Continuing current cardiac medications with good control of symptoms. Follow-up in one year.',
    relatedRecords: ['medrec-0123-jklm-4567', 'medrec-1234-klmn-5678'],
    attachments: [
      {
        id: 'att-4567-cardio-followup',
        filename: 'stress_test_results.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/stress_test_results.pdf',
        uploadedBy: doctors[0].id,
        uploadedAt: pastDate(45),
        size: 375000
      }
    ]
  },
  
  // Patient 4 (Sophia Martinez) - Migraines
  {
    id: 'medrec-5678-opqr-9012',
    patientId: patients[3].id,
    doctorId: doctors[1].id,
    date: pastDate(730), // ~2 years ago
    type: 'diagnosis',
    title: 'Migraine Diagnosis',
    content: 'Patient diagnosed with migraine without aura. Reports throbbing unilateral headaches with photophobia, phonophobia, and nausea occurring 3-4 times monthly and lasting 8-12 hours. Family history positive for migraines in mother. Neurological examination normal.',
    attachments: [
      {
        id: 'att-5678-migraine-dx',
        filename: 'headache_diary.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/headache_diary.pdf',
        uploadedBy: doctors[1].id,
        uploadedAt: pastDate(730),
        size: 190000
      }
    ]
  },
  {
    id: 'medrec-6789-pqrs-0123',
    patientId: patients[3].id,
    doctorId: doctors[1].id,
    date: pastDate(720), // Just after diagnosis
    type: 'treatment',
    title: 'Migraine Treatment Plan',
    content: 'Prescribed sumatriptan 50mg as needed for acute migraine attacks, not to exceed 9 tablets per month. Advised to identify and avoid triggers. Recommended maintaining regular sleep schedule and stress management techniques. Provided headache diary for tracking.',
    relatedRecords: ['medrec-5678-opqr-9012']
  },
  {
    id: 'medrec-7890-qrst-1234',
    patientId: patients[3].id,
    doctorId: doctors[1].id,
    date: pastDate(365), // ~1 year ago
    type: 'note',
    title: 'Migraine Follow-up',
    content: 'Patient reports reduction in migraine frequency to 1-2 times monthly with improved response to sumatriptan. Identified stress and irregular meals as primary triggers. Continuing current management plan with good symptom control.',
    relatedRecords: ['medrec-6789-pqrs-0123']
  },
  
  // Patient 5 (Robert Taylor) - Osteoarthritis
  {
    id: 'medrec-8901-rstu-2345',
    patientId: patients[4].id,
    doctorId: doctors[4].id,
    date: pastDate(1460), // ~4 years ago
    type: 'diagnosis',
    title: 'Knee Osteoarthritis Diagnosis',
    content: 'Patient diagnosed with moderate osteoarthritis of the right knee. X-rays show joint space narrowing and osteophyte formation in the medial compartment. Reports pain with activity, especially with stairs and after prolonged standing.',
    attachments: [
      {
        id: 'att-8901-oa-dx',
        filename: 'knee_xray.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/knee_xray.pdf',
        uploadedBy: doctors[4].id,
        uploadedAt: pastDate(1460),
        size: 430000
      }
    ]
  },
  {
    id: 'medrec-9012-stuv-3456',
    patientId: patients[4].id,
    doctorId: doctors[4].id,
    date: pastDate(1445), // Just after diagnosis
    type: 'treatment',
    title: 'Knee Osteoarthritis Treatment Plan',
    content: 'Prescribed ibuprofen 800mg as needed for pain, not to exceed three times daily. Recommended weight loss to reduce joint stress. Physical therapy referral for strengthening exercises. Discussed joint protection strategies and activity modifications.',
    relatedRecords: ['medrec-8901-rstu-2345']
  },
  {
    id: 'medrec-0123-tuvw-4567',
    patientId: patients[4].id,
    doctorId: doctors[4].id,
    date: pastDate(880), // ~2.5 years ago
    type: 'note',
    title: 'Orthopedic Follow-up',
    content: 'Patient continues to have moderate knee pain despite conservative measures. MRI shows meniscal tear in addition to osteoarthritis. Discussed arthroscopic options for meniscal repair. Patient electing to proceed with surgery.',
    relatedRecords: ['medrec-9012-stuv-3456'],
    attachments: [
      {
        id: 'att-0123-knee-mri',
        filename: 'knee_mri_report.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/knee_mri_report.pdf',
        uploadedBy: doctors[4].id,
        uploadedAt: pastDate(880),
        size: 550000
      }
    ]
  },
  {
    id: 'medrec-1234-uvwx-5678',
    patientId: patients[4].id,
    doctorId: doctors[4].id,
    date: pastDate(850), // After MRI, before surgery
    type: 'treatment',
    title: 'Knee Arthroscopy Surgical Report',
    content: 'Patient underwent right knee arthroscopy with partial medial meniscectomy. Chondral damage noted in medial femoral condyle and patellofemoral joint consistent with moderate osteoarthritis. Procedure well-tolerated without complications.',
    relatedRecords: ['medrec-0123-tuvw-4567'],
    attachments: [
      {
        id: 'att-1234-arthroscopy-report',
        filename: 'arthroscopy_report.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/arthroscopy_report.pdf',
        uploadedBy: doctors[4].id,
        uploadedAt: pastDate(850),
        size: 480000
      }
    ]
  },
  {
    id: 'medrec-2345-vwxy-6789',
    patientId: patients[4].id,
    doctorId: doctors[4].id,
    date: pastDate(5), // Very recent
    type: 'note',
    title: 'Recent Knee Pain Exacerbation',
    content: 'Patient reporting increased right knee pain over the past month, particularly after activity. Examination shows mild effusion and tenderness along medial joint line. X-rays show progression of osteoarthritis. Discussed treatment options including NSAIDs, physical therapy, and corticosteroid injection.',
    relatedRecords: ['medrec-1234-uvwx-5678'],
    attachments: [
      {
        id: 'att-2345-recent-xray',
        filename: 'recent_knee_xray.pdf',
        fileType: 'application/pdf',
        url: '/mock-data/files/recent_knee_xray.pdf',
        uploadedBy: doctors[4].id,
        uploadedAt: pastDate(5),
        size: 420000
      }
    ]
  }
];

// Utility functions for medical records
export const getMedicalRecordById = (id: UUID): MedicalRecord | undefined => {
  return medicalRecords.find(record => record.id === id);
};

export const getMedicalRecordsByPatientId = (patientId: UUID): MedicalRecord[] => {
  return medicalRecords
    .filter(record => record.patientId === patientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
};

export const getMedicalRecordsByDoctorId = (doctorId: UUID): MedicalRecord[] => {
  return medicalRecords
    .filter(record => record.doctorId === doctorId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
};

export const getMedicalRecordsByType = (patientId: UUID, type: MedicalRecord['type']): MedicalRecord[] => {
  return medicalRecords
    .filter(record => record.patientId === patientId && record.type === type)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
};

export const getRelatedRecords = (recordId: UUID): MedicalRecord[] => {
  const record = getMedicalRecordById(recordId);
  if (!record || !record.relatedRecords || record.relatedRecords.length === 0) {
    return [];
  }
  
  return medicalRecords
    .filter(r => record.relatedRecords?.includes(r.id))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
}; 