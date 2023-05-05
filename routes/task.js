const router = require('express').Router();

// @desc    Test endpoint for the API
// @route   GET /
// @access  Public
router.get('/test', async (req, res) => {
  res.json({ message: 'This is a test endpoint for the task manager project' });
});

module.exports = router;
