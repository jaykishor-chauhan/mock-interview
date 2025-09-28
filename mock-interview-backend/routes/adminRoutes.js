const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/google-login", adminController.getCurrentAdmin);

module.exports = router;
