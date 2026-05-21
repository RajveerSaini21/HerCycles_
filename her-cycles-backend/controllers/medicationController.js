const Medication = require("../models/Medication");

// GET /api/medications
exports.getMedications = async (req, res) => {
  try {
    const meds = await Medication.find().sort({ created_date: -1 });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medications" });
  }
};

// POST /api/medications
exports.createMedication = async (req, res) => {
  try {
    const med = new Medication(req.body);
    await med.save();
    res.status(201).json(med);
  } catch (err) {
    res.status(400).json({ error: "Failed to create medication", details: err.message });
  }
};

// PUT /api/medications/:id
exports.updateMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!med) return res.status(404).json({ error: "Medication not found" });
    res.json(med);
  } catch (err) {
    res.status(400).json({ error: "Failed to update medication", details: err.message });
  }
};

// DELETE /api/medications/:id
exports.deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findByIdAndDelete(req.params.id);
    if (!med) return res.status(404).json({ error: "Medication not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete medication" });
  }
};
