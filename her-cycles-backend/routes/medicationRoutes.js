const express = require("express");
const router = express.Router();
const controller = require("../controllers/medicationController");

// CRUD
router.get("/", controller.getMedications);
router.post("/", controller.createMedication);
router.put("/:id", controller.updateMedication);
router.delete("/:id", controller.deleteMedication);

module.exports = router;
