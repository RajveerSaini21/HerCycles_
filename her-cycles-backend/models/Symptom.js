// models/Symptom.js
const mongoose = require("mongoose");

const SymptomSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    date: { type: Date, required: true },

    symptom_type: {
      type: String,
      required: true,
      enum: [
        "cramps",
        "bloating",
        "mood_swings",
        "headache",
        "fatigue",
        "breast_tenderness",
        "acne",
        "back_pain",
        "nausea",
        "food_cravings",
        "irritability",
        "anxiety",
        "depression",
        "hot_flashes",
        "sleep_issues",
      ],
    },

    severity: { type: Number, required: true, min: 1, max: 10 },

    time_of_day: {
      type: String,
      enum: ["morning", "afternoon", "evening", "night"],
    },

    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Symptom", SymptomSchema);
