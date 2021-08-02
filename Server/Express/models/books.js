var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BooksSchema = new Schema({
  isbn: { type: String },
  title: { type: String },
  author: { type: String },
  numOfPages: { type: Number },
  price: { type: Number },
  category: { type: String },
  image: { type: String },
  created: { type: Date },
});

module.exports = mongoose.model("Books", BooksSchema, "Books");
