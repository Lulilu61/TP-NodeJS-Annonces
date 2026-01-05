module.exports = {
    registerUser,
    getProfile,
    updateProfile
};

function registerUser(req, res) {
    const { email, password, name } = req.body;
    res.status(201).json({
        message: "Utilisateur créé !",
        user: { email, name, role: 'annonceur' }
    });
}

function getProfile(req, res) {
    const id = req.params.id;
    res.status(200).json({
        message: "Infos du profil",
        userId: id
    });
}

function updateProfile(req, res) {
    const id = req.params.id;
    const { name, email, password } = req.body;
    res.status(200).json({
        message: "Profil mis à jour",
        data: { name, email }
    });
}