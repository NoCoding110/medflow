const { Patient, User, Prescription, Vital, Wellness, Fitness, Nutrition, Symptom, MentalHealth, PreventiveCare, Goal } = require('../models');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

const patientController = {
  // Common filtering function
  getFilteredPatients: async (req, filters = {}) => {
    const {
      search,
      status,
      ageRange,
      lastVisitRange,
      sortBy = 'lastName',
      sortOrder = 'ASC',
      page = 1,
      limit = 10
    } = filters;

    const whereClause = {
      primaryCarePhysician: req.user.id
    };

    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { mrn: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status) {
      whereClause.status = status;
    }

    if (ageRange) {
      const [minAge, maxAge] = ageRange.split('-').map(Number);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - maxAge);
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - minAge);
      whereClause.dateOfBirth = {
        [Op.between]: [minDate, maxDate]
      };
    }

    if (lastVisitRange) {
      const [startDate, endDate] = lastVisitRange.split('-');
      whereClause.lastVisitDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const offset = (page - 1) * limit;

    const { count, rows: patients } = await Patient.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'primaryCareProvider',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    return {
      patients,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    };
  },

  // Wellness Dashboard
  getPatientsForWellnessDashboard: async (req, res) => {
    try {
      const { patients, pagination } = await patientController.getFilteredPatients(req, req.query);

      // Get wellness analytics
      const wellnessAnalytics = await Wellness.findAll({
        where: {
          patientId: {
            [Op.in]: patients.map(p => p.id)
          }
        },
        attributes: [
          'patientId',
          [sequelize.fn('AVG', sequelize.col('sleepQuality')), 'avgSleepQuality'],
          [sequelize.fn('AVG', sequelize.col('stressLevel')), 'avgStressLevel'],
          [sequelize.fn('AVG', sequelize.col('energyLevel')), 'avgEnergyLevel']
        ],
        group: ['patientId']
      });

      // Get vital signs analytics
      const vitalAnalytics = await Vital.findAll({
        where: {
          patientId: {
            [Op.in]: patients.map(p => p.id)
          }
        },
        attributes: [
          'patientId',
          [sequelize.fn('AVG', sequelize.col('heartRate')), 'avgHeartRate'],
          [sequelize.fn('AVG', sequelize.col('bloodPressure')), 'avgBloodPressure'],
          [sequelize.fn('AVG', sequelize.col('temperature')), 'avgTemperature']
        ],
        group: ['patientId']
      });

      // Combine data
      const enrichedPatients = patients.map(patient => {
        const wellness = wellnessAnalytics.find(w => w.patientId === patient.id);
        const vitals = vitalAnalytics.find(v => v.patientId === patient.id);
        return {
          ...patient.toJSON(),
          wellness: wellness ? wellness.toJSON() : null,
          vitals: vitals ? vitals.toJSON() : null
        };
      });

      res.json({
        patients: enrichedPatients,
        pagination,
        analytics: {
          totalPatients: pagination.total,
          averageSleepQuality: wellnessAnalytics.reduce((acc, curr) => acc + curr.avgSleepQuality, 0) / wellnessAnalytics.length,
          averageStressLevel: wellnessAnalytics.reduce((acc, curr) => acc + curr.avgStressLevel, 0) / wellnessAnalytics.length,
          averageHeartRate: vitalAnalytics.reduce((acc, curr) => acc + curr.avgHeartRate, 0) / vitalAnalytics.length
        }
      });
    } catch (error) {
      console.error('Error in getPatientsForWellnessDashboard:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Vitals
  getPatientsForVitals: async (req, res) => {
    try {
      const { patients, pagination } = await patientController.getFilteredPatients(req, req.query);

      // Get vital signs with advanced filtering
      const vitalFilters = {
        patientId: {
          [Op.in]: patients.map(p => p.id)
        }
      };

      if (req.query.vitalType) {
        vitalFilters.type = req.query.vitalType;
      }

      if (req.query.vitalRange) {
        const [min, max] = req.query.vitalRange.split('-').map(Number);
        vitalFilters.value = {
          [Op.between]: [min, max]
        };
      }

      if (req.query.timeRange) {
        const [startDate, endDate] = req.query.timeRange.split('-');
        vitalFilters.recordedAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const vitals = await Vital.findAll({
        where: vitalFilters,
        order: [['recordedAt', 'DESC']]
      });

      // Calculate vital statistics
      const vitalStats = vitals.reduce((acc, vital) => {
        if (!acc[vital.patientId]) {
          acc[vital.patientId] = {
            lastReading: vital.value,
            min: vital.value,
            max: vital.value,
            sum: vital.value,
            count: 1,
            readings: [vital.value]
          };
        } else {
          acc[vital.patientId].lastReading = vital.value;
          acc[vital.patientId].min = Math.min(acc[vital.patientId].min, vital.value);
          acc[vital.patientId].max = Math.max(acc[vital.patientId].max, vital.value);
          acc[vital.patientId].sum += vital.value;
          acc[vital.patientId].count++;
          acc[vital.patientId].readings.push(vital.value);
        }
        return acc;
      }, {});

      // Calculate trends
      Object.keys(vitalStats).forEach(patientId => {
        const stats = vitalStats[patientId];
        stats.average = stats.sum / stats.count;
        stats.trend = stats.readings.length > 1 ? 
          (stats.readings[stats.readings.length - 1] - stats.readings[0]) / (stats.readings.length - 1) : 0;
      });

      // Combine data
      const enrichedPatients = patients.map(patient => ({
        ...patient.toJSON(),
        vitalStats: vitalStats[patient.id] || null
      }));

      res.json({
        patients: enrichedPatients,
        pagination,
        analytics: {
          totalReadings: vitals.length,
          averageValue: vitals.reduce((acc, curr) => acc + curr.value, 0) / vitals.length,
          abnormalReadings: vitals.filter(v => v.status === 'warning' || v.status === 'critical').length,
          vitalTypes: [...new Set(vitals.map(v => v.type))]
        }
      });
    } catch (error) {
      console.error('Error in getPatientsForVitals:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Fitness
  getPatientsForFitness: async (req, res) => {
    try {
      const { patients, pagination } = await patientController.getFilteredPatients(req, req.query);

      // Get fitness data with advanced filtering
      const fitnessFilters = {
        patientId: {
          [Op.in]: patients.map(p => p.id)
        }
      };

      if (req.query.exerciseType) {
        fitnessFilters.exerciseType = req.query.exerciseType;
      }

      if (req.query.intensity) {
        fitnessFilters.intensity = req.query.intensity;
      }

      if (req.query.timeRange) {
        const [startDate, endDate] = req.query.timeRange.split('-');
        fitnessFilters.recordedAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const fitnessData = await Fitness.findAll({
        where: fitnessFilters,
        order: [['recordedAt', 'DESC']]
      });

      // Calculate fitness statistics
      const fitnessStats = fitnessData.reduce((acc, record) => {
        if (!acc[record.patientId]) {
          acc[record.patientId] = {
            totalDuration: record.duration,
            totalCalories: record.caloriesBurned,
            exerciseTypes: new Set([record.exerciseType]),
            lastActivity: record
          };
        } else {
          acc[record.patientId].totalDuration += record.duration;
          acc[record.patientId].totalCalories += record.caloriesBurned;
          acc[record.patientId].exerciseTypes.add(record.exerciseType);
          acc[record.patientId].lastActivity = record;
        }
        return acc;
      }, {});

      // Combine data
      const enrichedPatients = patients.map(patient => ({
        ...patient.toJSON(),
        fitnessStats: fitnessStats[patient.id] ? {
          ...fitnessStats[patient.id],
          exerciseTypes: Array.from(fitnessStats[patient.id].exerciseTypes)
        } : null
      }));

      res.json({
        patients: enrichedPatients,
        pagination,
        analytics: {
          totalActivities: fitnessData.length,
          averageDuration: fitnessData.reduce((acc, curr) => acc + curr.duration, 0) / fitnessData.length,
          totalCaloriesBurned: fitnessData.reduce((acc, curr) => acc + curr.caloriesBurned, 0),
          exerciseTypes: [...new Set(fitnessData.map(f => f.exerciseType))]
        }
      });
    } catch (error) {
      console.error('Error in getPatientsForFitness:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Nutrition
  getPatientsForNutrition: async (req, res) => {
    try {
      const { patients, pagination } = await patientController.getFilteredPatients(req, req.query);

      // Get nutrition data with advanced filtering
      const nutritionFilters = {
        patientId: {
          [Op.in]: patients.map(p => p.id)
        }
      };

      if (req.query.mealType) {
        nutritionFilters.mealType = req.query.mealType;
      }

      if (req.query.timeRange) {
        const [startDate, endDate] = req.query.timeRange.split('-');
        nutritionFilters.recordedAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const nutritionData = await Nutrition.findAll({
        where: nutritionFilters,
        order: [['recordedAt', 'DESC']]
      });

      // Calculate nutrition statistics
      const nutritionStats = nutritionData.reduce((acc, record) => {
        if (!acc[record.patientId]) {
          acc[record.patientId] = {
            totalCalories: record.calories,
            totalProtein: record.protein,
            totalCarbs: record.carbohydrates,
            totalFat: record.fat,
            mealTypes: new Set([record.mealType]),
            lastMeal: record
          };
        } else {
          acc[record.patientId].totalCalories += record.calories;
          acc[record.patientId].totalProtein += record.protein;
          acc[record.patientId].totalCarbs += record.carbohydrates;
          acc[record.patientId].totalFat += record.fat;
          acc[record.patientId].mealTypes.add(record.mealType);
          acc[record.patientId].lastMeal = record;
        }
        return acc;
      }, {});

      // Combine data
      const enrichedPatients = patients.map(patient => ({
        ...patient.toJSON(),
        nutritionStats: nutritionStats[patient.id] ? {
          ...nutritionStats[patient.id],
          mealTypes: Array.from(nutritionStats[patient.id].mealTypes)
        } : null
      }));

      res.json({
        patients: enrichedPatients,
        pagination,
        analytics: {
          totalMeals: nutritionData.length,
          averageCalories: nutritionData.reduce((acc, curr) => acc + curr.calories, 0) / nutritionData.length,
          averageProtein: nutritionData.reduce((acc, curr) => acc + curr.protein, 0) / nutritionData.length,
          averageCarbs: nutritionData.reduce((acc, curr) => acc + curr.carbohydrates, 0) / nutritionData.length,
          averageFat: nutritionData.reduce((acc, curr) => acc + curr.fat, 0) / nutritionData.length
        }
      });
    } catch (error) {
      console.error('Error in getPatientsForNutrition:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Symptoms
  getPatientsForSymptoms: async (req, res) => {
    try {
      const { patients, pagination } = await patientController.getFilteredPatients(req, req.query);

      // Get symptom data with advanced filtering
      const symptomFilters = {
        patientId: {
          [Op.in]: patients.map(p => p.id)
        }
      };

      if (req.query.symptomName) {
        symptomFilters.symptomName = req.query.symptomName;
      }

      if (req.query.severity) {
        symptomFilters.severity = req.query.severity;
      }

      if (req.query.status) {
        symptomFilters.status = req.query.status;
      }

      if (req.query.timeRange) {
        const [startDate, endDate] = req.query.timeRange.split('-');
        symptomFilters.onset = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const symptoms = await Symptom.findAll({
        where: symptomFilters,
        order: [['onset', 'DESC']]
      });

      // Calculate symptom statistics
      const symptomStats = symptoms.reduce((acc, symptom) => {
        if (!acc[symptom.patientId]) {
          acc[symptom.patientId] = {
            totalSymptoms: 1,
            activeSymptoms: symptom.status !== 'resolved' ? 1 : 0,
            averageSeverity: symptom.severity,
            symptoms: [symptom]
          };
        } else {
          acc[symptom.patientId].totalSymptoms++;
          if (symptom.status !== 'resolved') {
            acc[symptom.patientId].activeSymptoms++;
          }
          acc[symptom.patientId].averageSeverity = 
            (acc[symptom.patientId].averageSeverity * (acc[symptom.patientId].totalSymptoms - 1) + symptom.severity) / 
            acc[symptom.patientId].totalSymptoms;
          acc[symptom.patientId].symptoms.push(symptom);
        }
        return acc;
      }, {});

      // Combine data
      const enrichedPatients = patients.map(patient => ({
        ...patient.toJSON(),
        symptomStats: symptomStats[patient.id] || null
      }));

      res.json({
        patients: enrichedPatients,
        pagination,
        analytics: {
          totalSymptoms: symptoms.length,
          activeSymptoms: symptoms.filter(s => s.status !== 'resolved').length,
          averageSeverity: symptoms.reduce((acc, curr) => acc + curr.severity, 0) / symptoms.length,
          symptomTypes: [...new Set(symptoms.map(s => s.symptomName))]
        }
      });
    } catch (error) {
      console.error('Error in getPatientsForSymptoms:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Mental Health
  getPatientsForMentalHealth: async (req, res) => {
    try {
      const { patients, pagination } = await patientController.getFilteredPatients(req, req.query);

      // Get mental health data with advanced filtering
      const mentalHealthFilters = {
        patientId: {
          [Op.in]: patients.map(p => p.id)
        }
      };

      if (req.query.timeRange) {
        const [startDate, endDate] = req.query.timeRange.split('-');
        mentalHealthFilters.recordedAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const mentalHealthData = await MentalHealth.findAll({
        where: mentalHealthFilters,
        order: [['recordedAt', 'DESC']]
      });

      // Calculate mental health statistics
      const mentalHealthStats = mentalHealthData.reduce((acc, record) => {
        if (!acc[record.patientId]) {
          acc[record.patientId] = {
            averageMood: this.calculateMoodScore(record.mood),
            averageAnxiety: record.anxietyLevel,
            averageDepression: record.depressionLevel,
            averageStress: record.stressLevel,
            sleepQuality: record.sleepQuality,
            records: [record]
          };
        } else {
          acc[record.patientId].averageMood = 
            (acc[record.patientId].averageMood * acc[record.patientId].records.length + this.calculateMoodScore(record.mood)) / 
            (acc[record.patientId].records.length + 1);
          acc[record.patientId].averageAnxiety = 
            (acc[record.patientId].averageAnxiety * acc[record.patientId].records.length + record.anxietyLevel) / 
            (acc[record.patientId].records.length + 1);
          acc[record.patientId].averageDepression = 
            (acc[record.patientId].averageDepression * acc[record.patientId].records.length + record.depressionLevel) / 
            (acc[record.patientId].records.length + 1);
          acc[record.patientId].averageStress = 
            (acc[record.patientId].averageStress * acc[record.patientId].records.length + record.stressLevel) / 
            (acc[record.patientId].records.length + 1);
          acc[record.patientId].sleepQuality = record.sleepQuality;
          acc[record.patientId].records.push(record);
        }
        return acc;
      }, {});

      // Combine data
      const enrichedPatients = patients.map(patient => ({
        ...patient.toJSON(),
        mentalHealthStats: mentalHealthStats[patient.id] || null
      }));

      res.json({
        patients: enrichedPatients,
        pagination,
        analytics: {
          totalRecords: mentalHealthData.length,
          averageMood: mentalHealthData.reduce((acc, curr) => acc + this.calculateMoodScore(curr.mood), 0) / mentalHealthData.length,
          averageAnxiety: mentalHealthData.reduce((acc, curr) => acc + curr.anxietyLevel, 0) / mentalHealthData.length,
          averageDepression: mentalHealthData.reduce((acc, curr) => acc + curr.depressionLevel, 0) / mentalHealthData.length,
          averageStress: mentalHealthData.reduce((acc, curr) => acc + curr.stressLevel, 0) / mentalHealthData.length
        }
      });
    } catch (error) {
      console.error('Error in getPatientsForMentalHealth:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Helper method to calculate mood score
  calculateMoodScore: (mood) => {
    const moodScores = {
      very_happy: 5,
      happy: 4,
      neutral: 3,
      sad: 2,
      very_sad: 1
    };
    return moodScores[mood] || 3;
  },

  // Preventive Care
  getPatientsForPreventiveCare: async (req, res) => {
    try {
      const { patients, pagination } = await patientController.getFilteredPatients(req, req.query);

      // Get preventive care data with advanced filtering
      const preventiveCareFilters = {
        patientId: {
          [Op.in]: patients.map(p => p.id)
        }
      };

      if (req.query.screeningType) {
        preventiveCareFilters.screeningType = req.query.screeningType;
      }

      if (req.query.status) {
        preventiveCareFilters.status = req.query.status;
      }

      const preventiveCareData = await PreventiveCare.findAll({
        where: preventiveCareFilters,
        order: [['screeningDate', 'DESC']]
      });

      // Calculate preventive care statistics
      const preventiveCareStats = preventiveCareData.reduce((acc, record) => {
        if (!acc[record.patientId]) {
          acc[record.patientId] = {
            totalScreenings: 1,
            upToDateScreenings: record.status === 'up_to_date' ? 1 : 0,
            dueScreenings: record.status === 'due' ? 1 : 0,
            overdueScreenings: record.status === 'overdue' ? 1 : 0,
            screenings: [record]
          };
        } else {
          acc[record.patientId].totalScreenings++;
          if (record.status === 'up_to_date') acc[record.patientId].upToDateScreenings++;
          if (record.status === 'due') acc[record.patientId].dueScreenings++;
          if (record.status === 'overdue') acc[record.patientId].overdueScreenings++;
          acc[record.patientId].screenings.push(record);
        }
        return acc;
      }, {});

      // Combine data
      const enrichedPatients = patients.map(patient => ({
        ...patient.toJSON(),
        preventiveCareStats: preventiveCareStats[patient.id] || null
      }));

      res.json({
        patients: enrichedPatients,
        pagination,
        analytics: {
          totalScreenings: preventiveCareData.length,
          upToDateScreenings: preventiveCareData.filter(s => s.status === 'up_to_date').length,
          dueScreenings: preventiveCareData.filter(s => s.status === 'due').length,
          overdueScreenings: preventiveCareData.filter(s => s.status === 'overdue').length,
          screeningTypes: [...new Set(preventiveCareData.map(s => s.screeningType))]
        }
      });
    } catch (error) {
      console.error('Error in getPatientsForPreventiveCare:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Goals
  getPatientsForGoals: async (req, res) => {
    try {
      const { patients, pagination } = await patientController.getFilteredPatients(req, req.query);

      // Get goals data with advanced filtering
      const goalFilters = {
        patientId: {
          [Op.in]: patients.map(p => p.id)
        }
      };

      if (req.query.category) {
        goalFilters.category = req.query.category;
      }

      if (req.query.status) {
        goalFilters.status = req.query.status;
      }

      if (req.query.priority) {
        goalFilters.priority = req.query.priority;
      }

      const goals = await Goal.findAll({
        where: goalFilters,
        order: [['targetDate', 'ASC']]
      });

      // Calculate goal statistics
      const goalStats = goals.reduce((acc, goal) => {
        if (!acc[goal.patientId]) {
          acc[goal.patientId] = {
            totalGoals: 1,
            completedGoals: goal.status === 'completed' ? 1 : 0,
            inProgressGoals: goal.status === 'in_progress' ? 1 : 0,
            averageProgress: goal.progress,
            goals: [goal]
          };
        } else {
          acc[goal.patientId].totalGoals++;
          if (goal.status === 'completed') acc[goal.patientId].completedGoals++;
          if (goal.status === 'in_progress') acc[goal.patientId].inProgressGoals++;
          acc[goal.patientId].averageProgress = 
            (acc[goal.patientId].averageProgress * (acc[goal.patientId].totalGoals - 1) + goal.progress) / 
            acc[goal.patientId].totalGoals;
          acc[goal.patientId].goals.push(goal);
        }
        return acc;
      }, {});

      // Combine data
      const enrichedPatients = patients.map(patient => ({
        ...patient.toJSON(),
        goalStats: goalStats[patient.id] || null
      }));

      res.json({
        patients: enrichedPatients,
        pagination,
        analytics: {
          totalGoals: goals.length,
          completedGoals: goals.filter(g => g.status === 'completed').length,
          inProgressGoals: goals.filter(g => g.status === 'in_progress').length,
          averageProgress: goals.reduce((acc, curr) => acc + curr.progress, 0) / goals.length,
          goalCategories: [...new Set(goals.map(g => g.category))]
        }
      });
    } catch (error) {
      console.error('Error in getPatientsForGoals:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Advanced analytics for patients
  getPatientAnalytics: async (req, res) => {
    try {
      const { status, ageRange, gender, lastVisitRange } = req.query;
      const where = {};
      if (status) where.status = status;
      if (gender) where.gender = gender;
      if (ageRange) {
        const [minAge, maxAge] = ageRange.split('-').map(Number);
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - maxAge);
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - minAge);
        where.dateOfBirth = { [Op.between]: [minDate, maxDate] };
      }
      if (lastVisitRange) {
        const [startDate, endDate] = lastVisitRange.split('-');
        where.lastVisitDate = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      }
      const total = await Patient.count({ where });
      const byStatus = await Patient.findAll({
        where,
        attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
        group: ['status']
      });
      const byGender = await Patient.findAll({
        where,
        attributes: ['gender', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
        group: ['gender']
      });
      const avgAge = await Patient.findAll({
        where,
        attributes: [[Sequelize.fn('AVG', Sequelize.literal(`EXTRACT(YEAR FROM AGE(NOW(), "dateOfBirth"))`)), 'avgAge']]
      });
      res.json({
        total,
        byStatus,
        byGender,
        avgAge: avgAge[0]?.dataValues?.avgAge || null
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // AI insights for patients
  getPatientAIInsights: async (req, res) => {
    try {
      const { patientId } = req.query;
      if (!patientId) return res.status(400).json({ error: 'patientId required' });
      const patient = await Patient.findByPk(patientId);
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      // Example: Use recent vitals, wellness, prescriptions, etc. for insights
      const vitals = await Vital.findAll({ where: { patientId }, order: [['recordedAt', 'DESC']], limit: 5 });
      const prescriptions = await Prescription.findAll({ where: { patientId }, order: [['createdAt', 'DESC']], limit: 5 });
      // Simple AI logic (replace with real AI as needed)
      const tips = [];
      if (vitals.some(v => v.value > 140 && v.type === 'systolicBP')) {
        tips.push({ type: 'bp', message: 'Elevated blood pressure detected. Consider lifestyle changes.' });
      }
      if (prescriptions.some(p => p.status === 'due')) {
        tips.push({ type: 'medication', message: 'Medication refill is due soon.' });
      }
      res.json({
        patterns: {
          recentVitals: vitals,
          recentPrescriptions: prescriptions
        },
        tips
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Alerts for patients
  getPatientAlerts: async (req, res) => {
    try {
      const { patientId } = req.query;
      if (!patientId) return res.status(400).json({ error: 'patientId required' });
      const alerts = [];
      // Example: Due invoices
      const dueInvoices = await require('../models').Billing.findAll({ where: { patientId, status: 'overdue' } });
      if (dueInvoices.length > 0) {
        alerts.push({ type: 'billing', message: `${dueInvoices.length} overdue invoice(s).`, severity: 'critical' });
      }
      // Example: Medication refills
      const duePrescriptions = await Prescription.findAll({ where: { patientId, status: 'due' } });
      if (duePrescriptions.length > 0) {
        alerts.push({ type: 'prescription', message: `${duePrescriptions.length} medication refill(s) due.`, severity: 'warning' });
      }
      // Example: Critical vitals
      const recentVitals = await Vital.findAll({ where: { patientId }, order: [['recordedAt', 'DESC']], limit: 5 });
      if (recentVitals.some(v => v.value > 180 && v.type === 'systolicBP')) {
        alerts.push({ type: 'vital', message: 'Critical blood pressure reading detected.', severity: 'critical' });
      }
      res.json({ alerts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = patientController; 