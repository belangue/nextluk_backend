const express = require('express')

const routers = express.Router();

// to use the define user router in the User.routes
const userRoutes = require('./User.router')
routers.use("/user",userRoutes)

const salonRoutes = require('./Salon.router')
routers.use("/salon",salonRoutes)

const hairstyleRoutes = require('./Hairstyle.router')
routers.use("/hairstyle",HairstyleRoutes)

const paymentRoutes = require('./Payment.router')
routers.use("/Payment",PaymentRoutes)

const appointmentRoutes = require('./Appointment.router')
routers.use("/Appointment",AppointmentRoutes)
