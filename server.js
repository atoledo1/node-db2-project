const express = require("express");

const server = express();

const carsRouter = require("./routers/carR.js");

server.use(express.json());

server.use("/api/cars", carsRouter);

module.exports = server;
