const express = require('express')
const AppointmentController = require("../controllers/Appointment.controller")

const routers = express.Router();

routers.get("/getAllAppoinmtent", AppointmentController.getAll)
routers.put("/createAppointment", AppointmentController.createAppointment)
routers.get("/getById", AppointmentController.getByID)
routers.delete("/delete", AppointmentController.delete)
module.exports = routers