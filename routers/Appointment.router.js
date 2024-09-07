const express = require('express')
const AppointmentController = require("../controllers/Appointment.controller")

const routers = express.Router();

routers.get("/getAllAppoinmtent", AppointmentController.getAll)
module.exports = routers