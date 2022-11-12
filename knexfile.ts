require("dotenv");

// knex.tsにてimportする予定だったconfigファイル。現在未使用。
// TODO: knexfile.jsと統合する

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  client: "postgresql",
  connection: process.env.DB_URL || {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT ?? "5432", 10),
    database: process.env.DB_NAME || "liver_schedule",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

module.exports = config;
export default config;
