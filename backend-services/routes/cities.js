const express = require("express");
const citiesController = require("../controllers/cities.controller");

const router = express.Router();
router.get("/", citiesController.cities);
router.get("/:id", citiesController.getCityDetails);
router.post("/", citiesController.createCity)
router.delete("/:id", citiesController.deleteCity);
router.put("/", citiesController.updateCity);

module.exports = router;