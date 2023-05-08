require('dotenv').config();
const { Pool } = require('pg');
const { reqBodyFielsAreValid } = require('../utils/utils');

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
      res.status(500).json({ message: 'Internal server error' });
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Get all pending tasks
const getAllPendingTasks = (req, res) => {
  pool.query(
    'SELECT * FROM tasks WHERE is_completed = false ORDER BY deadline DESC',
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
      }
      res.status(200).json(results.rows);
    },
  );
};

// Get a single task
const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  if (Number.isNaN(taskId)) {
    res.status(400).json({ message: 'Please provide a valid task ID' });
    return;
  }
  pool.query(
    'SELECT * FROM tasks WHERE id = $1',
    [taskId],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
      }
      if (results.rows.length === 0) {
        res.status(200).json({ message: 'No task found with the provided ID' });
        return;
      }
      res.status(200).json(results.rows);
    },
  );
};

// Create a new task
const createTask = (req, res) => {
  const {
    title, description, deadline, isCompleted,
  } = req.body;
  if (!reqBodyFielsAreValid(title, description, deadline, isCompleted)) {
    res.status(400).json({ message: 'Please check your fields' });
    return;
  }
  const formattedDeadline = new Date(deadline);
  pool.query(
    'INSERT INTO tasks (title, description, deadline, is_completed) VALUES ($1, $2, $3, $4)',
    [title, description, formattedDeadline, isCompleted],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
      }
      res.status(201).send(`${results.rowCount} tasks added to DB`);
    },
  );
};

// Update a task
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  if (Number.isNaN(taskId)) {
    res.status(400).json({ message: 'Please provide a valid task ID' });
    return;
  }
  const {
    title, description, deadline, isCompleted,
  } = req.body;
  if (!reqBodyFielsAreValid(title, description, deadline, isCompleted)) {
    res.status(400).json({ message: 'Please check your fields' });
    return;
  }
  const formattedDeadline = new Date(deadline);
  pool.query(
    'UPDATE tasks SET title = $1, description = $2, deadline = $3, is_completed = $4  WHERE id = $5',
    [title, description, formattedDeadline, isCompleted, taskId],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Internal server error' });
        throw error;
      }
      if (results.rows.length === 0) {
        res
          .status(200)
          .json({ message: 'No task found with the provided ID' });
        return;
      }
      res.status(200).send(`Task modified with ID: ${taskId}`);
    },
  );
};

// Delete a task
const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  pool.query('DELETE FROM tasks WHERE id = $1', [taskId], (error) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Task deleted with ID: ${taskId}`);
  });
};

module.exports = {
  createTask, getAllTasks, getAllPendingTasks, getTaskById, updateTask, deleteTask,
};
