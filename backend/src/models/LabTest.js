const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LabTest = sequelize.define('LabTest', {
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
  // Test Information
  testType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  testName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('blood', 'urine', 'imaging', 'genetic', 'microbiology', 'pathology'),
    allowNull: false
  },
  // Test Details
  specimenType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specimenCollectionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  specimenReceivedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  testPerformedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Results
  results: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  referenceRanges: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  interpretation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Status
  status: {
    type: DataTypes.ENUM('ordered', 'collected', 'in-progress', 'completed', 'cancelled'),
    defaultValue: 'ordered'
  },
  priority: {
    type: DataTypes.ENUM('routine', 'stat', 'urgent'),
    defaultValue: 'routine'
  },
  // Quality Control
  qualityControl: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  // Attachments
  attachments: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
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
  // Notes
  notes: {
    type: DataTypes.TEXT,
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
      fields: ['testType']
    },
    {
      fields: ['status']
    },
    {
      fields: ['specimenCollectionDate']
    }
  ]
});

// Instance methods
LabTest.prototype.isAbnormal = function() {
  if (!this.results || !this.referenceRanges) return false;
  
  return Object.entries(this.results).some(([key, value]) => {
    const range = this.referenceRanges[key];
    if (!range) return false;
    
    return value < range.min || value > range.max;
  });
};

LabTest.prototype.getCriticalResults = function() {
  if (!this.results || !this.referenceRanges) return [];
  
  return Object.entries(this.results)
    .filter(([key, value]) => {
      const range = this.referenceRanges[key];
      if (!range || !range.critical) return false;
      
      return value < range.critical.min || value > range.critical.max;
    })
    .map(([key, value]) => ({
      test: key,
      value,
      referenceRange: this.referenceRanges[key]
    }));
};

LabTest.prototype.getTrend = async function() {
  const previousTests = await LabTest.findAll({
    where: {
      patientId: this.patientId,
      testType: this.testType,
      id: { [Op.ne]: this.id }
    },
    order: [['specimenCollectionDate', 'DESC']],
    limit: 5
  });
  
  return {
    current: this.results,
    previous: previousTests.map(test => ({
      date: test.specimenCollectionDate,
      results: test.results
    }))
  };
};

module.exports = LabTest; 