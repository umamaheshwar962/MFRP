const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders");

router.post("/orders", ordersController.post);
router.get("/orders", ordersController.get);
router.get("/orders/paysuccess", ordersController.getPayment);

module.exports = router;
