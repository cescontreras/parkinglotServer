const { DataTypes, NOW } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('vehicle', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('motorcycle', 'sedan', 'truck'),
      allowNull: false
    },
    isWaiting: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  })
}