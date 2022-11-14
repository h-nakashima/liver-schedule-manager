/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable("events", (table) => {
    table.increments("id").primary();
    table.string("name", 32);
    table.string("platform", 32);
    table.timestamp("dateTime", { useTz: true });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
  return knex.schema.dropTable("events");
};
