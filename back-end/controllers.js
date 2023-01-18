// Fichier controllers/user.js
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const connection = require('./db');

const saltRounds = 10;


// Création de compte
const register = (req, res) => {
    // Récupération des données envoyées dans la requête
    const {mail, password} = req.body;
  
    // Vérifier que tous les champs obligatoires ont été remplis
    if (!mail || !password) {
      return res.status(400).json({ msg: 'Veuillez remplir tous les champs obligatoires' });
    }
  
    // Vérifier que l'utilisateur n'existe pas déjà
    connection.query('SELECT * FROM users WHERE mail = ?', [mail], (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length > 0) {
        return res.status(400).json({ msg: 'Cet utilisateur existe déjà' });
      }
  
      // Si l'utilisateur n'existe pas, le créer
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          throw err;
        }
        connection.query(`INSERT INTO users (id, password, mail) VALUES(NULL, ?,?)`, [hash, mail], (err, result) => {
          if (err) { 
            throw err;
          }
          res.json({ msg: 'Utilisateur créé' });
        });
      });
  
  });
}; 

module.exports = {
    register,
  };