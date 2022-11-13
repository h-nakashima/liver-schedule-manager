/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("events").insert([
    {
      name: "Utawaku",
      platform: "Youtube",
      date_time: "2022-11-13T19:00:00+09:00",
    },
    {
      name: "Zatsudan",
      platform: "bilibili",
      date_time: "2022-11-14T19:00:00+09:00",
    },
  ]);
};
