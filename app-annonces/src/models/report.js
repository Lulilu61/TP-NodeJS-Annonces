const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        static associate(models) {
            // Relation N:1 (Un signalement concerne une annonce, mais une annonce peut avoir plsrs signalements)
            this.belongsTo(models.Annonce, { foreignKey: 'annonce_id', as: 'annonce' });
        }
    }

    Report.init({
        reporter_email: { 
            type: DataTypes.STRING, 
            allowNull: false,
            validate: { isEmail: true }
        },
        message: { 
            type: DataTypes.TEXT, 
            allowNull: false 
        }
    }, {
        sequelize,
        modelName: 'Report',
        tableName: 'Reports'
    });

    return Report;
};