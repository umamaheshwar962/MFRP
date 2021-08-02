const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books");

router.get("/books", booksController.get);
router.post("/books", booksController.post);
router.get("/booksnewreleases", booksController.getNewReleases);
router.delete("/books", booksController.del);

module.exports = router;
