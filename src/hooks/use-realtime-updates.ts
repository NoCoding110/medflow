import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Patient } from "@/lib/services/patient-service";
import { WearableDeviceData } from "@/lib/services/wearable-service";

export const useRealtimeUpdates = (patientId: string) => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [wearableData, setWearableData] = useState<WearableDeviceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial data fetch
    const fetchInitialData = async () => {
      try {
        const { data: patient, error: patientError } = await supabase
          .from("patients")
          .select("*")
          .eq("id", patientId)
          .single();

        if (patientError) throw patientError;

        const { data: wearable, error: wearableError } = await supabase
          .from("wearable_data")
          .select("*")
          .eq("patient_id", patientId)
          .order("timestamp", { ascending: false });

        if (wearableError) throw wearableError;

        setPatientData(patient);
        setWearableData(wearable);
      } catch (err) {
        setError("Failed to fetch initial data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // Set up real-time subscriptions
    const patientSubscription = supabase
      .channel("patient_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "patients",
          filter: `id=eq.${patientId}`,
        },
        (payload) => {
          setPatientData(payload.new as Patient);
        }
      )
      .subscribe();

    const wearableSubscription = supabase
      .channel("wearable_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "wearable_data",
          filter: `patient_id=eq.${patientId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setWearableData((prev) => [payload.new as WearableDeviceData, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setWearableData((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? (payload.new as WearableDeviceData) : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            setWearableData((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      patientSubscription.unsubscribe();
      wearableSubscription.unsubscribe();
    };
  }, [patientId]);

  return {
    patientData,
    wearableData,
    loading,
    error,
  };
}; 