const { Pool } = require("pg");
require("dotenv").config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});


pool.connect()
  .then(() => {
    console.log("✅ Connected to Supabase PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

module.exports = pool;
