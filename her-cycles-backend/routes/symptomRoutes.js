// routes/symptomRoutes.js
const express = require("express");
const {
  createSymptom,
  getSymptoms,
  updateSymptom,
  deleteSymptom,
} = require("../controllers/symptomController");
const { requireAuth } = require("../utils/jwt");

const router = express.Router();

// All routes require authentication
router.use(requireAuth());

router.route("/")
  .get(getSymptoms)      // GET /api/symptoms
  .post(createSymptom);  // POST /api/symptoms

router.route("/:id")
  .put(updateSymptom)    // PUT /api/symptoms/:id
  .delete(deleteSymptom); // DELETE /api/symptoms/:id

module.exports = router;
