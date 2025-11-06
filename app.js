// app.js
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const indexRouter = require("./routes/index");
const { errorResponse } = require("./utils/response");

const app = express();

// CORS - Must be first!
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Setup Swagger
const setupSwagger = require("./swagger");
setupSwagger(app);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Mount routes under / prefix
app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "API Not Found"));
});

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  const code = err.code || null;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, message, code, status);
});

module.exports = app;
