import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

// Local Imports
import router from "./routes.js";
import errorHandler from "./middleware/errorHandler.js";
import passport from "./config/passport.js";
import { sessionConfig } from "./config/session.js";
import { arcjetMiddleware } from "./middleware/security.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// REQUIRED for Production: Trust proxy for IP identification
app.set("trust proxy", 1);

// 1. Core Security & Utility
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Required for cookies
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Advanced Security (Arcjet)
app.use(arcjetMiddleware);

// 3. Session & Auth Management
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

// 4. API Routes
app.use("/api", router);

// 5. Health Check Route
app.get("/", (req, res) => res.send("API is running"));

// 5. Error Handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Route Not Found" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`NeonSprintMate Server is running on port ${PORT}`);
});
