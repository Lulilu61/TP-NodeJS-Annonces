const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Relation 1:N (Un utilisateur peut avoir plusieurs annonces)
            this.hasMany(models.Annonce, { foreignKey: 'user_id', as: 'annonces' });
        }
    }

    User.init({
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('admin', 'annonceur'), defaultValue: 'annonceur' }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users'
    });

    return User;
};