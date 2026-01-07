const express = require('express');
const router = express.Router();
const { User } = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({ message: "Connexion réussie", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;