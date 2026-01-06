const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            // Relation 1:N (Une catégorie peut être reprise dans plusieurs annonces)
            this.hasMany(models.Annonce, { foreignKey: 'category_id', as: 'annonces' });
        }
    }

    Category.init({
        label: { 
            type: DataTypes.STRING, 
            allowNull: false 
        }
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'Categories',
        timestamps: false 
    });

    return Category;
};