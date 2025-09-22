const express = require("express");
const router = express.Router();
const { registerUser, verifyEmail, loginUser } = require("../controllers/userController");
const { resetPassword, updatePassword } = require("../controllers/resetController");
const { getQuestions } = require("../controllers/questionController");

const { addQuestion } = require("../controllers/addQuestionController");



// --- User Authentication Routes ---
router.post("/user/register", registerUser);
router.post("/verification", verifyEmail);
router.post("/user/login", loginUser);

// --- Reset Password and New Password Routes ---
router.post("/reset-password", resetPassword);
router.post("/update-password", updatePassword);

// --- Interview Routes ---
router.post("/get-questions", getQuestions);




// Admin Routes can be added here
router.post("/admin/add-question", addQuestion);

module.exports = router; 
