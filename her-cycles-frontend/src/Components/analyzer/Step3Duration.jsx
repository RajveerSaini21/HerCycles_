import React from 'react';
import { Label } from "../ui/label";

const DURATION_OPTIONS = [
  { value: "A few hours", label: "A few hours", description: "Symptoms started today." },
  { value: "1-3 days", label: "1-3 days", description: "Recent onset." },
  { value: "4-7 days", label: "4-7 days", description: "About a week." },
  { value: "1-2 weeks", label: "1-2 weeks", description: "A couple of weeks." },
  { value: "2-4 weeks", label: "2-4 weeks", description: "About a month." },
  { value: "Over a month", label: "Over a month", description: "Long-term symptoms." }
];

export default function Step3Duration({ data, onUpdate }) {
  const handleDurationSelect = (value) => {
    onUpdate({ duration: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Symptom Duration</h3>
      <p className="text-sm text-gray-500">How long have you been experiencing these symptoms?</p>
      
      <div className="space-y-3">
        {DURATION_OPTIONS.map(option => (
          <div
            key={option.value}
            onClick={() => handleDurationSelect(option.value)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              data.duration === option.value 
                ? 'bg-sky-50 border-sky-300 shadow-sm' 
                : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                data.duration === option.value 
                  ? 'bg-sky-500 border-sky-500' 
                  : 'border-gray-300'
              }`}>
                {data.duration === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>
                )}
              </div>
              <div className="grid gap-1.5">
                <span className="font-medium">{option.label}</span>
                <span className="text-sm text-gray-500">{option.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}