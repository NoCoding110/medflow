import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import SidePanel from './components/SidePanel';
import TopBar from './components/TopBar';

// Import page components
import WellnessDashboard from './pages/WellnessDashboard';
import Vitals from './pages/Vitals';
import Fitness from './pages/Fitness';
import Nutrition from './pages/Nutrition';
import Symptoms from './pages/Symptoms';
import VisitPrep from './pages/VisitPrep';
import Differential from './pages/Differential';
import Lifestyle from './pages/Lifestyle';
import WellnessAlerts from './pages/WellnessAlerts';
import VisitCompare from './pages/VisitCompare';
import MedicationAdherence from './pages/MedicationAdherence';
import MentalHealth from './pages/MentalHealth';
import PreventiveCare from './pages/PreventiveCare';
import Goals from './pages/Goals';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar />
        <SidePanel />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: '240px' },
            mt: '64px'
          }}
        >
          <Routes>
            <Route path="/doctor/wellness-dashboard" element={<WellnessDashboard />} />
            <Route path="/doctor/vitals" element={<Vitals />} />
            <Route path="/doctor/fitness" element={<Fitness />} />
            <Route path="/doctor/nutrition" element={<Nutrition />} />
            <Route path="/doctor/symptoms" element={<Symptoms />} />
            <Route path="/doctor/visit-prep" element={<VisitPrep />} />
            <Route path="/doctor/differential" element={<Differential />} />
            <Route path="/doctor/lifestyle" element={<Lifestyle />} />
            <Route path="/doctor/wellness-alerts" element={<WellnessAlerts />} />
            <Route path="/doctor/visit-compare" element={<VisitCompare />} />
            <Route path="/doctor/medication-adherence" element={<MedicationAdherence />} />
            <Route path="/doctor/mental-health" element={<MentalHealth />} />
            <Route path="/doctor/preventive-care" element={<PreventiveCare />} />
            <Route path="/doctor/goals" element={<Goals />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App; 