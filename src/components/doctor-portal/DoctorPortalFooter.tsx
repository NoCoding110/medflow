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

const DoctorPortalFooter: React.FC = () => {
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
              MedFlow
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Empowering healthcare professionals with modern solutions for better patient care.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/doctor/help')}
              sx={{ display: 'block', mb: 1 }}
            >
              Help Center
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/doctor/privacy')}
              sx={{ display: 'block', mb: 1 }}
            >
              Privacy Policy
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/doctor/terms')}
              sx={{ display: 'block', mb: 1 }}
            >
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@medflow.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (555) 123-4567
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hours: Mon-Fri 9:00 AM - 5:00 PM EST
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

export default DoctorPortalFooter; 