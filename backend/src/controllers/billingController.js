const { Billing, Patient } = require('../models');
const { Op, Sequelize } = require('sequelize');

const billingController = {
  // Create a new billing record
  async createBilling(req, res) {
    try {
      const billing = await Billing.create(req.body);
      res.status(201).json(billing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all billing records with advanced filtering
  async getBillings(req, res) {
    try {
      const {
        patientId,
        status,
        paymentStatus,
        insuranceStatus,
        startDate,
        endDate,
        minAmount,
        maxAmount,
        search
      } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (status) where.status = status;
      if (paymentStatus) where.paymentStatus = paymentStatus;
      if (insuranceStatus) where.insuranceStatus = insuranceStatus;
      if (startDate && endDate) {
        where.billingDate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      }
      if (minAmount && maxAmount) {
        where.totalAmount = { [Op.between]: [minAmount, maxAmount] };
      }
      if (search) {
        where[Op.or] = [
          { invoiceNumber: { [Op.iLike]: `%${search}%` } },
          { notes: { [Op.iLike]: `%${search}%` } }
        ];
      }
      const billings = await Billing.findAll({
        where,
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] }
        ],
        order: [['billingDate', 'DESC']]
      });
      res.json(billings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get billing by ID
  async getBilling(req, res) {
    try {
      const billing = await Billing.findByPk(req.params.id, {
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] }
        ]
      });
      if (!billing) return res.status(404).json({ error: 'Billing record not found' });
      res.json(billing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update billing
  async updateBilling(req, res) {
    try {
      const [updated] = await Billing.update(req.body, { where: { id: req.params.id } });
      if (!updated) return res.status(404).json({ error: 'Billing record not found' });
      const billing = await Billing.findByPk(req.params.id);
      res.json(billing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete billing
  async deleteBilling(req, res) {
    try {
      const deleted = await Billing.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ error: 'Billing record not found' });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Analytics
  async getBillingAnalytics(req, res) {
    try {
      const { patientId, startDate, endDate } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      if (startDate && endDate) {
        where.billingDate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      }
      const billings = await Billing.findAll({ where });
      const analytics = {
        totalInvoices: billings.length,
        byStatus: billings.reduce((acc, b) => {
          acc[b.status] = (acc[b.status] || 0) + 1;
          return acc;
        }, {}),
        byPaymentStatus: billings.reduce((acc, b) => {
          acc[b.paymentStatus] = (acc[b.paymentStatus] || 0) + 1;
          return acc;
        }, {}),
        overdue: billings.filter(b => b.isOverdue()).length,
        totalBilled: billings.reduce((acc, b) => acc + parseFloat(b.totalAmount), 0),
        totalPaid: billings.reduce((acc, b) => acc + parseFloat(b.amountPaid), 0),
        totalOutstanding: billings.reduce((acc, b) => acc + parseFloat(b.balance), 0)
      };
      res.json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // AI Insights
  async getBillingInsights(req, res) {
    try {
      const { patientId } = req.query;
      const billings = await Billing.findAll({ where: { patientId }, order: [['billingDate', 'DESC']], limit: 10 });
      const insights = {
        patterns: {
          overdue: billings.filter(b => b.isOverdue()).length,
          highOutstanding: billings.filter(b => parseFloat(b.balance) > 1000).length,
          frequentReminders: billings.filter(b => b.reminderCount > 2).length
        },
        recommendations: []
      };
      if (insights.patterns.overdue > 0) {
        insights.recommendations.push({
          type: 'overdue',
          message: 'There are overdue invoices. Consider sending reminders or following up.',
          priority: 'high'
        });
      }
      if (insights.patterns.highOutstanding > 0) {
        insights.recommendations.push({
          type: 'outstanding',
          message: 'Some invoices have high outstanding balances. Review payment plans.',
          priority: 'medium'
        });
      }
      if (insights.patterns.frequentReminders > 0) {
        insights.recommendations.push({
          type: 'reminders',
          message: 'Frequent reminders sent. Consider alternative communication.',
          priority: 'low'
        });
      }
      res.json(insights);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Alerts
  async getBillingAlerts(req, res) {
    try {
      const { patientId } = req.query;
      const where = {};
      if (patientId) where.patientId = patientId;
      // Overdue invoices
      const overdue = await Billing.findAll({ where: { ...where, status: 'overdue' } });
      // Upcoming due (due in next 7 days)
      const now = new Date();
      const soon = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const upcoming = await Billing.findAll({ where: { ...where, dueDate: { [Op.between]: [now, soon] }, status: { [Op.ne]: 'paid' } } });
      // High balance
      const highBalance = await Billing.findAll({ where: { ...where, balance: { [Op.gt]: 1000 } } });
      const alerts = [];
      if (overdue.length > 0) alerts.push({ type: 'overdue', message: `${overdue.length} overdue invoice(s).`, severity: 'critical' });
      if (upcoming.length > 0) alerts.push({ type: 'upcoming', message: `${upcoming.length} invoice(s) due soon.`, severity: 'warning' });
      if (highBalance.length > 0) alerts.push({ type: 'high_balance', message: `${highBalance.length} invoice(s) with high outstanding balance.`, severity: 'info' });
      res.json({ alerts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = billingController; 