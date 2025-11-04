const { verifyToken } = require("../utils/jwt");
const { errorResponse } = require("../utils/response");
const ErrorCodes = require("../constants/errorCodes");

function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Unauthorized", null, 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return errorResponse(res, "Invalid or expired token", null, 401);
  }
}

module.exports = requireAuth;
