import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// Dummy user database for testing
const users = [
  {
    id: "dummy-id-123",
    email: "test@example.com",
    password: "password123",
    username: "test_user",
  },
];

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = users.find((u) => u.email === email);
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
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

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

export default passport;
