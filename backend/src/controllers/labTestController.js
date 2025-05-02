const { LabTest, Patient, User } = require('../models');
const { Op } = require('sequelize');

const labTestController = {
  // Create a new lab test
  async createTest(req, res) {
    try {
      const test = await LabTest.create(req.body);
      res.status(201).json(test);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all tests with filters
  async getTests(req, res) {
    try {
      const {
        patientId,
        doctorId,
        testType,
        category,
        status,
        startDate,
        endDate
      } = req.query;

      const where = {};
      if (patientId) where.patientId = patientId;
      if (doctorId) where.doctorId = doctorId;
      if (testType) where.testType = testType;
      if (category) where.category = category;
      if (status) where.status = status;
      if (startDate && endDate) {
        where.specimenCollectionDate = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const tests = await LabTest.findAll({
        where,
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] },
          { model: User, as: 'doctor', attributes: ['firstName', 'lastName', 'specialization'] }
        ],
        order: [['specimenCollectionDate', 'DESC']]
      });

      res.json(tests);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get test by ID
  async getTest(req, res) {
    try {
      const test = await LabTest.findByPk(req.params.id, {
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] },
          { model: User, as: 'doctor', attributes: ['firstName', 'lastName', 'specialization'] }
        ]
      });
      if (!test) {
        return res.status(404).json({ error: 'Test not found' });
      }
      res.json(test);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update test
  async updateTest(req, res) {
    try {
      const [updated] = await LabTest.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) {
        return res.status(404).json({ error: 'Test not found' });
      }
      const test = await LabTest.findByPk(req.params.id);
      res.json(test);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete test
  async deleteTest(req, res) {
    try {
      const deleted = await LabTest.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Test not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get test analytics
  async getTestAnalytics(req, res) {
    try {
      const { patientId, doctorId, startDate, endDate } = req.query;
      
      const where = {};
      if (patientId) where.patientId = patientId;
      if (doctorId) where.doctorId = doctorId;
      if (startDate && endDate) {
        where.specimenCollectionDate = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const tests = await LabTest.findAll({ where });

      const analytics = {
        totalTests: tests.length,
        byCategory: tests.reduce((acc, test) => {
          acc[test.category] = (acc[test.category] || 0) + 1;
          return acc;
        }, {}),
        byStatus: tests.reduce((acc, test) => {
          acc[test.status] = (acc[test.status] || 0) + 1;
          return acc;
        }, {}),
        byPriority: tests.reduce((acc, test) => {
          acc[test.priority] = (acc[test.priority] || 0) + 1;
          return acc;
        }, {}),
        abnormalResults: tests.filter(test => test.isAbnormal()).length,
        averageTurnaroundTime: tests.reduce((acc, test) => {
          if (test.specimenCollectionDate && test.testPerformedDate) {
            return acc + (test.testPerformedDate - test.specimenCollectionDate) / (1000 * 60 * 60);
          }
          return acc;
        }, 0) / tests.length
      };

      res.json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get AI insights for tests
  async getTestInsights(req, res) {
    try {
      const { patientId } = req.query;
      
      const tests = await LabTest.findAll({
        where: { patientId },
        order: [['specimenCollectionDate', 'DESC']],
        limit: 10
      });

      const insights = {
        patterns: {
          abnormalResults: tests.filter(test => test.isAbnormal()).length,
          criticalResults: tests.reduce((acc, test) => {
            return acc + test.getCriticalResults().length;
          }, 0),
          averageTurnaroundTime: tests.reduce((acc, test) => {
            if (test.specimenCollectionDate && test.testPerformedDate) {
              return acc + (test.testPerformedDate - test.specimenCollectionDate) / (1000 * 60 * 60);
            }
            return acc;
          }, 0) / tests.length
        },
        trends: await Promise.all(tests.map(test => test.getTrend())),
        recommendations: []
      };

      // Generate AI-driven recommendations
      if (insights.patterns.abnormalResults > 3) {
        insights.recommendations.push({
          type: 'abnormal_results',
          message: 'Multiple abnormal results detected. Consider comprehensive review.',
          priority: 'high'
        });
      }

      if (insights.patterns.criticalResults > 0) {
        insights.recommendations.push({
          type: 'critical_results',
          message: 'Critical results detected. Immediate attention required.',
          priority: 'high'
        });
      }

      // Analyze trends
      const trends = insights.trends;
      if (trends.length > 0) {
        const significantChanges = trends.filter(trend => {
          const current = trend.current;
          const previous = trend.previous[0]?.results;
          if (!current || !previous) return false;
          
          return Object.entries(current).some(([key, value]) => {
            const prevValue = previous[key];
            if (!prevValue) return false;
            
            const change = Math.abs((value - prevValue) / prevValue) * 100;
            return change > 20; // 20% change threshold
          });
        });

        if (significantChanges.length > 0) {
          insights.recommendations.push({
            type: 'significant_changes',
            message: 'Significant changes in test results detected. Review trends.',
            priority: 'medium'
          });
        }
      }

      res.json(insights);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = labTestController; 