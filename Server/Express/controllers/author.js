const author = require("../models/author");

const get = (req, res, next) => {
  // console.log(req.cookies.clientToken);
  author.find().then((authors) => {
    res.json(authors);
  });
};

const post = (req, res, next) => {
  // console.log(req.cookies.clientToken);
  // userId = auth(req.cookies.clientToken);
  // parseInt(userId);
  let a = new author({
    author: req.body.author,
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
