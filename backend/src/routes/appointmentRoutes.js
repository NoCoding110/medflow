const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, appointmentController.createAppointment);
router.get('/', auth, appointmentController.getAppointments);
router.get('/:id', auth, appointmentController.getAppointment);
router.put('/:id', auth, appointmentController.updateAppointment);
router.delete('/:id', auth, appointmentController.deleteAppointment);

// Analytics
router.get('/analytics/summary', auth, appointmentController.getAppointmentAnalytics);

// AI Insights
router.get('/insights/ai', auth, appointmentController.getAppointmentInsights);

// Alerts
router.get('/alerts', auth, appointmentController.getAppointmentAlerts);

module.exports = router; 