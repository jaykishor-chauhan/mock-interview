const express = require("express");
const router = express.Router();
const { registerUser, verifyEmail, loginUser, getAllUsers } = require("../controllers/userController");
const { resetPassword, updatePassword } = require("../controllers/resetController");
const { filterQuestions } = require("../controllers/questionController");


// --- User and Admin Authentication Routes ---
router.post("/user/register", registerUser);
router.post("/verification", verifyEmail);
router.post("/user/login", loginUser);

// --- Get Users and Admins Info Routes ---
router.get("/user/getallusers", getAllUsers);


// --- Reset Password and New Password Routes ---
router.post("/reset-password", resetPassword);
router.post("/update-password", updatePassword);

// --- Interview Routes ---
router.post("/filter-questions", filterQuestions);

module.exports = router;
