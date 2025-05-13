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
  Event as EventIcon,
  VideoCall as VideoCallIcon,
  Folder as FolderIcon,
  LocalPharmacy as PharmacyIcon,
  Receipt as ReceiptIcon,
  Message as MessageIcon,
  People as PeopleIcon,
  EmojiEvents as LeaderboardIcon,
  Flag as ChallengesIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const PatientPortalSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/patient/dashboard' },
    { text: 'Appointments', icon: <EventIcon />, path: '/patient/appointments' },
    { text: 'Telehealth', icon: <VideoCallIcon />, path: '/patient/telehealth' },
    { text: 'Medical Records', icon: <FolderIcon />, path: '/patient/records' },
    { text: 'Prescriptions', icon: <PharmacyIcon />, path: '/patient/prescriptions' },
    { text: 'Billing', icon: <ReceiptIcon />, path: '/patient/billing' },
    { text: 'Messages', icon: <MessageIcon />, path: '/patient/messages' },
    { text: 'Family', icon: <PeopleIcon />, path: '/patient/family' },
    { text: 'Leaderboard', icon: <LeaderboardIcon />, path: '/patient/leaderboard' },
    { text: 'Challenges', icon: <ChallengesIcon />, path: '/patient/challenges' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/patient/settings' }
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
          Patient Portal
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

export default PatientPortalSidebar; 