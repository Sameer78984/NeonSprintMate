import { body } from "express-validator";
import knex from "../../config/db.js";

export const registerSchema = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .custom(async (value) => {
      const user = await knex("users").where({ username: value }).first();
      if (user) throw new Error("Username already in use");
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await knex("users").where({ email: value }).first();
      if (user) throw new Error("Email already in use");
      return true;
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain a special character"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required for a better profile experience"),
];

export const loginSchema = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];
