const express = require('express');
const router = express.Router();
const behaviorController = require('../controllers/behaviorController');

router.post('/add', behaviorController.addBehavior);
router.get('/', behaviorController.getBehavior);

module.exports = router;
