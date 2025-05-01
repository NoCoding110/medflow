const axios = require('axios');
const { Prescription } = require('../models');
require('dotenv').config();

class EPrescribingService {
  constructor() {
    this.surescriptsApi = axios.create({
      baseURL: process.env.SURESCRIPTS_API_URL,
      headers: {
        'Authorization': `Bearer ${process.env.SURESCRIPTS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async checkDrugInteractions(medications) {
    try {
      const response = await this.surescriptsApi.post('/interactions/check', {
        medications
      });
      return response.data;
    } catch (error) {
      console.error('Error checking drug interactions:', error);
      throw new Error('Failed to check drug interactions');
    }
  }

  async findPharmacy(location, radius = 5) {
    try {
      const response = await this.surescriptsApi.get('/pharmacy/find', {
        params: {
          latitude: location.latitude,
          longitude: location.longitude,
          radius
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error finding pharmacy:', error);
      throw new Error('Failed to find pharmacy');
    }
  }

  async sendPrescription(prescription) {
    try {
      // First check for drug interactions
      const interactions = await this.checkDrugInteractions([prescription.medication]);
      
      if (interactions.hasInteractions) {
        throw new Error('Drug interactions detected');
      }

      // Send prescription to pharmacy
      const response = await this.surescriptsApi.post('/prescription/send', {
        prescription: {
          patient: prescription.patientId,
          medication: prescription.medication,
          dosage: prescription.dosage,
          frequency: prescription.frequency,
          duration: prescription.duration,
          quantity: prescription.quantity,
          refills: prescription.refills,
          pharmacy: prescription.pharmacy,
          prescriber: prescription.prescriberId,
          instructions: prescription.instructions
        }
      });

      // Update prescription status
      await Prescription.update({
        sentToPharmacy: true,
        pharmacyResponse: response.data,
        status: 'Active'
      }, {
        where: { id: prescription.id }
      });

      return response.data;
    } catch (error) {
      console.error('Error sending prescription:', error);
      throw new Error('Failed to send prescription');
    }
  }

  async getPrescriptionStatus(prescriptionId) {
    try {
      const response = await this.surescriptsApi.get(`/prescription/${prescriptionId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error getting prescription status:', error);
      throw new Error('Failed to get prescription status');
    }
  }

  async cancelPrescription(prescriptionId, reason) {
    try {
      const response = await this.surescriptsApi.post(`/prescription/${prescriptionId}/cancel`, {
        reason
      });

      // Update prescription status
      await Prescription.update({
        status: 'Cancelled',
        pharmacyResponse: response.data
      }, {
        where: { id: prescriptionId }
      });

      return response.data;
    } catch (error) {
      console.error('Error cancelling prescription:', error);
      throw new Error('Failed to cancel prescription');
    }
  }

  async getMedicationHistory(patientId) {
    try {
      const response = await this.surescriptsApi.get(`/patient/${patientId}/medications`);
      return response.data;
    } catch (error) {
      console.error('Error getting medication history:', error);
      throw new Error('Failed to get medication history');
    }
  }
}

module.exports = new EPrescribingService(); 