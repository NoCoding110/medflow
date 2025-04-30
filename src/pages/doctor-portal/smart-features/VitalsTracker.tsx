
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Thermometer, Heart, Activity } from "lucide-react";

const vitalsData = [
  {
    patientName: "John Smith",
    time: "10:30 AM",
    temperature: "37.2°C",
    heartRate: "75 BPM",
    bloodPressure: "120/80",
    oxygenLevel: "98%"
  },
  {
    patientName: "Sarah Johnson",
    time: "11:15 AM",
    temperature: "36.8°C",
    heartRate: "68 BPM",
    bloodPressure: "118/75",
    oxygenLevel: "99%"
  },
  {
    patientName: "Michael Brown",
    time: "12:00 PM",
    temperature: "36.9°C",
    heartRate: "72 BPM",
    bloodPressure: "125/82",
    oxygenLevel: "97%"
  }
];

const VitalsTracker = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Vitals Tracker</h1>
      
      <div className="grid gap-6">
        {vitalsData.map((patient, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl">{patient.patientName}</CardTitle>
              <p className="text-sm text-muted-foreground">Last updated: {patient.time}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Temperature</p>
                    <p className="text-xl">{patient.temperature}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Heart Rate</p>
                    <p className="text-xl">{patient.heartRate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Blood Pressure</p>
                    <p className="text-xl">{patient.bloodPressure}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Oxygen Level</p>
                    <p className="text-xl">{patient.oxygenLevel}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VitalsTracker;
