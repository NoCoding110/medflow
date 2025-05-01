import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail, MapPin, FileText, Activity, Pill } from "lucide-react";
import { Patient } from "@/lib/types/patient";
import { useNavigate } from "react-router-dom";

interface PatientDialogProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

const PatientDialog = ({ patient, open, onClose }: PatientDialogProps) => {
  const navigate = useNavigate();
  
  if (!patient) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const viewFullProfile = () => {
    navigate(`/doctor/patients/${patient.id}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {patient.firstName} {patient.lastName}
          </DialogTitle>
          <DialogDescription>
            Patient ID: {patient.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                DOB: {formatDate(patient.dateOfBirth)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Gender: {patient.gender}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            {patient.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{patient.phone}</span>
              </div>
            )}
            {patient.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{patient.email}</span>
              </div>
            )}
            {patient.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{patient.address}</span>
              </div>
            )}
          </div>

          {/* Medical Information */}
          <div className="space-y-3">
            {patient.medicalHistory?.conditions && patient.medicalHistory.conditions.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  Medical Conditions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalHistory.conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {patient.medications && patient.medications.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Pill className="h-4 w-4 text-gray-500" />
                  Current Medications
                </h3>
                <div className="space-y-2">
                  {patient.medications.map((medication, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{medication.name}</span> -{" "}
                      {medication.dosage}, {medication.frequency}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button
            onClick={viewFullProfile}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            View Full Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDialog; 