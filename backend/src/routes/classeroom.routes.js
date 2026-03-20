const express = require('express');
const router = express.Router();
const Classeroom = require('../models/classeroom.model');

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Gestion des classes
 */

/**
 * @swagger
 * /classerooms:
 *   get:
 *     summary: Récupérer toutes les classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: Liste de toutes les classes
 *         content:
 *           application/json:
 *             example:
 *               - _id: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                 name: "3ème A"
 *                 level: "3ème"
 *                 headTeacher: "M. Dupuis"
 */
router.get('/', async (req, res) => {
  try {
    const classerooms = await Classeroom.find().sort({ name: 1 });
    res.status(200).json(classerooms);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
