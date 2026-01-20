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
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({
        message: "Welcome back!",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        },
      });
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
