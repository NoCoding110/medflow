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

const PatientPortalFooter: React.FC = () => {
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
              Your trusted partner in healthcare management and wellness.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/patient/help')}
              sx={{ display: 'block', mb: 1 }}
            >
              Help Center
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/patient/faq')}
              sx={{ display: 'block', mb: 1 }}
            >
              FAQs
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/patient/privacy')}
              sx={{ display: 'block', mb: 1 }}
            >
              Privacy Policy
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/patient/terms')}
              sx={{ display: 'block', mb: 1 }}
            >
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: patient-support@medflow.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: (555) 987-6543
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hours: 24/7 Patient Support
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

export default PatientPortalFooter; 