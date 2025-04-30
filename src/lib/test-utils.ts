import { testPatients, loadTestData } from './test-data';

// Function to initialize test data for development
export const initializeTestData = () => {
  // Load test data for the first patient by default
  loadTestData('P001');
  
  // Add test data to sessionStorage for easy access
  sessionStorage.setItem('test_patients', JSON.stringify(testPatients));
  sessionStorage.setItem('current_test_patient', 'P001');
};

// Function to switch between test patients
export const switchTestPatient = (patientId: string) => {
  const patient = testPatients.find(p => p.id === patientId);
  if (!patient) return false;

  loadTestData(patientId);
  sessionStorage.setItem('current_test_patient', patientId);
  return true;
};

// Function to get current test patient
export const getCurrentTestPatient = () => {
  const patientId = sessionStorage.getItem('current_test_patient');
  return testPatients.find(p => p.id === patientId);
};

// Function to add test message to chat
export const addTestMessage = (message: string) => {
  const messages = JSON.parse(localStorage.getItem('ai_messages') || '[]');
  messages.push({
    role: 'user',
    content: message,
    timestamp: new Date()
  });
  localStorage.setItem('ai_messages', JSON.stringify(messages));
};

// Function to simulate health metric update
export const simulateHealthMetricUpdate = (type: string, value: number) => {
  const metrics = JSON.parse(localStorage.getItem('health_metrics') || '[]');
  metrics.push({
    type,
    value,
    unit: type === 'temperature' ? '°C' : type === 'bloodPressure' ? 'mmHg' : 'bpm',
    timestamp: new Date(),
    status: 'normal'
  });
  localStorage.setItem('health_metrics', JSON.stringify(metrics));
};

// Function to simulate medication reminder
export const simulateMedicationReminder = () => {
  const medications = JSON.parse(localStorage.getItem('medications') || '[]');
  if (medications.length > 0) {
    const med = medications[0];
    med.nextDose = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes from now
    localStorage.setItem('medications', JSON.stringify(medications));
  }
};

// Function to simulate symptom update
export const simulateSymptomUpdate = (name: string, severity: 'mild' | 'moderate' | 'severe') => {
  const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]');
  symptoms.push({
    name,
    severity,
    duration: '1 day',
    notes: 'Test symptom'
  });
  localStorage.setItem('symptoms', JSON.stringify(symptoms));
};

// Function to simulate goal progress update
export const simulateGoalProgressUpdate = (progress: number) => {
  const goals = JSON.parse(localStorage.getItem('health_goals') || '[]');
  if (goals.length > 0) {
    goals[0].progress = progress;
    goals[0].status = progress >= 100 ? 'completed' : progress < 30 ? 'at-risk' : 'in-progress';
    localStorage.setItem('health_goals', JSON.stringify(goals));
  }
}; 