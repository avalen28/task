const router = require('express').Router();
const db = require('../db/queries');

// @desc    Test endpoint for the API
// @route   GET /tasks/test
// @access  Public
router.get('/test', async (req, res) => {
  res.json({ message: 'This is a test endpoint for the task manager project' });
});

// @desc    Get all Tasks
// @route   GET /tasks/all
// @access  Public
router.get('/all', db.getAllTasks);

// @desc    Create new Task
// @route   POST /tasks/create
// @access  Public
router.post('/create', db.createTask);

// @desc    Update new Task
// @route   PUT /tasks/edit/:taskId
// @access  Public
router.put('/edit/:taskId', db.updateTask);

// @desc    Delete a Task
// @route   DELETE /tasks/delete/:taskId
// @access  Public
router.delete('/delete/:taskId', db.deleteTask);

module.exports = router;
