import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, FileText, Pill, Activity, Phone } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)
        .single();
      setPatient(data);
      setLoading(false);
    };
    if (id) fetchPatient();
  }, [id]);

  if (loading) return <div>Loading...</div>;
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
            <h1 className="text-3xl font-bold tracking-tight text-navy-800">{patient.first_name} {patient.last_name}</h1>
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
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-navy-600">Date of Birth</p>
              <p className="font-medium">{patient.date_of_birth}</p>
            </div>
            <div>
              <p className="text-sm text-navy-600">Gender</p>
              <p className="font-medium">{patient.gender}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-navy-600">Phone</p>
            <p className="font-medium">{patient.phone_number}</p>
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
    </div>
  );
};

export default PatientProfile; 