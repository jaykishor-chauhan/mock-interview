const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { getDashboard } = require("../controllers/dashboardController");
const { getCourse, addCourse, deleteCourse } = require("../controllers/courseController");
const { addQuestion, getQuestion, deleteQuestion } = require("../controllers/questionController");
const { registerAdmin, loginAdmin, verifyAdminEmail, getAllAdmins } = require("../controllers/adminController");


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/verification", verifyAdminEmail);

router.patch("/account-activation-deactivation", adminController.accountActivationDeactivation);


router.get("/google-login", adminController.getCurrentAdmin);
router.get("/get-profile", adminController.getAdminDetails);


router.get('/dashboard', getDashboard);

router.post("/add-course", addCourse);
router.get("/get-courses", getCourse);
router.delete("/delete-course/:courseId", deleteCourse);

router.post("/add-question", addQuestion);
router.get('/get-question', getQuestion);
router.delete('/delete-question/:questionId', deleteQuestion);

router.get("/getalladmins", getAllAdmins);


module.exports = router;
