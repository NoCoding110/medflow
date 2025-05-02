const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Goal = sequelize.define('Goal', {
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
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  // Goal Information
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('health', 'fitness', 'nutrition', 'mental_health', 'lifestyle', 'medical'),
    allowNull: false
  },
  // Goal Details
  targetValue: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  currentValue: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Timeline
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  targetDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  // Progress Tracking
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  milestones: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true
  },
  // Motivation
  motivation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  barriers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  // Support
  supportNeeded: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  supportProvided: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  // Review
  lastReviewDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nextReviewDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reviewNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Status
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed', 'on_hold', 'abandoned'),
    defaultValue: 'not_started'
  },
  // Priority
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  // Timestamps
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
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
      fields: ['createdAt']
    },
    {
      fields: ['category']
    },
    {
      fields: ['status']
    },
    {
      fields: ['priority']
    }
  ]
});

// Instance methods
Goal.prototype.calculateProgress = function() {
  if (!this.targetValue || !this.currentValue) return 0;
  return Math.min(100, Math.max(0, (this.currentValue / this.targetValue) * 100));
};

Goal.prototype.updateStatus = function() {
  if (this.progress >= 100) return 'completed';
  if (this.progress > 0) return 'in_progress';
  return 'not_started';
};

Goal.prototype.addMilestone = function(milestone) {
  if (!this.milestones) this.milestones = [];
  this.milestones.push({
    ...milestone,
    date: new Date(),
    progress: this.progress
  });
};

Goal.prototype.getTimeRemaining = function() {
  const now = new Date();
  const target = new Date(this.targetDate);
  const diff = target - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

module.exports = Goal; 