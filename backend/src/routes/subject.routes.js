const express = require('express');
const router = express.Router();
const Subject = require('../models/subject.model');

/**
 * @swagger
 * tags:
 *   name: Matières
 *   description: Gestion des matières
 */

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Récupérer toutes les matières
 *     tags: [Matières]
 *     responses:
 *       200:
 *         description: Liste de toutes les matières
 *         content:
 *           application/json:
 *             example:
 *               - _id: "64f1a2b3c4d5e6f7a8b9c0d1"
 *                 name: "Maths"
 *                 coef: "4"
 */
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
