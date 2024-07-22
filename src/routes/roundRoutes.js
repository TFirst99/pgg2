const express = require('express');
const router = express.Router();
const roundController = require('../controllers/roundController');

// Get current round
router.get('/current', roundController.getCurrentRound);

// Advance to next round
router.post('/advance', roundController.advanceRound);

module.exports = router;