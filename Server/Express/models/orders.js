var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  userId: { type: String },
  cartItems: { type: Array },
  itemCount: { type: Number },
  total: { type: String },
  date: { type: String },
  created: { type: Date },
});

module.exports = mongoose.model("Order", OrderSchema, "orders");
