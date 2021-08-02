const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category");

router.get("/category", categoryController.get);
router.post("/category", categoryController.post);

module.exports = router;
