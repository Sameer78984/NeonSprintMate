import knex from "../../config/db.js";

// 1. Fetch tasks for a specific team
export const getAllTasks = async (req, res, next) => {
  try {
    const { team_id } = req.query;

    const isMember = await knex("membership")
      .where({ team_id, user_id: req.user.id })
      .first();

    if (!isMember)
      return res.status(403).json({ error: "Unauthorized" });

    const tasks = await knex("tasks")
      .where({ team_id })
      // ADDED "description" HERE
      .select("id", "title", "description", "status", "priority", "assigned_to", "created_at") 
      .orderBy("created_at", "desc");
      
    res.status(200).json({ data: tasks });
  } catch (error) {
    next(error);
  }
};

// 2. Create Task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, team_id, assigned_to, status, priority } =
      req.body;

    const isMember = await knex("membership")
      .where({ team_id, user_id: req.user.id })
      .first();
    if (!isMember) return res.status(403).json({ error: "Unauthorized" });

    const [newTask] = await knex("tasks")
      .insert({
        title,
        description,
        team_id,
        assigned_to: assigned_to || null,
        status: status || "todo",
        priority: priority || "medium",
        created_by: req.user.id,
      })
      .returning("*");

    res
      .status(201)
      .json({ message: "Task created successfully", data: newTask });
  } catch (error) {
    next(error);
  }
};

// 3. Update Task (With Security Check)
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Map userId from the assignment route if it exists
    const { title, description, status, priority, assigned_to, userId } =
      req.body;
    const finalAssignee = assigned_to || userId;

    const task = await knex("tasks").where({ id }).first();
    if (!task) return res.status(404).json({ error: "Task not found" });

    const isMember = await knex("membership")
      .where({ team_id: task.team_id, user_id: req.user.id })
      .first();

    if (!isMember)
      return res.status(403).json({ error: "Unauthorized access" });

    const [updated] = await knex("tasks")
      .where({ id })
      .update({
        title,
        description,
        status,
        priority,
        assigned_to: finalAssignee,
      })
      .returning("*");

    res.status(200).json({ data: updated });
  } catch (error) {
    next(error);
  }
};

// 4. Delete Task (Role-Based Access: Only creator or team admin can delete)
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validate task ID
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await knex("tasks").where({ id }).first();
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Validate user authentication
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Check if user is a team member
    const isMember = await knex("membership")
      .where({ team_id: task.team_id, user_id: req.user.id })
      .first();
    if (!isMember) return res.status(403).json({ error: "Unauthorized" });

    // Role-based access: Only task creator or team admin can delete
    // Use Number() to ensure type-safe comparison (handles string/number from DB)
    const isCreator = Number(task.created_by) === Number(req.user.id);
    const isAdmin = isMember.role === "admin";

    if (!isCreator && !isAdmin) {
      return res.status(403).json({
        error: "Only task creators or team admins can delete tasks",
      });
    }

    await knex("tasks").where({ id }).del();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
