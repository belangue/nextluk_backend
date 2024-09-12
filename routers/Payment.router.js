const express = require('express')
const PaymentController = require("../controllers/Payment.controller")

const routers = express.Router();

routers.get("/getAllPayment", PaymentController.getAll)
routers.get("/getById", PaymentController.getByID)
routers.delete("/delete", PaymentController.delete)
routers.put("/save", PaymentController.save)

module.exports = routers