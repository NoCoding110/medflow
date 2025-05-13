import { v4 as uuidv4 } from 'uuid';
import { VitalsRecord, FitnessRecord, NutritionRecord } from '@/types';

export const mockVitals: VitalsRecord[] = [
  {
    id: '1',
    patientId: '1',
    recordedAt: '2024-01-20T08:00:00Z',
    heartRate: 75,
    bloodPressure: {
      systolic: 120,
      diastolic: 80
    },
    temperature: 98.6,
    oxygenSaturation: 98,
    respiratoryRate: 16
  },
  {
    id: '2',
    patientId: '1',
    recordedAt: '2024-01-20T12:00:00Z',
    heartRate: 82,
    bloodPressure: {
      systolic: 125,
      diastolic: 85
    },
    temperature: 98.4,
    oxygenSaturation: 97,
    respiratoryRate: 18
  }
];

export const mockFitness: FitnessRecord[] = [
  {
    id: '1',
    patientId: '1',
    recordedAt: '2024-01-20T00:00:00Z',
    steps: 8500,
    distance: 4.2,
    caloriesBurned: 450,
    activeMinutes: 45,
    heartRateZones: {
      peak: 15,
      cardio: 30,
      fatBurn: 45,
      rest: 10
    }
  },
  {
    id: '2',
    patientId: '1',
    recordedAt: '2024-01-19T00:00:00Z',
    steps: 7200,
    distance: 3.6,
    caloriesBurned: 380,
    activeMinutes: 35,
    heartRateZones: {
      peak: 10,
      cardio: 25,
      fatBurn: 40,
      rest: 15
    }
  }
];

export const mockNutrition: NutritionRecord[] = [
  {
    id: '1',
    patientId: '1',
    recordedAt: '2024-01-20T00:00:00Z',
    calories: 2200,
    protein: 120,
    carbs: 250,
    fat: 75,
    water: 2000,
    meals: [
      {
        name: 'Breakfast',
        calories: 500,
        protein: 30,
        carbs: 60,
        fat: 20
      },
      {
        name: 'Lunch',
        calories: 700,
        protein: 40,
        carbs: 80,
        fat: 25
      },
      {
        name: 'Dinner',
        calories: 800,
        protein: 50,
        carbs: 90,
        fat: 30
      }
    ]
  },
  {
    id: '2',
    patientId: '1',
    recordedAt: '2024-01-19T00:00:00Z',
    calories: 2100,
    protein: 110,
    carbs: 240,
    fat: 70,
    water: 2200,
    meals: [
      {
        name: 'Breakfast',
        calories: 450,
        protein: 25,
        carbs: 55,
        fat: 18
      },
      {
        name: 'Lunch',
        calories: 650,
        protein: 35,
        carbs: 75,
        fat: 22
      },
      {
        name: 'Dinner',
        calories: 750,
        protein: 45,
        carbs: 85,
        fat: 28
      }
    ]
  }
];

// Mock functions
export const getVitals = (patientId: string, startDate?: string) => {
  let filtered = mockVitals.filter(v => v.patientId === patientId);
  if (startDate) {
    filtered = filtered.filter(v => new Date(v.recordedAt) >= new Date(startDate));
  }
  return filtered;
};

export const getFitness = (patientId: string, startDate?: string) => {
  let filtered = mockFitness.filter(f => f.patientId === patientId);
  if (startDate) {
    filtered = filtered.filter(f => new Date(f.recordedAt) >= new Date(startDate));
  }
  return filtered;
};

export const getNutrition = (patientId: string, startDate?: string) => {
  let filtered = mockNutrition.filter(n => n.patientId === patientId);
  if (startDate) {
    filtered = filtered.filter(n => new Date(n.recordedAt) >= new Date(startDate));
  }
  return filtered;
}; 