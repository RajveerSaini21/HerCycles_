// const { analyzeSymptoms } = require("../integrations/gemini");

// exports.analyze = async (req, res, next) => {
//   try {
//     const { selectedSymptoms, customSymptom, severity, duration, cycleDay, details } = req.body;

//     const symptomsString = [
//       ...(selectedSymptoms || []),
//       customSymptom && `Other: ${customSymptom}`
//     ].filter(Boolean).join(", ");

//     const prompt = `
//     You are a compassionate women's health expert. 
//     Analyse the following symptoms. 
//     Do NOT give a diagnosis. Instead, suggest possible causes, self-care tips, and when to seek medical help.

//     User's Data:
//     - Symptoms: ${symptomsString}
//     - Severity: ${severity}
//     - Duration: ${duration}
//     - Menstrual Cycle Day: ${cycleDay || "Not provided"}
//     - Additional Details: ${details || "None"}
//     `;

//     const analysisText = await analyzeSymptoms(prompt);

//     res.json({ success: true, data: analysisText });
//   } catch (err) {
//     next(err);
//   }
// };







const { analyzeSymptoms } = require("../integrations/gemini");
function buildPrompt({ selectedSymptoms, customSymptom, severity, duration, cycleDay, details }) {
  const symptomsString = [
    ...(selectedSymptoms || []),
    customSymptom ? `Other: ${customSymptom}` : null
  ].filter(Boolean).join(", ") || "None provided";
  return `
You are a compassionate women's health expert. Analyze symptoms and return a single JSON object *only* (no surrounding explanation).
Follow this exact schema:

{
  "likely_conditions": [{"name": "<condition>", "confidence": <0-100>, "rationale":"<short explanation>"}],
  "red_flags": ["<short reasons why to seek urgent care>"],
  "self_care_tips": ["<actionable tip 1>", "tip 2"],
  "recommended_next_steps": ["<what to do next>"],
  "brief_advice": "<one-sentence summary>",
  "disclaimer": "<one-sentence medical disclaimer>"
}

User input:
- Symptoms: ${symptomsString}
- Severity: ${severity || "Not provided"}
- Duration: ${duration || "Not provided"}
- Menstrual cycle day: ${cycleDay || "Not provided"}
- Additional details: ${details || "None"}

If you are uncertain, return low confidence percentages and recommend seeing a doctor. NEVER give a definitive diagnosis.
Return JSON only (no extra text).
  `;
}

exports.analyze = async (req, res, next) => {
  try {
    const body = req.body || {};
    const prompt = buildPrompt(body);
    const result = await analyzeSymptoms(prompt);
    let normalized;
    if (result && typeof result === "object" && !Array.isArray(result) && (result.likely_conditions || result.self_care_tips)) {
      normalized = result;
    } else if (typeof result === "string") {
      normalized = { raw: result };
    } else if (result && result.raw) {
      normalized = { raw: result.raw };
    } else {
      normalized = { raw: JSON.stringify(result) || "No analysis returned" };
    }

    return res.json({ success: true, data: normalized });
  } catch (err) {
    console.error("analyzerController.analyze error:", err.response?.data || err.message || err);
    const debug = err.response?.data ? err.response.data : undefined;
    return res.status(500).json({ success: false, error: err.message || "Internal server error", debug });
  }
};