const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Importer les routes du backend
const userRoutes = require('./routes');

// Utiliser les routes du backend
app.use(express.json());
app.use('/api/user', userRoutes);

// Écouter les requêtes sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});