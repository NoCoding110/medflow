const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prescription = sequelize.define('Prescription', {
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
  medication: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  refills: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  refillsRemaining: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  pharmacy: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  prescriberId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Active', 'Completed', 'Cancelled', 'On Hold'),
    defaultValue: 'Active'
  },
  instructions: {
    type: DataTypes.TEXT
  },
  interactions: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  allergies: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  sentToPharmacy: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  pharmacyResponse: {
    type: DataTypes.JSONB
  },
  lastFilled: {
    type: DataTypes.DATE
  },
  nextRefillDate: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['patientId']
    },
    {
      fields: ['prescriberId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['medication']
    }
  ]
});

module.exports = Prescription; 