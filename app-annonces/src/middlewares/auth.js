const jwt = require('jsonwebtoken');

const validateAuthentification = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ message: 'Accès refusé : Token manquant' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token invalide ou expiré' });
        
        req.user = decoded; 
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