const express = require("express");
const { adminLogin, getStudentDetails, getAchievements } = require("../controllers/adminController");
const router = express.Router();

// Route for admin login
router.post("/login", adminLogin);
router.get("/students", getStudentDetails);
router.get("/achievements", getAchievements);

module.exports = router;