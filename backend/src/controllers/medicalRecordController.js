const { MedicalRecord, Patient } = require('../models');
const { Op } = require('sequelize');

const medicalRecordController = {
  // Create a new medical record
  async createRecord(req, res) {
    try {
      const record = await MedicalRecord.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all records with filters
  async getRecords(req, res) {
    try {
      const {
        patientId,
        status,
        startDate,
        endDate
      } = req.query;

      const where = {};
      if (patientId) where.patientId = patientId;
      if (status) where.status = status;
      if (startDate && endDate) {
        where.lastUpdated = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const records = await MedicalRecord.findAll({
        where,
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] }
        ],
        order: [['lastUpdated', 'DESC']]
      });

      res.json(records);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get record by ID
  async getRecord(req, res) {
    try {
      const record = await MedicalRecord.findByPk(req.params.id, {
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] }
        ]
      });
      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update record
  async updateRecord(req, res) {
    try {
      const [updated] = await MedicalRecord.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) {
        return res.status(404).json({ error: 'Record not found' });
      }
      const record = await MedicalRecord.findByPk(req.params.id);
      res.json(record);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete record
  async deleteRecord(req, res) {
    try {
      const deleted = await MedicalRecord.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get record analytics
  async getRecordAnalytics(req, res) {
    try {
      const { patientId, startDate, endDate } = req.query;
      
      const where = {};
      if (patientId) where.patientId = patientId;
      if (startDate && endDate) {
        where.lastUpdated = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const records = await MedicalRecord.findAll({ where });

      const analytics = {
        totalRecords: records.length,
        byStatus: records.reduce((acc, record) => {
          acc[record.status] = (acc[record.status] || 0) + 1;
          return acc;
        }, {}),
        conditions: records.reduce((acc, record) => {
          record.conditions?.forEach(condition => {
            acc[condition.name] = (acc[condition.name] || 0) + 1;
          });
          return acc;
        }, {}),
        medications: records.reduce((acc, record) => {
          record.medications?.forEach(med => {
            acc[med.name] = (acc[med.name] || 0) + 1;
          });
          return acc;
        }, {}),
        allergies: records.reduce((acc, record) => {
          record.allergies?.forEach(allergy => {
            acc[allergy.name] = (acc[allergy.name] || 0) + 1;
          });
          return acc;
        }, {}),
        averageVitals: records.reduce((acc, record) => {
          const vitals = record.getRecentVitals();
          if (vitals.length > 0) {
            acc.push({
              date: record.lastUpdated,
              vitals: vitals
            });
          }
          return acc;
        }, [])
      };

      res.json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get AI insights for records
  async getRecordInsights(req, res) {
    try {
      const { patientId } = req.query;
      
      const record = await MedicalRecord.findOne({
        where: { patientId }
      });

      if (!record) {
        return res.status(404).json({ error: 'Record not found' });
      }

      const insights = {
        healthSummary: {
          activeConditions: record.getActiveConditions(),
          currentMedications: record.getCurrentMedications(),
          recentVitals: record.getRecentVitals(7)
        },
        riskFactors: {
          smoking: record.smokingStatus,
          alcohol: record.alcoholUse,
          bmi: record.calculateBMI()
        },
        recommendations: []
      };

      // Generate AI-driven recommendations
      if (insights.riskFactors.bmi > 30) {
        insights.recommendations.push({
          type: 'weight_management',
          message: 'High BMI detected. Consider weight management program.',
          priority: 'high'
        });
      }

      if (insights.riskFactors.smoking === 'current') {
        insights.recommendations.push({
          type: 'smoking_cessation',
          message: 'Active smoker detected. Recommend smoking cessation program.',
          priority: 'high'
        });
      }

      // Check for potential drug interactions
      const medications = insights.healthSummary.currentMedications;
      if (medications.length > 5) {
        insights.recommendations.push({
          type: 'polypharmacy',
          message: 'Multiple medications detected. Review for potential interactions.',
          priority: 'medium'
        });
      }

      // Analyze vital trends
      const vitals = insights.healthSummary.recentVitals;
      if (vitals.length > 0) {
        const lastVital = vitals[0];
        if (lastVital.systolicBP > 140 || lastVital.diastolicBP > 90) {
          insights.recommendations.push({
            type: 'hypertension',
            message: 'Elevated blood pressure detected. Consider monitoring and intervention.',
            priority: 'high'
          });
        }
      }

      res.json(insights);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Alerts for records
  async getRecordAlerts(req, res) {
    try {
      const { patientId } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      // Overdue updates (not updated in >1 year)
      const yearAgo = new Date();
      yearAgo.setFullYear(yearAgo.getFullYear() - 1);
      const overdue = await MedicalRecord.findAll({
        where: {
          ...where,
          lastUpdated: { [Op.lt]: yearAgo },
          status: { [Op.ne]: 'archived' }
        }
      });
      // Critical conditions (e.g., flagged as critical)
      const critical = await MedicalRecord.findAll({
        where: {
          ...where,
          conditions: { [Op.contains]: [{ severity: 'critical' }] }
        }
      });
      // Missing data (no vitals or allergies)
      const missing = await MedicalRecord.findAll({
        where: {
          ...where,
          [Op.or]: [
            { vitalSigns: { [Op.eq]: null } },
            { allergies: { [Op.eq]: null } }
          ]
        }
      });
      const alerts = [];
      if (overdue.length > 0) alerts.push({ type: 'overdue', message: `${overdue.length} record(s) not updated in over a year.`, severity: 'warning' });
      if (critical.length > 0) alerts.push({ type: 'critical', message: `${critical.length} record(s) with critical condition(s).`, severity: 'critical' });
      if (missing.length > 0) alerts.push({ type: 'missing', message: `${missing.length} record(s) missing vitals or allergies.`, severity: 'info' });
      res.json({ alerts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = medicalRecordController; 