import { AIInsight, Alert } from '@/types';

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'trend',
    title: 'Blood Pressure Trend',
    description: 'Patient shows consistent increase in morning blood pressure readings over the past week.',
    severity: 'warning',
    timestamp: '2024-01-20T08:00:00Z',
    patientId: '1'
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Medication Adjustment',
    description: 'Consider increasing Lisinopril dosage based on recent blood pressure trends.',
    severity: 'info',
    timestamp: '2024-01-20T08:30:00Z',
    patientId: '1'
  },
  {
    id: '3',
    type: 'risk',
    title: 'Asthma Risk',
    description: 'Increased risk of asthma exacerbation due to poor air quality forecast.',
    severity: 'critical',
    timestamp: '2024-01-20T09:00:00Z',
    patientId: '2'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    patientId: '1',
    type: 'vitals',
    title: 'High Blood Pressure',
    description: 'Blood pressure reading exceeds normal range (150/95 mmHg)',
    severity: 'warning',
    timestamp: '2024-01-20T07:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    patientId: '2',
    type: 'medication',
    title: 'Medication Adherence',
    description: 'Missed 2 doses of Albuterol in the past week',
    severity: 'warning',
    timestamp: '2024-01-20T08:00:00Z',
    status: 'active'
  },
  {
    id: '3',
    patientId: '1',
    type: 'appointment',
    title: 'Upcoming Follow-up',
    description: 'Follow-up appointment scheduled for tomorrow',
    severity: 'info',
    timestamp: '2024-01-20T09:00:00Z',
    status: 'active'
  }
];

// Mock functions
export const getAIInsights = (patientId: string) => mockAIInsights.filter(i => i.patientId === patientId);
export const getAlerts = (patientId: string) => mockAlerts.filter(a => a.patientId === patientId); 