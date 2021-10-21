const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// Buscar vehiculos y mostrarlos en la página inicial
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.render("index", { cars });
  } catch (err) {
    res.status(500).send("Ocurrió un error");
  }
});

// Seed de los archivos
router.get("/seed", (req, res) => {
  let cars = [
    new Car({
      name: "Tesla",
      price: "$59,000",
      description: "Vehículo Tesla en color blanco",
      img: "tesla.jpeg",
    }),
    new Car({
      name: "Toyota",
      price: "$39,900",
      description: "Vehículo híbrido Toyota",
      img: "toyota.jpeg",
    }),
    new Car({
      name: "Smart",
      price: "$39,900",
      description: "Vehiculo compacto SMART ",
      img: "smart.jpeg",
    }),
    new Car({
      name: "Renault",
      price: "$29,900",
      description: "Vehiculo Renault azul",
      img: "renault.jpeg",
    }),
    new Car({
      name: "Mercedes",
      price: "$59,900",
      description: "Vehículo Mercedes Benz azul deportivo",
      img: "mercedes.jpeg",
    }),
    new Car({
      name: "Nissan",
      price: "$49,900",
      description: "Camioneta naranja Nissan",
      img: "nissan.jpeg",
    }),
  ];

  Car.insertMany(cars)
    .then((moogoseDocuments) => {
      console.log(moogoseDocuments, "Creados satisfactoriamente");
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("<h1>Carros guardados</h1>");
});

module.exports = router;
