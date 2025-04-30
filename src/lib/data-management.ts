import { z } from 'zod';
import { HealthMetric, Medication, Symptom, HealthGoal, EmergencyContact } from '@/types/health';

// Validation schemas
export const healthMetricSchema = z.object({
  type: z.enum(['heartRate', 'bloodPressure', 'bloodSugar', 'temperature']),
  value: z.number(),
  unit: z.string(),
  timestamp: z.date(),
  status: z.enum(['normal', 'warning', 'critical']),
});

export const medicationSchema = z.object({
  name: z.string().min(1),
  dosage: z.string().min(1),
  frequency: z.string().min(1),
  nextDose: z.date(),
  notes: z.string().optional(),
});

export const symptomSchema = z.object({
  name: z.string().min(1),
  severity: z.enum(['mild', 'moderate', 'severe']),
  duration: z.string().min(1),
  notes: z.string().optional(),
});

export const healthGoalSchema = z.object({
  title: z.string().min(1),
  target: z.string().min(1),
  progress: z.number().min(0).max(100),
  deadline: z.date(),
  status: z.enum(['in-progress', 'completed', 'at-risk']),
});

export const emergencyContactSchema = z.object({
  name: z.string().min(1),
  relationship: z.string().min(1),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/),
  isPrimary: z.boolean(),
});

// Data sanitization functions
export const sanitizeHealthMetric = (metric: any): HealthMetric => {
  const sanitized = {
    ...metric,
    value: Number(metric.value),
    timestamp: new Date(metric.timestamp),
  };
  return healthMetricSchema.parse(sanitized);
};

export const sanitizeMedication = (medication: any): Medication => {
  const sanitized = {
    ...medication,
    nextDose: new Date(medication.nextDose),
  };
  return medicationSchema.parse(sanitized);
};

export const sanitizeSymptom = (symptom: any): Symptom => {
  return symptomSchema.parse(symptom);
};

export const sanitizeHealthGoal = (goal: any): HealthGoal => {
  const sanitized = {
    ...goal,
    progress: Number(goal.progress),
    deadline: new Date(goal.deadline),
  };
  return healthGoalSchema.parse(sanitized);
};

export const sanitizeEmergencyContact = (contact: any): EmergencyContact => {
  return emergencyContactSchema.parse(contact);
};

// Export/Import functions
export const exportData = () => {
  const data = {
    healthMetrics: JSON.parse(localStorage.getItem('health_metrics') || '[]'),
    medications: JSON.parse(localStorage.getItem('medications') || '[]'),
    symptoms: JSON.parse(localStorage.getItem('symptoms') || '[]'),
    healthGoals: JSON.parse(localStorage.getItem('health_goals') || '[]'),
    emergencyContacts: JSON.parse(localStorage.getItem('emergency_contacts') || '[]'),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `health-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importData = async (file: File): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    // Validate and sanitize imported data
    const sanitizedData = {
      healthMetrics: data.healthMetrics?.map(sanitizeHealthMetric) || [],
      medications: data.medications?.map(sanitizeMedication) || [],
      symptoms: data.symptoms?.map(sanitizeSymptom) || [],
      healthGoals: data.healthGoals?.map(sanitizeHealthGoal) || [],
      emergencyContacts: data.emergencyContacts?.map(sanitizeEmergencyContact) || [],
    };

    // Save to localStorage
    localStorage.setItem('health_metrics', JSON.stringify(sanitizedData.healthMetrics));
    localStorage.setItem('medications', JSON.stringify(sanitizedData.medications));
    localStorage.setItem('symptoms', JSON.stringify(sanitizedData.symptoms));
    localStorage.setItem('health_goals', JSON.stringify(sanitizedData.healthGoals));
    localStorage.setItem('emergency_contacts', JSON.stringify(sanitizedData.emergencyContacts));

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to import data',
    };
  }
};

// Backup/Restore functions
export const createBackup = async (userId: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const data = {
      healthMetrics: JSON.parse(localStorage.getItem('health_metrics') || '[]'),
      medications: JSON.parse(localStorage.getItem('medications') || '[]'),
      symptoms: JSON.parse(localStorage.getItem('symptoms') || '[]'),
      healthGoals: JSON.parse(localStorage.getItem('health_goals') || '[]'),
      emergencyContacts: JSON.parse(localStorage.getItem('emergency_contacts') || '[]'),
      timestamp: new Date().toISOString(),
      userId,
    };

    const response = await fetch('/api/backups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create backup');
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create backup',
    };
  }
};

export const restoreBackup = async (backupId: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const response = await fetch(`/api/backups/${backupId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch backup');
    }

    const data = await response.json();

    // Validate and sanitize backup data
    const sanitizedData = {
      healthMetrics: data.healthMetrics?.map(sanitizeHealthMetric) || [],
      medications: data.medications?.map(sanitizeMedication) || [],
      symptoms: data.symptoms?.map(sanitizeSymptom) || [],
      healthGoals: data.healthGoals?.map(sanitizeHealthGoal) || [],
      emergencyContacts: data.emergencyContacts?.map(sanitizeEmergencyContact) || [],
    };

    // Save to localStorage
    localStorage.setItem('health_metrics', JSON.stringify(sanitizedData.healthMetrics));
    localStorage.setItem('medications', JSON.stringify(sanitizedData.medications));
    localStorage.setItem('symptoms', JSON.stringify(sanitizedData.symptoms));
    localStorage.setItem('health_goals', JSON.stringify(sanitizedData.healthGoals));
    localStorage.setItem('emergency_contacts', JSON.stringify(sanitizedData.emergencyContacts));

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to restore backup',
    };
  }
};

// Sync functions
export const syncWithBackend = async (userId: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const localData = {
      healthMetrics: JSON.parse(localStorage.getItem('health_metrics') || '[]'),
      medications: JSON.parse(localStorage.getItem('medications') || '[]'),
      symptoms: JSON.parse(localStorage.getItem('symptoms') || '[]'),
      healthGoals: JSON.parse(localStorage.getItem('health_goals') || '[]'),
      emergencyContacts: JSON.parse(localStorage.getItem('emergency_contacts') || '[]'),
    };

    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, data: localData }),
    });

    if (!response.ok) {
      throw new Error('Failed to sync with backend');
    }

    const { data: serverData } = await response.json();

    // Merge local and server data
    const mergedData = {
      healthMetrics: [...new Set([...localData.healthMetrics, ...serverData.healthMetrics])],
      medications: [...new Set([...localData.medications, ...serverData.medications])],
      symptoms: [...new Set([...localData.symptoms, ...serverData.symptoms])],
      healthGoals: [...new Set([...localData.healthGoals, ...serverData.healthGoals])],
      emergencyContacts: [...new Set([...localData.emergencyContacts, ...serverData.emergencyContacts])],
    };

    // Save merged data to localStorage
    localStorage.setItem('health_metrics', JSON.stringify(mergedData.healthMetrics));
    localStorage.setItem('medications', JSON.stringify(mergedData.medications));
    localStorage.setItem('symptoms', JSON.stringify(mergedData.symptoms));
    localStorage.setItem('health_goals', JSON.stringify(mergedData.healthGoals));
    localStorage.setItem('emergency_contacts', JSON.stringify(mergedData.emergencyContacts));

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sync with backend',
    };
  }
}; 