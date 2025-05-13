import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Tooltip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  VideoCall as VideoCallIcon,
  Assignment as AssignmentIcon,
  Folder as FolderIcon,
  Science as ScienceIcon,
  Receipt as ReceiptIcon,
  LocalPharmacy as PharmacyIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const DoctorPortalSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/doctor/dashboard' },
    { text: 'Patients', icon: <PeopleIcon />, path: '/doctor/patients' },
    { text: 'Appointments', icon: <EventIcon />, path: '/doctor/appointments' },
    { text: 'Telehealth', icon: <VideoCallIcon />, path: '/doctor/telehealth' },
    { text: 'Clinical Notes', icon: <AssignmentIcon />, path: '/doctor/notes' },
    { text: 'Medical Records', icon: <FolderIcon />, path: '/doctor/records' },
    { text: 'Lab Results', icon: <ScienceIcon />, path: '/doctor/lab' },
    { text: 'Billing', icon: <ReceiptIcon />, path: '/doctor/billing' },
    { text: 'Prescriptions', icon: <PharmacyIcon />, path: '/doctor/prescriptions' },
    { text: 'Reminders', icon: <NotificationsIcon />, path: '/doctor/reminders' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/doctor/settings' }
  ];

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        position: 'fixed',
        left: 0,
        top: 0
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Doctor Portal
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Tooltip key={item.text} title={item.text} placement="right">
            <ListItem
              button
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light'
                  }
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default DoctorPortalSidebar; 