const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "POSTGRES",
  host: "localhost",
  port: 5432,
  database: "climbdestis"
});

module.exports = pool;