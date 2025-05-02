const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MentalHealth = sequelize.define('MentalHealth', {
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
  // Mood Assessment
  mood: {
    type: DataTypes.ENUM('very_happy', 'happy', 'neutral', 'sad', 'very_sad'),
    allowNull: false
  },
  anxietyLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  depressionLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  stressLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Sleep Quality
  sleepQuality: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  sleepDuration: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 24
    }
  },
  // Daily Functioning
  energyLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  concentration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  motivation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Social Interaction
  socialInteraction: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  socialSupport: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Coping Mechanisms
  copingStrategies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  copingEffectiveness: {
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
  treatmentAdherence: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  treatmentEffectiveness: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Risk Assessment
  suicidalThoughts: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  selfHarm: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  riskLevel: {
    type: DataTypes.ENUM('low', 'moderate', 'high', 'critical'),
    defaultValue: 'low'
  },
  // Additional Information
  triggers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  positiveEvents: {
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
    type: DataTypes.ENUM('stable', 'improving', 'worsening', 'critical'),
    defaultValue: 'stable'
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
      fields: ['status']
    },
    {
      fields: ['riskLevel']
    }
  ]
});

// Instance methods
MentalHealth.prototype.calculateMentalHealthScore = function() {
  const weights = {
    mood: 0.15,
    anxietyLevel: 0.15,
    depressionLevel: 0.15,
    stressLevel: 0.1,
    sleepQuality: 0.1,
    energyLevel: 0.1,
    concentration: 0.1,
    motivation: 0.1,
    socialInteraction: 0.05
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

MentalHealth.prototype.assessStatus = function() {
  const score = this.calculateMentalHealthScore();
  if (this.suicidalThoughts || this.selfHarm) return 'critical';
  if (score <= 3) return 'worsening';
  if (score <= 6) return 'improving';
  return 'stable';
};

MentalHealth.prototype.assessRiskLevel = function() {
  if (this.suicidalThoughts || this.selfHarm) return 'critical';
  if (this.depressionLevel >= 8 || this.anxietyLevel >= 8) return 'high';
  if (this.depressionLevel >= 6 || this.anxietyLevel >= 6) return 'moderate';
  return 'low';
};

module.exports = MentalHealth; 