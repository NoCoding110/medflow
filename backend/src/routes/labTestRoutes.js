const express = require('express');
const router = express.Router();
const labTestController = require('../controllers/labTestController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, labTestController.createTest);
router.get('/', auth, labTestController.getTests);
router.get('/:id', auth, labTestController.getTest);
router.put('/:id', auth, labTestController.updateTest);
router.delete('/:id', auth, labTestController.deleteTest);

// Analytics
router.get('/analytics/summary', auth, labTestController.getTestAnalytics);

// AI Insights
router.get('/insights/ai', auth, labTestController.getTestInsights);

module.exports = router; 