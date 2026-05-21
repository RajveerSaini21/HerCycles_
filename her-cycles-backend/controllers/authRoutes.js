const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const { requireAuth } = require("../middleware/authHandler");

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// GET /api/auth/me (protected)
router.get("/me", requireAuth(), getProfile);

module.exports = router;
