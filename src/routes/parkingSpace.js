const server = require("express").Router();
const { ParkingSpace, Vehicle } = require("../db");

server.get("/", (req, res) => {
	ParkingSpace.findAll({ include: Vehicle, order: [["number", "ASC"]] })
		.then((spaces) => {
			res.status(200).json({ spaces, msg: "Ok" });
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

server.post("/", (req, res) => {
	const { size } = req.body;

	ParkingSpace.create({ size })
		.then((space) => {
			res.status(200).json({ space, msg: "Ok" });
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

module.exports = server;
