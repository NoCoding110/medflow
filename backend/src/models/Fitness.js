const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fitness = sequelize.define('Fitness', {
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
  // Exercise Data
  exerciseType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  intensity: {
    type: DataTypes.ENUM('low', 'moderate', 'high'),
    allowNull: false
  },
  caloriesBurned: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  // Cardio Metrics
  maxHeartRate: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 30,
      max: 250
    }
  },
  avgHeartRate: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 30,
      max: 250
    }
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  distanceUnit: {
    type: DataTypes.ENUM('km', 'miles'),
    defaultValue: 'km'
  },
  // Strength Training
  sets: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  weightUnit: {
    type: DataTypes.ENUM('kg', 'lbs'),
    defaultValue: 'kg'
  },
  // Flexibility
  flexibilityScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Recovery
  recoveryTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  sorenessLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  // Performance Metrics
  vo2Max: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  restingHeartRate: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 30,
      max: 100
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
      fields: ['exerciseType']
    },
    {
      fields: ['status']
    }
  ]
});

// Instance methods
Fitness.prototype.calculateFitnessScore = function() {
  const weights = {
    duration: 0.2,
    intensity: 0.2,
    caloriesBurned: 0.1,
    maxHeartRate: 0.1,
    distance: 0.1,
    flexibilityScore: 0.1,
    recoveryTime: 0.1,
    vo2Max: 0.1
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

Fitness.prototype.assessStatus = function() {
  const score = this.calculateFitnessScore();
  if (score >= 8) return 'excellent';
  if (score >= 6) return 'good';
  if (score >= 4) return 'fair';
  return 'poor';
};

module.exports = Fitness; 