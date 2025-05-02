const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Nutrition = sequelize.define('Nutrition', {
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
  // Meal Information
  mealType: {
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
    allowNull: false
  },
  mealTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  // Nutritional Content
  calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  protein: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  carbohydrates: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  fat: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  fiber: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  sugar: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  // Micronutrients
  sodium: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  potassium: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  calcium: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  iron: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  // Vitamins
  vitaminA: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  vitaminC: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  vitaminD: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  // Food Groups
  fruits: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  vegetables: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  grains: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  dairy: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  proteinFoods: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  // Additional Information
  hydration: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  hydrationUnit: {
    type: DataTypes.ENUM('ml', 'oz'),
    defaultValue: 'ml'
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
      fields: ['mealType']
    },
    {
      fields: ['status']
    }
  ]
});

// Instance methods
Nutrition.prototype.calculateNutritionScore = function() {
  const weights = {
    calories: 0.2,
    protein: 0.15,
    carbohydrates: 0.15,
    fat: 0.1,
    fiber: 0.1,
    sugar: 0.1,
    fruits: 0.1,
    vegetables: 0.1
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

Nutrition.prototype.assessStatus = function() {
  const score = this.calculateNutritionScore();
  if (score >= 8) return 'excellent';
  if (score >= 6) return 'good';
  if (score >= 4) return 'fair';
  return 'poor';
};

module.exports = Nutrition; 