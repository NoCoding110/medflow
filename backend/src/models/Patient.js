const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  mrn: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  insuranceProvider: {
    type: DataTypes.STRING
  },
  insuranceNumber: {
    type: DataTypes.STRING
  },
  primaryCarePhysician: {
    type: DataTypes.STRING
  },
  emergencyContact: {
    type: DataTypes.JSONB
  },
  medicalHistory: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  allergies: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  medications: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active'
  },
  lastVisit: {
    type: DataTypes.DATE
  },
  nextAppointment: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['mrn']
    },
    {
      fields: ['lastName', 'firstName']
    },
    {
      fields: ['email']
    },
    {
      fields: ['phone']
    }
  ]
});

module.exports = Patient; 