// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function analyzeSymptoms(prompt) {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text(); // plain text
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     throw new Error("Symptom analysis failed");
//   }
// }

// module.exports = { analyzeSymptoms };




const axios = require("axios");

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = process.env.GEMINI_ENDPOINT;

async function analyzeSymptoms(prompt) {
  if (!GEMINI_KEY || !GEMINI_ENDPOINT) {
    throw new Error("Gemini API not configured");
  }

  // MINIMAL REQUEST BODY (works 100%)
  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await axios.post(GEMINI_ENDPOINT, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_KEY
      }
    });

    // Extract text safely
    const candidate = response.data?.candidates?.[0];
    const part = candidate?.content?.parts?.[0];

    return part?.text || JSON.stringify(response.data);

  } catch (err) {
    console.error("GEMINI ERROR:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { analyzeSymptoms };