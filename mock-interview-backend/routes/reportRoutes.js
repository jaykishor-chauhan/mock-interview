const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { getReport, getHistory } = require('../controllers/reportController');

// All report routes require authentication
// IMPORTANT: /history must be declared BEFORE /:sessionId so Express doesn't
// treat "history" as a sessionId parameter.
router.get('/history',     verifyJWT, getHistory);
router.get('/:sessionId',  verifyJWT, getReport);

module.exports = router;
