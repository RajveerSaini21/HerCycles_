import React from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function Step4Context({ data, onUpdate }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Additional Information (Optional)</h3>
      <p className="text-sm text-gray-500">Provide any additional context that might help with the analysis. This can improve accuracy.</p>
      
      <div className="space-y-2">
        <Label htmlFor="cycle-day">Menstrual Cycle Day</Label>
        <Input 
          id="cycle-day" 
          type="number"
          placeholder="Day 1 = first day of your period" 
          value={data.cycleDay} 
          onChange={(e) => onUpdate({ cycleDay: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="details">Additional Details</Label>
        <Textarea 
          id="details" 
          placeholder="Include triggers, what makes symptoms better/worse, recent changes, etc."
          value={data.details} 
          onChange={(e) => onUpdate({ details: e.target.value })}
          className="h-28"
        />
      </div>
    </div>
  );
}