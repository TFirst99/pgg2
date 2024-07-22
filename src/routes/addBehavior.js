const express = require('express');
const router = express.Router();
const addBehaviorController = require('../controllers/addBehaviorController');

router.post('/add', addBehaviorController.addBehavior);

module.exports = router;