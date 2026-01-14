"use strict";

var User = require("../models/user.js");

module.exports.renderSignupForm = function (req, res) {
  res.render("users/signup.ejs");
};

module.exports.signup = function _callee(req, res) {
  var _req$body, username, email, password, newUser, registeredUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          newUser = new User({
            email: email,
            username: username
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(User.register(newUser, password));

        case 5:
          registeredUser = _context.sent;
          console.log(registeredUser); // Automatically login after signup

          req.login(registeredUser, function (err) {
            if (err) {
              return next(err);
            }

            req.flash("success", "Welcome to BookMyStay");
            return res.redirect("/listings");
          });
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          req.flash("error", _context.t0.message);
          res.redirect("/signup");

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports.renderLoginForm = function (req, res) {
  res.render("users/login.ejs");
};

module.exports.login = function _callee2(req, res) {
  var redirectUrl;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //use try catch to just flash the error msg and stay on same page
          req.flash("success", "Welcome back to BookMyStay !");
          redirectUrl = res.locals.redirectUrl || "/listings";
          res.redirect(redirectUrl);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};