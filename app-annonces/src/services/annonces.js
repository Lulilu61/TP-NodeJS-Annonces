module.exports = {
    getAllAnnonces,
    getAnnonceById,
    createAnnonce,
    updateAnnonce,
    updateAnnonceStatus,
    deleteAnnonce
};

function getAllAnnonces(req, res) {
    const { annonceurId, search, category } = req.query;

    res.status(200).json({
        message: "Récupération des annonces",
        filtres_appliques: { annonceurId, search, category },
        results: [] 
    });
}

function getAnnonceById(req, res) {
    const id = req.params.id; 
    res.status(200).json({
        message: 'Détail de l\'annonce',
        id: id
    });
}

function createAnnonce(req, res) {
    const { title, description, price } = req.body;
    res.status(201).json({
        message: 'Annonce créée avec succès !',
        data: { title, description, price }
    });
}

function updateAnnonce(req, res) {
    const id = req.params.id;
    const { title, description, price } = req.body;
    res.status(200).json({
        message: `Annonce ${id} mise à jour`,
        data: { title, description, price }
    });
}

function updateAnnonceStatus(req, res) {
    const id = req.params.id;
    const { status, adminComment } = req.body; 

    res.status(200).json({
        message: `Statut mis à jour pour l'annonce ${id}`,
        nouveau_statut: status,
        commentaire_admin: adminComment 
    });
}

function deleteAnnonce(req, res) {
    const id = req.params.id;
    res.status(200).json({
        message: `Annonce ${id} supprimée avec succès`
    });
}