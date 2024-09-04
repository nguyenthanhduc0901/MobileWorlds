if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var express = require("express");
var path = require("path");
var ejsMate = require("ejs-mate");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

var userRouter = require("./routes/users");
var productRouter = require("./routes/products");
var reviewRouter = require("./routes/reviews");

mongoose
  .connect( "mongodb+srv://nguyenthanhduc0901:mongodbnhock0918@mobileworld.z1mz2.mongodb.net/phoneproducts")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

var app = express();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

const sessionConfig = {
  secret: "thanhduc123",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  if (!["/login", "/register", "/"].includes(req.originalUrl)) {
    req.session.returnTo = req.originalUrl;
  }
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRouter);
app.use("/products", productRouter);
app.use("/products/:id/review", reviewRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const details = err.details || {};
  const stack = err.stack || "";

  res.status(statusCode).render("error", {
    statusCode,
    message,
    details,
    stack,
  });
});

module.exports = app;
