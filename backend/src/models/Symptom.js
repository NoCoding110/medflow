const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Symptom = sequelize.define('Symptom', {
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
  // Symptom Information
  symptomName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  severity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  onset: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  durationUnit: {
    type: DataTypes.ENUM('minutes', 'hours', 'days', 'weeks'),
    defaultValue: 'hours'
  },
  // Symptom Characteristics
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  quality: {
    type: DataTypes.STRING,
    allowNull: true
  },
  radiation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timing: {
    type: DataTypes.STRING,
    allowNull: true
  },
  context: {
    type: DataTypes.STRING,
    allowNull: true
  },
  modifyingFactors: {
    type: DataTypes.STRING,
    allowNull: true
  },
  associatedSymptoms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  // Impact
  impactOnDailyLife: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  impactOnSleep: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  impactOnWork: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Treatment
  currentTreatment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  treatmentEffectiveness: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Additional Information
  triggers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  alleviatingFactors: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Status
  status: {
    type: DataTypes.ENUM('resolved', 'improving', 'stable', 'worsening', 'new'),
    defaultValue: 'new'
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
      fields: ['symptomName']
    },
    {
      fields: ['status']
    }
  ]
});

// Instance methods
Symptom.prototype.calculateSymptomScore = function() {
  const weights = {
    severity: 0.3,
    impactOnDailyLife: 0.2,
    impactOnSleep: 0.2,
    impactOnWork: 0.2,
    treatmentEffectiveness: 0.1
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

Symptom.prototype.assessStatus = function() {
  const score = this.calculateSymptomScore();
  if (score <= 3) return 'resolved';
  if (score <= 5) return 'improving';
  if (score <= 7) return 'stable';
  if (score <= 9) return 'worsening';
  return 'new';
};

module.exports = Symptom; 