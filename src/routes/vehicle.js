const server = require("express").Router();
const { Vehicle, ParkingSpace } = require("../db");

//----- get Queue
server.get("/queue", (req, res) => {
	Vehicle.findAll({
		where: {
			isWaiting: true,
		},
		order: [["arrivalDate", "ASC"]],
	})
		.then((vehicles) => {
			res.status(200).json(vehicles);
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

//------------------ADD vehicle
// cambiar el create por un findorcreate, de manera que cuando remueva el vehiculo, desde el front haga el post con el proximo elemento de la queue,
// entonces si lo encuentra no lo crea y sigue el camino
server.post("/", (req, res) => {
	const query = req.body;
	//----create vehicle on queue
	Vehicle.findOrCreate({where: query})
		.then((vehicle) => {
			let filter = ["small", "medium", "large"];
			if(!vehicle[0].isWaiting){
				return res.status(200).json({ msg: "Vehicle Already Parked" });
			}
			if (vehicle[0].dataValues.type === "sedan") {
				filter = ["medium", "large"];
			}
			if (vehicle[0].dataValues.type === "truck") {
				filter = ["large"];
			}
			//-----find out if there is availables spaces for thah vehicle
			ParkingSpace.findOne({
				where: {
					isOccupied: false,
					size: filter,
				},
			}).then((space) => {
				//-- if don't, just get out
				if (!space) {
					return res.status(200).json({ msg: "Parking Lot Full" });
				}
				//--- if ok, update parking space as occupied
				ParkingSpace.update(
					{
						isOccupied: true,
					},
					{
						where: {
							number: space.dataValues.number,
						},
					}
				).then(() => {
					//--- get the vehicle out of the queue
					Vehicle.update(
						{
							isWaiting: false,
						},
						{
							where: {
								id: vehicle[0].dataValues.id,
							},
						}
					).then(() => {
						//-----set instances relationship
						vehicle[0].addParkingSpace(space.dataValues.number).then(() => {
							res.status(200).json({ msg: "Vehicle Parked" });
						});
					});
				});
			});
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

//------REMOVE queue
server.delete("/:id", (req, res) => {
	const { id } = req.params;

	Vehicle.findOne({
		where: {
			id,
		},
		include: ParkingSpace,
	})
		.then((v) => {
			ParkingSpace.update(
				{
					isOccupied: false,
				},
				{
					where: {
						number: v.parkingSpaces[0].number,
					},
				}
			).then((p) => {
				Vehicle.destroy({
					where: {
						id,
					},
				}).then((v) => {
					res.status(200).json({ msg: "Vehiculo Eliminado" });
				});
			});
		})
		.catch((e) => {
			res.status(400).json({ e, msg: "Error" });
		});
});

module.exports = server;
