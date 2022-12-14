'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.ticket, { foreignKey: 'assignedTo' })
      user.hasMany(models.ticket, { foreignKey: 'reportedBy' })
      user.hasMany(models.comment, { foreignKey: 'userId' })
    }
  }
  user.init({
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false, defaultValue: true },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};