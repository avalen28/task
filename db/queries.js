require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task_db',
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
});
