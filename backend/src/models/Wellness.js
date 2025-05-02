const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Wellness = sequelize.define('Wellness', {
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
  // Sleep Quality
  sleepDuration: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 24
    }
  },
  sleepQuality: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Stress Levels
  stressLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Activity Level
  activityMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  activityType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Hydration
  waterIntake: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  waterUnit: {
    type: DataTypes.ENUM('ml', 'oz'),
    defaultValue: 'ml'
  },
  // Mood
  mood: {
    type: DataTypes.ENUM('very_happy', 'happy', 'neutral', 'sad', 'very_sad'),
    allowNull: true
  },
  // Energy Level
  energyLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Additional Metrics
  meditationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  screenTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  socialInteraction: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Status
  status: {
    type: DataTypes.ENUM('excellent', 'good', 'fair', 'poor'),
    defaultValue: 'good'
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
    }
  ]
});

// Instance methods
Wellness.prototype.calculateWellnessScore = function() {
  const weights = {
    sleepQuality: 0.2,
    stressLevel: 0.2,
    activityMinutes: 0.2,
    waterIntake: 0.1,
    mood: 0.1,
    energyLevel: 0.1,
    meditationMinutes: 0.1
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

Wellness.prototype.assessStatus = function() {
  const score = this.calculateWellnessScore();
  if (score >= 8) return 'excellent';
  if (score >= 6) return 'good';
  if (score >= 4) return 'fair';
  return 'poor';
};

module.exports = Wellness; 