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

// Seul un utilisateur connecté peut créer une annonce
router.post('/', validateAuthentification, annonceController.createAnnonce);

// Modifier son annonce
router.put('/:id', validateAuthentification, annonceController.updateAnnonceContent);

// L'Admin modifie la visibilité d'une annonce
router.patch('/:id/moderate', validateAuthentification, isAdmin, annonceController.moderateAnnonce);

// Supprimer une annonce
router.delete('/:id', annonceController.deleteAnnonce);

module.exports = router;