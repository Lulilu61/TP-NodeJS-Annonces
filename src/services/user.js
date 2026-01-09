const { User } = require('../models');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = {
    registerUser,
    getProfile,
    updateProfile
};

async function registerUser(req, res) {
    try {
        const { 
            first_name, 
            last_name, 
            username, 
            email, 
            password, 
            role, 
            city, 
            zip_code, 
            phone_number, 
            address, 
            profile_picture 
        } = req.body;

        // Vérification si utilisateur existe déjà (par email OU username)
        const existingUser = await db.User.findOne({ 
            where: { 
                [db.Sequelize.Op.or]: [{ email }, { username }] 
            } 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: "L'email ou le nom d'utilisateur est déjà utilisé." });
        }

        // Hachage mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Création dans base de données
        const newUser = await db.User.create({
            first_name,
            last_name,
            username,
            email,
            password: hashedPassword,
            role: role || 'annonceur',
            city,
            zip_code,
            phone_number,
            address,
            profile_picture
        });

        res.status(201).json({
            message: "Utilisateur créé !",
            user: { 
                id: newUser.id, 
                username: newUser.username, 
                email: newUser.email,
                full_name: `${newUser.first_name} ${newUser.last_name}`
            }
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