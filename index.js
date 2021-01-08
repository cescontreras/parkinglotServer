const { ParkingSpace, VehicleType } = require("./src/db")
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

var port = process.env.PORT || 3001 
// Synci  ng all the models at once. 

conn.sync({ force: false }).then(() => {
    server.listen(port, () => {
        console.log(`server listening at port ${port}`); // eslint-disable-line no-console
        const spaces = [
            {size: "small", number: 1},{size: "small", number: 2},{size: "small", number: 3},
            {size: "medium", number: 4},{size: "medium", number: 5},{size: "medium", number: 6},
            {size: "large", number: 7},{size: "large", number: 8},{size: "large", number: 9}
        ]
        ParkingSpace.bulkCreate(spaces, {
            raw: true,
            updateOnDuplicate: ["number"], 
        }).then(() => console.log("Parking Lot Created"));
        
        
        const types = [{type:"motorcycle"}, {type: "sedan"},{type:"truck"}]
        VehicleType.bulkCreate(types, {
            raw: true,
            updateOnDuplicate: ["type"], 
        }).then(() => console.log("Types Created"));

    });
});