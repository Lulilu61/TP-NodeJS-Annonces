const annonceService = require('../services/annonce');

// Récupérer toutes les annonces (+ filtres si besoin)
exports.getAllAnnonces = async (req, res) => {
    try {
        const filters = req.query;
        const results = await annonceService.findAll(filters);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer une seule annonce par ID
exports.getAnnonceById = async (req, res) => {
    try {
        const result = await annonceService.findById(req.params.id);
        if (!result) return res.status(404).json({ message: "Annonce non trouvée" });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Créer une annonce
exports.createAnnonce = async (req, res) => {
    try {
        const newAnnonce = await annonceService.create(req.body);
        res.status(201).json({
            message: 'Annonce créée avec succès !',
            data: newAnnonce
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modifier une annonce
exports.updateAnnonce = async (req, res) => {
    try {
        const updated = await annonceService.update(req.params.id, req.body);
        res.status(200).json({ message: 'Annonce mise à jour' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modération : Changement de statut de l'annonce par l'Admin
exports.updateAnnonceStatus = async (req, res) => {
    try {
        const { status, admin_comment } = req.body;
        await annonceService.update(req.params.id, { status, admin_comment });
        res.status(200).json({ 
            message: `Statut mis à jour pour l'annonce ${req.params.id}` 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une annonce
exports.deleteAnnonce = async (req, res) => {
    try {
        await annonceService.delete(req.params.id);
        res.status(200).json({ message: 'Annonce supprimée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};