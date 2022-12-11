'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ticket.hasMany(models.comment, { foreignKey: 'ticketId' })
      ticket.belongsTo(models.user, { foreignKey: 'reportedBy' })
      ticket.belongsTo(models.user, { foreignKey: 'assignedTo' })
    }
  }
  ticket.init({
    subject: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    closedAt: DataTypes.DATE,
    severity: { type: DataTypes.STRING, allowNull: false, defaultValue: "Low" },
    state: { type: DataTypes.STRING, allowNull: false, defaultValue: "Open" },
  }, {
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};