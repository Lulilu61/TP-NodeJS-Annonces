const annonceService = require("../services/annonce");
const { User } = require("../models");
const { sendEmail } = require("../utils/mailer");

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
    if (!result)
      return res.status(404).json({ message: "Annonce non trouvée" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une annonce
exports.createAnnonce = async (req, res) => {
  try {
    const { title, description, price, category_id, status, filepath } =
      req.body;

    const user_id = req.user.id;

    const newAnnonce = await annonceService.create({
      title,
      description,
      price,
      category_id,
      status,
      filepath,
      user_id,
    });

    res.status(201).json(newAnnonce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier une annonce
exports.updateAnnonceContent = async (req, res) => {
  try {
    const { id } = req.params;
    const annonce = await annonceService.findById(id);

    if (!annonce)
      return res.status(404).json({ message: "Annonce introuvable" });

    // Seul l'auteur peut modifier le contenu
    if (annonce.user_id !== req.user.id) {
      return res
        .status(403)
        .json({
          message:
            "Action interdite : Vous n'êtes pas l'auteur de cette annonce.",
        });
    }

    const { title, description, price, filepath } = req.body;

    await annonceService.update(id, { title, description, price, filepath });
    res.status(200).json({ message: "Votre annonce a été mise à jour !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modération d'une annonce = passage du statut visible à non-visible par l'admin + notif mail
exports.moderateAnnonce = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_comment } = req.body;

    const annonce = await annonceService.findById(id, { include: ["user"] });
    if (!annonce)
      return res.status(404).json({ message: "Annonce introuvable" });

    await annonceService.updateStatus(id, status, admin_comment);

    // Si l'admin passe l'annonce en non-visible, on prévient l'auteur
    if (status === "non-visible") {
      const user = await User.findByPk(annonce.user_id);
      await sendEmail(
        user.email,
        "Modération de votre annonce",
        `Bonjour ${user.first_name},\n\nVotre annonce "${annonce.title}" a été passée en non-visible.\nRaison de la modération : ${admin_comment}`
      );
    }

    res
      .status(200)
      .json({ message: "Modération appliquée et auteur notifié." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une annonce
exports.deleteAnnonce = async (req, res) => {
  try {
    await annonceService.delete(req.params.id);
    res.status(200).json({ message: "Annonce supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
