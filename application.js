// Imports
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const path = require("path");

//Controllers
const errController = require("./controllers/errController");
const messageRouter = require("./routes/messageRoute");

// App setup
const app = express();

// Global Middlewares

// Cross origin
app.use(cors());

// Rate Limiter

// app.use("/api", rateLimiter(rateLimit));

// Preventing mondb query injection
// app.use(mongoSanitize());

// Preventing crossite scripting
// app.use(xss());

// Development logging
// app.use(morgan("dev"));

// Parsing body ( json ) into object req.body
app.use(express.json({ limit: "20kb" }));

// Parsing body ( url encoded data ) into object
app.use(bodyParser.urlencoded({ extended: true }));

// Parsing incomming cookies
app.use(cookieParser());

// Serving static files
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(path.join(__dirname, "build")));

// Route middlewares
app.use("/submit-form", messageRouter);

// Sending dashboard
app.get("*", function (req, res, next) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.all("*", errController.routeErr.handleInvalidRoute())

// Global error handler
app.use(errController.globalErr.handleErr());

// exports
module.exports = app;
