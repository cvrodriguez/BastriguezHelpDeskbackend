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
    }
  }
  ticket.init({
    subject: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    closedAt: DataTypes.DATE,
    severity: { type: DataTypes.STRING, allowNull: false, defaultValue: "Low" },
    state: { type: DataTypes.STRING, allowNull: false, defaultValue: "Open" },
    reportedBy: {type: DataTypes.STRING, allowNull: false},
    assignedTo: {type:  DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};


