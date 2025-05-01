import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PatientForm from "./PatientForm";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { createPatient } from "@/lib/services/patient-service";
import { Patient } from "@/lib/types/patient";

interface NewPatientDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (patient: Patient) => void;
}

const NewPatientDialog = ({ open, onClose, onSubmit }: NewPatientDialogProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (patientData: any) => {
    try {
      const newPatient = await createPatient(patientData);
      toast({
        title: "Success",
        description: "Patient added successfully",
      });
      if (onSubmit) {
        onSubmit(newPatient);
      }
      onClose();
      navigate(`/patients/${newPatient.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add patient",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's information below
          </DialogDescription>
        </DialogHeader>
        <PatientForm onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default NewPatientDialog; 