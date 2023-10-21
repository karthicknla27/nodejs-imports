import Pool from "pg";

const pool = new Pool({
  user: "",
  database: "",
  password: "password",
  port: 5432,
  host: "localhost",
});
