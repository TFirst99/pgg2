const express = require('express');
const router = express.Router();
const finController = require('../controllers/finController');

router.get('/stats', finController.getFinalStats);

module.exports = router;
