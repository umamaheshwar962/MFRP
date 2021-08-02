const cart = require("../models/cart");
const jwt = require("jsonwebtoken");

const post = (req, res, next) => {
  // console.log(req.cookies.clientToken);
  userId = auth(req.cookies.clientToken);
  const d = new Date();
  let a = {
    $set: {
      userId: userId,
      cartItems: req.body,
      date: `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}   ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
    },
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  cart
    .findOneAndUpdate({ userId }, a, options, (err, result) => {
      if (err) {
        console.log(err);
      }
    })
    .then((crt) => {
      res.json({
        status: true,
        message: "Posted",
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        err: err,
      });
    });
};

const get = (req, res, next) => {
  userId = auth(req.cookies.clientToken);
  cart.findOne({ userId }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

function auth(token) {
  let userId = "";
  jwt.verify(token, "UmaMahesh", (err, decodedT) => {
    if (err) {
      console.log(err.message);
    } else {
      userId = decodedT.userId;
    }
  });
  return userId;
}

module.exports = {
  post,
  get,
};
