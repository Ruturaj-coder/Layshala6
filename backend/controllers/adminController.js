const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const Achievement = require("../models/Achievement");
const Registration = require("../models/Registration"); // Import the Student (Registration) model

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Check if the password matches
    if (password !== admin.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token as response
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Controller to fetch student data
const getStudentDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch all students with all fields
    const students = await Registration.find(); 
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAchievements = async (req, res) => {
  try {
    // Extract and verify admin token from request headers
    const token = req.headers.authorization?.split(" ")[1]; // Assumes "Bearer <token>" format

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch achievements with student details populated
    const achievements = await Achievement.find().populate("studentId", "studentName");
    res.status(200).json({ achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { adminLogin, getStudentDetails, getAchievements };
