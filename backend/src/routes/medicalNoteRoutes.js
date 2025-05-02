const express = require('express');
const router = express.Router();
const medicalNoteController = require('../controllers/medicalNoteController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, medicalNoteController.createNote);
router.get('/', auth, medicalNoteController.getNotes);
router.get('/:id', auth, medicalNoteController.getNote);
router.put('/:id', auth, medicalNoteController.updateNote);
router.delete('/:id', auth, medicalNoteController.deleteNote);

// Analytics
router.get('/analytics/summary', auth, medicalNoteController.getNoteAnalytics);

// AI Insights
router.get('/insights/ai', auth, medicalNoteController.getNoteInsights);

// Alerts
router.get('/alerts', auth, medicalNoteController.getNoteAlerts);

module.exports = router; 