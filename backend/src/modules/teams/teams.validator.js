import { body, param } from "express-validator";

export const createTeamSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Team name is required")
    .isLength({ max: 255 })
    .withMessage("Name must be under 255 characters")
    .escape(),
  body("description").optional().trim().escape(),
];

export const updateTeamSchema = [
  // Validate the ID in the URL as an integer
  param("id").isInt().withMessage("Invalid Team ID format"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Team name cannot be empty")
    .isLength({ max: 255 })
    .escape(),
  body("description").optional().trim().escape(),
];

export const addMemberSchema = [
  param("id").isInt().withMessage("Invalid Team ID format"),
  // userId must be an integer to match the users table increments ID
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be a valid number"),
  body("role")
    .optional()
    .isIn(["admin", "member"])
    .withMessage("Role must be either 'admin' or 'member'"),
];
