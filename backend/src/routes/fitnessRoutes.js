const express = require('express');
const router = express.Router();
const fitnessController = require('../controllers/fitnessController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, fitnessController.createFitness);
router.put('/:id', auth, fitnessController.updateFitness);
router.get('/', auth, fitnessController.getFitness);

// Analytics
router.get('/analytics', auth, fitnessController.getFitnessAnalytics);

// AI Insights
router.get('/insights/ai', auth, fitnessController.getFitnessAIInsights);

// Alerts
router.get('/alerts', auth, fitnessController.getFitnessAlerts);

module.exports = router; 