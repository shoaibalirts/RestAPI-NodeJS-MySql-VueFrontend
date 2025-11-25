import mysql from "mysql";
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9602",
  database: "vue_product_page",
});

export default connection;
