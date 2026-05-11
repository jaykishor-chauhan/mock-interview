const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyEmail,
  loginUser,
  getAllUsers,
  refreshToken,
  logout,
  getProfile,
  updateProfile,
} = require("../controllers/userController");
const { filterQuestions } = require("../controllers/questionController");
const verifyJWT = require("../middleware/verifyJWT");


// --- User Authentication Routes ---
router.post("/user/register", registerUser);
router.post("/verification", verifyEmail);
router.post("/user/login", loginUser);

// --- Refresh token + Logout ---
router.post("/user/refresh", refreshToken);
router.post("/user/logout",  logout);

// --- Profile (protected) ---
router.get("/users/me",   verifyJWT, getProfile);
router.patch("/users/me", verifyJWT, updateProfile);

// --- Get Users Info ---
router.get("/user/getallusers", getAllUsers);

// --- Interview Routes ---
router.post("/filter-questions", filterQuestions);

module.exports = router;
