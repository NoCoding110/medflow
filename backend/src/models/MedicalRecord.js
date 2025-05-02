const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicalRecord = sequelize.define('MedicalRecord', {
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
  // Personal Information
  bloodType: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: true
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  bmi: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  // Medical History
  allergies: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  conditions: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  medications: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  surgeries: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  immunizations: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Family History
  familyHistory: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Social History
  smokingStatus: {
    type: DataTypes.ENUM('never', 'former', 'current'),
    allowNull: true
  },
  alcoholUse: {
    type: DataTypes.ENUM('none', 'light', 'moderate', 'heavy'),
    allowNull: true
  },
  drugUse: {
    type: DataTypes.ENUM('none', 'former', 'current'),
    allowNull: true
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Vital Signs History
  vitalSigns: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Lab Results
  labResults: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Imaging
  imaging: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Documents
  documents: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Emergency Contacts
  emergencyContacts: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Insurance
  insurance: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  // Privacy Settings
  privacySettings: {
    type: DataTypes.JSONB,
    defaultValue: {
      shareWithPrimaryCare: true,
      shareWithSpecialists: true,
      shareWithEmergency: true
    }
  },
  // Status
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'archived'),
    defaultValue: 'active'
  },
  // Timestamps
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['patientId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['lastUpdated']
    }
  ]
});

// Instance methods
MedicalRecord.prototype.calculateBMI = function() {
  if (this.height && this.weight) {
    return this.weight / ((this.height / 100) * (this.height / 100));
  }
  return null;
};

MedicalRecord.prototype.getRecentVitals = function(days = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return this.vitalSigns.filter(vital => new Date(vital.recordedAt) > cutoff);
};

MedicalRecord.prototype.getActiveConditions = function() {
  return this.conditions.filter(condition => condition.status === 'active');
};

MedicalRecord.prototype.getCurrentMedications = function() {
  return this.medications.filter(med => med.status === 'active');
};

module.exports = MedicalRecord; 