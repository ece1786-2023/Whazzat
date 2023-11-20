const functions = require("firebase-functions/v2");
// const admin = require("firebase-admin");
// const shomvobApiServiceV2 = require("./app");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const http = require("http");
const compression = require("compression");

// const port=3000;
// var debug = require("debug")("http")
//   , http = require("http")
//   , name = "Shomvob";

// openapi Routes
// const loginRouter = require("./routes/login");
const searchRouter = require("./routes/search");
// const paypalRouter = require("./routes/paypal");
// const smsRouter = require("./routes/promotional_sms");
const app = express();
// debug("booting APIs for %o", name);
// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors({origin: true}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const urlPrfix = "/api/v1";

// openApi endpoints
app.use(urlPrfix + "/search", searchRouter);
// app.use(urlPrfix + "/paypal", paypalRouter);
// app.use(urlPrfix + "/sms", smsRouter);

app.use(compression());
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

exports.productSearchAPI = functions
    .https.onRequest(app);
