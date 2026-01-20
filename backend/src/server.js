import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import router from "./routes.js";
import errorHandler from "./middleware/errorHandler.js";

import passport from "./config/passport.js";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Security & Utility Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false, // Set to true in production with HTTPS
    },
  })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// 2. Main API Routes
app.use("/api", router);

// 3. 404 Handler
// Only runs if no routes above match the request
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.statusCode = 404;
  next(error);
});

// 4. Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`NeonSprintMate Server is running on port ${PORT}`);
});
