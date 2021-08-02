const book = require("../models/books");
const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

const get = (req, res, next) => {
  // console.log(req.cookies.clientToken);
  let a = req.query;
  if (a.author !== "" && a.category !== "") {
    book
      .find({ author: a.author, category: a.category })
      .then((books) => {
        res.json(books);
      })
      .catch((err) => {
        res.json({
          status: false,
          message: err.message,
        });
      });
  } else if (a.author !== "") {
    book
      .find({ author: a.author })
      .then((books) => {
        res.json(books);
      })
      .catch((err) => {
        res.json({
          status: false,
          message: err.message,
        });
      });
  } else if (a.category !== "") {
    book
      .find({ category: a.category })
      .then((books) => {
        res.json(books);
      })
      .catch((err) => {
        res.json({
          status: false,
          message: err.message,
        });
      });
  } else if (a.search !== "") {
    book
      .find({ title: { $regex: ".*" + a.search + ".*", $options: "i" } })
      .then((books) => {
        res.json(books);
      })
      .catch((err) => {
        res.json({
          status: false,
          message: err.message,
        });
      });
  } else {
    book
      .find()
      .then((books) => {
        res.json(books);
      })
      .catch((err) => {
        res.json({
          status: false,
          message: err.message,
        });
      });
  }
};

const getNewReleases = (req, res, next) => {
  book
    .find()
    .sort({ created: -1 })
    .limit(3)
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.json({
        status: false,
        message: err.message,
      });
    });
};

const del = (req, res, next) => {
  // console.log(req.query.isbn);
  book
    .findOneAndDelete({ isbn: req.query.isbn })
    .then((result) => {
      if (result !== null) {
        res.json({
          status: true,
          message: "Book Deleted...",
        });
      } else {
        res.json({
          status: false,
          message: "No Book with such ISBN...",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: false,
        message: err.message,
      });
    });
};

const post = (req, res, next) => {
  // console.log(req.cookies.adminToken);
  // userId = auth(req.cookies.clientToken);
  // parseInt(userId);
  const d = new Date();
  if (req.cookies.adminToken === "admin") {
    const {
      isbn,
      title,
      author,
      category,
      numOfPages,
      price,
      image,
    } = req.body;
    let a = {
      isbn: isbn,
      title: title,
      author: author,
      category: category,
      numOfPages: numOfPages,
      price: price,
      image: image,
      created: d.getTime(),
    };
    const options = { upsert: true };
    book
      .findOneAndUpdate({ isbn }, a, options, (err, result) => {
        if (err) {
          res.json({
            status: false,
            message: err.message,
          });
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
          message: err.message,
        });
      });
  } else {
    res.redirect("http://localhost:3000/login?login=false");
  }
};

module.exports = {
  get,
  post,
  getNewReleases,
  del,
};
