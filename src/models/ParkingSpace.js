const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('parkingSpace', {
    number: {
      type: DataTypes.INTEGER,
      unique:true,
      primaryKey: true,
    },
    size:{
      type: DataTypes.ENUM('small','medium','large')
    },
    isOccupied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
}