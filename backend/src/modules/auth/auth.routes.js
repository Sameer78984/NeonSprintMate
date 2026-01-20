import { Router } from "express";
import * as authController from "./auth.controller.js";
import { registerSchema, loginSchema } from "./auth.validator.js";
import { validateRequest } from "../../middleware/validate.js";

const router = Router();

router.post(
  "/register",
  registerSchema,
  validateRequest,
  authController.register,
);

router.post("/login", loginSchema, validateRequest, authController.login);
router.post("/logout", authController.logout);
// Private: Get current user info for frontend persistence
router.get("/me", authController.getMe);

export default router;
