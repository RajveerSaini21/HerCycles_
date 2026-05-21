// server/middleware/errorHandler.js

// 404 handler for unknown routes
function notFound(req, res, next) {
    res.status(404).json({
      success: false,
      message: `Not Found - ${req.originalUrl}`,
    });
  }
  
  // Central error handler
  function errorHandler(err, req, res, next) {
    console.error("❌ Error:", err);
  
    // Mongoose bad ObjectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid resource ID",
      });
    }
  
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }
  
    // Default server error
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
  
  module.exports = { notFound, errorHandler };
  