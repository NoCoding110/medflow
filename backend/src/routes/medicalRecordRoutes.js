const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecordController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, medicalRecordController.createRecord);
router.get('/', auth, medicalRecordController.getRecords);
router.get('/:id', auth, medicalRecordController.getRecord);
router.put('/:id', auth, medicalRecordController.updateRecord);
router.delete('/:id', auth, medicalRecordController.deleteRecord);

// Analytics
router.get('/analytics/summary', auth, medicalRecordController.getRecordAnalytics);

// AI Insights
router.get('/insights/ai', auth, medicalRecordController.getRecordInsights);

// Alerts
router.get('/alerts', auth, medicalRecordController.getRecordAlerts);

module.exports = router; 