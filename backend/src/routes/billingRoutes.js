const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, billingController.createBilling);
router.get('/', auth, billingController.getBillings);
router.get('/:id', auth, billingController.getBilling);
router.put('/:id', auth, billingController.updateBilling);
router.delete('/:id', auth, billingController.deleteBilling);

// Analytics
router.get('/analytics/summary', auth, billingController.getBillingAnalytics);

// AI Insights
router.get('/insights/ai', auth, billingController.getBillingInsights);

// Alerts
router.get('/alerts', auth, billingController.getBillingAlerts);

module.exports = router; 