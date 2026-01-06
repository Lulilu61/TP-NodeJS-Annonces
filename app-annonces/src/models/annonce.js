const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Annonce extends Model {
        static associate(models) {
            // Relation N:1 (Une annonce appartient à un utilisateur)
            this.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
            // Relation N:1 (Une annonce appartient à une catégorie)
            this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
        }
    }

    Annonce.init({
        title: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        filepath: DataTypes.TEXT,
        status: { 
            type: DataTypes.ENUM('visible', 'non-visible'), 
            defaultValue: 'visible' 
        },
        admin_comment: DataTypes.TEXT,
        published_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        sequelize,
        modelName: 'Annonce',
        tableName: 'Annonces' 
    });

    return Annonce;
};