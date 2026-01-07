const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    user.token = token;
    await user.save();
    res.json({ message: "Connexion réussie", token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/logout', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'No token provided' });

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Wrong JWT Token' });

            const user = await User.findOne({ where: { id: decoded.id, token: token } });
            
            if (!user) return res.status(401).json({ message: 'Session expired or already logged out!' });
            user.token = null;
            await user.save();

            res.status(200).json({ message: 'Unlogged successfully!' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
