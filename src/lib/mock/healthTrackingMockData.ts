import { v4 as uuidv4 } from 'uuid';

// Types
export interface HealthTrackingRecord {
  id: string;
  patientId: string;
  recordedAt: string;
  type: 'vitals' | 'fitness' | 'nutrition' | 'sleep' | 'medication';
  data: any;
  status: 'normal' | 'warning' | 'critical';
  notes?: string;
}

export interface VitalsData {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  bloodGlucose?: number;
  weight?: number;
}

export interface FitnessData {
  steps: number;
  distance: number;
  caloriesBurned: number;
  activeMinutes: number;
  heartRateZones: {
    peak: number;
    cardio: number;
    fatBurn: number;
    rest: number;
  };
  exerciseType?: string;
  duration?: number;
}

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  meals: Array<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
}

export interface SleepData {
  totalSleep: number;
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
  sleepQuality: number;
  sleepStart: string;
  sleepEnd: string;
  interruptions: number;
}

export interface MedicationData {
  medicationId: string;
  name: string;
  dosage: string;
  taken: boolean;
  takenAt?: string;
  sideEffects?: string[];
}

// Mock Data
const generateMockVitals = (patientId: string, days: number): HealthTrackingRecord[] => {
  const records: HealthTrackingRecord[] = [];
  const baseDate = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    // Generate 2-3 readings per day
    const readingsPerDay = Math.floor(Math.random() * 2) + 2;
    
    for (let j = 0; j < readingsPerDay; j++) {
      const time = new Date(date);
      time.setHours(Math.floor(Math.random() * 12) + 6); // Between 6 AM and 6 PM
      
      const heartRate = Math.floor(Math.random() * 30) + 60; // 60-90 bpm
      const systolic = Math.floor(Math.random() * 20) + 110; // 110-130 mmHg
      const diastolic = Math.floor(Math.random() * 10) + 70; // 70-80 mmHg
      const temperature = 36.5 + (Math.random() * 0.8); // 36.5-37.3°C
      const oxygenSaturation = Math.floor(Math.random() * 4) + 96; // 96-100%
      const respiratoryRate = Math.floor(Math.random() * 4) + 14; // 14-18 breaths/min
      
      records.push({
        id: uuidv4(),
        patientId,
        recordedAt: time.toISOString(),
        type: 'vitals',
        data: {
          heartRate,
          bloodPressure: {
            systolic,
            diastolic
          },
          temperature,
          oxygenSaturation,
          respiratoryRate
        },
        status: heartRate > 85 || systolic > 130 || diastolic > 85 ? 'warning' : 'normal'
      });
    }
  }
  
  return records;
};

const generateMockFitness = (patientId: string, days: number): HealthTrackingRecord[] => {
  const records: HealthTrackingRecord[] = [];
  const baseDate = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    const steps = Math.floor(Math.random() * 5000) + 5000; // 5000-10000 steps
    const distance = steps * 0.0005; // Rough conversion to km
    const caloriesBurned = Math.floor(steps * 0.04); // Rough estimation
    const activeMinutes = Math.floor(Math.random() * 30) + 30; // 30-60 minutes
    
    records.push({
      id: uuidv4(),
      patientId,
      recordedAt: date.toISOString(),
      type: 'fitness',
      data: {
        steps,
        distance,
        caloriesBurned,
        activeMinutes,
        heartRateZones: {
          peak: Math.floor(Math.random() * 10) + 10,
          cardio: Math.floor(Math.random() * 20) + 20,
          fatBurn: Math.floor(Math.random() * 30) + 30,
          rest: Math.floor(Math.random() * 10) + 10
        }
      },
      status: steps < 6000 ? 'warning' : 'normal'
    });
  }
  
  return records;
};

const generateMockNutrition = (patientId: string, days: number): HealthTrackingRecord[] => {
  const records: HealthTrackingRecord[] = [];
  const baseDate = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    records.push({
      id: uuidv4(),
      patientId,
      recordedAt: date.toISOString(),
      type: 'nutrition',
      data: {
        calories: Math.floor(Math.random() * 500) + 1800, // 1800-2300 calories
        protein: Math.floor(Math.random() * 30) + 90, // 90-120g protein
        carbs: Math.floor(Math.random() * 50) + 200, // 200-250g carbs
        fat: Math.floor(Math.random() * 20) + 60, // 60-80g fat
        water: Math.floor(Math.random() * 500) + 1500, // 1500-2000ml water
        meals: [
          {
            name: 'Breakfast',
            calories: Math.floor(Math.random() * 200) + 400,
            protein: Math.floor(Math.random() * 10) + 20,
            carbs: Math.floor(Math.random() * 20) + 40,
            fat: Math.floor(Math.random() * 8) + 12
          },
          {
            name: 'Lunch',
            calories: Math.floor(Math.random() * 200) + 600,
            protein: Math.floor(Math.random() * 15) + 30,
            carbs: Math.floor(Math.random() * 25) + 60,
            fat: Math.floor(Math.random() * 10) + 20
          },
          {
            name: 'Dinner',
            calories: Math.floor(Math.random() * 200) + 700,
            protein: Math.floor(Math.random() * 15) + 35,
            carbs: Math.floor(Math.random() * 25) + 65,
            fat: Math.floor(Math.random() * 10) + 25
          }
        ]
      },
      status: 'normal'
    });
  }
  
  return records;
};

