const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
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
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  // Appointment Details
  type: {
    type: DataTypes.ENUM('consultation', 'follow-up', 'emergency', 'routine', 'specialist'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'),
    defaultValue: 'scheduled'
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 15
    }
  },
  // Location
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  room: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Purpose and Notes
  purpose: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Reminders and Notifications
  reminderSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  reminderTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Follow-up
  followUpRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  followUpDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Insurance
  insuranceVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  insuranceNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Priority
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  // Check-in/Check-out
  checkInTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  checkOutTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  waitTime: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // Patient Feedback
  patientFeedback: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['patientId']
    },
    {
      fields: ['doctorId']
    },
    {
      fields: ['startTime']
    },
    {
      fields: ['status']
    },
    {
      fields: ['type']
    }
  ]
});

// Instance methods
Appointment.prototype.calculateWaitTime = function() {
  if (this.checkInTime && this.startTime) {
    return Math.max(0, (this.startTime - this.checkInTime) / (1000 * 60));
  }
  return null;
};

Appointment.prototype.isOverlapping = async function() {
  const overlapping = await Appointment.findOne({
    where: {
      doctorId: this.doctorId,
      startTime: {
        [Op.lt]: this.endTime
      },
      endTime: {
        [Op.gt]: this.startTime
      },
      id: {
        [Op.ne]: this.id
      }
    }
  });
  return !!overlapping;
};

module.exports = Appointment; 