import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays, startOfDay, endOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createAppointment, getAvailableTimeSlots } from '@/lib/services/appointment-service';
import { Appointment } from '@/lib/types/appointment';

const appointmentSchema = z.object({
  date: z.date({
    required_error: 'Please select a date',
  }),
  time: z.string({
    required_error: 'Please select a time',
  }),
  type: z.enum(['checkup', 'follow-up', 'consultation', 'emergency'], {
    required_error: 'Please select an appointment type',
  }),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  doctorId: string;
  onSuccess?: () => void;
  onCancel: () => void;
}

export function AppointmentForm({ doctorId, onSuccess, onCancel }: AppointmentFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      notes: '',
    },
  });

  const selectedDate = form.watch('date');

  useEffect(() => {
    if (selectedDate) {
      const fetchTimeSlots = async () => {
        try {
          const slots = await getAvailableTimeSlots(doctorId, selectedDate);
          setAvailableSlots(slots);
        } catch (error) {
          console.error('Error fetching time slots:', error);
          toast({
            title: 'Error',
            description: 'Failed to fetch available time slots',
            variant: 'destructive',
          });
        }
      };

      fetchTimeSlots();
    }
  }, [selectedDate, doctorId, toast]);

  const onSubmit = async (data: AppointmentFormData) => {
    if (!user) return;

    try {
      setLoading(true);
      await createAppointment({
        patientId: user.id,
        doctorId,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        type: data.type,
        notes: data.notes,
      });

      toast({
        title: 'Success',
        description: 'Appointment scheduled successfully',
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to schedule appointment',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  const today = startOfDay(new Date());
                  const maxDate = endOfDay(addDays(today, 30));
                  return date < today || date > maxDate;
                }}
                className="rounded-md border"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedDate || availableSlots.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {format(new Date(`2000-01-01T${slot}`), 'h:mm a')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="checkup">Checkup</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes or concerns"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Scheduling...' : 'Schedule Appointment'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
