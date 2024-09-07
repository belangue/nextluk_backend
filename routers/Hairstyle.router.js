const express = require('express')
const hairstyleController = require("../controllers/Hairstyle.controller")

const routers = express.Router();

routers.get("/getAllHairstyle", hairstyleController.getAll)
module.exports = routers