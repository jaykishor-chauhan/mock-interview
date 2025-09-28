const express = require("express");
const router = express.Router();
const { registerUser, verifyEmail, loginUser, getAllUsers } = require("../controllers/userController");
const { registerAdmin, loginAdmin, verifyAdminEmail, getAllAdmins } = require("../controllers/adminController");
const { resetPassword, updatePassword } = require("../controllers/resetController");
const { getCourse, addCourse } = require("../controllers/courseController");
const { addQuestion, getQuestion } = require("../controllers/questionController");


// --- User and Admin Authentication Routes ---
router.post("/user/register", registerUser);
router.post("/verification", verifyEmail);
router.post("/user/login", loginUser);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.post("/admin/verification", verifyAdminEmail);


// --- Get Users and Admins Info Routes ---
router.get("/user/getallusers", getAllUsers);
router.get("/admin/getalladmins", getAllAdmins);


// --- Reset Password and New Password Routes ---
router.post("/reset-password", resetPassword);
router.post("/update-password", updatePassword);

// --- Interview Routes ---
// router.post("/get-questions", getQuestions);




// Admin Routes can be added here
router.post("/admin/add-course", addCourse);
router.get("/admin/get-courses", getCourse);
router.post("/admin/add-question", addQuestion);
router.get('/admin/get-question', getQuestion);

module.exports = router;
