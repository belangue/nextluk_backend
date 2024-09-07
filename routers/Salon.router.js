const express = require('express')
const SalonController = require("../controllers/Salon.controller")

const routers = express.Router();

routers.get("/getAllSalon", salonController.getAll)
module.exports = routers