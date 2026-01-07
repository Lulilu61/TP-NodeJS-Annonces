const express = require('express'); 
const router = express.Router();
const validateAnnonce = require('../middlewares/annonce');
const annonceController = require('../controllers/annonce'); 

// Middleware pour checker si user est un Admin
const isAdmin = (req, res, next) => { /* check role */ next(); };

// Récup toutes les annonces
router.get('/', annonceController.getAllAnnonces);

// Récup une seule annonce 
router.get('/:id', annonceController.getAnnonceById);

// Créer une annonce
router.post('/', validateAnnonce, annonceController.createAnnonce);

// Modifier la visibilité d'une annonce
router.patch('/:id/status', isAdmin, annonceController.updateAnnonceStatus);

// Supprimer une annonce
router.delete('/:id', annonceController.deleteAnnonce);

module.exports = router;