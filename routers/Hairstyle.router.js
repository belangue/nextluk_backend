const express = require('express')
const hairstyleController = require("../controllers/Hairstyle.controller")

const routers = express.Router();

routers.get("/getAllHairstyle", hairstyleController.getAll)
routers.get("/getHairstyle", hairstyleController.getByID)
routers.delete("/delete", hairstyleController.delete)
routers.post("/createHairstyle", hairstyleController.createHairstyle)
module.exports = routers