var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: { type: String },
  name: { type: String },
  emailId: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("users", UserSchema, "users");
