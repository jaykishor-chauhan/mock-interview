const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");


router.post("/ai-generate-questions", agentController.getQuestionsFromAI);


module.exports = router;
