import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

// Local Imports
import router from "./routes.js";
import errorHandler from "./middleware/errorHandler.js";
import passport from "./config/passport.js";
import knex from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Security & Utility Middleware
app.use(helmet()); // Basic security headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan("dev")); // Request logging for better DX
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 2. Session Store Switch & Fallback logic
 */
const PostgresStore = connectPgSimple(session);
let sessionStore;

// The "Switch": Explicitly enable DB sessions in dev via USE_DB_SESSION=true
const isProd = process.env.NODE_ENV === "production";
const forceDbSession = process.env.USE_DB_SESSION === "true";

if (isProd || forceDbSession) {
  try {
    sessionStore = new PostgresStore({
      knex: knex,
      tableName: "sessions",
      createTableIfMissing: true, // Professional handling of PG session tables
    });
    console.log("✅ Session Store: PostgreSQL (DB persistence active)");
  } catch (error) {
    console.warn(
      "⚠️ PG Session Store failed to initialize. Falling back to MemoryStore",
    );
    sessionStore = new session.MemoryStore();
  }
} else {
  // Default for local development DX
  sessionStore = new session.MemoryStore();
  console.log("🛠️  Session Store: Memory (Fast-start Development Fallback)");
}

// 3. Session Middleware Configuration
app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || "sprintmate_dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Protects against XSS
      secure: isProd, // Secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 Hours
    },
  }),
);

// 4. Passport Authentication Initialization
app.use(passport.initialize());
app.use(passport.session());

// 5. Main API Routes
app.use("/api", router);

// 6. 404 Handler
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.statusCode = 404;
  next(error);
});

// 7. Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`NeonSprintMate Server is running on port ${PORT}`);
});
