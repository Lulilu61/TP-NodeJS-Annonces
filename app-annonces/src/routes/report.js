const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { userEmail, message, annonceLink } = req.body;
    
    // Envoyer un mail à l'admin (via Mailhog plus tard)
    res.status(201).json({
        message: "Signalement envoyé à l'administrateur",
        sentData: { userEmail, message, annonceLink }
    });
});

module.exports = router;