const router = require('express').Router();
const db = require('../db/queries');

// @desc    Test endpoint for the API
// @route   GET /tasks/test
// @access  Public
router.get('/test', async (req, res) => {
  res.json({ message: 'This is a test endpoint for the task manager project' });
});

// @desc    Create new Task
// @route   POST /tasks/create
// @access  Public
router.post('/create', db.createTask);

module.exports = router;
