import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import NewPatientForm from '@/components/doctor-portal/NewPatientForm';

const PatientOnboarding = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Patient Onboarding</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      {showForm ? (
        <NewPatientForm 
          onSuccess={() => {
            setShowForm(false);
            // TODO: Refresh patient list
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Patient List</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Add patient list table */}
            <p className="text-muted-foreground">No patients found. Click "Add New Patient" to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientOnboarding; 