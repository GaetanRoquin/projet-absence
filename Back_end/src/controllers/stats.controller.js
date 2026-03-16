const Absence = require('../models/absence.model');

module.exports = {
  // Statistiques globales
  getGlobal: async (req, res) => {
    try {
      const total = await Absence.countDocuments();
      const totalHeures = await Absence.aggregate([
        { $group: { _id: null, sum: { $sum: '$duration' } } }
      ]);
      const justifiees = await Absence.countDocuments({ justifie: true });

      res.json({
        totalAbsences: total,
        totalHeures: totalHeures[0]?.sum || 0,
        pourcentageJustifiees: total > 0 ? Math.round((justifiees / total) * 100) : 0,
        moyenneParEleve: 0  // à affiner avec aggregate
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
        { $lookup: { from: 'student', localField: '_id',
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
        { $group: { _id: '$classeroom', count: { $sum: 1 },
                    totalHeures: { $sum: '$durartion' } } },
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
        { $group: { _id: '$subject', count: { $sum: 1 } } },
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
