// Centralized Error Mapping
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log for server-side debugging

  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let field = err.field || null; // Capture field-specific data

  // Handle Unique Violations (Postgres code 23505)
  if (err.code === "23505") {
    statusCode = 409;
    if (err.detail.includes("email")) {
      message = "Email already registered.";
      field = "email";
    } else if (err.detail.includes("username")) {
      message = "Username already taken.";
      field = "username";
    } else {
      message = "Resource already exists.";
    }
  }

  // Response must use 'error' key to match useAuthStore logic
  res.status(statusCode).json({
    error: message,
    field, // Vital for triggering the shake animation
    status: "error",
    statusCode,
    // Only show stack trace in development mode for security
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
