const express = require('express')
const PaymentController = require("../controllers/payment.controller")

const routers = express.Router();

routers.get("/getAllPayment", PaymentController.getAll)
module.exports = routers