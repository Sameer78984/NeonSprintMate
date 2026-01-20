import { body } from "express-validator";

export const createTaskSchema = [
  body("title").trim().notEmpty().withMessage("Task title is required").escape(),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status value"),
];

export const updateTaskSchema = [
  body("title").optional().trim().notEmpty().escape(),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status value"),
];

export const assignTaskSchema = [
  body("userId").trim().notEmpty().withMessage("User ID is required").escape(),
];
