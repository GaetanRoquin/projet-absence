const Absence = require('../models/absence.model');

module.exports = {

  // Statistiques globales
  getGlobal: async (req, res) => {
    try {
      const total = await Absence.countDocuments();
      const totalHeures = await Absence.aggregate([
        { $group: { _id: null, sum: { $sum: '$duration' } } }
      ]);
      // ✅ CORRIGÉ : 'justifie' → 'justification'
      const justifiees = await Absence.countDocuments({ justification: true });

      res.json({
        totalAbsences: total,
        totalHeures: totalHeures[0]?.sum || 0,
        pourcentageJustifiees: total > 0 ? Math.round((justifiees / total) * 100) : 0,
        moyenneParEleve: 0
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Élèves à risque (> 10h d'absence)
  getHighRisk: async (req, res) => {
    try {
      const seuil = parseInt(req.query.seuil) || 10;
      const result = await Absence.aggregate([
        { $group: { _id: '$student', totalHeures: { $sum: '$duration' } } },
        { $match: { totalHeures: { $gt: seuil } } },
        // ✅ CORRIGÉ : 'student' → 'students' (MongoDB met le nom en pluriel)
        { $lookup: { from: 'students', localField: '_id',
                     foreignField: '_id', as: 'studentInfo' } },
        { $unwind: '$studentInfo' },
        { $sort: { totalHeures: -1 } }
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Absences par classe
  getByClasse: async (req, res) => {
    try {
      const result = await Absence.aggregate([
        // ✅ CORRIGÉ : classeroom est un ObjectId, lookup pour avoir le nom
        { $lookup: { from: 'students', localField: 'student',
                     foreignField: '_id', as: 'studentInfo' } },
        { $unwind: '$studentInfo' },
        { $lookup: { from: 'classerooms', localField: 'studentInfo.classeroom',
                     foreignField: '_id', as: 'classeroomInfo' } },
        { $unwind: '$classeroomInfo' },
        { $group: {
            _id: '$classeroomInfo.name',
            count: { $sum: 1 },
            // ✅ CORRIGÉ : faute de frappe 'durartion' → 'duration'
            totalHeures: { $sum: '$duration' }
        }},
        { $sort: { count: -1 } }
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Absences par matière
  getByMatiere: async (req, res) => {
    try {
      const result = await Absence.aggregate([
        // ✅ CORRIGÉ : subject est un ObjectId, lookup pour avoir le nom
        { $lookup: { from: 'subjects', localField: 'subject',
                     foreignField: '_id', as: 'subjectInfo' } },
        { $unwind: '$subjectInfo' },
        { $group: {
            _id: '$subjectInfo.name',
            count: { $sum: 1 }
        }},
        { $sort: { count: -1 } }
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Évolution mensuelle
  getMonthly: async (req, res) => {
    try {
      const result = await Absence.aggregate([
        { $group: {
          _id: { mois: { $month: '$date' }, annee: { $year: '$date' } },
          count: { $sum: 1 }
        }},
        { $sort: { '_id.annee': 1, '_id.mois': 1 } }
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};