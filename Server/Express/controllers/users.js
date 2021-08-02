const user = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = (req, res, next) => {
  user
    .exists({
      $or: [{ userId: req.body.userId }, { emailId: req.body.emailId }],
    })
    .then((r) => {
      if (r) {
        res.json({
          status: false,
          message: "User already exists...Please Login.",
        });
      } else {
        if (req.body.userId === "admin") {
          res.json({
            status: false,
            message:
              "userId:admin is reserved for ADMIN...Please use another UserId.",
          });
        } else {
          bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
              res.json({
                error: err,
              });
            }
            let usr = new user({
              userId: req.body.userId,
              name: req.body.name,
              emailId: req.body.emailId,
              password: hashedPass,
            });
            usr
              .save()
              .then((usr) => {
                res.json({
                  status: true,
                  message: "SignUp successful...Please LogIn.",
                });
              })
              .catch((err) => {
                res.json({
                  status: false,
                  message: "Some error occured...Please try again.",
                });
              });
          });
        }
      }
    });
};

const login = (req, res, next) => {
  var username = req.body.userId;
  var pass = req.body.password;
  if (username === "admin") {
    if (pass === "admin") {
      res.cookie("adminToken", "admin", { maxAge: 30 * 60 * 1000 });
      if (res.cookie("clientToken")) {
        res.clearCookie("clientToken");
      }
      res.json({
        status: true,
        message: "Logging in as ADMIN...",
      });
    } else {
      res.json({
        status: false,
        message: "Use 'admin' as password for ADMIN access.",
      });
    }
  } else {
    user
      .findOne({ $or: [{ userId: username }, { emailId: username }] })
      .then((usr) => {
        if (usr) {
          bcrypt.compare(pass, usr.password, function (err, result) {
            if (err) {
              res.json({
                error: err,
              });
            }
            if (result) {
              let token = jwt.sign({ userId: usr.userId }, "UmaMahesh");
              res.cookie("clientToken", token, { maxAge: 60 * 60 * 1000 });
              if (res.cookie("adminToken")) {
                res.clearCookie("adminToken");
              }
              res.json({
                status: true,
                message: "Logging In...",
              });
            } else {
              res.json({
                status: false,
                message:
                  "Password does not match...Please check your password.",
              });
            }
          });
        } else {
          res.json({
            status: false,
            message: "User not found...Please Signup.",
          });
        }
      });
  }
};

module.exports = {
  signup,
  login,
};
