const Absence = require('../models/absence.model');

module.exports = {
  // Récupérer toutes les absences (avec les infos de l'élève)
  getAll: async (req, res) => {
    try {
      const absences = await Absence.find().populate('student', 'firstName lastName');
      res.status(200).json(absences);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Créer une absence
  create: async (req, res) => {
    try {
      const absence = new Absence(req.body);
      await absence.save();
      res.status(201).json(absence);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Modifier une absence
  update: async (req, res) => {
    try {
      const absence = await Absence.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
      );
      res.status(200).json(absence);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Supprimer une absence
  remove: async (req, res) => {
    try {
      await Absence.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Absence supprimée' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
