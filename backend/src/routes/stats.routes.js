const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/stats.controller');

/**
 * @swagger
 * tags:
 *   name: Statistiques
 *   description: Endpoints de statistiques pour le dashboard
 */

/**
 * @swagger
 * /statistiques/global:
 *   get:
 *     summary: Statistiques globales
 *     tags: [Statistiques]
 *     responses:
 *       200:
 *         description: Totaux globaux du lycée
 *         content:
 *           application/json:
 *             example:
 *               totalAbsences: 200
 *               totalHeures: 697
 *               pourcentageJustifiees: 42
 *               moyenneParEleve: 0
 */
router.get('/global', ctrl.getGlobal);

/**
 * @swagger
 * /statistiques/high-risk:
 *   get:
 *     summary: Élèves à risque (seuil d'heures d'absence dépassé)
 *     tags: [Statistiques]
 *     parameters:
 *       - in: query
 *         name: seuil
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Seuil d'heures d'absence à partir duquel un élève est considéré à risque
 *     responses:
 *       200:
 *         description: Liste des élèves dépassant le seuil, triés par heures décroissantes
 *         content:
 *           application/json:
 *             example:
 *               - _id: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                 totalHeures: 24
 *                 studentInfo:
 *                   firstName: "Alice"
 *                   lastName: "Martin"
 */
router.get('/high-risk', ctrl.getHighRisk);

/**
 * @swagger
 * /statistiques/by-classeroom:
 *   get:
 *     summary: Nombre d'absences par classe
 *     tags: [Statistiques]
 *     responses:
 *       200:
 *         description: Liste des classes avec leur nombre d'absences et heures cumulées
 *         content:
 *           application/json:
 *             example:
 *               - _id: "3ème A"
 *                 count: 45
 *                 totalHeures: 132
 */
router.get('/by-classeroom', ctrl.getByClasse);

/**
 * @swagger
 * /statistiques/by-subject:
 *   get:
 *     summary: Nombre d'absences par matière
 *     tags: [Statistiques]
 *     responses:
 *       200:
 *         description: Liste des matières avec leur nombre d'absences
 *         content:
 *           application/json:
 *             example:
 *               - _id: "Maths"
 *                 count: 38
 */
router.get('/by-subject', ctrl.getByMatiere);

/**
 * @swagger
 * /statistiques/monthly:
 *   get:
 *     summary: Évolution mensuelle des absences
 *     tags: [Statistiques]
 *     responses:
 *       200:
 *         description: Nombre d'absences regroupées par mois
 *         content:
 *           application/json:
 *             example:
 *               - _id:
 *                   mois: 1
 *                   annee: 2024
 *                 count: 18
 */
router.get('/monthly', ctrl.getMonthly);

module.exports = router;
