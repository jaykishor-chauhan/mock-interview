const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { resetPassword, updatePassword } = require("../controllers/resetController");
const { getQuestions } = require("../controllers/courseController");



// --- User Authentication Routes ---
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// --- Reset Password and New Password Routes ---
router.post("/reset-password", resetPassword);
router.post("/update-password", updatePassword);

// --- Interview Routes ---
router.get("/get-questions/course:name", getQuestions);


module.exports = router; 
