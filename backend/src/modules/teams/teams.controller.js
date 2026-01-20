/**
 * Dummy Teams Controller
 */

export const getAllTeams = async (req, res) => {
  res.status(200).json({
    message: "Fetched all teams successfully",
    data: [
      { id: 1, name: "Engineering", description: "The engineering team" },
      { id: 2, name: "Design", description: "The design team" },
    ],
  });
};

export const createTeam = async (req, res) => {
  const { name, description } = req.body;
  res.status(201).json({
    message: "Team created successfully",
    data: {
      id: Math.floor(Math.random() * 1000),
      name,
      description,
    },
  });
};

export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  res.status(200).json({
    message: `Team ${id} updated`,
    data: { id, name, description },
  });
};

export const deleteTeam = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Team ${id} deleted` });
};

export const addMember = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  res.status(201).json({ message: `User ${userId} added to team ${id}` });
};
