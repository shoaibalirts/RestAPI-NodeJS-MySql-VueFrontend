import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config({ path: "../server/config/config.env" });

var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default connection;
