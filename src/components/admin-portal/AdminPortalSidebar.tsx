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
  Business as BusinessIcon,
  Notifications as NotificationsIcon,
  Receipt as ReceiptIcon,
  Science as ScienceIcon,
  LocalShipping as TransportIcon,
  Settings as SettingsIcon,
  AutoGraph as AnalyticsIcon,
  SmartToy as AIFeaturesIcon
} from '@mui/icons-material';

const AdminPortalSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Clinic Settings', icon: <BusinessIcon />, path: '/admin/clinic-settings' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/admin/notifications' },
    { text: 'Billing Management', icon: <ReceiptIcon />, path: '/admin/billing' },
    { text: 'Pharmacy & Lab', icon: <ScienceIcon />, path: '/admin/pharmacy-lab' },
    { text: 'Transportation', icon: <TransportIcon />, path: '/admin/transportation' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin/analytics' },
    { text: 'AI Features', icon: <AIFeaturesIcon />, path: '/admin/ai-features' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' }
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
          Admin Portal
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

export default AdminPortalSidebar; 