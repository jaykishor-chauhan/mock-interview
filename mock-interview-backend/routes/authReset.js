const express = require("express");
const router = express.Router();
const { resetPassword, updatePassword } = require("../controllers/resetController");


// --- Reset Password and New Password Routes ---
router.post("/reset-password", resetPassword);
// --- New Password Route ---
router.post("/update-password", updatePassword);

module.exports = router;