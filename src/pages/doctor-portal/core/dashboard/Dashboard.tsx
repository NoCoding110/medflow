import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Badge,
  Avatar
} from '@mui/material';
import {
  People as PeopleIcon,
  Event as EventIcon,
  LocalHospital as HospitalIcon,
  Assignment as AssignmentIcon,
  Receipt as ReceiptIcon,
  Science as ScienceIcon,
  VideoCall as VideoCallIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getDoctorAnalytics, getRecentActivity } from '@/lib/services/mockDoctorService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface Analytics {
  totalPatients: number;
  activePatients: number;
  totalAppointments: number;
  upcomingAppointments: number;
  totalPrescriptions: number;
  activePrescriptions: number;
  totalNotes: number;
  pendingLabResults: number;
  totalBilling: number;
  pendingBilling: number;
  patientTrend: { date: string; count: number }[];
  appointmentTrend: { date: string; count: number }[];
}

interface Activity {
  id: string;
  type: 'appointment' | 'prescription' | 'lab' | 'note' | 'billing';
  title: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'warning';
  patientName: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [analyticsData, activitiesData] = await Promise.all([
        getDoctorAnalytics(),
        getRecentActivity()
      ]);
      setAnalytics(analyticsData);
      setActivities(activitiesData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const statCards = [
    {
      title: 'Patients',
      value: analytics?.totalPatients || 0,
      icon: <PeopleIcon />,
      color: '#2196f3',
      tooltip: 'Total number of registered patients',
      onClick: () => navigate('/doctor/patients')
    },
    {
      title: 'Appointments',
      value: analytics?.upcomingAppointments || 0,
      icon: <EventIcon />,
      color: '#4caf50',
      tooltip: 'Upcoming appointments',
      onClick: () => navigate('/doctor/appointments')
    },
    {
      title: 'Prescriptions',
      value: analytics?.activePrescriptions || 0,
      icon: <HospitalIcon />,
      color: '#f44336',
      tooltip: 'Active prescriptions',
      onClick: () => navigate('/doctor/prescriptions')
    },
    {
      title: 'Clinical Notes',
      value: analytics?.totalNotes || 0,
      icon: <AssignmentIcon />,
      color: '#ff9800',
      tooltip: 'Total clinical notes',
      onClick: () => navigate('/doctor/notes')
    },
    {
      title: 'Lab Results',
      value: analytics?.pendingLabResults || 0,
      icon: <ScienceIcon />,
      color: '#9c27b0',
      tooltip: 'Pending lab results',
      onClick: () => navigate('/doctor/lab')
    },
    {
      title: 'Billing',
      value: `$${analytics?.totalBilling.toLocaleString() || 0}`,
      icon: <ReceiptIcon />,
      color: '#795548',
      tooltip: 'Total billing amount',
      onClick: () => navigate('/doctor/billing')
    }
  ];

  const quickActions = [
    {
      title: 'New Appointment',
      icon: <EventIcon />,
      onClick: () => navigate('/doctor/appointments/new'),
      tooltip: 'Schedule a new appointment'
    },
    {
      title: 'Start Telehealth',
      icon: <VideoCallIcon />,
      onClick: () => navigate('/doctor/telehealth'),
      tooltip: 'Start a telehealth session'
    },
    {
      title: 'View Reminders',
      icon: <NotificationsIcon />,
      onClick: () => navigate('/doctor/reminders'),
      tooltip: 'View and manage reminders'
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'appointment':
        return <EventIcon />;
      case 'prescription':
        return <HospitalIcon />;
      case 'lab':
        return <ScienceIcon />;
      case 'note':
        return <AssignmentIcon />;
      case 'billing':
        return <ReceiptIcon />;
    }
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'warning':
        return 'error';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Doctor Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
          <Tooltip title="Refresh Dashboard">
            <IconButton onClick={fetchData}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {statCards.map((card, index) => (
          <Box key={index}>
            <Tooltip title={card.tooltip}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
                onClick={card.onClick}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box
                      sx={{
                        backgroundColor: `${card.color}20`,
                        borderRadius: '50%',
                        p: 1,
                        mr: 2
                      }}
                    >
                      {React.cloneElement(card.icon, { sx: { color: card.color } })}
                    </Box>
                    <Typography variant="h6" component="div">
                      {card.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ color: card.color }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Tooltip>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mt: 2 }}>
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Growth Trend
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics?.patientTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="count" stroke="#2196f3" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {activities.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Badge
                          color={getStatusColor(activity.status)}
                          variant="dot"
                          overlap="circular"
                        >
                          {getActivityIcon(activity.type)}
                        </Badge>
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.title}
                        secondary={`${activity.patientName} • ${new Date(activity.timestamp).toLocaleString()}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Quick Actions
      </Typography>
      <Stack direction="row" spacing={2}>
        {quickActions.map((action, index) => (
          <Tooltip key={index} title={action.tooltip}>
            <Button
              variant="contained"
              startIcon={action.icon}
              onClick={action.onClick}
              sx={{
                minWidth: 200,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {action.title}
            </Button>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default Dashboard; 