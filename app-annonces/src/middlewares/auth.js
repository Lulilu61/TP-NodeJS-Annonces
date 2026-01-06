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