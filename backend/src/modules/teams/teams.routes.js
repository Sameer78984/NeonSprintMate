import { Router } from "express";
import { body } from "express-validator";
import * as teamController from "./teams.controller.js";
import { createTeamSchema, updateTeamSchema } from "./teams.validator.js";
import { validateRequest } from "../../middleware/validate.js";
import { isAuthenticated } from "../../middleware/authGuard.js";

const router = Router();

// 1. Top-level Security Guard
router.use(isAuthenticated);

// 2. Team Routes
router.get("/", teamController.getAllTeams);

router.post("/", createTeamSchema, validateRequest, teamController.createTeam);

router.put(
  "/:id",
  updateTeamSchema,
  validateRequest,
  teamController.updateTeam,
);

router.delete("/:id", teamController.deleteTeam);

// 3. [NEW] Membership Routes

// GET members
router.get("/:id/members", teamController.getTeamMembers);

// POST add member (Updated validation for Email)
router.post(
  "/:id/members",
  [
    body("email").isEmail().withMessage("Valid email address is required"),
    body("role").optional().isIn(["admin", "member"]),
  ],
  validateRequest,
  teamController.addMember,
);

export default router;
