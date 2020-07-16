const express = require("express");
const db = require("../data/connections");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to get cars",
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .first()
    .then((car) => {
      res.json(car);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to get car",
      });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData, "id")
    .then((ids) => {
      db("cars")
        .where({ id: ids[0] })
        .first()
        .then((car) => {
          res.status(201).json({ car });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
         message:"Failed to add car" });
    });
});

module.exports = router;
