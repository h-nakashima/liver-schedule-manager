/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("events").insert([
    {
      id: 1,
      name: "Utawaku",
    },
    {
      id: 2,
      name: "Zatsudan",
    },
  ]);
};
