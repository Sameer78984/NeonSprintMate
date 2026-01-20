// Centralized Error Mapping
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log for server-side debugging

  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Specific Error Handling (e.g., Neon/Postgres errors)
  if (err.code === "23505") {
    // Unique violation
    statusCode = 409;
    message = "Resource already exists.";
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    // Only show stack trace in development mode for security
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
