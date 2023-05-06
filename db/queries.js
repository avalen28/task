require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task_db',
  password: process.env.PASSWORD_DB,
  port: process.env.PORT_DB,
});

// Get all tasks
const getAllTasks = (req, res) => {
  pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Create a new task
const createTask = (req, res) => {
  const {
    title, description, deadline, isCompleted,
  } = req.body;

  const formattedDeadline = new Date(deadline).toGMTString();
  pool.query(
    'INSERT INTO tasks (title, description, deadline, is_completed) VALUES ($1, $2, $3, $4)',
    [title, description, formattedDeadline, isCompleted],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`${results.rowCount} tasks added to DB`);
    },
  );
};

// Update a task
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const {
    title, description, deadline, isCompleted,
  } = req.body;
  pool.query(
    'UPDATE tasks SET title = $1, description = $2, deadline = $3, is_completed = $4  WHERE id = $5',
    [title, description, deadline, isCompleted, taskId],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${taskId}`);
    },
  );
};

module.exports = { createTask, getAllTasks, updateTask };
