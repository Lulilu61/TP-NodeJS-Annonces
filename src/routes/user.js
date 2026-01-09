const express = require('express');
const router = express.Router();
const userServices = require('../services/user');

// Créer un compte (Inscription)
router.post('/register', userServices.registerUser);

// Voir un profil
router.get('/:id', userServices.getProfile);

// Modifier les informations d'un profil
router.put('/:id', userServices.updateProfile);

module.exports = router;