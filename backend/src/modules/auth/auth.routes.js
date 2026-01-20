// backend/src/modules/auth/auth.routes.js
import { Router } from "express";
import * as authController from "./auth.controller.js";
import { registerSchema, loginSchema } from "./auth.validator.js";
import { validateRequest } from "../../middleware/validate.js";
import { isAuthenticated } from "../../middleware/authGuard.js";

const router = Router();

// Public routes
router.post(
  "/register",
  registerSchema,
  validateRequest,
  authController.register,
);

router.post("/login", loginSchema, validateRequest, authController.login);

// Protected routes
router.post("/logout", isAuthenticated, authController.logout);
router.get("/me", isAuthenticated, authController.getMe);

export default router;
