import { body } from "express-validator";

export const createTeamSchema = [
  body("name").trim().notEmpty().withMessage("Team name is required").escape(),
  body("description").optional().trim().escape(),
];

export const updateTeamSchema = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Team name cannot be empty")
    .escape(),
  body("description").optional().trim().escape(),
];

export const addMemberSchema = [
  body("userId").trim().notEmpty().withMessage("User ID is required").escape(),
];
