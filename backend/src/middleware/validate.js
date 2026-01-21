import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    // Create the error and attach tactical field intelligence
    const error = new Error(firstError.msg);
    error.statusCode = 400;
    // express-validator uses 'path' for the field name
    error.field = firstError.path || firstError.param;

    return next(error);
  }
  next();
};
