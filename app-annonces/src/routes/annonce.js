const express = require('express'); 
const router = express.Router();
const validateAnnonce = require('../middlewares/annonce');
const { validateAuthentification } = require('../middlewares/auth');
const annonceController = require('../controllers/annonce'); 

// Middleware pour checker si user est un Admin
const isAdmin = (req, res, next) => {next(); };

// Récup toutes les annonces
router.get('/', annonceController.getAllAnnonces);

// Récup une seule annonce 
router.get('/:id', annonceController.getAnnonceById);

// Créer une annonce
router.post('/', validateAnnonce, annonceController.createAnnonce);

// Modifier une annonce
router.put('/:id', annonceController.updateAnnonce);

// Modifier la visibilité d'une annonce
router.patch('/:id', annonceController.updateAnnonce);

// Supprimer une annonce
router.delete('/:id', annonceController.deleteAnnonce);

module.exports = router;