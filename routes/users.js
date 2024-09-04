var express = require("express");
var router = express.Router();
var catchAsync = require("../utils/catchAsync");
var passport = require("passport");
var users = require("../controllers/users");

// Routes for registration
router.route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

// Routes for login
router.route("/login")
  .get(users.renderLogin)
  .post(passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    keepSessionInfo: true,
  }), users.login);

// Route for logout
router.get("/logout", users.logout);

module.exports = router;
