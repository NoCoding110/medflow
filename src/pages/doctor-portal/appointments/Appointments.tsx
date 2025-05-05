import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip, IconButton, Menu, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import { MoreVert as MoreVertIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { supabase } from '../../../lib/supabaseClient';
import { format } from 'date-fns';
import type { GridProps } from '@mui/material';

interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  specialization: string;
}

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
}

interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  doctor?: Doctor;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, dateFilter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('patient_appointments')
        .select(`
          *,
          patient:patients(id, first_name, last_name),
          doctor:doctors(id, first_name, last_name, specialization)
        `)
        .order('appointment_date', { ascending: true });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (dateFilter === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        query = query.gte('appointment_date', today.toISOString())
                    .lt('appointment_date', tomorrow.toISOString());
      } else if (dateFilter === 'week') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        query = query.gte('appointment_date', today.toISOString())
                    .lt('appointment_date', nextWeek.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, appointment: Appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedAppointment) return;

    try {
      const { error } = await supabase
        .from('patient_appointments')
        .update({ status: newStatus })
        .eq('id', selectedAppointment.id);

      if (error) throw error;
      fetchAppointments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      handleMenuClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Appointments
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="scheduled">Scheduled</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Date</InputLabel>
          <Select
            value={dateFilter}
            label="Date"
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} md={6} lg={4} key={appointment.id} component="div">
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="div">
                      {appointment.patient?.first_name} {appointment.patient?.last_name}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      with Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {appointment.doctor?.specialization}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, appointment)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {format(new Date(appointment.appointment_date), 'PPp')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {appointment.appointment_type}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    size="small"
                  />
                  {appointment.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                      {appointment.notes}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange('scheduled')}>Mark as Scheduled</MenuItem>
        <MenuItem onClick={() => handleStatusChange('completed')}>Mark as Completed</MenuItem>
        <MenuItem onClick={() => handleStatusChange('cancelled')}>Mark as Cancelled</MenuItem>
      </Menu>
    </Box>
  );
};

export default Appointments; 