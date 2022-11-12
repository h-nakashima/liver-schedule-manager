import { knex } from "knex";

// import config from "../knexfile";

// TODO: 設定がベタ書きになっているのでknexfile.tsをimportする
//       knexがデフォルトで export default をサポートしていないため上手くimportできない
//       ソースはSlackOverFlow。ほんまかいなって感じだったが一旦Issueまで追うのはやめる
//       https://stackoverflow.com/questions/52093618/knex-required-configuration-option-client-is-missing-error

export default knex({
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
});
