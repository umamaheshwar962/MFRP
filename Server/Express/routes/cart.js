const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart");

router.post("/cart", cartController.post);
router.get("/cart", cartController.get);

module.exports = router;
