import { Router } from "express";
import * as taskController from "./tasks.controller.js";
import {
  createTaskSchema,
  updateTaskSchema,
  assignTaskSchema,
} from "./tasks.validator.js";
import { validateRequest } from "../../middleware/validate.js";

const router = Router();

router.get("/", taskController.getAllTasks);
router.post("/", createTaskSchema, validateRequest, taskController.createTask);
router.put("/:id", updateTaskSchema, validateRequest, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.post(
  "/:id/assign",
  assignTaskSchema,
  validateRequest,
  taskController.assignTask
);

export default router;
