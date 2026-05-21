import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SYMPTOM_CATEGORIES = {
  "Menstrual/Reproductive": ["Irregular periods", "Heavy bleeding", "Painful periods (Dysmenorrhea)", "Missed periods", "Spotting between periods", "Pelvic pain"],
  "Vaginal/Sexual Health": ["Unusual discharge", "Vaginal itching or irritation", "Pain during sex", "Unusual odor", "Vaginal dryness"],
  "Breast/Chest": ["Breast pain or tenderness", "Nipple discharge", "Lumps or thickening"],
  "Hormonal": ["Hot flashes", "Night sweats", "Mood swings", "Fatigue", "Acne", "Hair loss or thinning"],
  "Pregnancy-related": ["Nausea or vomiting", "Frequent urination", "Sore breasts", "Fatigue"],
  "General": ["Headaches or migraines", "Bloating", "Sleep disturbances", "Weight changes", "Joint pain"]
};

export default function Step1Symptoms({ data, onUpdate }) {
  const [customSymptom, setCustomSymptom] = useState(data.customSymptom || '');

  const handleSymptomToggle = (symptom) => {
    const currentSymptoms = data.selectedSymptoms || [];
    const isSelected = currentSymptoms.includes(symptom);
    
    if (isSelected) {
      onUpdate({ selectedSymptoms: currentSymptoms.filter(s => s !== symptom) });
    } else {
      onUpdate({ selectedSymptoms: [...currentSymptoms, symptom] });
    }
  };
  
  const handleCustomChange = (e) => {
    setCustomSymptom(e.target.value);
    onUpdate({ customSymptom: e.target.value });
  };

  const isSelected = (symptom) => {
    return (data.selectedSymptoms || []).includes(symptom);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Select Your Symptoms</h3>
      <p className="text-sm text-gray-500">Choose all that apply. You can add a custom symptom at the bottom.</p>
      
      {Object.entries(SYMPTOM_CATEGORIES).map(([category, symptoms]) => (
        <div key={category} className="space-y-3">
          <Label className="font-medium text-gray-700">{category}</Label>
          <div className="flex flex-wrap gap-2">
            {symptoms.map(symptom => (
              <Button
                key={symptom}
                variant={isSelected(symptom) ? "default" : "outline"}
                size="sm"
                onClick={() => handleSymptomToggle(symptom)}
                className={`${
                  isSelected(symptom) 
                    ? "bg-sky-500 hover:bg-sky-600 text-white" 
                    : "border-gray-300 hover:bg-sky-50 hover:border-sky-300"
                }`}
              >
                {symptom}
              </Button>
            ))}
          </div>
        </div>
      ))}
      
      <div className="space-y-2 pt-4 border-t">
        <Label htmlFor="custom-symptom" className="font-medium text-gray-700">Don't see your symptom?</Label>
        <Input 
          id="custom-symptom" 
          placeholder="e.g., Dizziness after standing up" 
          value={customSymptom} 
          onChange={handleCustomChange}
        />
      </div>
    </div>
  );
}