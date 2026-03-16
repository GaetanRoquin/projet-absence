const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/stats.controller');

router.get('/', (req, res)=>{
    res.status(200).json({message:'Routes stats ok !'})
});

// GET /api/statistiques/global
router.get('/global', ctrl.getGlobal);

// GET /api/statistiques/high-risk
router.get('/high-risk', ctrl.getHighRisk);

// GET /api/statistiques/by-classe
router.get('/by-classeroom', ctrl.getByClasse);

// GET /api/statistiques/by-matiere
router.get('/by-subject', ctrl.getByMatiere);

// GET /api/statistiques/monthly
router.get('/monthly', ctrl.getMonthly);

module.exports = router;
