const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/student.controller');
const { requireFields } = require('../middlewares/validation.middleware');

/**
 * @swagger
 * tags:
 *   name: Élèves
 *   description: Gestion des élèves
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Récupérer tous les élèves
 *     tags: [Élèves]
 *     responses:
 *       200:
 *         description: Liste de tous les élèves avec leur classe
 *         content:
 *           application/json:
 *             example:
 *               - _id: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                 firstName: "Alice"
 *                 lastName: "Martin"
 *                 sexe: "F"
 *                 classeroom:
 *                   name: "3ème A"
 *                   level: "3ème"
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Créer un nouvel élève
 *     tags: [Élèves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, classeroom]
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Alice"
 *               lastName:
 *                 type: string
 *                 example: "Martin"
 *               classeroom:
 *                 type: string
 *                 description: ID MongoDB de la classe
 *                 example: "64f1a2b3c4d5e6f7a8b9c0d1"
 *               sexe:
 *                 type: string
 *                 enum: [M, F]
 *                 example: "F"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2008-05-12"
 *     responses:
 *       201:
 *         description: Élève créé avec succès
 *       400:
 *         description: Champs manquants
 */
router.post('/', requireFields(['firstName', 'lastName', 'classeroom']), ctrl.create);

module.exports = router;
