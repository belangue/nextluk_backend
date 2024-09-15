const express = require('express')
const AppointmentController = require("../controllers/Appointment.controller")

const routers = express.Router();

routers.get("/getAllAppoinmtent", AppointmentController.getAll)
routers.post("/createAppointment", AppointmentController.createAppointment)
routers.get("/getByID/:id", AppointmentController.getByID)
routers.delete("/delete/:id", AppointmentController.delete)
routers.put("/update/:id", AppointmentController.update)
module.exports = routers