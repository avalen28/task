const router = require('express').Router();

// @desc    Index page for the API
// @route   GET /
// @access  Public
router.get('/', async (req, res) => {
  res.send('This is the Walk Away home. Add an endpoint to see data.');
});

module.exports = router;
