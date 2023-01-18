// Fichier controllers/user.js
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const connection = require('./db');
const jwt = require('jsonwebtoken')


const saltRounds = 10;
const secret = 'mon_jeton_secret';

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

const login = (req, res) => {
    // Récupération des données envoyées dans la requête
    const { mail, password } = req.body;
  
    // Vérifier que tous les champs obligatoires ont été remplis
    if (!mail || !password) {
      return res.status(400).json({ msg: 'Veuillez remplir tous les champs obligatoires' });
    }
  
    // Vérifier que l'utilisateur existe
    const sql = 'SELECT * FROM users WHERE mail = ?';
    connection.query(sql, [mail], (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length === 0) {
        return res.status(400).json({ msg: 'Cet utilisateur n\'existe pas' });
      }
  
      // Si l'utilisateur existe, vérifier que le mot de passe est correct
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (!isMatch) {
          return res.status(400).json({ msg: 'Mot de passe incorrect' });
        }
  
        // Si le mot de passe est correct, générer un token de connexion
        jwt.sign(
          { id: user.id },
          secret,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({
              token,
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
              },
            });
          },
        );
      });
    });
  };

module.exports = {
    register,
    login,
  };