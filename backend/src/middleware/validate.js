import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Instead of res.status here, pass a formatted error to next()
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  next();
};
