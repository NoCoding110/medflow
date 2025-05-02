const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Billing = sequelize.define('Billing', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Patients',
      key: 'id'
    }
  },
  // Billing Information
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  billingDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  // Service Details
  services: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: false
  },
  // Amounts
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  amountPaid: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  // Insurance
  insuranceProvider: {
    type: DataTypes.STRING,
    allowNull: true
  },
  insurancePolicyNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  insuranceClaimNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  insuranceCoverage: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  insuranceStatus: {
    type: DataTypes.ENUM('pending', 'approved', 'denied', 'partial'),
    allowNull: true
  },
  // Payment Details
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'credit_card', 'debit_card', 'insurance', 'bank_transfer'),
    allowNull: true
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'partial', 'paid', 'overdue', 'cancelled'),
    defaultValue: 'pending'
  },
  paymentHistory: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Billing Status
  status: {
    type: DataTypes.ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled'),
    defaultValue: 'draft'
  },
  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Attachments
  attachments: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Reminders
  lastReminderSent: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reminderCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['patientId']
    },
    {
      fields: ['invoiceNumber']
    },
    {
      fields: ['billingDate']
    },
    {
      fields: ['status']
    },
    {
      fields: ['paymentStatus']
    }
  ]
});

// Instance methods
Billing.prototype.calculateBalance = function() {
  return this.totalAmount - this.amountPaid;
};

Billing.prototype.addPayment = function(payment) {
  if (!this.paymentHistory) {
    this.paymentHistory = [];
  }
  
  this.paymentHistory.push({
    ...payment,
    date: new Date()
  });
  
  this.amountPaid += payment.amount;
  this.balance = this.calculateBalance();
  
  if (this.balance <= 0) {
    this.paymentStatus = 'paid';
    this.status = 'paid';
  } else if (this.amountPaid > 0) {
    this.paymentStatus = 'partial';
  }
};

Billing.prototype.isOverdue = function() {
  return new Date() > new Date(this.dueDate) && this.balance > 0;
};

Billing.prototype.getPaymentSummary = function() {
  return {
    totalAmount: this.totalAmount,
    amountPaid: this.amountPaid,
    balance: this.balance,
    paymentStatus: this.paymentStatus,
    isOverdue: this.isOverdue(),
    daysOverdue: this.isOverdue() ? 
      Math.ceil((new Date() - new Date(this.dueDate)) / (1000 * 60 * 60 * 24)) : 0
  };
};

module.exports = Billing; 