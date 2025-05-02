const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vital = sequelize.define('Vital', {
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
  // Blood Pressure
  systolicBP: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 50,
      max: 250
    }
  },
  diastolicBP: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 30,
      max: 150
    }
  },
  // Heart Rate
  heartRate: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 30,
      max: 250
    }
  },
  // Temperature
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 35,
      max: 42
    }
  },
  temperatureUnit: {
    type: DataTypes.ENUM('C', 'F'),
    defaultValue: 'C'
  },
  // Oxygen Saturation
  spO2: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 70,
      max: 100
    }
  },
  // Respiratory Rate
  respiratoryRate: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 8,
      max: 60
    }
  },
  // Additional Vital Signs
  bloodGlucose: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 2,
      max: 30
    }
  },
  bloodGlucoseUnit: {
    type: DataTypes.ENUM('mmol/L', 'mg/dL'),
    defaultValue: 'mmol/L'
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
  height: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  heightUnit: {
    type: DataTypes.ENUM('cm', 'in'),
    defaultValue: 'cm'
  },
  bmi: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 10,
      max: 50
    }
  },
  // Pain Assessment
  painScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 10
    }
  },
  // Mental Status
  gcsScore: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 3,
      max: 15
    }
  },
  // Additional Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Device Information
  deviceType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  deviceId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Status
  status: {
    type: DataTypes.ENUM('normal', 'warning', 'critical'),
    defaultValue: 'normal'
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
Vital.prototype.calculateBMI = function() {
  if (this.weight && this.height) {
    const weightKg = this.weightUnit === 'lbs' ? this.weight * 0.453592 : this.weight;
    const heightM = this.heightUnit === 'in' ? this.height * 0.0254 : this.height / 100;
    return weightKg / (heightM * heightM);
  }
  return null;
};

Vital.prototype.assessStatus = function() {
  const status = {
    bp: this.assessBPStatus(),
    hr: this.assessHRStatus(),
    temp: this.assessTempStatus(),
    spo2: this.assessSpO2Status(),
    rr: this.assessRRStatus()
  };

  if (Object.values(status).includes('critical')) return 'critical';
  if (Object.values(status).includes('warning')) return 'warning';
  return 'normal';
};

Vital.prototype.assessBPStatus = function() {
  if (!this.systolicBP || !this.diastolicBP) return 'normal';
  if (this.systolicBP > 180 || this.diastolicBP > 120) return 'critical';
  if (this.systolicBP > 140 || this.diastolicBP > 90) return 'warning';
  return 'normal';
};

Vital.prototype.assessHRStatus = function() {
  if (!this.heartRate) return 'normal';
  if (this.heartRate < 40 || this.heartRate > 130) return 'critical';
  if (this.heartRate < 50 || this.heartRate > 100) return 'warning';
  return 'normal';
};

Vital.prototype.assessTempStatus = function() {
  if (!this.temperature) return 'normal';
  const tempC = this.temperatureUnit === 'F' ? (this.temperature - 32) * 5/9 : this.temperature;
  if (tempC < 35 || tempC > 40) return 'critical';
  if (tempC < 36 || tempC > 38.5) return 'warning';
  return 'normal';
};

Vital.prototype.assessSpO2Status = function() {
  if (!this.spO2) return 'normal';
  if (this.spO2 < 90) return 'critical';
  if (this.spO2 < 95) return 'warning';
  return 'normal';
};

Vital.prototype.assessRRStatus = function() {
  if (!this.respiratoryRate) return 'normal';
  if (this.respiratoryRate < 8 || this.respiratoryRate > 30) return 'critical';
  if (this.respiratoryRate < 12 || this.respiratoryRate > 20) return 'warning';
  return 'normal';
};

module.exports = Vital; 