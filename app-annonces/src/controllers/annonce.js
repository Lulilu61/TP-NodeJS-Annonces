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
        const { id } = req.params;

        const annonce = await annonceService.findById(id);
        if (!annonce) {
            return res.status(404).json({ message: "Désolé, cette annonce n'existe pas." });
        }

        await annonceService.update(id, req.body);
        
        res.status(200).json({ 
            message: "L'annonce a été mise à jour !",
            data: req.body
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