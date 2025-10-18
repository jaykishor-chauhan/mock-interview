const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { getDashboard } = require("../controllers/dashboardController");
const { getCourse, addCourse } = require("../controllers/courseController");
const { addQuestion, getQuestion } = require("../controllers/questionController");
const { registerAdmin, loginAdmin, verifyAdminEmail, getAllAdmins } = require("../controllers/adminController");



router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.post("/admin/verification", verifyAdminEmail);

router.patch("/account-activation-deactivation", adminController.accountActivationDeactivation);

router.get("/google-login", adminController.getCurrentAdmin);
router.get("/get-profile", adminController.getAdminDetails);
router.get('/dashboard', getDashboard);

router.post("/add-course", addCourse);
router.get("/get-courses", getCourse);
router.post("/add-question", addQuestion);
router.get('/get-question', getQuestion);

router.get("/getalladmins", getAllAdmins);


module.exports = router;
