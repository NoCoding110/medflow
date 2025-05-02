const { Patient, User, Prescription } = require('../models');
const { Op } = require('sequelize');

const patientController = {
  // Common function to get filtered and sorted patients
  async getFilteredPatients(req, res, additionalFilters = {}) {
    try {
      const {
        search,
        status,
        ageRange,
        lastVisitRange,
        sortBy = 'lastName',
        sortOrder = 'ASC',
        page = 1,
        limit = 10
      } = req.query;

      const doctorId = req.user.id;
      const whereClause = {
        primaryCarePhysician: doctorId,
        ...additionalFilters
      };

      // Search filter
      if (search) {
        whereClause[Op.or] = [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { mrn: { [Op.iLike]: `%${search}%` } }
        ];
      }

      // Status filter
      if (status) {
        whereClause.status = status;
      }

      // Age range filter
      if (ageRange) {
        const [minAge, maxAge] = ageRange.split('-').map(Number);
        const currentDate = new Date();
        const minBirthDate = new Date(currentDate.getFullYear() - maxAge, currentDate.getMonth(), currentDate.getDate());
        const maxBirthDate = new Date(currentDate.getFullYear() - minAge, currentDate.getMonth(), currentDate.getDate());
        whereClause.dateOfBirth = {
          [Op.between]: [minBirthDate, maxBirthDate]
        };
      }

      // Last visit range filter
      if (lastVisitRange) {
        const [startDate, endDate] = lastVisitRange.split(',');
        whereClause.lastVisit = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      // Get total count for pagination
      const total = await Patient.count({ where: whereClause });

      // Get paginated and sorted patients
      const patients = await Patient.findAll({
        where: whereClause,
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
        include: [
          {
            model: Prescription,
            attributes: ['id', 'medication', 'status', 'createdAt'],
            where: { status: 'Active' },
            required: false
          }
        ]
      });

      return {
        patients,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit))
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Get patients for visit preparation with analytics
  async getPatientsForVisitPrep(req, res) {
    try {
      const result = await this.getFilteredPatients(req, res);
      
      // Add visit preparation analytics
      const analytics = {
        totalPatients: result.pagination.total,
        activePatients: await Patient.count({
          where: {
            primaryCarePhysician: req.user.id,
            status: 'Active'
          }
        }),
        upcomingVisits: await Patient.count({
          where: {
            primaryCarePhysician: req.user.id,
            nextAppointment: {
              [Op.gte]: new Date()
            }
          }
        })
      };

      res.json({
        ...result,
        analytics
      });
    } catch (error) {
      console.error('Error getting patients for visit prep:', error);
      res.status(500).json({ message: 'Error getting patients for visit prep' });
    }
  },

  // Get patients for differential diagnosis with medical history
  async getPatientsForDifferential(req, res) {
    try {
      const result = await this.getFilteredPatients(req, res, {
        status: 'Active'
      });

      // Add medical history analytics
      const analytics = {
        commonConditions: await this.getCommonConditions(req.user.id),
        recentDiagnoses: await this.getRecentDiagnoses(req.user.id)
      };

      res.json({
        ...result,
        analytics
      });
    } catch (error) {
      console.error('Error getting patients for differential:', error);
      res.status(500).json({ message: 'Error getting patients for differential' });
    }
  },

  // Get patients for lifestyle management with lifestyle data
  async getPatientsForLifestyle(req, res) {
    try {
      const result = await this.getFilteredPatients(req, res);

      // Add lifestyle analytics
      const analytics = {
        lifestyleMetrics: await this.getLifestyleMetrics(req.user.id),
        wellnessScores: await this.getWellnessScores(req.user.id)
      };

      res.json({
        ...result,
        analytics
      });
    } catch (error) {
      console.error('Error getting patients for lifestyle:', error);
      res.status(500).json({ message: 'Error getting patients for lifestyle' });
    }
  },

  // Get patients for wellness alerts with alert data
  async getPatientsForWellnessAlerts(req, res) {
    try {
      const result = await this.getFilteredPatients(req, res, {
        status: 'Active'
      });

      // Add wellness alert analytics
      const analytics = {
        activeAlerts: await this.getActiveAlerts(req.user.id),
        alertTrends: await this.getAlertTrends(req.user.id)
      };

      res.json({
        ...result,
        analytics
      });
    } catch (error) {
      console.error('Error getting patients for wellness alerts:', error);
      res.status(500).json({ message: 'Error getting patients for wellness alerts' });
    }
  },

  // Get patients for visit comparison with visit history
  async getPatientsForVisitCompare(req, res) {
    try {
      const result = await this.getFilteredPatients(req, res);

      // Add visit comparison analytics
      const analytics = {
        visitTrends: await this.getVisitTrends(req.user.id),
        patientProgress: await this.getPatientProgress(req.user.id)
      };

      res.json({
        ...result,
        analytics
      });
    } catch (error) {
      console.error('Error getting patients for visit compare:', error);
      res.status(500).json({ message: 'Error getting patients for visit compare' });
    }
  },

  // Helper methods for analytics
  async getCommonConditions(doctorId) {
    // Implementation for getting common conditions
    return [];
  },

  async getRecentDiagnoses(doctorId) {
    // Implementation for getting recent diagnoses
    return [];
  },

  async getLifestyleMetrics(doctorId) {
    // Implementation for getting lifestyle metrics
    return [];
  },

  async getWellnessScores(doctorId) {
    // Implementation for getting wellness scores
    return [];
  },

  async getActiveAlerts(doctorId) {
    // Implementation for getting active alerts
    return [];
  },

  async getAlertTrends(doctorId) {
    // Implementation for getting alert trends
    return [];
  },

  async getVisitTrends(doctorId) {
    // Implementation for getting visit trends
    return [];
  },

  async getPatientProgress(doctorId) {
    // Implementation for getting patient progress
    return [];
  }
};

module.exports = patientController; 