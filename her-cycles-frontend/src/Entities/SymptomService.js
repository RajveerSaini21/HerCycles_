// src/Entities/SymptomService.js
import SymptomSchema from "./Symptom.json";
import createService from "./createService";

// optional seed so the UI shows something by default
const today = new Date();
const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const seed = [
  {
    date: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
    symptom_type: "cramps",
    severity: 6,
    time_of_day: "morning",
    notes: "Mild cramps before work",
  },
  {
    date: iso(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
    symptom_type: "mood_swings",
    severity: 7,
    time_of_day: "evening",
    notes: "Felt anxious in the evening",
  },
];

const Symptom = createService("Symptom", SymptomSchema, {
  storageKey: "hc_symptoms",
  seed,
});

export default Symptom;
