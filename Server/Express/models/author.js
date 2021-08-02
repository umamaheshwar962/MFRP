var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  author: { type: String },
});

module.exports = mongoose.model("Author", AuthorSchema, "Author");
