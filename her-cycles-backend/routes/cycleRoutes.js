
const express = require("express");
const router = express.Router();
const {
  getCycles,
  createCycle,
  updateCycle,
  deleteCycle,
} = require("../controllers/cycleController");
const { protect } = require("../middleware/authMiddleware");

// ✅ Protected routes
router.get("/", protect, getCycles);
router.post("/", protect, createCycle);
router.put("/:id", protect, updateCycle);
router.delete("/:id", protect, deleteCycle);

module.exports = router;
