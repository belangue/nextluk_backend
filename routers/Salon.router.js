const express = require('express')
const SalonController = require("../controllers/Salon.controller")

const routers = express.Router();

routers.get("/getAllSalon", SalonController.getAll)
routers.get("/getById", SalonController.getByID)
routers.delete("/delete", SalonController.delete)
routers.put("/save", SalonController.save)
module.exports = routers