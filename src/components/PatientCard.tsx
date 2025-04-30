
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAge } from "@/lib/data";
import { Patient } from "@/lib/data";
import { Calendar, FileText } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover-card border-navy-100">
      <CardContent className="p-0">
        <div className="border-b bg-navy-50/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to={`/patients/${patient.id}`}
                className="text-lg font-semibold hover:text-lightblue-600 hover:underline text-navy-800"
              >
                {patient.lastName}, {patient.firstName}
              </Link>
              <div className="text-sm text-navy-500">
                {calculateAge(patient.dateOfBirth)} years • {patient.gender}
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lightblue-100 text-lightblue-700">
              <span className="font-semibold">
                {patient.firstName.charAt(0)}
                {patient.lastName.charAt(0)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="px-4 py-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-navy-500">DOB: </span>
              <span className="text-navy-700">{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-navy-500">Phone: </span>
              <span className="text-navy-700">{patient.phone || "—"}</span>
            </div>
          </div>
          
          {(patient.medicalHistory?.conditions?.length || patient.allergies?.length) && (
            <div className="mt-3 border-t border-navy-100 pt-3">
              {patient.medicalHistory?.conditions?.length ? (
                <div className="mb-1">
                  <span className="text-sm font-medium text-navy-700">Conditions: </span>
                  <span className="text-sm text-navy-600">
                    {patient.medicalHistory.conditions.join(", ")}
                  </span>
                </div>
              ) : null}
              
              {patient.allergies?.length ? (
                <div>
                  <span className="text-sm font-medium text-navy-700">Allergies: </span>
                  <span className="text-sm text-navy-600">{patient.allergies.join(", ")}</span>
                </div>
              ) : null}
            </div>
          )}
        </div>
        
        <div className="flex border-t border-navy-100">
          <Button
            variant="ghost"
            className="flex-1 rounded-none rounded-bl border-r py-2 text-navy-600 hover:bg-navy-50 hover:text-lightblue-600"
            asChild
          >
            <Link to={`/appointments/new?patientId=${patient.id}`} className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 rounded-none rounded-br py-2 text-navy-600 hover:bg-navy-50 hover:text-lightblue-600"
            asChild
          >
            <Link to={`/patients/${patient.id}`} className="flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              View Record
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
