const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const { getDashboard } = require("../controllers/dashboardController");
const { getCourse, addCourse, deleteCourse } = require("../controllers/courseController");
const { addQuestion, getQuestion, deleteQuestion } = require("../controllers/questionController");
const { registerAdmin, loginAdmin, verifyAdminEmail, getAllAdmins, uploadDoc, listDocs } = require("../controllers/adminController");
const verifyJWT  = require("../middleware/verifyJWT");
const requireRole = require("../middleware/requireRole");

// Multer — memory storage (no disk writes; buffer passed to controller)
const upload = multer({ storage: multer.memoryStorage() });


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/verification", verifyAdminEmail);

router.patch("/account-activation-deactivation", adminController.accountActivationDeactivation);


router.get("/google-login", adminController.getCurrentAdmin);
router.get("/google-token-login", authController.verifyTokenLogin);
router.get("/get-profile", adminController.getAdminDetails);


router.get('/dashboard', getDashboard);

router.post("/add-course", addCourse);
router.get("/get-courses", getCourse);
router.delete("/delete-course/:courseId", deleteCourse);

router.post("/add-question", addQuestion);
router.get('/get-question', getQuestion);
router.delete('/delete-question/:questionId', deleteQuestion);

router.get("/getalladmins", getAllAdmins);

// ── Knowledge document upload (protected — admin JWT required) ─────────────────
router.post("/docs/upload", verifyJWT, requireRole("admin"), upload.single("file"), uploadDoc);
router.get("/docs",         verifyJWT, requireRole("admin"), listDocs);


module.exports = router;
