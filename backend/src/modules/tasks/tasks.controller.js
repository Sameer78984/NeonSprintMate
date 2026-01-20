/**
 * Dummy Tasks Controller
 */

export const getAllTasks = async (req, res) => {
  res.status(200).json({
    message: "Fetched all tasks successfully",
    data: [
      { id: 101, title: "Fix login bug", status: "pending" },
      { id: 102, title: "Design homepage", status: "completed" },
    ],
  });
};

export const createTask = async (req, res) => {
  const { title, status } = req.body;
  res.status(201).json({
    message: "Task created successfully",
    data: {
      id: Math.floor(Math.random() * 1000),
      title,
      status: status || "pending",
    },
  });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  res.status(200).json({
    message: `Task ${id} updated`,
    data: { id, title, status },
  });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Task ${id} deleted` });
};

export const assignTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  res.status(200).json({ message: `Task ${id} assigned to user ${userId}` });
};
