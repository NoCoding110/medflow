const { Vital, Patient } = require('../models');
const { Op } = require('sequelize');

const vitalsController = {
  // Create new vitals entry
  async createVitals(req, res) {
    try {
      const data = req.body;
      const vitals = await Vital.create(data);
      res.status(201).json(vitals);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update vitals entry
  async updateVitals(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const [count, [vitals]] = await Vital.update(data, { where: { id }, returning: true });
      if (!vitals) return res.status(404).json({ error: 'Not found' });
      res.json(vitals);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get vitals data (with filters)
  async getVitals(req, res) {
    try {
      const { patientId, startDate, endDate, type, minValue, maxValue } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (type) where.type = type;
      if (startDate && endDate) where.recordedAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      if (minValue) where.value = { ...where.value, [Op.gte]: Number(minValue) };
      if (maxValue) where.value = { ...where.value, [Op.lte]: Number(maxValue) };
      const data = await Vital.findAll({ where, order: [['recordedAt', 'DESC']] });
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Analytics endpoint
  async getVitalsAnalytics(req, res) {
    try {
      const { patientId, startDate, endDate, type } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (type) where.type = type;
      if (startDate && endDate) where.recordedAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      const data = await Vital.findAll({ where });
      // Example analytics: averages, trends, outliers
      const avg = data.length ? data.reduce((a, b) => a + (b.value || 0), 0) / data.length : 0;
      const min = data.length ? Math.min(...data.map(v => v.value)) : null;
      const max = data.length ? Math.max(...data.map(v => v.value)) : null;
      res.json({ avg, min, max, count: data.length });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // AI Insights endpoint
  async getVitalsAIInsights(req, res) {
    try {
      const { patientId, type } = req.query;
      const where = { patientId };
      if (type) where.type = type;
      const data = await Vital.findAll({ where, order: [['recordedAt', 'DESC']], limit: 10 });
      // Simple AI logic: suggest tips based on recent data
      let tips = [];
      if (data.length) {
        const last = data[0];
        if (last.type === 'spO2' && last.value < 92) tips.push('Low SpO2 detected. Consider respiratory assessment.');
        if (last.type === 'heartRate' && (last.value < 50 || last.value > 110)) tips.push('Abnormal heart rate. Monitor for arrhythmia.');
        if (last.type === 'temperature' && last.value > 37.5) tips.push('Fever detected. Check for infection.');
        if (last.type === 'bloodGlucose' && last.value > 180) tips.push('High blood glucose. Review diabetes management.');
      }
      res.json({ tips, recent: data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Alerts endpoint
  async getVitalsAlerts(req, res) {
    try {
      const { patientId, startDate, endDate } = req.query;
      const where = { status: { [Op.in]: ['warning', 'critical'] } };
      if (patientId) where.patientId = patientId;
      if (startDate && endDate) where.recordedAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      const data = await Vital.findAll({ where, order: [['recordedAt', 'DESC']] });
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = vitalsController; 