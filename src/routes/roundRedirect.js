const express = require('express');
const router = express.Router();
const roundRedirectController = require('../controllers/roundRedirectController');

router.post('/js_round', roundRedirectController.getRound);
router.post('/redirect', roundRedirectController.getRedirect);

module.exports = router;