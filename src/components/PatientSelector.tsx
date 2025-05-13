import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export interface Patient {
  id: string;
  name: string;
}

interface PatientSelectorProps {
  patients: Patient[];
  selectedPatientId: string;
  onChange: (patientId: string) => void;
  label?: string;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({ patients, selectedPatientId, onChange, label }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="font-medium text-sm">{label}</label>}
      <Select value={selectedPatientId} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a patient" />
        </SelectTrigger>
        <SelectContent>
          {patients.map((patient) => (
            <SelectItem key={patient.id} value={patient.id}>
              {patient.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PatientSelector;
export { PatientSelector }; 