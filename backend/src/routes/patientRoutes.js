const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');

// Routes for doctor pages with patient filtering
router.get('/doctor/visit-prep', auth, patientController.getPatientsForVisitPrep);
router.get('/doctor/differential', auth, patientController.getPatientsForDifferential);
router.get('/doctor/lifestyle', auth, patientController.getPatientsForLifestyle);
router.get('/doctor/wellness-alerts', auth, patientController.getPatientsForWellnessAlerts);
router.get('/doctor/visit-compare', auth, patientController.getPatientsForVisitCompare);

module.exports = router; 