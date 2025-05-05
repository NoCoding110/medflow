import { supabase } from "@/lib/supabase";
import { Patient } from "./patient-service";
import { WearableDeviceData } from "./wearable-service";

export const generateTestPatientData = async (userId: string): Promise<Patient> => {
  const testPatient: Patient = {
    id: crypto.randomUUID(),
    userId,
    dateOfBirth: "1990-01-01",
    gender: "Male",
    phone: "555-0123",
    address: "123 Test St, Test City, TS 12345",
    emergencyContact: {
      name: "John Doe",
      relationship: "Spouse",
      phone: "555-0124"
    },
    insurance: {
      provider: "Test Insurance",
      policyNumber: "TEST123456",
      groupNumber: "GRP789",
      contactNumber: "555-0125"
    },
    medicalHistory: {
      allergies: ["Penicillin", "Pollen"],
      medications: ["Lisinopril", "Metformin"],
      surgeries: ["Appendectomy"],
      conditions: ["Hypertension", "Type 2 Diabetes"],
      primaryCarePhysician: "Dr. Smith"
    },
    wearableDevices: {
      appleWatch: true,
      fitbit: false,
      ouraRing: true,
      other: []
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      aiInsights: {
        fitness: true,
        nutrition: true,
        vitals: true,
        mentalHealth: true,
        medication: true
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return testPatient;
};

export const generateTestWearableData = async (patientId: string): Promise<WearableDeviceData[]> => {
  const devices = [
    {
      deviceType: "apple_watch",
      deviceId: "AW" + crypto.randomUUID().slice(0, 8),
      data: {
        heartRate: Math.floor(Math.random() * (100 - 60) + 60),
        steps: Math.floor(Math.random() * 15000),
        calories: Math.floor(Math.random() * 1000),
        sleep: {
          duration: Math.random() * (9 - 6) + 6,
          quality: Math.floor(Math.random() * 100),
          stages: {
            deep: Math.random() * 2,
            light: Math.random() * 4,
            rem: Math.random() * 2,
            awake: Math.random() * 1
          }
        },
        stress: Math.floor(Math.random() * 100),
        bloodOxygen: Math.floor(Math.random() * (100 - 95) + 95)
      }
    },
    {
      deviceType: "oura_ring",
      deviceId: "OR" + crypto.randomUUID().slice(0, 8),
      data: {
        heartRate: Math.floor(Math.random() * (100 - 60) + 60),
        sleep: {
          duration: Math.random() * (9 - 6) + 6,
          quality: Math.floor(Math.random() * 100),
          stages: {
            deep: Math.random() * 2,
            light: Math.random() * 4,
            rem: Math.random() * 2,
            awake: Math.random() * 1
          }
        },
        stress: Math.floor(Math.random() * 100),
        bloodOxygen: Math.floor(Math.random() * (100 - 95) + 95)
      }
    }
  ];

  const wearableData: WearableDeviceData[] = devices.map(device => ({
    patientId,
    deviceType: device.deviceType,
    deviceId: device.deviceId,
    lastSync: new Date().toISOString(),
    data: device.data
  }));

  return wearableData;
};

export const seedTestData = async (userId: string) => {
  try {
    // Generate and insert test patient data
    const testPatient = await generateTestPatientData(userId);
    const { error: patientError } = await supabase
      .from("patients")
      .insert([testPatient]);

    if (patientError) throw patientError;

    // Generate and insert test wearable data
    const testWearableData = await generateTestWearableData(testPatient.id);
    const { error: wearableError } = await supabase
      .from("wearable_data")
      .insert(testWearableData);

    if (wearableError) throw wearableError;

    return { success: true };
  } catch (error) {
    console.error("Error seeding test data:", error);
    throw error;
  }
}; 