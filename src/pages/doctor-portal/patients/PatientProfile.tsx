import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, FileText, Pill, Activity, Phone } from "lucide-react";

// Mock function to get patient data - replace with actual API call
const getPatientById = (id: string) => {
  const patients = [
    {
      id: "1",
      name: "John Smith",
      age: 45,
      gender: "Male",
      lastVisit: "2025-04-14",
      status: "Active",
      upcomingAppointment: "2025-04-30",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      address: "123 Main St, Anytown, USA",
      medicalHistory: {
        conditions: ["Hypertension", "Type 2 Diabetes"],
        allergies: ["Penicillin"],
        medications: ["Lisinopril 10mg", "Metformin 500mg"],
        surgeries: ["Appendectomy (2020)"]
      },
      vitals: {
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "98.6",
        weight: "180",
        height: "5'10\""
      }
    },
    // Add more patient data as needed
  ];
  
  return patients.find(p => p.id === id);
};

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const patient = getPatientById(id!);

  if (!patient) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-800">Patient Not Found</h2>
          <p className="mt-2 text-navy-600">The requested patient profile could not be found.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/doctor/patients")}
          >
            Return to Patient List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/doctor/patients")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patient List
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-navy-800">{patient.name}</h1>
            <p className="text-navy-600">Patient ID: {patient.id}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/doctor/patients/${id}/notes`)}
            >
              <FileText className="mr-2 h-4 w-4" />
              View Notes
            </Button>
            <Button
              onClick={() => navigate(`/doctor/appointments/new?patientId=${id}`)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-navy-600">Age</p>
                    <p className="font-medium">{patient.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-navy-600">Gender</p>
                    <p className="font-medium">{patient.gender}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-navy-600">Phone</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-navy-600">Email</p>
                  <p className="font-medium">{patient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-navy-600">Address</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-navy-600 mr-3" />
                    <div>
                      <p className="font-medium">Last Visit</p>
                      <p className="text-sm text-navy-600">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {patient.upcomingAppointment && (
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-navy-600 mr-3" />
                      <div>
                        <p className="font-medium">Next Appointment</p>
                        <p className="text-sm text-navy-600">{new Date(patient.upcomingAppointment).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medical-history">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Current Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.conditions.map((condition, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center rounded-full bg-navy-100 px-2.5 py-0.5 text-sm font-medium text-navy-800"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.allergies.map((allergy, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Past Surgeries</h3>
                  <ul className="list-disc list-inside space-y-1 text-navy-600">
                    {patient.medicalHistory.surgeries.map((surgery, index) => (
                      <li key={index}>{surgery}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals">
          <Card>
            <CardHeader>
              <CardTitle>Current Vitals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-navy-600">Blood Pressure</p>
                  <p className="text-2xl font-medium">{patient.vitals.bloodPressure}</p>
                </div>
                <div>
                  <p className="text-sm text-navy-600">Heart Rate</p>
                  <p className="text-2xl font-medium">{patient.vitals.heartRate} bpm</p>
                </div>
                <div>
                  <p className="text-sm text-navy-600">Temperature</p>
                  <p className="text-2xl font-medium">{patient.vitals.temperature}°F</p>
                </div>
                <div>
                  <p className="text-sm text-navy-600">Weight</p>
                  <p className="text-2xl font-medium">{patient.vitals.weight} lbs</p>
                </div>
                <div>
                  <p className="text-sm text-navy-600">Height</p>
                  <p className="text-2xl font-medium">{patient.vitals.height}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.medicalHistory.medications.map((medication, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-3 rounded-lg border border-navy-100"
                  >
                    <Pill className="h-5 w-5 text-navy-600 mr-3" />
                    <span className="font-medium">{medication}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile; 