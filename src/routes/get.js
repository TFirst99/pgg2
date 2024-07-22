const express = require('express');
const router = express.Router();
const getController = require('../controllers/getController');

router.post('/get', getController.getData);

module.exports = router;