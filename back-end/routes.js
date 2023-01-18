const express = require('express');
const router = express.Router();
const userController = require('./controllers');


// Route de création de compte
router.post('/register', userController.register);
router.post('/login', userController.login)

module.exports = router;