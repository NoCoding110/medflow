import { LabReport, UUID } from './types';
import { patients, doctors } from './users';
import { subDays, format } from 'date-fns';

// Helper functions for dates
const now = new Date();
const formatDate = (date: Date): string => format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
const pastDate = (days: number) => formatDate(subDays(now, days));

// Sample lab reports
export const labReports: LabReport[] = [
  // Patient 1 (Michael Brown - Hypertension)
  {
    id: 'lab-001',
    patientId: patients[0].id,
    orderedByDoctorId: doctors[0].id,
    collectedAt: pastDate(32),
    processedAt: pastDate(30),
    reportedAt: pastDate(29),
    labName: 'MedLife Diagnostics',
    testType: 'Blood Panel',
    status: 'completed',
    results: [
      {
        testName: 'Complete Blood Count',
        value: 'Normal',
        unit: '',
        referenceRange: 'Normal',
        interpretation: 'normal',
      },
      {
        testName: 'Hemoglobin',
        value: '14.2',
        unit: 'g/dL',
        referenceRange: '13.5-17.5',
        interpretation: 'normal',
      },
      {
        testName: 'White Blood Cells',
        value: '6.8',
        unit: 'K/uL',
        referenceRange: '4.5-11.0',
        interpretation: 'normal',
      },
      {
        testName: 'Platelets',
        value: '250',
        unit: 'K/uL',
        referenceRange: '150-450',
        interpretation: 'normal',
      }
    ],
    notes: 'All results within normal range. Patient well-hydrated for the test.',
  },
  {
    id: 'lab-002',
    patientId: patients[0].id,
    orderedByDoctorId: doctors[0].id,
    collectedAt: pastDate(32),
    processedAt: pastDate(30),
    reportedAt: pastDate(29),
    labName: 'MedLife Diagnostics',
    testType: 'Lipid Panel',
    status: 'completed',
    results: [
      {
        testName: 'Total Cholesterol',
        value: '210',
        unit: 'mg/dL',
        referenceRange: '<200',
        interpretation: 'high',
      },
      {
        testName: 'LDL Cholesterol',
        value: '130',
        unit: 'mg/dL',
        referenceRange: '<100',
        interpretation: 'high',
      },
      {
        testName: 'HDL Cholesterol',
        value: '45',
        unit: 'mg/dL',
        referenceRange: '>40',
        interpretation: 'normal',
      },
      {
        testName: 'Triglycerides',
        value: '150',
        unit: 'mg/dL',
        referenceRange: '<150',
        interpretation: 'normal',
      }
    ],
    notes: 'Elevated total and LDL cholesterol. Recommend dietary changes and possible statin therapy if levels remain elevated at next check.',
  },
  
  // Patient 2 (Emily Davis - Asthma)
  {
    id: 'lab-003',
    patientId: patients[1].id,
    orderedByDoctorId: doctors[3].id,
    collectedAt: pastDate(45),
    processedAt: pastDate(44),
    reportedAt: pastDate(43),
    labName: 'PulmoTest Labs',
    testType: 'Pulmonary Function Test',
    status: 'completed',
    results: [
      {
        testName: 'FEV1',
        value: '82',
        unit: '%',
        referenceRange: '>80%',
        interpretation: 'normal',
      },
      {
        testName: 'FVC',
        value: '85',
        unit: '%',
        referenceRange: '>80%',
        interpretation: 'normal',
      },
      {
        testName: 'FEV1/FVC Ratio',
        value: '0.78',
        unit: '',
        referenceRange: '>0.7',
        interpretation: 'normal',
      }
    ],
    notes: 'Mild airflow limitation consistent with mild persistent asthma. Good response to bronchodilator.',
  },
  
  // Patient 3 (David Wilson - CAD & Diabetes)
  {
    id: 'lab-004',
    patientId: patients[2].id,
    orderedByDoctorId: doctors[0].id,
    collectedAt: pastDate(15),
    processedAt: pastDate(14),
    reportedAt: pastDate(13),
    labName: 'CardioLab Diagnostics',
    testType: 'Cardiac Enzymes',
    status: 'completed',
    results: [
      {
        testName: 'Troponin I',
        value: '0.01',
        unit: 'ng/mL',
        referenceRange: '<0.04',
        interpretation: 'normal',
      },
      {
        testName: 'CK-MB',
        value: '3.1',
        unit: 'ng/mL',
        referenceRange: '<6.0',
        interpretation: 'normal',
      },
      {
        testName: 'BNP',
        value: '75',
        unit: 'pg/mL',
        referenceRange: '<100',
        interpretation: 'normal',
      }
    ],
    notes: 'Cardiac enzymes within normal limits. No evidence of myocardial infarction.',
  },
  {
    id: 'lab-005',
    patientId: patients[2].id,
    orderedByDoctorId: doctors[2].id,
    collectedAt: pastDate(10),
    processedAt: pastDate(9),
    reportedAt: pastDate(8),
    labName: 'DiabetesCare Lab',
    testType: 'Diabetes Panel',
    status: 'completed',
    results: [
      {
        testName: 'Fasting Blood Glucose',
        value: '145',
        unit: 'mg/dL',
        referenceRange: '70-99',
        interpretation: 'high',
      },
      {
        testName: 'HbA1c',
        value: '7.2',
        unit: '%',
        referenceRange: '<6.5',
        interpretation: 'high',
      },
      {
        testName: 'Insulin',
        value: '18',
        unit: 'uIU/mL',
        referenceRange: '2.6-24.9',
        interpretation: 'normal',
      }
    ],
    notes: 'Elevated HbA1c and fasting glucose consistent with diabetes. Current therapy should be reviewed.',
  },
  
  // Patient 4 (Sophia Martinez - Migraines)
  {
    id: 'lab-006',
    patientId: patients[3].id,
    orderedByDoctorId: doctors[1].id,
    collectedAt: pastDate(60),
    processedAt: pastDate(59),
    reportedAt: pastDate(58),
    labName: 'NeuroTest Diagnostics',
    testType: 'Blood Chemistry',
    status: 'completed',
    results: [
      {
        testName: 'Vitamin D, 25-Hydroxy',
        value: '22',
        unit: 'ng/mL',
        referenceRange: '30-100',
        interpretation: 'low',
      },
      {
        testName: 'Magnesium',
        value: '1.7',
        unit: 'mg/dL',
        referenceRange: '1.7-2.2',
        interpretation: 'normal',
      },
      {
        testName: 'Ferritin',
        value: '25',
        unit: 'ng/mL',
        referenceRange: '20-200',
        interpretation: 'normal',
      }
    ],
    notes: 'Low vitamin D levels may be contributing to migraine symptoms. Recommend supplementation.',
  },
  
  // Patient 5 (Robert Taylor - Osteoarthritis)
  {
    id: 'lab-007',
    patientId: patients[4].id,
    orderedByDoctorId: doctors[4].id,
    collectedAt: pastDate(20),
    processedAt: pastDate(19),
    reportedAt: pastDate(18),
    labName: 'OrthoDiagnostics',
    testType: 'Inflammatory Markers',
    status: 'completed',
    results: [
      {
        testName: 'C-Reactive Protein',
        value: '4.2',
        unit: 'mg/L',
        referenceRange: '<5.0',
        interpretation: 'normal',
      },
      {
        testName: 'Erythrocyte Sedimentation Rate',
        value: '15',
        unit: 'mm/hr',
        referenceRange: '<20',
        interpretation: 'normal',
      },
      {
        testName: 'Rheumatoid Factor',
        value: 'Negative',
        unit: '',
        referenceRange: 'Negative',
        interpretation: 'normal',
      }
    ],
    notes: 'Inflammatory markers are normal, consistent with osteoarthritis rather than inflammatory arthritis.',
  }
];

// Utility functions for lab reports
export const getLabReportById = (id: UUID): LabReport | undefined => {
  return labReports.find(report => report.id === id);
};

export const getLabReportsByPatientId = (patientId: UUID): LabReport[] => {
  return labReports
    .filter(report => report.patientId === patientId)
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
};

export const getLabReportsByDoctorId = (doctorId: UUID): LabReport[] => {
  return labReports
    .filter(report => report.orderedByDoctorId === doctorId)
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
};

export const getRecentLabReports = (limit: number = 10): LabReport[] => {
  return [...labReports]
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
    .slice(0, limit);
}; 