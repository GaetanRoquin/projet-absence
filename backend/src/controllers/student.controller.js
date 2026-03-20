const Student = require('../models/student.model');

module.exports = {

  // Récupérer tous les élèves
  getAll: async (req, res) => {
    try {
      const students = await Student.find().populate('classeroom');
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Créer un élève
  create: async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      const populated = await student.populate('classeroom');
      res.status(201).json(populated);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};