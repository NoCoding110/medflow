import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '@/lib/auth';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    email: user?.email || '',
    notifications: {
      appointments: true,
      messages: true,
      reminders: true,
      updates: false
    },
    preferences: {
      darkMode: false,
      language: 'en',
      timezone: 'UTC'
    }
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // TODO: Implement settings update logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Settings updated successfully');
    } catch (err) {
      setError('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Settings
              </Typography>
              <TextField
                fullWidth
                label="Email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.appointments}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        appointments: e.target.checked
                      }
                    })}
                  />
                }
                label="Appointment Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.messages}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        messages: e.target.checked
                      }
                    })}
                  />
                }
                label="Message Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.reminders}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        reminders: e.target.checked
                      }
                    })}
                  />
                }
                label="Reminder Notifications"
              />
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Display Preferences
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.preferences.darkMode}
                    onChange={(e) => setSettings({
                      ...settings,
                      preferences: {
                        ...settings.preferences,
                        darkMode: e.target.checked
                      }
                    })}
                  />
                }
                label="Dark Mode"
              />
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Settings; 