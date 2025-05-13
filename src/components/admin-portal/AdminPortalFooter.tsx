import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPortalFooter: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              MedFlow Admin
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive healthcare management system for administrators.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/admin/help')}
              sx={{ display: 'block', mb: 1 }}
            >
              Admin Guide
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/admin/system-status')}
              sx={{ display: 'block', mb: 1 }}
            >
              System Status
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/admin/privacy')}
              sx={{ display: 'block', mb: 1 }}
            >
              Privacy Policy
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/admin/terms')}
              sx={{ display: 'block', mb: 1 }}
            >
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Admin Support
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: admin-support@medflow.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (555) 456-7890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hours: Mon-Fri 8:00 AM - 6:00 PM EST
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {currentYear} MedFlow. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default AdminPortalFooter; 