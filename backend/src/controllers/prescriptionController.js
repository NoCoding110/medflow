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
  }
};

module.exports = prescriptionController; 