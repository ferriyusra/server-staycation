var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// method override
const methodOverride = require("method-override");
// import express session untuk flash data maupun session login
const session = require("express-session");
// import connect-flash
const flash = require("connect-flash");
// import mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/db_staycation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// router admin
const adminRouter = require("./routes/admin");
// router api
const apiRouter = require("./routes/api");
// const AdminController = require("./controllers/adminController");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// method override untuk update data
app.use(methodOverride("_method"));
// method express session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
// method connect-flash
app.use(flash());

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// template setting bootstrap
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);
app.use("/", indexRouter);
app.use("/users", usersRouter);
// panggil router admin
app.use("/admin", adminRouter);
// panggil router api
app.use("/api/v1/member", apiRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
