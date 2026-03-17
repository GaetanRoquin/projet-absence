// Chargement des variables d'environnement depuis .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Import des routes
const absencesRoutes = require('./routes/absence.routes');
const statsRoutes = require('./routes/stats.routes');

// Middleware CORS : autoriser tout pour l'instant
app.use(cors({
  origin: 'http://localhost:3000', // frontend
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour parser le JSON
app.use(express.json());

// Déclaration des routes
app.use('/api/absences', absencesRoutes);
app.use('/api/statistiques', statsRoutes);

// Connexion MongoDB puis démarrage du serveur
const mongoURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}`;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connecté !');
    app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
  })
  .catch(err => console.error('Erreur MongoDB :', err));