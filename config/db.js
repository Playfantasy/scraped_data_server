// This code sets up a MySQL database connection pool using the mysql2 library and environment variables for configuration.
import dotenv from "dotenv";
dotenv.config();
import { createPool } from "mysql2";

console.log(`process.env.DB_HOST ${process.env.DB_HOST}`);
console.log(`process.env.DB_USER ${process.env.DB_USER}`);
console.log(`process.env.DB_PASSWORD ${process.env.DB_PASSWORD}`);
console.log(`process.env.DB_NAME ${process.env.DB_NAME}`);

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool.promise();
