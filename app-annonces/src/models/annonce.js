const { Model, DataTypes } = require('sequelize');

const Annonce =  (sequelize, DataTypes) => {
    class Annonce extends Model{
        //implémentation des jointures
        static associate (models){
            this.belongsTo(models.Users, {
                foreignKey: 'user_id',
                as: 'User'
            })
        }
    }

    Annonce.init({
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.FLOAT,
        filepath: DataTypes.TEXT
    }, {
        sequelize, 
        modelName: 'Annonce'
    });
}
module.exports = Annonce;