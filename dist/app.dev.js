"use strict";

if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

console.log(process.env.SECRET);

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({
  extended: true
}));

var methodOverride = require("method-override");

app.use(methodOverride("_method"));

var ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
app.use(express["static"](path.join(__dirname, "/public")));

var listingRouter = require("./routes/listings.js");

var reviewRouter = require("./routes/reviews.js");

var userRouter = require("./routes/user.js");

var session = require("express-session");

var flash = require("connect-flash");

var passport = require("passport");

var LocalStrategy = require("passport-local");

var User = require("./models/user.js");

var ExpressError = require("./utils/ExpressError");

var sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
}); // app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"delta-student",
//     });
//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });
//exports all routes from routes listings.js

app.use("/listings", listingRouter); //exports all routes from routes reviews.js

app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
main().then(function () {
  console.log("Connected Established!");
})["catch"](function (err) {
  console.log(err);
});

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect("mongodb://127.0.0.1:27017/wanderlust"));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

;
app.all("*", function (req, res, next) {
  next(new ExpressError(404, "Page Not Found!"));
});
app.use(function (err, req, res, next) {
  var _err$status = err.status,
      status = _err$status === void 0 ? 500 : _err$status,
      _err$message = err.message,
      message = _err$message === void 0 ? "Something Went Wrong!" : _err$message;
  res.status(status).render("Error.ejs", {
    message: message
  });
});
app.listen(8080, function (req, res) {
  var allListing = console.log("Connection is build on port 8080");
});