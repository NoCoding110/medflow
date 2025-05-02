const { Patient, User } = require('../models');

const patientController = {
  // Get patients for visit preparation
  async getPatientsForVisitPrep(req, res) {
    try {
      const doctorId = req.user.id; // Assuming user is authenticated and is a doctor
      const patients = await Patient.findAll({
        where: {
          primaryCarePhysician: doctorId
        }
      });
      res.json(patients);
    } catch (error) {
      console.error('Error getting patients for visit prep:', error);
      res.status(500).json({ message: 'Error getting patients for visit prep' });
    }
  },

  // Get patients for differential diagnosis
  async getPatientsForDifferential(req, res) {
    try {
      const doctorId = req.user.id;
      const patients = await Patient.findAll({
        where: {
          primaryCarePhysician: doctorId
        }
      });
      res.json(patients);
    } catch (error) {
      console.error('Error getting patients for differential:', error);
      res.status(500).json({ message: 'Error getting patients for differential' });
    }
  },

  // Get patients for lifestyle management
  async getPatientsForLifestyle(req, res) {
    try {
      const doctorId = req.user.id;
      const patients = await Patient.findAll({
        where: {
          primaryCarePhysician: doctorId
        }
      });
      res.json(patients);
    } catch (error) {
      console.error('Error getting patients for lifestyle:', error);
      res.status(500).json({ message: 'Error getting patients for lifestyle' });
    }
  },

  // Get patients for wellness alerts
  async getPatientsForWellnessAlerts(req, res) {
    try {
      const doctorId = req.user.id;
      const patients = await Patient.findAll({
        where: {
          primaryCarePhysician: doctorId
        }
      });
      res.json(patients);
    } catch (error) {
      console.error('Error getting patients for wellness alerts:', error);
      res.status(500).json({ message: 'Error getting patients for wellness alerts' });
    }
  },

  // Get patients for visit comparison
  async getPatientsForVisitCompare(req, res) {
    try {
      const doctorId = req.user.id;
      const patients = await Patient.findAll({
        where: {
          primaryCarePhysician: doctorId
        }
      });
      res.json(patients);
    } catch (error) {
      console.error('Error getting patients for visit compare:', error);
      res.status(500).json({ message: 'Error getting patients for visit compare' });
    }
  }
};

module.exports = patientController; 