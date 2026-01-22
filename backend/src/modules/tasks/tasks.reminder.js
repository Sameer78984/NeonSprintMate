/**
 * Task Due Date Reminder System (Bonus Feature)
 * 
 * This module provides functionality to check for tasks with upcoming due dates
 * and notify users. Can be called on login or via a scheduled job.
 * 
 * Usage:
 * - Call `checkDueDateReminders(userId)` on user login
 * - Or set up a cron job to run `checkAllDueDateReminders()` periodically
 */

import knex from "../../config/db.js";

/**
 * Check for tasks with due dates within the next 24 hours for a specific user
 * @param {number} userId - User ID to check reminders for
 * @returns {Array} Array of tasks with upcoming due dates
 */
export const checkDueDateReminders = async (userId) => {
  try {
    // Validate userId
    if (!userId || isNaN(Number(userId))) {
      console.warn("Invalid userId provided to checkDueDateReminders:", userId);
      return [];
    }

    // Ensure userId is a number for database query
    const numericUserId = Number(userId);

    // Use UTC dates to avoid timezone issues
    // PostgreSQL stores timestamps in UTC, so we compare in UTC
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Get tasks assigned to user or created by user that are due within 24 hours
    // Using UTC comparison ensures consistency across timezones
    const upcomingTasks = await knex("tasks")
      .where(function () {
        this.where("assigned_to", numericUserId).orWhere("created_by", numericUserId);
      })
      .whereNotNull("due_date")
      .where("due_date", ">", now.toISOString()) // Convert to ISO string for PostgreSQL
      .where("due_date", "<=", tomorrow.toISOString())
      .whereIn("status", ["todo", "in_progress"])
      .select("id", "title", "due_date", "status", "team_id");

    // Ensure we return an array even if query fails
    return Array.isArray(upcomingTasks) ? upcomingTasks : [];
  } catch (error) {
    console.error("Error checking due date reminders:", error);
    return [];
  }
};

/**
 * Check all tasks with upcoming due dates (for scheduled jobs)
 * @returns {Array} Array of tasks with upcoming due dates grouped by user
 */
export const checkAllDueDateReminders = async () => {
  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const upcomingTasks = await knex("tasks")
      .whereNotNull("due_date")
      .where("due_date", ">", now)
      .where("due_date", "<=", tomorrow)
      .whereIn("status", ["todo", "in_progress"])
      .select("id", "title", "due_date", "status", "assigned_to", "created_by", "team_id");

    // Group by user (assigned_to or created_by)
    const remindersByUser = {};
    upcomingTasks.forEach((task) => {
      const userId = task.assigned_to || task.created_by;
      if (userId) {
        if (!remindersByUser[userId]) {
          remindersByUser[userId] = [];
        }
        remindersByUser[userId].push(task);
      }
    });

    return remindersByUser;
  } catch (error) {
    console.error("Error checking all due date reminders:", error);
    return {};
  }
};
