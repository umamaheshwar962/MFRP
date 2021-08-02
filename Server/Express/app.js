const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserRoute = require("./routes/users");
const BooksRoute = require("./routes/books");
const ordersRoute = require("./routes/orders");
const cartRoute = require("./routes/cart");
const authorRoute = require("./routes/author");
const categoryRoute = require("./routes/category");

app.set("port", process.env.PORT || 8081);

app.use(bodyParser.json({ limit: "16mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "16mb", extended: true }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors({ origin: "http://localhost:3000", credentials: "include" }));

app.use(UserRoute);
app.use(BooksRoute);
app.use(ordersRoute);
app.use(cartRoute);
app.use(authorRoute);
app.use(categoryRoute);

app.use(express.static("static"));
app.use(morgan("dev"));

app.use(function (req, res) {
  const err = new Error("Not Found");
  err.status = 404;
  res.json(err);
});

//MongoDB connection
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MFRP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connected to MongoDB");

  app.listen(app.get("port"), function () {
    console.log("API server Listening on port " + app.get("port") + "!");
  });
});
