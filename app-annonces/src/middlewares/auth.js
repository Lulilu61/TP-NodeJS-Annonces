const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateAuthentification = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token manquant' });

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });

        const user = await User.findOne({ where: { id: decoded.id, token: token } });
        
        if (!user) {
            return res.status(401).json({ message: 'Session expirée ou déconnectée' });
        }
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Droits administrateur requis." });
    }
};

module.exports = { validateAuthentification, isAdmin };