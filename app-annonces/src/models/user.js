const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relation 1:N (Un utilisateur peut avoir plusieurs annonces)
      this.hasMany(models.Annonce, { foreignKey: "user_id", as: "annonces" });
    }
  }

  User.init(
    {
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      phone_number: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      zip_code: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING },
      profile_picture: { type: DataTypes.STRING },
      role: {
        type: DataTypes.ENUM("admin", "annonceur"),
        defaultValue: "annonceur",
      },
      token: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User;
};
