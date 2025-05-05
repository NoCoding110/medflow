const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, nutritionController.createNutrition);
router.put('/:id', auth, nutritionController.updateNutrition);
router.get('/', auth, nutritionController.getNutrition);

// Analytics
router.get('/analytics', auth, nutritionController.getNutritionAnalytics);

// AI Insights
router.get('/insights/ai', auth, nutritionController.getNutritionAIInsights);

// Alerts
router.get('/alerts', auth, nutritionController.getNutritionAlerts);

module.exports = router; 