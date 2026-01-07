const jwt = require('jsonwebtoken');
const { User } = require('../models');

const ValidateAuthentification = (req, res, next) => {
    const token = req.headers['Authorization'];
    if (!token) return res.status(401).json({message: 'No token provided'});

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if(err) returnres.status(403).json({message:'Wrong JWT token'});
        const user = await User.findOne({where: {token}});
        if(!user) return res.status(403).json({message: 'Session expired'});
        req.user = user;
        next();
    })
};

const isAdmin = (req, res, next) => {
    const user = req.user; 

    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            message: "Accès refusé : Droits administrateur requis." 
        });
    }
};

module.exports = isAdmin;