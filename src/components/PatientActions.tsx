import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Patient } from "@/lib/types/patient";

interface PatientActionsProps {
  patientId: string;
  onStatusChange?: (patientId: string, newStatus: 'active' | 'inactive') => void;
}

const PatientActions = ({ patientId, onStatusChange }: PatientActionsProps) => {
  const { toast } = useToast();

  const handleStatusChange = (newStatus: 'active' | 'inactive') => {
    if (onStatusChange) {
      onStatusChange(patientId, newStatus);
      toast({
        title: "Status Updated",
        description: `Patient status has been set to ${newStatus}`,
      });
    }
  };

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleStatusChange('active')}>
            Set as Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange('inactive')}>
            Set as Inactive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PatientActions; 