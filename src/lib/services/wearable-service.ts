import { supabase } from "@/lib/supabase";
import { Patient } from "@/lib/types/patient";

export interface WearableDeviceData {
  patientId: string;
  deviceType: string;
  deviceId: string;
  lastSync: string;
  data: {
    heartRate?: number;
    steps?: number;
    calories?: number;
    sleep?: {
      duration: number;
      quality: number;
      stages: {
        deep: number;
        light: number;
        rem: number;
        awake: number;
      };
    };
    stress?: number;
    bloodOxygen?: number;
    bloodPressure?: {
      systolic: number;
      diastolic: number;
    };
  };
}

export const connectWearableDevice = async (
  patientId: string,
  deviceType: string,
  deviceId: string,
  accessToken: string
) => {
  try {
    const { data, error } = await supabase
      .from("wearable_devices")
      .insert([
        {
          patient_id: patientId,
          device_type: deviceType,
          device_id: deviceId,
          access_token: accessToken,
          last_sync: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error connecting wearable device:", error);
    throw error;
  }
};

export const syncWearableData = async (patientId: string) => {
  try {
    // Get all connected devices for the patient
    const { data: devices, error: devicesError } = await supabase
      .from("wearable_devices")
      .select("*")
      .eq("patient_id", patientId);

    if (devicesError) throw devicesError;

    // Sync data from each device
    const syncPromises = devices.map(async (device) => {
      let deviceData;
      switch (device.device_type) {
        case "apple_watch":
          deviceData = await syncAppleWatchData(device);
          break;
        case "fitbit":
          deviceData = await syncFitbitData(device);
          break;
        case "oura_ring":
          deviceData = await syncOuraRingData(device);
          break;
        default:
          console.warn(`Unsupported device type: ${device.device_type}`);
          return;
      }

      if (deviceData) {
        // Store the synced data
        const { error: dataError } = await supabase
          .from("wearable_data")
          .insert([
            {
              patient_id: patientId,
              device_id: device.id,
              data: deviceData,
              timestamp: new Date().toISOString(),
            },
          ]);

        if (dataError) throw dataError;

        // Update last sync time
        const { error: updateError } = await supabase
          .from("wearable_devices")
          .update({ last_sync: new Date().toISOString() })
          .eq("id", device.id);

        if (updateError) throw updateError;
      }
    });

    await Promise.all(syncPromises);
  } catch (error) {
    console.error("Error syncing wearable data:", error);
    throw error;
  }
};

const syncAppleWatchData = async (device: any) => {
  // Implement Apple Watch data sync
  // This would involve calling the Apple Health API
  return {
    heartRate: 72,
    steps: 8500,
    calories: 450,
    sleep: {
      duration: 7.5,
      quality: 85,
      stages: {
        deep: 1.5,
        light: 4.0,
        rem: 1.5,
        awake: 0.5,
      },
    },
    stress: 25,
    bloodOxygen: 98,
  };
};

const syncFitbitData = async (device: any) => {
  // Implement Fitbit data sync
  // This would involve calling the Fitbit API
  return {
    heartRate: 75,
    steps: 9200,
    calories: 500,
    sleep: {
      duration: 7.0,
      quality: 80,
      stages: {
        deep: 1.2,
        light: 4.2,
        rem: 1.3,
        awake: 0.3,
      },
    },
    stress: 30,
  };
};

const syncOuraRingData = async (device: any) => {
  // Implement Oura Ring data sync
  // This would involve calling the Oura API
  return {
    heartRate: 70,
    sleep: {
      duration: 8.0,
      quality: 90,
      stages: {
        deep: 1.8,
        light: 4.0,
        rem: 1.7,
        awake: 0.5,
      },
    },
    stress: 20,
    bloodOxygen: 97,
  };
};

export const getWearableData = async (patientId: string, startDate?: string, endDate?: string) => {
  try {
    let query = supabase
      .from("wearable_data")
      .select("*")
      .eq("patient_id", patientId)
      .order("timestamp", { ascending: false });

    if (startDate) {
      query = query.gte("timestamp", startDate);
    }
    if (endDate) {
      query = query.lte("timestamp", endDate);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching wearable data:", error);
    throw error;
  }
};

export const disconnectWearableDevice = async (deviceId: string) => {
  try {
    const { error } = await supabase
      .from("wearable_devices")
      .delete()
      .eq("id", deviceId);

    if (error) throw error;
  } catch (error) {
    console.error("Error disconnecting wearable device:", error);
    throw error;
  }
}; 