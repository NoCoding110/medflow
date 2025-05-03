const { Wellness, Patient } = require('../models');
const { Op } = require('sequelize');

const wellnessController = {
  // Create new wellness entry
  async createWellness(req, res) {
    try {
      const data = req.body;
      const wellness = await Wellness.create(data);
      res.status(201).json(wellness);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update wellness entry
  async updateWellness(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const [count, [wellness]] = await Wellness.update(data, { where: { id }, returning: true });
      if (!wellness) return res.status(404).json({ error: 'Not found' });
      res.json(wellness);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get wellness data (with filters)
  async getWellness(req, res) {
    try {
      const { patientId, startDate, endDate, minSleep, maxSleep, minStress, maxStress } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (startDate && endDate) where.recordedAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      if (minSleep) where.sleepDuration = { ...where.sleepDuration, [Op.gte]: Number(minSleep) };
      if (maxSleep) where.sleepDuration = { ...where.sleepDuration, [Op.lte]: Number(maxSleep) };
      if (minStress) where.stressLevel = { ...where.stressLevel, [Op.gte]: Number(minStress) };
      if (maxStress) where.stressLevel = { ...where.stressLevel, [Op.lte]: Number(maxStress) };
      const data = await Wellness.findAll({ where, order: [['recordedAt', 'DESC']] });
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Analytics endpoint
  async getWellnessAnalytics(req, res) {
    try {
      const { patientId, startDate, endDate } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (startDate && endDate) where.recordedAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      const data = await Wellness.findAll({ where });
      // Example analytics: averages, trends, outliers
      const avgSleep = data.length ? data.reduce((a, b) => a + (b.sleepDuration || 0), 0) / data.length : 0;
      const avgStress = data.length ? data.reduce((a, b) => a + (b.stressLevel || 0), 0) / data.length : 0;
      res.json({ avgSleep, avgStress, count: data.length });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // AI Insights endpoint
  async getWellnessAIInsights(req, res) {
    try {
      const { patientId } = req.query;
      const data = await Wellness.findAll({ where: { patientId }, order: [['recordedAt', 'DESC']], limit: 10 });
      // Simple AI logic: suggest tips based on recent data
      let tips = [];
      if (data.length) {
        const last = data[0];
        if (last.stressLevel > 7) tips.push('High stress detected. Recommend relaxation techniques.');
        if (last.sleepDuration < 6) tips.push('Low sleep duration. Suggest improving sleep hygiene.');
        if (last.activityMinutes < 30) tips.push('Low activity. Encourage more physical activity.');
        if (last.waterIntake < 1000) tips.push('Hydration is low. Remind to drink more water.');
      }
      res.json({ tips, recent: data });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Alerts endpoint
  async getWellnessAlerts(req, res) {
    try {
      const { patientId, startDate, endDate } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (startDate && endDate) where.recordedAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      const data = await Wellness.findAll({ where, order: [['recordedAt', 'DESC']], limit: 30 });
      const alerts = [];
      for (const entry of data) {
        if (entry.stressLevel > 8) alerts.push({
          type: 'stress',
          severity: 'high',
          title: 'Critical Stress Level',
          description: `Stress level ${entry.stressLevel} recorded on ${entry.recordedAt.toLocaleDateString()}`,
          timestamp: entry.recordedAt,
        });
        if (entry.sleepDuration < 5) alerts.push({
          type: 'sleep',
          severity: 'high',
          title: 'Severely Low Sleep',
          description: `Only ${entry.sleepDuration} hours of sleep on ${entry.recordedAt.toLocaleDateString()}`,
          timestamp: entry.recordedAt,
        });
        if (entry.activityMinutes < 15) alerts.push({
          type: 'activity',
          severity: 'medium',
          title: 'Low Activity',
          description: `Only ${entry.activityMinutes} minutes of activity on ${entry.recordedAt.toLocaleDateString()}`,
          timestamp: entry.recordedAt,
        });
        if (entry.waterIntake < 800) alerts.push({
          type: 'hydration',
          severity: 'medium',
          title: 'Low Hydration',
          description: `Only ${entry.waterIntake}ml water intake on ${entry.recordedAt.toLocaleDateString()}`,
          timestamp: entry.recordedAt,
        });
      }
      res.json(alerts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = wellnessController; 