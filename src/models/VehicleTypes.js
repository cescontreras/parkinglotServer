const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	
	sequelize.define("vehicleType", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
		type: {
			type: DataTypes.ENUM("motorcycle", "sedan", "truck"),
			allowNull: false,
			unique: true
		}
	});
};
