const { MedicalNote, Patient, User } = require('../models');
const { Op } = require('sequelize');

const medicalNoteController = {
  // Create a new medical note
  async createNote(req, res) {
    try {
      const note = await MedicalNote.create(req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all notes with filters
  async getNotes(req, res) {
    try {
      const {
        patientId,
        doctorId,
        type,
        status,
        startDate,
        endDate
      } = req.query;

      const where = {};
      if (patientId) where.patientId = patientId;
      if (doctorId) where.doctorId = doctorId;
      if (type) where.type = type;
      if (status) where.status = status;
      if (startDate && endDate) {
        where.recordedAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const notes = await MedicalNote.findAll({
        where,
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] },
          { model: User, as: 'doctor', attributes: ['firstName', 'lastName', 'specialization'] }
        ],
        order: [['recordedAt', 'DESC']]
      });

      res.json(notes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get note by ID
  async getNote(req, res) {
    try {
      const note = await MedicalNote.findByPk(req.params.id, {
        include: [
          { model: Patient, attributes: ['firstName', 'lastName', 'mrn'] },
          { model: User, as: 'doctor', attributes: ['firstName', 'lastName', 'specialization'] }
        ]
      });
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update note
  async updateNote(req, res) {
    try {
      const note = await MedicalNote.findByPk(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }

      // Create a new version of the note
      const newNote = await note.createNewVersion(req.body);
      res.json(newNote);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete note
  async deleteNote(req, res) {
    try {
      const deleted = await MedicalNote.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get note analytics
  async getNoteAnalytics(req, res) {
    try {
      const { patientId, doctorId, startDate, endDate } = req.query;
      
      const where = {};
      if (patientId) where.patientId = patientId;
      if (doctorId) where.doctorId = doctorId;
      if (startDate && endDate) {
        where.recordedAt = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      const notes = await MedicalNote.findAll({ where });

      const analytics = {
        totalNotes: notes.length,
        byType: notes.reduce((acc, note) => {
          acc[note.type] = (acc[note.type] || 0) + 1;
          return acc;
        }, {}),
        byStatus: notes.reduce((acc, note) => {
          acc[note.status] = (acc[note.status] || 0) + 1;
          return acc;
        }, {}),
        averageLength: notes.reduce((acc, note) => acc + note.content.length, 0) / notes.length,
        followUpRate: notes.filter(note => note.followUpRequired).length / notes.length,
        diagnosisFrequency: notes.reduce((acc, note) => {
          note.diagnosis?.forEach(dx => {
            acc[dx] = (acc[dx] || 0) + 1;
          });
          return acc;
        }, {})
      };

      res.json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get AI insights for notes
  async getNoteInsights(req, res) {
    try {
      const { patientId } = req.query;
      
      const notes = await MedicalNote.findAll({
        where: { patientId },
        order: [['recordedAt', 'DESC']],
        limit: 10
      });

      const insights = {
        patterns: {
          commonDiagnoses: notes.reduce((acc, note) => {
            note.diagnosis?.forEach(dx => {
              acc[dx] = (acc[dx] || 0) + 1;
            });
            return acc;
          }, {}),
          followUpRate: notes.filter(note => note.followUpRequired).length / notes.length,
          averageNoteLength: notes.reduce((acc, note) => acc + note.content.length, 0) / notes.length
        },
        recommendations: []
      };

      // Generate AI-driven recommendations
      if (insights.patterns.followUpRate > 0.5) {
        insights.recommendations.push({
          type: 'follow_up_management',
          message: 'High follow-up rate detected. Consider implementing a systematic follow-up tracking system.',
          priority: 'high'
        });
      }

      // Analyze common diagnoses for potential patterns
      const topDiagnoses = Object.entries(insights.patterns.commonDiagnoses)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);

      if (topDiagnoses.length > 0) {
        insights.recommendations.push({
          type: 'diagnosis_pattern',
          message: `Most common diagnoses: ${topDiagnoses.map(([dx]) => dx).join(', ')}. Consider reviewing treatment plans.`,
          priority: 'medium'
        });
      }

      res.json(insights);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = medicalNoteController; 