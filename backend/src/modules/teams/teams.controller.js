import knex from "../../config/db.js";

// 1. Fetch all teams the user belongs to
export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await knex("teams")
      .join("membership", "teams.id", "membership.team_id") // table: membership
      .where("membership.user_id", req.user.id)
      .select("teams.*", "membership.role");
    res.status(200).json({ data: teams });
  } catch (error) {
    next(error);
  }
};

// 2. Create Team + Auto-add owner as Admin
export const createTeam = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const result = await knex.transaction(async (trx) => {
      // column: created_by
      const [newTeam] = await trx("teams")
        .insert({ name, description, created_by: req.user.id })
        .returning("*");

      // table: membership
      await trx("membership").insert({
        team_id: newTeam.id,
        user_id: req.user.id,
        role: "admin",
      });
      return newTeam;
    });
    res.status(201).json({ message: "Team created", data: result });
  } catch (error) {
    next(error);
  }
};

// 3. Update Team (Admin Only)
export const updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const member = await knex("membership")
      .where({ team_id: id, user_id: req.user.id, role: "admin" })
      .first();

    if (!member) {
      return res
        .status(403)
        .json({ error: "Only team admins can update details" });
    }

    const [updated] = await knex("teams")
      .where({ id })
      .update({ name, description })
      .returning("*");

    res.status(200).json({ data: updated });
  } catch (error) {
    next(error);
  }
};

// 4. Delete Team (Admin Only)
export const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params;

    const member = await knex("membership")
      .where({ team_id: id, user_id: req.user.id, role: "admin" })
      .first();

    if (!member) {
      return res
        .status(403)
        .json({ error: "Only team admins can delete teams" });
    }

    await knex("teams").where({ id }).del();
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// 5. Add Member to Team
export const addMember = async (req, res, next) => {
  try {
    const { id } = req.params; // teamId from URL
    const { userId, role } = req.body;

    // Check if the current user is an admin of this team
    const requester = await knex("membership")
      .where({ team_id: id, user_id: req.user.id, role: "admin" })
      .first();

    if (!requester) {
      return res.status(403).json({ error: "Unauthorized to add members" });
    }

    await knex("membership").insert({
      team_id: id,
      user_id: userId,
      role: role || "member",
    });

    res.status(201).json({ message: "Member added successfully" });
  } catch (error) {
    next(error);
  }
};
