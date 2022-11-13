/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("events").insert([
    {
      name: "Utawaku",
      platform: "Youtube",
    },
    {
      name: "Zatsudan",
      platform: "bilibili",
    },
  ]);
};
