import { body, param, query } from "express-validator";

export const createTaskSchema = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .escape(),
  body("team_id").isInt().withMessage("Team ID must be an integer"),
  body("status")
    .optional()
    .isIn(["todo", "in_progress", "done"])
    .withMessage("Invalid status value"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority level"),
  body("assigned_to")
    .optional({ nullable: true })
    .isInt()
    .withMessage("User ID must be an integer"),
];

// New: Validates query parameters for fetching tasks
export const getTasksSchema = [
  query("team_id")
    .notEmpty()
    .withMessage("team_id is required")
    .isInt()
    .withMessage("Must be an integer"),
];

export const updateTaskSchema = [
  param("id").isInt().withMessage("Task ID must be an integer"),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .escape(),
  body("description").optional().trim().escape(),
  body("status")
    .optional()
    .isIn(["todo", "in_progress", "done"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
  body("assigned_to")
    .optional({ nullable: true })
    .isInt()
    .withMessage("User ID must be an integer"),
];

export const assignTaskSchema = [
  param("id").isInt().withMessage("Task ID must be an integer"),
  body("userId").isInt().withMessage("User ID must be an integer"),
];
