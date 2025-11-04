function successResponse(res, result = {}, status = 200) {
  return res.status(status).json({
    success: true,
    error: null,
    result,
  });
}

function errorResponse(res, message, code = null, status = 500) {
  return res.status(status).json({
    success: false,
    error: code
      ? { code, message } // domain-specific error
      : { message }, // system-level error
    result: null,
  });
}

module.exports = { successResponse, errorResponse };
