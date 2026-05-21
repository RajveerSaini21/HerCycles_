import React from "react";

/**
 * Default Core wrapper
 */
export default function Core({ children }) {
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h2 className="text-lg font-semibold mb-2 text-pink-600">Core Integration</h2>
      <div>{children || "Core system placeholder – add your logic here."}</div>
    </div>
  );
}

/**
 * Example InvokeLLM function
 * Replace this with your actual LLM / API call logic later
 */
export async function InvokeLLM(prompt) {
  // right now it just echoes back
  return {
    success: true,
    input: prompt,
    output: `This is a placeholder response for: "${prompt}"`,
  };
}
