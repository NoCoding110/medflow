const express = require('express');
const router = express.Router();
const vitalsController = require('../controllers/vitalsController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, vitalsController.createVitals);
router.put('/:id', auth, vitalsController.updateVitals);
router.get('/', auth, vitalsController.getVitals);

// Analytics
router.get('/analytics', auth, vitalsController.getVitalsAnalytics);

// AI Insights
router.get('/ai-insights', auth, vitalsController.getVitalsAIInsights);

// Alerts
router.get('/alerts', auth, vitalsController.getVitalsAlerts);

module.exports = router; 