// Fichier db.js
const mysql = require('mysql2');

require('dotenv').config();

// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// Vérifier la connexion
connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion : ' + err.stack);
      return;
    }
    console.log('Connecté à la base de données avec ID ' + connection.threadId);
  });
module.exports = connection;