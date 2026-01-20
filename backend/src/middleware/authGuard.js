/**
 * Middleware to protect non-auth routes
 */
export const isAuthenticated = (req, res, next) => {
  // Passport provides this method
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({
    message: "Unauthorized: Access denied. Please log in first.",
  });
};
