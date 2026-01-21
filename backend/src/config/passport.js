import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import knex from "../config/db.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // 1. Find user in Neon DB
        const user = await knex("users").where({ email }).first();

        // Detailed check: Email existence
        if (!user) {
          return done(null, false, {
            message: "Email not registered. Please sign up.",
            field: "email", // Tactical identifier for frontend vibration
          });
        }

        // 2. Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // Detailed check: Password accuracy
        if (!isMatch) {
          return done(null, false, {
            message: "Invalid credentials.",
            field: "password", // Tactical identifier for frontend vibration
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await knex("users")
      .where({ id })
      .select("id", "username", "email", "name", "created_at")
      .first();

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
