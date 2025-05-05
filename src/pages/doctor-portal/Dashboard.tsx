import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';
import { format } from 'date-fns';

interface PatientStats {
  totalPatients: number;
  activePatients: number;
  appointmentsToday: number;
  appointmentsThisWeek: number;
}

interface RecentActivity {
  id: string;
  patient_id: string;
  type: 'appointment' | 'vital' | 'fitness' | 'nutrition';
  description: string;
  created_at: string;
  patient: {
    first_name: string;
    last_name: string;
  };
}

interface AppointmentWithPatient {
  id: string;
  patient_id: string;
  appointment_type: string;
  created_at: string;
  patients: {
    first_name: string;
    last_name: string;
  }[];
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<PatientStats>({
    totalPatients: 0,
    activePatients: 0,
    appointmentsToday: 0,
    appointmentsThisWeek: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch patient statistics
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('id, status');

      if (patientsError) throw patientsError;

      // Fetch today's appointments
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data: todayAppointments, error: todayAppointmentsError } = await supabase
        .from('patient_appointments')
        .select('id')
        .gte('appointment_date', today.toISOString())
        .lt('appointment_date', tomorrow.toISOString());

      if (todayAppointmentsError) throw todayAppointmentsError;

      // Fetch this week's appointments
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const { data: weekAppointments, error: weekAppointmentsError } = await supabase
        .from('patient_appointments')
        .select('id')
        .gte('appointment_date', today.toISOString())
        .lt('appointment_date', nextWeek.toISOString());

      if (weekAppointmentsError) throw weekAppointmentsError;

      // Calculate statistics
      setStats({
        totalPatients: patientsData?.length || 0,
        activePatients: patientsData?.filter(p => p.status === 'active').length || 0,
        appointmentsToday: todayAppointments?.length || 0,
        appointmentsThisWeek: weekAppointments?.length || 0
      });

      // Fetch recent activities with patient data
      const { data: activities, error: activitiesError } = await supabase
        .from('patient_appointments')
        .select(`
          id,
          patient_id,
          appointment_type,
          created_at,
          patients!patient_id (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (activitiesError) throw activitiesError;

      // Transform activities data
      const transformedActivities: RecentActivity[] = ((activities as unknown) as AppointmentWithPatient[]).map(activity => ({
        id: activity.id,
        patient_id: activity.patient_id,
        type: 'appointment',
        description: activity.appointment_type,
        created_at: activity.created_at,
        patient: {
          first_name: activity.patients[0].first_name,
          last_name: activity.patients[0].last_name
        }
      }));

      setRecentActivities(transformedActivities);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Doctor Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total Patients
            </Typography>
            <Typography variant="h4">
              {stats.totalPatients}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Active Patients
            </Typography>
            <Typography variant="h4">
              {stats.activePatients}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Today's Appointments
            </Typography>
            <Typography variant="h4">
              {stats.appointmentsToday}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              This Week's Appointments
            </Typography>
            <Typography variant="h4">
              {stats.appointmentsThisWeek}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Activities */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Recent Activities
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {recentActivities.map((activity) => (
          <Card key={activity.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">
                    {activity.patient.first_name} {activity.patient.last_name}
                  </Typography>
                  <Typography color="text.secondary">
                    {activity.description}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {format(new Date(activity.created_at), 'PPp')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard; 