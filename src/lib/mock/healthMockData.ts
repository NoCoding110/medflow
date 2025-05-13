import { v4 as uuidv4 } from 'uuid';

export interface VitalsRecord {
  id: string;
  patient_id: string;
  recorded_at: string;
  heart_rate: number;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  temperature: number;
  oxygen_saturation: number;
}

export interface FitnessRecord {
  id: string;
  patient_id: string;
  recorded_at: string;
  steps: number;
  distance: number;
  calories_burned: number;
  activity_type: string;
  duration: number;
}

export interface NutritionRecord {
  id: string;
  patient_id: string;
  date: string;
  meal_type: string;
  food_items: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Mock vitals data
export const mockVitals: VitalsRecord[] = [
  {
    id: uuidv4(),
    patient_id: 'patient1',
    recorded_at: new Date().toISOString(),
    heart_rate: 72,
    blood_pressure_systolic: 120,
    blood_pressure_diastolic: 80,
    temperature: 98.6,
    oxygen_saturation: 98
  },
  {
    id: uuidv4(),
    patient_id: 'patient1',
    recorded_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    heart_rate: 75,
    blood_pressure_systolic: 118,
    blood_pressure_diastolic: 78,
    temperature: 98.4,
    oxygen_saturation: 99
  }
];

// Mock fitness data
export const mockFitness: FitnessRecord[] = [
  {
    id: uuidv4(),
    patient_id: 'patient1',
    recorded_at: new Date().toISOString(),
    steps: 8500,
    distance: 4.2,
    calories_burned: 320,
    activity_type: 'Walking',
    duration: 45
  },
  {
    id: uuidv4(),
    patient_id: 'patient1',
    recorded_at: new Date(Date.now() - 86400000).toISOString(),
    steps: 10200,
    distance: 5.1,
    calories_burned: 380,
    activity_type: 'Running',
    duration: 30
  }
];

// Mock nutrition data
export const mockNutrition: NutritionRecord[] = [
  {
    id: uuidv4(),
    patient_id: 'patient1',
    date: new Date().toISOString(),
    meal_type: 'Breakfast',
    food_items: [
      { name: 'Oatmeal', quantity: 1, unit: 'cup' },
      { name: 'Banana', quantity: 1, unit: 'medium' },
      { name: 'Greek Yogurt', quantity: 1, unit: 'cup' }
    ],
    calories: 450,
    protein: 20,
    carbs: 65,
    fat: 12
  },
  {
    id: uuidv4(),
    patient_id: 'patient1',
    date: new Date(Date.now() - 86400000).toISOString(),
    meal_type: 'Lunch',
    food_items: [
      { name: 'Grilled Chicken Salad', quantity: 1, unit: 'bowl' },
      { name: 'Whole Grain Bread', quantity: 2, unit: 'slices' },
      { name: 'Apple', quantity: 1, unit: 'medium' }
    ],
    calories: 550,
    protein: 35,
    carbs: 45,
    fat: 18
  }
];

// Mock functions to simulate API calls
export const getVitals = async (patientId: string): Promise<VitalsRecord[]> => {
  return mockVitals.filter(vital => vital.patient_id === patientId);
};

export const getFitness = async (patientId: string): Promise<FitnessRecord[]> => {
  return mockFitness.filter(fitness => fitness.patient_id === patientId);
};

export const getNutrition = async (patientId: string): Promise<NutritionRecord[]> => {
  return mockNutrition.filter(nutrition => nutrition.patient_id === patientId);
}; 