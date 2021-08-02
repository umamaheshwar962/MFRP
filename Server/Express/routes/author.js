const express = require("express");
const router = express.Router();

const authorController = require("../controllers/author");

router.get("/author", authorController.get);
router.post("/author", authorController.post);

module.exports = router;
