// const mongoose = require("mongoose");

// const CycleSchema = new mongoose.Schema(
//   {
//     start_date: { type: Date, required: true },
//     end_date: { type: Date },
//     cycle_length: { type: Number },
//     period_length: { type: Number },
//     flow_intensity: {
//       type: String,
//       enum: ["light", "moderate", "heavy"],
//       default: "moderate",
//     },
//     notes: { type: String, trim: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Cycle", CycleSchema);


const mongoose = require("mongoose");

const CycleSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
    cycle_length: { type: Number },
    period_length: { type: Number },
    flow_intensity: {
      type: String,
      enum: ["light", "moderate", "heavy"],
      default: "moderate",
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cycle", CycleSchema);
