// backend/src/modules/auth/auth.controller.js
import bcrypt from "bcryptjs";
import passport from "passport";
import knex from "../../config/db.js";

export const register = async (req, res) => {
  const { username, email, password, name } = req.body;

  // Hash password using bcryptjs
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const [newUser] = await knex("users")
    .insert({
      username,
      email,
      password: hashedPassword,
      name, // Captured for better UX
    })
    .returning(["id", "username", "email", "name", "created_at"]);

  return res.status(201).json({
    message: "Account created successfully",
    user: newUser,
  });
};

export const login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "Invalid credentials" });
    }
    req.logIn(user, async (err) => {
      if (err) return next(err);
      
      // Validate user object has required properties
      if (!user.id) {
        return res.status(500).json({ 
          message: "Authentication error: Invalid user data" 
        });
      }
      
      // Bonus Feature: Check for due date reminders on login
      let reminders = [];
      try {
        const { checkDueDateReminders } = await import("../tasks/tasks.reminder.js");
        // Ensure user.id is valid before calling reminder check
        if (user.id && Number(user.id)) {
          reminders = await checkDueDateReminders(Number(user.id));
        }
      } catch (error) {
        // Silently fail if reminder check fails (non-critical)
        console.warn("Reminder check failed:", error.message);
        // Ensure reminders remains an empty array on error
        reminders = [];
      }
      
      // Build response object
      const response = {
        message: "Welcome back!",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        },
      };
      
      // Only include reminders if array is not empty
      if (Array.isArray(reminders) && reminders.length > 0) {
        response.reminders = reminders;
      }
      
      return res.status(200).json(response);
    });
  })(req, res, next);
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
};

export const getMe = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ message: "Not authenticated" });
  return res.status(200).json({ user: req.user });
};
