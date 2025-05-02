const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicalNote = sequelize.define('MedicalNote', {
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
  // Note Details
  type: {
    type: DataTypes.ENUM('progress', 'consultation', 'procedure', 'discharge', 'follow-up'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Clinical Information
  diagnosis: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  symptoms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  medications: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  procedures: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  // Assessment
  subjective: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  objective: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  assessment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  plan: {
    type: DataTypes.TEXT,
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
  // Attachments
  attachments: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true
  },
  // Privacy and Access
  isPrivate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  accessLevel: {
    type: DataTypes.ENUM('all', 'doctors', 'nurses', 'specialists'),
    defaultValue: 'all'
  },
  // Status
  status: {
    type: DataTypes.ENUM('draft', 'final', 'archived'),
    defaultValue: 'draft'
  },
  // Version Control
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  previousVersion: {
    type: DataTypes.UUID,
    allowNull: true
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
      fields: ['doctorId']
    },
    {
      fields: ['type']
    },
    {
      fields: ['status']
    },
    {
      fields: ['recordedAt']
    }
  ]
});

// Instance methods
MedicalNote.prototype.createNewVersion = async function(updatedData) {
  const newNote = await MedicalNote.create({
    ...this.toJSON(),
    ...updatedData,
    id: undefined,
    version: this.version + 1,
    previousVersion: this.id
  });
  return newNote;
};

MedicalNote.prototype.getVersionHistory = async function() {
  const history = [];
  let current = this;
  
  while (current) {
    history.push(current);
    if (current.previousVersion) {
      current = await MedicalNote.findByPk(current.previousVersion);
    } else {
      current = null;
    }
  }
  
  return history;
};

module.exports = MedicalNote; 