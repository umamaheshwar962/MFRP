const category = require("../models/category");

const get = (req, res, next) => {
  // console.log(req.cookies.clientToken);
  category.find().then((categories) => {
    res.json(categories);
  });
};

const post = (req, res, next) => {
  // console.log(req.cookies.clientToken);
  // userId = auth(req.cookies.clientToken);
  // parseInt(userId);
  let a = new category({
    category: req.body.category,
  });
  a.save()
    .then((crt) => {
      res.json({
        status: true,
        message: "Posted",
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        message: err.message,
      });
    });
};

module.exports = {
  get,
  post,
};
