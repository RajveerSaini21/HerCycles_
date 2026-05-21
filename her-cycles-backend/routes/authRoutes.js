// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   getMe,
//   logout,
//   getAllUsers,
// } = require("../controllers/authController");

// // POST /api/auth/register
// router.post("/register", register);

// // POST /api/auth/login
// router.post("/login", login);

// // GET /api/auth/me
// router.get("/me", getMe);

// // POST /api/auth/logout
// router.post("/logout", logout);

// // GET /api/auth/users
// router.get("/users", getAllUsers);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  register,
  verifyOtp,
  resendOtp,
  login,
  getMe,
  logout,
  getAllUsers,
} = require("../controllers/authController");

// Registration + OTP
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

// Login
router.post("/login", login);

// User info
router.get("/me", getMe);
router.post("/logout", logout);
router.get("/users", getAllUsers);

module.exports = router;
