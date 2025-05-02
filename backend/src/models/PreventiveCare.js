const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PreventiveCare = sequelize.define('PreventiveCare', {
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
  recordedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  // Screening Information
  screeningType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  screeningDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  nextScreeningDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  screeningResult: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Vaccination Information
  vaccineName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vaccineDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nextVaccineDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  vaccineLotNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Lifestyle Assessment
  smokingStatus: {
    type: DataTypes.ENUM('never', 'former', 'current'),
    allowNull: false
  },
  alcoholConsumption: {
    type: DataTypes.ENUM('none', 'light', 'moderate', 'heavy'),
    allowNull: false
  },
  physicalActivity: {
    type: DataTypes.ENUM('none', 'light', 'moderate', 'vigorous'),
    allowNull: false
  },
  // Health Metrics
  bmi: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 10,
      max: 50
    }
  },
  bloodPressure: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cholesterol: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bloodSugar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Risk Factors
  familyHistory: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  environmentalExposures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  occupationalHazards: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  // Recommendations
  recommendations: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  followUpRequired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  followUpDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Status
  status: {
    type: DataTypes.ENUM('up_to_date', 'due', 'overdue', 'not_applicable'),
    defaultValue: 'up_to_date'
  },
  // Timestamps
  recordedAt: {
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
      fields: ['recordedAt']
    },
    {
      fields: ['screeningType']
    },
    {
      fields: ['status']
    }
  ]
});

// Instance methods
PreventiveCare.prototype.calculateRiskScore = function() {
  const weights = {
    smokingStatus: 0.2,
    alcoholConsumption: 0.2,
    physicalActivity: 0.2,
    bmi: 0.2,
    familyHistory: 0.1,
    environmentalExposures: 0.1
  };

  let score = 0;
  let totalWeight = 0;

  Object.entries(weights).forEach(([key, weight]) => {
    if (this[key] !== null && this[key] !== undefined) {
      score += this[key] * weight;
      totalWeight += weight;
    }
  });

  return totalWeight > 0 ? score / totalWeight : 0;
};

PreventiveCare.prototype.assessStatus = function() {
  if (this.nextScreeningDate && new Date(this.nextScreeningDate) < new Date()) {
    return 'overdue';
  }
  if (this.nextScreeningDate && new Date(this.nextScreeningDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3))) {
    return 'due';
  }
  return 'up_to_date';
};

module.exports = PreventiveCare; 