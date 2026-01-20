import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import { isAuthenticated } from "./middleware/authGuard.js";
import teamRoutes from "./modules/teams/teams.routes.js";
import taskRoutes from "./modules/tasks/tasks.routes.js";

const router = Router();

router.use("/auth", authRoutes); // Public route
router.use("/teams", isAuthenticated, teamRoutes); // Protected
router.use("/tasks", isAuthenticated, taskRoutes); // Protected

export default router;
