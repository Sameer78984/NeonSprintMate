import { Router } from "express";
import * as taskController from "./tasks.controller.js";
import {
  createTaskSchema,
  updateTaskSchema,
  assignTaskSchema,
  getTasksSchema,
} from "./tasks.validator.js";
import { validateRequest } from "../../middleware/validate.js";
import { isAuthenticated } from "../../middleware/authGuard.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", getTasksSchema, validateRequest, taskController.getAllTasks);
router.post("/", createTaskSchema, validateRequest, taskController.createTask);
router.put(
  "/:id",
  updateTaskSchema,
  validateRequest,
  taskController.updateTask,
);
router.delete("/:id", taskController.deleteTask);
router.post(
  "/:id/assign",
  assignTaskSchema,
  validateRequest,
  taskController.updateTask,
);

export default router;
