const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
    registerUser,
    getProfile,
    updateProfile
};

async function registerUser(req, res) {
    try {
        const { email, password, name, role } = req.body;

        // Vérification si utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Hachage mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Création dans base de données
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'annonceur'
        });

        res.status(201).json({
            message: "Utilisateur créé !",
            user: { id: newUser.id, email: newUser.email, name: newUser.name }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProfile(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProfile(req, res) {
    try {
        const id = req.params.id;
        const { name, email, password } = req.body;

        let updateData = { name, email };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const [updated] = await User.update(updateData, {
            where: { id: id }
        });

        if (updated) {
            res.status(200).json({ message: "Profil mis à jour" });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}