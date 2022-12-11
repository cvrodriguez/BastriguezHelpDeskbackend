'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.ticket , { foreignKey: 'ticketId' })
      comment.belongsTo(models.user , { foreignKey: 'userId' })
    }
  }
  comment.init({
    comment: { type: DataTypes.STRING, allowNull: false },
   
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};