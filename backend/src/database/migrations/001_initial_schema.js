/**
 * Consolidated Database Schema Migration
 * Fulfills requirements for Users, Teams, Membership, and Tasks tables
 */

export async function up(knex) {
  // 1. Users Table
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 255).unique().notNullable(); // Required for Auth logic
    table.string("email", 255).unique().notNullable();
    table.string("password", 255).notNullable(); // To be hashed with bcrypt
    table.string("name", 255);
    table.timestamps(true, true);
    table.index("email");
  });

  // 2. Teams Table
  await knex.schema.createTable("teams", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.text("description");
    table.integer("created_by").unsigned().notNullable();
    table.timestamps(true, true);
    table.foreign("created_by").references("users.id").onDelete("CASCADE");
  });

  // 3. Membership (User-Team Relationship) Table
  await knex.schema.createTable("membership", (table) => {
    table.increments("id").primary();
    table.integer("team_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.string("role", 50).defaultTo("member");
    table.timestamps(true, true);
    table.foreign("team_id").references("teams.id").onDelete("CASCADE");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.unique(["team_id", "user_id"]);
  });

  // 4. Tasks Table
  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.text("description");
    table.enum("status", ["todo", "in_progress", "done"]).defaultTo("todo"); // Filter requirement
    table.enum("priority", ["low", "medium", "high"]).defaultTo("medium");
    table.integer("assigned_to").unsigned();
    table.integer("team_id").unsigned();
    table.integer("created_by").unsigned().notNullable();
    table.timestamp("due_date"); // Bonus Feature: Due date reminders
    table.timestamps(true, true);

    // Foreign Keys
    table.foreign("assigned_to").references("users.id").onDelete("SET NULL");
    table.foreign("team_id").references("teams.id").onDelete("CASCADE");
    table.foreign("created_by").references("users.id").onDelete("CASCADE");

    // Indexes for API performance
    table.index("team_id");
    table.index("assigned_to");
    table.index("status");
  });
}

export async function down(knex) {
  /** * CRITICAL: Drop tables in reverse order of creation
   * to avoid foreign key dependency errors.
   */
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("membership");
  await knex.schema.dropTableIfExists("teams");
  await knex.schema.dropTableIfExists("users");
}
