const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/absence.controller');
const { requireFields } = require('../middlewares/validation.middleware');

// GET toutes les absences
router.get('/', (req, res)=>{
    res.status(200).json({message:'Routes absence ok !'})
});
router.get('/', ctrl.getAll);

// POST créer une absence
router.post('/', requireFields(['student', 'subject', 'classeroom', 'date', 'duration']), ctrl.create);

// PUT modifier une absence par _id
router.put('/:id', ctrl.update);

// DELETE supprimer une absence par _id
router.delete('/:id', ctrl.remove);

module.exports = router;