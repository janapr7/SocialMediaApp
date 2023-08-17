'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  Profile.init({
    bio: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    birthdate: {
      type: DataTypes.DATE,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    header: {
        type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};