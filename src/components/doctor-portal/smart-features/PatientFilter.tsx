
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// For demo purposes - in a real app this would come from your backend
const upcomingPatients = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "Michael Brown" },
  { id: "3", name: "Emily Davis" },
  { id: "4", name: "Robert Wilson" },
];

interface PatientFilterProps {
  onPatientChange: (patientId: string) => void;
}

const PatientFilter = ({ onPatientChange }: PatientFilterProps) => {
  return (
    <div className="mb-6">
      <Select onValueChange={onPatientChange}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Filter by patient" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Upcoming Appointments</SelectItem>
          {upcomingPatients.map((patient) => (
            <SelectItem key={patient.id} value={patient.id}>
              {patient.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PatientFilter;
