import { Router } from "express";
import * as teamController from "./teams.controller.js";
import {
  createTeamSchema,
  updateTeamSchema,
  addMemberSchema,
} from "./teams.validator.js";
import { validateRequest } from "../../middleware/validate.js";

const router = Router();

router.get("/", teamController.getAllTeams);
router.post("/", createTeamSchema, validateRequest, teamController.createTeam);
router.put("/:id", updateTeamSchema, validateRequest, teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);
router.post(
  "/:id/members",
  addMemberSchema,
  validateRequest,
  teamController.addMember
);

export default router;
