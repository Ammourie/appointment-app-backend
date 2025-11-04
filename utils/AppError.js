// src/utils/AppError.js
class AppError extends Error {
  constructor(message, code, status = 400) {
    super(message);
    this.code = code;       // your integer error code
    this.status = status;   // HTTP status code (default 400)
  }
}

module.exports = AppError;