const generateMockSleep = (patientId: string, days: number): HealthTrackingRecord[] => {
  const records: HealthTrackingRecord[] = [];
  const baseDate = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    const totalSleep = 6 + (Math.random() * 3); // 6-9 hours
    const deepSleep = totalSleep * 0.2; // 20% of total sleep
    const lightSleep = totalSleep * 0.5; // 50% of total sleep
    const remSleep = totalSleep * 0.3; // 30% of total sleep
    const sleepQuality = Math.floor(Math.random() * 30) + 70; // 70-100
    const interruptions = Math.floor(Math.random() * 3); // 0-2 interruptions
    
    const sleepStart = new Date(date);
    sleepStart.setHours(22 + Math.floor(Math.random() * 2)); // 10 PM - 12 AM
    sleepStart.setMinutes(Math.floor(Math.random() * 60));
    
    const sleepEnd = new Date(sleepStart);
    sleepEnd.setHours(sleepStart.getHours() + Math.floor(totalSleep));
    
    records.push({
      id: uuidv4(),
      patientId,
      recordedAt: date.toISOString(),
      type: 'sleep',
      data: {
        totalSleep,
        deepSleep,
        lightSleep,
        remSleep,
        sleepQuality,
        sleepStart: sleepStart.toISOString(),
        sleepEnd: sleepEnd.toISOString(),
        interruptions
      },
      status: totalSleep < 7 ? 'warning' : 'normal'
    });
  }
  
  return records;
};

// Generate mock data for a patient
export const generateMockHealthTrackingData = (patientId: string, days: number = 30) => {
  return [
    ...generateMockVitals(patientId, days),
    ...generateMockFitness(patientId, days),
    ...generateMockNutrition(patientId, days),
    ...generateMockSleep(patientId, days)
  ];
};

// Helper functions
export const getHealthTrackingData = (patientId: string, type?: string, startDate?: string) => {
  const data = generateMockHealthTrackingData(patientId);
  
  let filtered = data;
  if (type) {
    filtered = filtered.filter(record => record.type === type);
  }
  if (startDate) {
    filtered = filtered.filter(record => new Date(record.recordedAt) >= new Date(startDate));
  }
  
  return filtered;
};

export const getLatestHealthTrackingData = (patientId: string, type?: string) => {
  const data = getHealthTrackingData(patientId, type);
  return data.sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime())[0];
};

export const getHealthTrackingStats = (patientId: string, type: string, days: number = 7) => {
  const data = getHealthTrackingData(patientId, type);
  const recentData = data.slice(0, days);
  
  // Calculate statistics based on type
  switch (type) {
    case 'vitals':
      return {
        avgHeartRate: recentData.reduce((acc, curr) => acc + curr.data.heartRate, 0) / recentData.length,
        avgBloodPressure: {
          systolic: recentData.reduce((acc, curr) => acc + curr.data.bloodPressure.systolic, 0) / recentData.length,
          diastolic: recentData.reduce((acc, curr) => acc + curr.data.bloodPressure.diastolic, 0) / recentData.length
        },
        avgTemperature: recentData.reduce((acc, curr) => acc + curr.data.temperature, 0) / recentData.length,
        avgOxygenSaturation: recentData.reduce((acc, curr) => acc + curr.data.oxygenSaturation, 0) / recentData.length
      };
    case 'fitness':
      return {
        totalSteps: recentData.reduce((acc, curr) => acc + curr.data.steps, 0),
        avgSteps: recentData.reduce((acc, curr) => acc + curr.data.steps, 0) / recentData.length,
        totalDistance: recentData.reduce((acc, curr) => acc + curr.data.distance, 0),
        totalCaloriesBurned: recentData.reduce((acc, curr) => acc + curr.data.caloriesBurned, 0),
        totalActiveMinutes: recentData.reduce((acc, curr) => acc + curr.data.activeMinutes, 0)
      };
    case 'nutrition':
      return {
        avgCalories: recentData.reduce((acc, curr) => acc + curr.data.calories, 0) / recentData.length,
        avgProtein: recentData.reduce((acc, curr) => acc + curr.data.protein, 0) / recentData.length,
        avgCarbs: recentData.reduce((acc, curr) => acc + curr.data.carbs, 0) / recentData.length,
        avgFat: recentData.reduce((acc, curr) => acc + curr.data.fat, 0) / recentData.length,
        avgWater: recentData.reduce((acc, curr) => acc + curr.data.water, 0) / recentData.length
      };
    case 'sleep':
      return {
        avgTotalSleep: recentData.reduce((acc, curr) => acc + curr.data.totalSleep, 0) / recentData.length,
        avgDeepSleep: recentData.reduce((acc, curr) => acc + curr.data.deepSleep, 0) / recentData.length,
        avgLightSleep: recentData.reduce((acc, curr) => acc + curr.data.lightSleep, 0) / recentData.length,
        avgRemSleep: recentData.reduce((acc, curr) => acc + curr.data.remSleep, 0) / recentData.length,
        avgSleepQuality: recentData.reduce((acc, curr) => acc + curr.data.sleepQuality, 0) / recentData.length
      };
    default:
      return null;
  }
}; 