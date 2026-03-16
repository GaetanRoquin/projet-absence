// Chargement des variables d'environnement depuis .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Import des routes
const absencesRoutes = require('./routes/absence.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour parser le JSON
app.use(express.json());

// Autoriser les requêtes du frontend (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Déclaration des routes
app.use('/api/absences', absencesRoutes);
app.use('/api/stats', statsRoutes);

// Connexion MongoDB puis démarrage du serveur
const mongoURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}`;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connecté !');
    app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
  })
  .catch(err => console.error('Erreur MongoDB :', err));
