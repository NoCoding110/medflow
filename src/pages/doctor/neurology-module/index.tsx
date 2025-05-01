import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NeurologyDashboard from './NeurologyDashboard';
import ImagingAnalysis from './ImagingAnalysis';
import CognitiveAssessment from './CognitiveAssessment';
import TreatmentMonitoring from './TreatmentMonitoring';

const NeurologyModule = () => {
  return (
    <Routes>
      <Route path="/" element={<NeurologyDashboard />}>
        <Route path="imaging" element={<ImagingAnalysis />} />
        <Route path="cognitive" element={<CognitiveAssessment />} />
        <Route path="treatment" element={<TreatmentMonitoring />} />
      </Route>
    </Routes>
  );
};

export default NeurologyModule; 