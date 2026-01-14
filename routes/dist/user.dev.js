"use strict";

var express = require("express");

var router = express.Router({
  mergeParams: true
});

var User = require("../models/user.js");

var asyncWrap = require("../utils/asyncWrap.js");

var passport = require("passport");

var _require = require("../middleware.js"),
    saveRedirectUrl = _require.saveRedirectUrl;

var userController = require("../controllers/users.js");

router.route("/signup").get(userController.renderSignupForm).post(asyncWrap(userController.signup));
router.get("/signup", userController.renderSignupForm);
router.post("/signup", asyncWrap(userController.signup));
router.route("/login").get(userController.renderLoginForm).post(saveRedirectUrl, passport.authenticate("local", {
  failureRedirect: '/login',
  failureFlash: true
}), asyncWrap(userController.login));
router.get("/logout", userController.logout);
module.exports = router;