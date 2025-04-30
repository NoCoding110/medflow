import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { testPatients } from '@/lib/test-data';
import { initializeTestData, switchTestPatient, simulateHealthMetricUpdate, simulateMedicationReminder, simulateSymptomUpdate, simulateGoalProgressUpdate } from '@/lib/test-utils';

export const TestDataInitializer = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPatient, setCurrentPatient] = useState('P001');

  useEffect(() => {
    const testPatients = sessionStorage.getItem('test_patients');
    const currentPatient = sessionStorage.getItem('current_test_patient');
    if (testPatients && currentPatient) {
      setIsInitialized(true);
      setCurrentPatient(currentPatient);
    }
  }, []);

  const handleInitialize = () => {
    initializeTestData();
    setIsInitialized(true);
  };

  const handlePatientChange = (patientId: string) => {
    if (switchTestPatient(patientId)) {
      setCurrentPatient(patientId);
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-yellow-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Test Data Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isInitialized ? (
          <Button onClick={handleInitialize} className="w-full">
            Initialize Test Data
          </Button>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Test Patient</label>
              <Select value={currentPatient} onValueChange={handlePatientChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {testPatients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => simulateHealthMetricUpdate('heartRate', 85)}
              >
                Add Heart Rate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => simulateHealthMetricUpdate('bloodPressure', 140)}
              >
                Add BP
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => simulateMedicationReminder()}
              >
                Simulate Reminder
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => simulateSymptomUpdate('Headache', 'moderate')}
              >
                Add Symptom
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => simulateGoalProgressUpdate(75)}
              >
                Update Goal
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  setIsInitialized(false);
                }}
              >
                Clear Data
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}; 