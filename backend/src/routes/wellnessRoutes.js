const express = require('express');
const router = express.Router();
const wellnessController = require('../controllers/wellnessController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, wellnessController.createWellness);
router.put('/:id', auth, wellnessController.updateWellness);
router.get('/', auth, wellnessController.getWellness);

// Analytics
router.get('/analytics', auth, wellnessController.getWellnessAnalytics);

// AI Insights
router.get('/ai-insights', auth, wellnessController.getWellnessAIInsights);

// Alerts
router.get('/alerts', auth, wellnessController.getWellnessAlerts);

module.exports = router; 