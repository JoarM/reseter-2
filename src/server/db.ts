import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
 
export const poolConnection = mysql.createPool({
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_name,
  password: process.env.db_password
});
 
export const db = drizzle(poolConnection);