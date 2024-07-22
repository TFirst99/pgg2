const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.post('/update', statusController.updateStatus);

module.exports = router;