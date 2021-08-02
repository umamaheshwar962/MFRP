var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  userId: { type: String },
  cartItems: { type: Array },
  date: { type: String },
});

module.exports = mongoose.model("Cart", CartSchema, "cart");
