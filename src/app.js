const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const server = express();

// server.use(cors({
//   origin: "https://henry-comics.vercel.app",
//   credentials: true,
// }));

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(morgan("dev"));

server.use("/", routes);

module.exports = server;
