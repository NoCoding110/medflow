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

const quickNoteSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(10, "Note content must be at least 10 characters"),
  type: z.enum(["Progress", "Initial", "Follow-up", "Lab", "Radiology", "Other"]),
});

type QuickNoteFormData = z.infer<typeof quickNoteSchema>;

interface QuickNoteDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: QuickNoteFormData) => Promise<void>;
}

const QuickNoteDialog = ({ open, onClose, onSubmit }: QuickNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickNoteFormData>({
    resolver: zodResolver(quickNoteSchema),
    defaultValues: {
      type: "Progress",
    },
  });

  const handleFormSubmit = async (data: QuickNoteFormData) => {
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Quick Note</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 py-4">
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

          <div className="space-y-2">
            <Label htmlFor="content">Note Content</Label>
            <Textarea
              id="content"
              {...register("content")}
              className={`min-h-[200px] ${errors.content ? "border-red-500" : ""}`}
              placeholder="Enter your note here..."
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
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

export default QuickNoteDialog; 