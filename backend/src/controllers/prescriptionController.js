const { Prescription, Patient } = require('../models');
const ePrescribingService = require('../services/ePrescribingService');
const { validationResult } = require('express-validator');

const prescriptionController = {
  // Create new prescription
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        patientId,
        medication,
        dosage,
        frequency,
        duration,
        quantity,
        refills,
        pharmacy,
        instructions
      } = req.body;

      // Check if patient exists
      const patient = await Patient.findByPk(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }

      // Create prescription
      const prescription = await Prescription.create({
        patientId,
        medication,
        dosage,
        frequency,
        duration,
        quantity,
        refills,
        refillsRemaining: refills,
        pharmacy,
        prescriberId: req.user.id, // Assuming user is authenticated
        instructions,
        status: 'Active'
      });

      // Send to pharmacy
      try {
        await ePrescribingService.sendPrescription(prescription);
        res.status(201).json({
          message: 'Prescription created and sent successfully',
          prescription
        });
      } catch (error) {
        // If sending fails, update prescription status
        await prescription.update({ status: 'On Hold' });
        res.status(201).json({
          message: 'Prescription created but not sent to pharmacy',
          prescription,
          error: error.message
        });
      }
    } catch (error) {
      console.error('Error creating prescription:', error);
      res.status(500).json({ message: 'Error creating prescription' });
    }
  },

  // Get patient's prescriptions
  async getPatientPrescriptions(req, res) {
    try {
      const { patientId } = req.params;
      const prescriptions = await Prescription.findAll({
        where: { patientId },
        order: [['createdAt', 'DESC']]
      });
      res.json(prescriptions);
    } catch (error) {
      console.error('Error getting prescriptions:', error);
      res.status(500).json({ message: 'Error getting prescriptions' });
    }
  },

  // Get prescription details
  async getPrescription(req, res) {
    try {
      const { id } = req.params;
      const prescription = await Prescription.findByPk(id, {
        include: [{
          model: Patient,
          attributes: ['firstName', 'lastName', 'dateOfBirth']
        }]
      });

      if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
      }

      // Get current status from pharmacy
      const status = await ePrescribingService.getPrescriptionStatus(id);
      prescription.pharmacyStatus = status;

      res.json(prescription);
    } catch (error) {
      console.error('Error getting prescription:', error);
      res.status(500).json({ message: 'Error getting prescription' });
    }
  },

  // Cancel prescription
  async cancelPrescription(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const prescription = await Prescription.findByPk(id);
      if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found' });
      }

      // Cancel with pharmacy
      await ePrescribingService.cancelPrescription(id, reason);

      res.json({ message: 'Prescription cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling prescription:', error);
      res.status(500).json({ message: 'Error cancelling prescription' });
    }
  },

  // Check drug interactions
  async checkInteractions(req, res) {
    try {
      const { medications } = req.body;
      const interactions = await ePrescribingService.checkDrugInteractions(medications);
      res.json(interactions);
    } catch (error) {
      console.error('Error checking interactions:', error);
      res.status(500).json({ message: 'Error checking drug interactions' });
    }
  },

  // Find nearby pharmacies
  async findPharmacies(req, res) {
    try {
      const { latitude, longitude, radius } = req.query;
      const pharmacies = await ePrescribingService.findPharmacy(
        { latitude, longitude },
        radius
      );
      res.json(pharmacies);
    } catch (error) {
      console.error('Error finding pharmacies:', error);
      res.status(500).json({ message: 'Error finding pharmacies' });
    }
  },

  // Get all prescriptions with advanced filtering
  async getPrescriptions(req, res) {
    try {
      const {
        patientId,
        prescriberId,
        status,
        medication,
        startDate,
        endDate,
        refillDue,
        search
      } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (prescriberId) where.prescriberId = prescriberId;
      if (status) where.status = status;
      if (medication) where.medication = { [require('sequelize').Op.iLike]: `%${medication}%` };
      if (startDate && endDate) {
        where.createdAt = { [require('sequelize').Op.between]: [new Date(startDate), new Date(endDate)] };
      }
      if (refillDue === 'true') {
        where.refillsRemaining = { [require('sequelize').Op.gt]: 0 };
      }
      if (search) {
        where[require('sequelize').Op.or] = [
          { medication: { [require('sequelize').Op.iLike]: `%${search}%` } },
          { instructions: { [require('sequelize').Op.iLike]: `%${search}%` } }
        ];
      }
      const prescriptions = await Prescription.findAll({
        where,
        order: [['createdAt', 'DESC']]
      });
      res.json(prescriptions);
    } catch (error) {
      res.status(500).json({ message: 'Error getting prescriptions', error: error.message });
    }
  },

  // Analytics
  async getPrescriptionAnalytics(req, res) {
    try {
      const { patientId, prescriberId, startDate, endDate } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (prescriberId) where.prescriberId = prescriberId;
      if (startDate && endDate) {
        where.createdAt = { [require('sequelize').Op.between]: [new Date(startDate), new Date(endDate)] };
      }
      const prescriptions = await Prescription.findAll({ where });
      const analytics = {
        totalPrescriptions: prescriptions.length,
        byStatus: prescriptions.reduce((acc, p) => {
          acc[p.status] = (acc[p.status] || 0) + 1;
          return acc;
        }, {}),
        byMedication: prescriptions.reduce((acc, p) => {
          acc[p.medication] = (acc[p.medication] || 0) + 1;
          return acc;
        }, {}),
        refillsDue: prescriptions.filter(p => p.refillsRemaining > 0).length
      };
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: 'Error getting analytics', error: error.message });
    }
  },

  // AI Insights
  async getPrescriptionInsights(req, res) {
    try {
      const { patientId } = req.query;
      const prescriptions = await Prescription.findAll({ where: { patientId }, order: [['createdAt', 'DESC']], limit: 10 });
      const insights = {
        patterns: {
          refillsDue: prescriptions.filter(p => p.refillsRemaining > 0).length,
          mostCommon: prescriptions.reduce((acc, p) => {
            acc[p.medication] = (acc[p.medication] || 0) + 1;
            return acc;
          }, {}),
          recentStatuses: prescriptions.map(p => p.status)
        },
        recommendations: []
      };
      if (insights.patterns.refillsDue > 0) {
        insights.recommendations.push({
          type: 'refill',
          message: 'Some prescriptions are due for refill. Remind the patient.',
          priority: 'high'
        });
      }
      const topMed = Object.entries(insights.patterns.mostCommon).sort(([,a],[,b]) => b-a)[0];
      if (topMed) {
        insights.recommendations.push({
          type: 'common_medication',
          message: `Most common medication: ${topMed[0]}. Review for effectiveness or side effects.`,
          priority: 'medium'
        });
      }
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: 'Error getting insights', error: error.message });
    }
  },

  // Alerts
  async getPrescriptionAlerts(req, res) {
    try {
      const { patientId } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      // Refills due
      const refillsDue = await Prescription.findAll({ where: { ...where, refillsRemaining: { [require('sequelize').Op.gt]: 0 } } });
      // Expired prescriptions
      const expired = await Prescription.findAll({ where: { ...where, status: 'Expired' } });
      // On Hold
      const onHold = await Prescription.findAll({ where: { ...where, status: 'On Hold' } });
      const alerts = [];
      if (refillsDue.length > 0) alerts.push({ type: 'refill', message: `${refillsDue.length} prescription(s) due for refill.`, severity: 'warning' });
      if (expired.length > 0) alerts.push({ type: 'expired', message: `${expired.length} expired prescription(s).`, severity: 'info' });
      if (onHold.length > 0) alerts.push({ type: 'on_hold', message: `${onHold.length} prescription(s) on hold.`, severity: 'critical' });
      res.json({ alerts });
    } catch (error) {
      res.status(500).json({ message: 'Error getting alerts', error: error.message });
    }
  }
};

module.exports = prescriptionController; 