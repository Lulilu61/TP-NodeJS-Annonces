const express = require('express'); 
const router = express.Router();
const validateAnnonce = require('../middlewares/annonces');
const services = require('../services/annonces');

// Lire toutes les annonces
router.get('/', services.getAllAnnonces);

// Lire une seule annonce 
router.get('/:id', services.getAnnonceById);

// Créer une annonce
router.post('/', validateAnnonce, services.createAnnonce);

// Modifier une annonce
router.put('/:id', validateAnnonce, services.updateAnnonce);

// Modifier la visibilité d'une annonce
router.patch('/:id/status', isAdmin, services.updateAnnonceStatus);

// Supprimer une annonce
router.delete('/:id', services.deleteAnnonce);

module.exports = router;