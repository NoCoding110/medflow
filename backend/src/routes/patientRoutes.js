const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');

// Common patient routes
router.get('/', auth, patientController.getFilteredPatients);
router.get('/:id', auth, patientController.getPatientById);
router.post('/', auth, patientController.createPatient);
router.put('/:id', auth, patientController.updatePatient);
router.delete('/:id', auth, patientController.deletePatient);

// Doctor-specific pages
router.get('/doctor/wellness-dashboard', auth, patientController.getPatientsForWellnessDashboard);
router.get('/doctor/vitals', auth, patientController.getPatientsForVitals);
router.get('/doctor/fitness', auth, patientController.getPatientsForFitness);
router.get('/doctor/nutrition', auth, patientController.getPatientsForNutrition);
router.get('/doctor/symptoms', auth, patientController.getPatientsForSymptoms);
router.get('/doctor/visit-prep', auth, patientController.getPatientsForVisitPrep);
router.get('/doctor/differential', auth, patientController.getPatientsForDifferential);
router.get('/doctor/lifestyle', auth, patientController.getPatientsForLifestyle);
router.get('/doctor/wellness-alerts', auth, patientController.getPatientsForWellnessAlerts);
router.get('/doctor/visit-compare', auth, patientController.getPatientsForVisitCompare);
router.get('/doctor/medication-adherence', auth, patientController.getPatientsForMedicationAdherence);
router.get('/doctor/mental-health', auth, patientController.getPatientsForMentalHealth);
router.get('/doctor/preventive-care', auth, patientController.getPatientsForPreventiveCare);
router.get('/doctor/goals', auth, patientController.getPatientsForGoals);

module.exports = router; 