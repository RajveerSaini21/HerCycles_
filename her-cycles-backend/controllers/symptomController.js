// controllers/symptomController.js
const Symptom = require("../models/Symptom");

// ✅ Create symptom
exports.createSymptom = async (req, res, next) => {
  try {
    const symptom = await Symptom.create({ ...req.body, user: req.auth.id });
    res.status(201).json({ success: true, data: symptom });
  } catch (err) {
    next(err);
  }
};

// ✅ Get all symptoms for logged in user
exports.getSymptoms = async (req, res, next) => {
  try {
    const symptoms = await Symptom.find({ user: req.auth.id }).sort({
      date: -1,
    });
    res.json({ success: true, data: symptoms });
  } catch (err) {
    next(err);
  }
};

// ✅ Update symptom
exports.updateSymptom = async (req, res, next) => {
  try {
    const updated = await Symptom.findOneAndUpdate(
      { _id: req.params.id, user: req.auth.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Symptom not found" });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// ✅ Delete symptom
exports.deleteSymptom = async (req, res, next) => {
  try {
    const deleted = await Symptom.findOneAndDelete({
      _id: req.params.id,
      user: req.auth.id,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Symptom not found" });
    }
    res.json({ success: true, message: "Symptom deleted" });
  } catch (err) {
    next(err);
  }
};
