// src/Entities/CycleService.js
import CycleSchema from "./Cycle.json";
import createService from "./createService";

// Optional seed so the UI shows stats immediately:
const today = new Date();
const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const seed = [
  {
    start_date: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)),
    end_date: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 26)),
    cycle_length: 29,
    period_length: 4,
    flow_intensity: "moderate",
    notes: "All normal.",
    predicted: false,
  },
  {
    start_date: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
    end_date: null,
    cycle_length: 28,
    period_length: 5,
    flow_intensity: "light",
    notes: "",
    predicted: false,
  },
];

const Cycle = createService("Cycle", CycleSchema, {
  storageKey: "hc_cycles",
  seed,
});

export default Cycle;
