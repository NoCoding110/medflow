import { v4 as uuidv4 } from 'uuid';
import { AIInsight } from '@/types';

export const mockInsights: AIInsight[] = [
  {
    id: '1',
    patientId: '1',
    type: 'trend',
    title: 'Blood Pressure Trend',
    description: 'Patient shows a slight upward trend in blood pressure readings over the last week.',
    severity: 'warning',
    timestamp: '2024-01-20T08:00:00Z'
  },
  {
    id: '2',
    patientId: '1',
    type: 'risk',
    title: 'Medication Adherence Risk',
    description: 'Patient has missed 2 doses of prescribed medication in the last week.',
    severity: 'critical',
    timestamp: '2024-01-20T09:00:00Z'
  },
  {
    id: '3',
    patientId: '2',
    type: 'recommendation',
    title: 'Exercise Recommendation',
    description: 'Based on recent activity levels, patient could benefit from increased physical activity.',
    severity: 'info',
    timestamp: '2024-01-20T10:00:00Z'
  }
];

export const getPatientInsights = (patientId: string) =>
  mockInsights.filter(i => i.patientId === patientId);

export const getInsight = (id: string) =>
  mockInsights.find(i => i.id === id);

export const getInsightsByType = (type: 'trend' | 'risk' | 'recommendation') =>
  mockInsights.filter(i => i.type === type); 