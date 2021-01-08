const { Router } = require("express");
const vehicleRouter = require("./vehicle.js");
const parkingSpaceRouter = require("./parkingSpace.js");

const router = Router();

router.use("/vehicle", vehicleRouter);
router.use("/parkingspace", parkingSpaceRouter);

module.exports = router;
