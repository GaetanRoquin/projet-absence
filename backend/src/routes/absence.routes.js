const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/absence.controller');
const { requireFields } = require('../middlewares/validation.middleware');

/**
 * @swagger
 * tags:
 *   name: Absences
 *   description: Gestion des absences
 */

/**
 * @swagger
 * /absences:
 *   get:
 *     summary: Récupérer toutes les absences
 *     tags: [Absences]
 *     responses:
 *       200:
 *         description: Liste de toutes les absences avec élève, classe et matière
 *         content:
 *           application/json:
 *             example:
 *               - _id: "abc123"
 *                 student:
 *                   firstName: "Alice"
 *                   lastName: "Martin"
 *                   classeroom:
 *                     name: "3ème A"
 *                 subject:
 *                   name: "Maths"
 *                 date: "2024-03-15"
 *                 duration: 2
 *                 reason: "maladie"
 *                 justification: true
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /absences:
 *   post:
 *     summary: Créer une nouvelle absence
 *     tags: [Absences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [student, subject, date, duration]
 *             properties:
 *               student:
 *                 type: string
 *                 description: ID MongoDB de l'élève
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *               subject:
 *                 type: string
 *                 description: ID MongoDB de la matière
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d2"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-15"
 *               duration:
 *                 type: number
 *                 description: Durée en heures
 *                 example: 2
 *               reason:
 *                 type: string
 *                 enum: [maladie, non_justifiee, rdv, autre]
 *                 example: "maladie"
 *               justification:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Absence créée avec succès
 *       400:
 *         description: Champs manquants
 */
router.post('/', requireFields(['student', 'subject', 'date', 'duration']), ctrl.create);

/**
 * @swagger
 * /absences/{id}:
 *   put:
 *     summary: Modifier une absence
 *     tags: [Absences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID MongoDB de l'absence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               justification:
 *                 type: boolean
 *               reason:
 *                 type: string
 *               duration:
 *                 type: number
 *     responses:
 *       200:
 *         description: Absence modifiée
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', ctrl.update);

/**
 * @swagger
 * /absences/{id}:
 *   delete:
 *     summary: Supprimer une absence
 *     tags: [Absences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID MongoDB de l'absence
 *     responses:
 *       200:
 *         description: Absence supprimée
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
