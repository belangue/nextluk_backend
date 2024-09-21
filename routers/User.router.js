const express = require('express')
const userController = require("../controllers/User.controller")
const decodeToken = require('../middleware/decodeToken')
const routers = express.Router();

routers.get("/getAllUsers", userController.getAll)
routers.post("/register", userController.register)
routers.post("/login", userController.login)
routers.get("/logout",decodeToken, userController.logout)
routers.delete("/delete/:id", userController.delete)
routers.put("/changeStatus/:id", userController.changeStatus)
routers.get("/getByID/:id", userController.getByID)
module.exports = routers