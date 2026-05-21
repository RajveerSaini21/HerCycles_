import React from 'react';


const SEVERITY_LEVELS = [
  { value: "Mild", label: "Mild", description: "Barely noticeable, doesn't interfere with daily activities." },
  { value: "Moderate", label: "Moderate", description: "Noticeable but manageable, some impact on daily activities." },
  { value: "Severe", label: "Severe", description: "Significant impact, difficulty with normal activities." },
  { value: "Very Severe", label: "Very Severe", description: "Extreme discomfort, unable to perform normal activities." }
];

export default function Step2Severity({ data, onUpdate }) {
  const handleSeveritySelect = (value) => {
    onUpdate({ severity: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Assess Severity</h3>
      <p className="text-sm text-gray-500">How would you rate the overall severity of your symptoms?</p>
      
      <div className="space-y-3">
        {SEVERITY_LEVELS.map(level => (
          <div
            key={level.value}
            onClick={() => handleSeveritySelect(level.value)}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              data.severity === level.value 
                ? 'bg-sky-50 border-sky-300 shadow-sm' 
                : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                data.severity === level.value 
                  ? 'bg-sky-500 border-sky-500' 
                  : 'border-gray-300'
              }`}>
                {data.severity === level.value && (
                  <div className="w-2 h-2 rounded-full bg-white m-0.5"></div>
                )}
              </div>
              <div className="grid gap-1.5">
                <span className="font-medium">{level.label}</span>
                <span className="text-sm text-gray-500">{level.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}