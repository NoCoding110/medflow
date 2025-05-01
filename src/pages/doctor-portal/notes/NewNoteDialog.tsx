import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const noteSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  type: z.enum(["Progress", "Initial", "Follow-up", "Lab", "Radiology", "Other"]),
  patientId: z.string().min(1, "Patient ID is required"),
  patientName: z.string().min(1, "Patient name is required"),
  subjective: z.string().min(10, "Subjective section must be at least 10 characters"),
  objective: z.string().min(10, "Objective section must be at least 10 characters"),
  assessment: z.string().min(10, "Assessment section must be at least 10 characters"),
  plan: z.string().min(10, "Plan section must be at least 10 characters"),
  tags: z.array(z.string()).optional(),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NewNoteDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NoteFormData) => Promise<void>;
  patients: Array<{ id: string; name: string }>;
}

const NewNoteDialog = ({ open, onClose, onSubmit, patients }: NewNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      type: "Progress",
      tags: [],
    },
  });

  const selectedPatientId = watch("patientId");

  React.useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(p => p.id === selectedPatientId);
      if (patient) {
        setValue("patientName", patient.name);
      }
    }
  }, [selectedPatientId, patients, setValue]);

  const handleFormSubmit = async (data: NoteFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
      toast.success("Note created successfully");
    } catch (error) {
      toast.error("Failed to create note");
      console.error("Error creating note:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">New Clinical Note</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Note Type</Label>
              <select
                id="type"
                {...register("type")}
                className={`w-full h-10 px-3 rounded-md border ${
                  errors.type ? "border-red-500" : "border-input"
                } bg-background`}
              >
                <option value="Progress">Progress Note</option>
                <option value="Initial">Initial Assessment</option>
                <option value="Follow-up">Follow-up Note</option>
                <option value="Lab">Lab Review</option>
                <option value="Radiology">Radiology Review</option>
                <option value="Other">Other</option>
              </select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientId">Patient</Label>
            <select
              id="patientId"
              {...register("patientId")}
              className={`w-full h-10 px-3 rounded-md border ${
                errors.patientId ? "border-red-500" : "border-input"
              } bg-background`}
            >
              <option value="">Select patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (ID: {patient.id})
                </option>
              ))}
            </select>
            {errors.patientId && (
              <p className="text-sm text-red-500">{errors.patientId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjective">Subjective</Label>
            <Textarea
              id="subjective"
              {...register("subjective")}
              className={`min-h-[100px] ${errors.subjective ? "border-red-500" : ""}`}
              placeholder="Patient's reported symptoms, concerns, and history..."
            />
            {errors.subjective && (
              <p className="text-sm text-red-500">{errors.subjective.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective">Objective</Label>
            <Textarea
              id="objective"
              {...register("objective")}
              className={`min-h-[100px] ${errors.objective ? "border-red-500" : ""}`}
              placeholder="Physical examination findings, vital signs, test results..."
            />
            {errors.objective && (
              <p className="text-sm text-red-500">{errors.objective.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="assessment">Assessment</Label>
            <Textarea
              id="assessment"
              {...register("assessment")}
              className={`min-h-[100px] ${errors.assessment ? "border-red-500" : ""}`}
              placeholder="Diagnosis, clinical impressions, and differential diagnoses..."
            />
            {errors.assessment && (
              <p className="text-sm text-red-500">{errors.assessment.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan">Plan</Label>
            <Textarea
              id="plan"
              {...register("plan")}
              className={`min-h-[100px] ${errors.plan ? "border-red-500" : ""}`}
              placeholder="Treatment plan, medications, follow-up instructions..."
            />
            {errors.plan && (
              <p className="text-sm text-red-500">{errors.plan.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewNoteDialog; 