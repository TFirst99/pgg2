const express = require('express');
const router = express.Router();
const finController = require('../controllers/finController');

router.post('/fin', finController.getFinalData);

module.exports = router;