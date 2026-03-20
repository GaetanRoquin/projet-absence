const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Dashboard Absentéisme – Lycée Descartes',
      version: '1.0.0',
      description: 'Documentation de toutes les routes de l\'API',
    },
    servers: [
      { url: 'http://localhost:3001/api', description: 'Serveur local' }
    ],
  },
  // Fichiers où Swagger va lire les commentaires JSDoc
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);