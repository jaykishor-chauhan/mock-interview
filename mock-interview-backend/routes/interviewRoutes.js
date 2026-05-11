const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { startSession, submitAnswer, endSession } = require('../controllers/interviewController');

// All interview routes require a valid JWT
router.post('/start',  verifyJWT, startSession);
router.post('/answer', verifyJWT, submitAnswer);
router.post('/end',    verifyJWT, endSession);

module.exports = router;
