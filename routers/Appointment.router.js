const express = require('express')
const AppointmentController = require("../controllers/Appointment.controller")

const routers = express.Router();

routers.get("/getAllAppoinmtent", AppointmentController.getAll)
routers.post("/createAppointment", AppointmentController.createAppointment)
routers.get("/getById/:id", AppointmentController.getByID)
routers.delete("/delete", AppointmentController.delete)
module.exports = routers