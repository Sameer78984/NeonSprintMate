import knex from "../../config/db.js";

// 1. Get all teams the current user belongs to
export const getAllTeams = async (req, res, next) => {
  try {
    const teams = await knex("teams")
      .join("membership", "teams.id", "membership.team_id")
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
      const [newTeam] = await trx("teams")
        .insert({ name, description, created_by: req.user.id })
        .returning("*");

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

// 3. Update Team
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

// 4. Delete Team
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

// 5. [NEW] Get Team Members
export const getTeamMembers = async (req, res, next) => {
  try {
    const { id } = req.params; // Team ID

    // Security: Check if requester is in the team
    const isMember = await knex("membership")
      .where({ team_id: id, user_id: req.user.id })
      .first();

    if (!isMember) return res.status(403).json({ error: "Access Denied" });

    // Join Users table to get names and emails
    const members = await knex("membership")
      .join("users", "membership.user_id", "users.id")
      .where("membership.team_id", id)
      .select("users.id", "users.name", "users.email", "membership.role");

    res.status(200).json({ data: members });
  } catch (error) {
    next(error);
  }
};

// 6. [UPDATED] Add Member (By Email)
export const addMember = async (req, res, next) => {
  try {
    const { id } = req.params; // Team ID
    const { email, role } = req.body; // Expect Email now

    // A. Verify Requester is Admin
    const requester = await knex("membership")
      .where({ team_id: id, user_id: req.user.id, role: "admin" })
      .first();

    if (!requester) {
      return res
        .status(403)
        .json({ error: "Only admins can recruit operatives" });
    }

    // B. Find User by Email
    const userToAdd = await knex("users").where({ email }).first();
    if (!userToAdd) {
      return res
        .status(404)
        .json({ error: "Operative email not found in database" });
    }

    // C. Check if already a member
    const existing = await knex("membership")
      .where({ team_id: id, user_id: userToAdd.id })
      .first();

    if (existing) {
      return res
        .status(400)
        .json({ error: "Operative is already active in this unit" });
    }

    // D. Add Membership
    await knex("membership").insert({
      team_id: id,
      user_id: userToAdd.id,
      role: role || "member",
    });

    res.status(201).json({ message: "Operative recruited successfully" });
  } catch (error) {
    next(error);
  }
};
