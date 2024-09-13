const express = require('express')
const SalonController = require("../controllers/Salon.controller")

const routers = express.Router();

routers.get("/getAllSalon", SalonController.getAll)
routers.get("/getById/:id", SalonController.getByID)
routers.delete("/delete/:id", SalonController.delete)
routers.put("/update/:id", SalonController.update)
routers.post("/createSalon", SalonController.createSalon)
module.exports = routers