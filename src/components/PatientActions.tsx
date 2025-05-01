import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface PatientActionsProps {
  patientId: string;
}

const PatientActions = ({ patientId }: PatientActionsProps) => {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" className="h-8 w-8" asChild>
        <Link to={`/patients/${patientId}`} title="View Patient Details">
          <FileText className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" asChild>
        <Link to={`/appointments/new?patientId=${patientId}`} title="Schedule Appointment">
          <Calendar className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default PatientActions; 