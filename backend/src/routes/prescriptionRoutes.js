const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { body, query } = require('express-validator');
const auth = require('../middleware/auth');

// Validation middleware
const prescriptionValidation = [
  body('patientId').isInt().withMessage('Valid patient ID is required'),
  body('medication').notEmpty().withMessage('Medication name is required'),
  body('dosage').notEmpty().withMessage('Dosage is required'),
  body('frequency').notEmpty().withMessage('Frequency is required'),
  body('duration').isInt().withMessage('Duration must be a number'),
  body('quantity').isInt().withMessage('Quantity must be a number'),
  body('refills').isInt().withMessage('Refills must be a number'),
  body('pharmacy').isObject().withMessage('Pharmacy information is required'),
  body('instructions').optional().isString()
];

const pharmacySearchValidation = [
  query('latitude').isFloat().withMessage('Valid latitude is required'),
  query('longitude').isFloat().withMessage('Valid longitude is required'),
  query('radius').optional().isInt().withMessage('Radius must be a number')
];

// Routes
router.post('/', auth, prescriptionValidation, prescriptionController.create);
router.get('/patient/:patientId', auth, prescriptionController.getPatientPrescriptions);
router.get('/:id', auth, prescriptionController.getPrescription);
router.post('/:id/cancel', auth, prescriptionController.cancelPrescription);
router.post('/check-interactions', auth, prescriptionController.checkInteractions);
router.get('/pharmacies/search', auth, pharmacySearchValidation, prescriptionController.findPharmacies);

// Analytics
router.get('/analytics/summary', auth, prescriptionController.getPrescriptionAnalytics);

// AI Insights
router.get('/insights/ai', auth, prescriptionController.getPrescriptionInsights);

// Alerts
router.get('/alerts', auth, prescriptionController.getPrescriptionAlerts);

module.exports = router; 