const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["birth_control_pill", "pain_relief", "supplement", "hormone_therapy", "other"],
      required: true,
    },
    dosage: { type: String },
    reminder_times: [{ type: String }], // e.g. ["09:00", "18:00"]
    start_date: { type: Date },
    end_date: { type: Date },
    active: { type: Boolean, default: true },
    notes: { type: String },
  },
  { timestamps: { createdAt: "created_date", updatedAt: "updated_date" } }
);

module.exports = mongoose.model("Medication", MedicationSchema);




