const { Appointment, Patient, User } = require('../models');
const { Op } = require('sequelize');

const appointmentController = {
  // Create a new appointment
  async createAppointment(req, res) {
    try {
      const appointment = await Appointment.create(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all appointments with filters
  async getAppointments(req, res) {
    try {
      const {
        patientId,
        doctorId,
        startDate,
        endDate,
        status,
        type,
        priority
      } = req.query;

      const where = {};
      if (patientId) where.patientId = patientId;
      if (doctorId) where.doctorId = doctorId;
      if (status) where.status = status;
      if (type) where.type = type;
      if (priority) where.priority = priority;
      if (startDate && endDate) {
        where.startTime = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const appointments = await Appointment.findAll({
        where,
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] },
          { model: User, as: 'doctor', attributes: ['firstName', 'lastName', 'specialization'] }
        ],
        order: [['startTime', 'ASC']]
      });

      res.json(appointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get appointment by ID
  async getAppointment(req, res) {
    try {
      const appointment = await Appointment.findByPk(req.params.id, {
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] },
          { model: User, as: 'doctor', attributes: ['firstName', 'lastName', 'specialization'] }
        ]
      });
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update appointment
  async updateAppointment(req, res) {
    try {
      const [updated] = await Appointment.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      const appointment = await Appointment.findByPk(req.params.id);
      res.json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete appointment
  async deleteAppointment(req, res) {
    try {
      const deleted = await Appointment.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get appointment analytics
  async getAppointmentAnalytics(req, res) {
    try {
      const { startDate, endDate, doctorId } = req.query;
      
      const where = {};
      if (doctorId) where.doctorId = doctorId;
      if (startDate && endDate) {
        where.startTime = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const appointments = await Appointment.findAll({ where });

      const analytics = {
        totalAppointments: appointments.length,
        byStatus: appointments.reduce((acc, appt) => {
          acc[appt.status] = (acc[appt.status] || 0) + 1;
          return acc;
        }, {}),
        byType: appointments.reduce((acc, appt) => {
          acc[appt.type] = (acc[appt.type] || 0) + 1;
          return acc;
        }, {}),
        averageWaitTime: appointments.reduce((acc, appt) => {
          return acc + (appt.waitTime || 0);
        }, 0) / appointments.length,
        noShowRate: appointments.filter(appt => appt.status === 'no-show').length / appointments.length,
        completionRate: appointments.filter(appt => appt.status === 'completed').length / appointments.length
      };

      res.json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get AI insights for appointments
  async getAppointmentInsights(req, res) {
    try {
      const { patientId, doctorId } = req.query;
      
      const where = {};
      if (patientId) where.patientId = patientId;
      if (doctorId) where.doctorId = doctorId;

      const appointments = await Appointment.findAll({
        where,
        order: [['startTime', 'DESC']],
        limit: 10
      });

      const insights = {
        patterns: {
          noShows: appointments.filter(appt => appt.status === 'no-show').length,
          cancellations: appointments.filter(appt => appt.status === 'cancelled').length,
          averageWaitTime: appointments.reduce((acc, appt) => acc + (appt.waitTime || 0), 0) / appointments.length
        },
        recommendations: []
      };

      // Generate AI-driven recommendations
      if (insights.patterns.noShows > 2) {
        insights.recommendations.push({
          type: 'no_show_prevention',
          message: 'Consider implementing a reminder system or requiring confirmation for appointments.',
          priority: 'high'
        });
      }

      if (insights.patterns.averageWaitTime > 30) {
        insights.recommendations.push({
          type: 'wait_time_optimization',
          message: 'Review scheduling practices to reduce patient wait times.',
          priority: 'medium'
        });
      }

      res.json(insights);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Alerts for appointments
  async getAppointmentAlerts(req, res) {
    try {
      const { patientId, doctorId } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (doctorId) where.doctorId = doctorId;
      // Upcoming appointments in next 24h
      const now = new Date();
      const soon = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const upcoming = await Appointment.findAll({
        where: {
          ...where,
          startTime: { [Op.between]: [now, soon] },
          status: { [Op.in]: ['scheduled', 'confirmed'] }
        }
      });
      // Overdue appointments (scheduled but startTime in the past)
      const overdue = await Appointment.findAll({
        where: {
          ...where,
          startTime: { [Op.lt]: now },
          status: { [Op.in]: ['scheduled', 'confirmed'] }
        }
      });
      // Critical: emergency appointments
      const critical = await Appointment.findAll({
        where: {
          ...where,
          type: 'emergency',
          status: { [Op.in]: ['scheduled', 'confirmed', 'in-progress'] }
        }
      });
      const alerts = [];
      if (upcoming.length > 0) alerts.push({ type: 'upcoming', message: `${upcoming.length} appointment(s) in next 24h.`, severity: 'info' });
      if (overdue.length > 0) alerts.push({ type: 'overdue', message: `${overdue.length} overdue appointment(s).`, severity: 'warning' });
      if (critical.length > 0) alerts.push({ type: 'critical', message: `${critical.length} emergency appointment(s).`, severity: 'critical' });
      res.json({ alerts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = appointmentController; 