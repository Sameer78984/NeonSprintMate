import { Router } from "express";
import * as teamController from "./teams.controller.js";
import {
  createTeamSchema,
  updateTeamSchema,
  addMemberSchema,
} from "./teams.validator.js";
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

// 3. Membership Routes
router.post(
  "/:id/members",
  addMemberSchema,
  validateRequest,
  teamController.addMember,
);

export default router;
