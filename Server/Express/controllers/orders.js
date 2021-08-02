const orders = require("../models/orders");
const jwt = require("jsonwebtoken");

const post = (req, res, next) => {
  // console.log(req.cookies.clientToken);
  userId = auth(req.cookies.clientToken);
  // parseInt(userId);
  const d = new Date();
  let a = new orders({
    userId: userId,
    cartItems: req.body.cartItems,
    itemCount: req.body.itemCount,
    total: req.body.total,
    date: `${d.getDate()}-${
      d.getMonth() + 1
    }-${d.getFullYear()}   ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
    created: d.getTime(),
  });
  a.save()
    .then((crt) => {
      res.json({
        message: "Posted",
      });
    })
    .catch((err) => {
      res.json({
        err: err,
      });
    });
};

const getPayment = (req, res, next) => {
  userId = auth(req.cookies.clientToken);
  orders
    .findOne({ userId })
    .sort({ created: -1 })
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
};

const get = (req, res, next) => {
  userId = auth(req.cookies.clientToken);
  orders
    .find({ userId })
    .sort({ created: -1 })
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: err.message,
      });
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
  getPayment,
};
