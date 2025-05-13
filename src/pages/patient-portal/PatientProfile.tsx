import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPatients, calculateAge } from '@/lib/data';
import {
  LineChart,
  Heart,
  Activity,
  Weight,
  Brain,
  Pill,
  FileText,
  Calendar,
  MessageSquare,
  AlertCircle,
  Thermometer,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';
import { Patient } from '@/lib/types/patient';

// Mock health data - In a real app, this would come from your backend
const mockHealthData = {
  vitals: [
    { date: '2024-04-01', heartRate: 72, bloodPressure: '120/80', temperature: 98.6 },
    { date: '2024-03-15', heartRate: 75, bloodPressure: '118/79', temperature: 98.4 },
    { date: '2024-03-01', heartRate: 70, bloodPressure: '122/82', temperature: 98.7 },
  ],
  medications: [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily', startDate: '2024-01-15' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2024-02-01' },
  ],
  appointments: [
    { date: '2024-04-15', type: 'Follow-up', doctor: 'Dr. Smith', status: 'Scheduled' },
    { date: '2024-05-01', type: 'Annual Physical', doctor: 'Dr. Johnson', status: 'Scheduled' },
  ],
  fitnessData: {
    steps: [
      { date: '2024-04-01', count: 8500 },
      { date: '2024-03-31', count: 10200 },
      { date: '2024-03-30', count: 7800 },
    ],
    sleep: [
      { date: '2024-04-01', hours: 7.5 },
      { date: '2024-03-31', hours: 8 },
      { date: '2024-03-30', hours: 6.5 },
    ],
  },
};

const PatientProfile = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPatient = mockPatients.find(p => p.id === patientId);
    setPatient(foundPatient || null);
  }, [patientId]);

  if (!patient) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Patient not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Patient Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-muted-foreground">
              {calculateAge(patient.dateOfBirth)} years old • {patient.gender} • ID: {patient.id}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              patient.status === 'active' 
                ? 'bg-green-50 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {patient.status || 'active'}
            </span>
          </div>
        </div>

        {/* Patient Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vitals">Vitals & Health</TabsTrigger>
            <TabsTrigger value="fitness">Fitness & Lifestyle</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Latest Vitals</CardTitle>
                  <HeartPulse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Heart Rate: {mockHealthData.vitals[0].heartRate} bpm</p>
                    <p>BP: {mockHealthData.vitals[0].bloodPressure}</p>
                    <p>Temp: {mockHealthData.vitals[0].temperature}°F</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Steps: {mockHealthData.fitnessData.steps[0].count}</p>
                    <p>Sleep: {mockHealthData.fitnessData.sleep[0].hours} hrs</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>{new Date(mockHealthData.appointments[0].date).toLocaleDateString()}</p>
                    <p>{mockHealthData.appointments[0].type}</p>
                    <p>{mockHealthData.appointments[0].doctor}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-1">
                    <p>Email: {patient.email}</p>
                    <p>Phone: {patient.phone}</p>
                    <p>Address: {patient.address}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Insurance Details</h4>
                  <div className="space-y-1">
                    <p>Provider: {patient.insuranceProvider}</p>
                    <p>Policy Number: {patient.insuranceNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs History</CardTitle>
                <CardDescription>Historical record of patient's vital signs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHealthData.vitals.map((vital, index) => (
                    <div key={index} className="flex items-center justify-between border-b py-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{vital.date}</p>
                        <div className="grid grid-cols-3 gap-4">
                          <p>HR: {vital.heartRate} bpm</p>
                          <p>BP: {vital.bloodPressure}</p>
                          <p>Temp: {vital.temperature}°F</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fitness Tab */}
          <TabsContent value="fitness" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Step Count</CardTitle>
                  <CardDescription>Daily step tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockHealthData.fitnessData.steps.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{data.date}</span>
                        <span>{data.count} steps</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sleep Tracking</CardTitle>
                  <CardDescription>Sleep duration tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockHealthData.fitnessData.sleep.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{data.date}</span>
                        <span>{data.hours} hours</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Active prescriptions and medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHealthData.medications.map((medication, index) => (
                    <div key={index} className="flex items-center justify-between border-b py-2">
                      <div>
                        <p className="font-medium">{medication.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage} • {medication.frequency}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Started: {medication.startDate}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Scheduled medical appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHealthData.appointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between border-b py-2">
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p>{new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PatientProfile; 