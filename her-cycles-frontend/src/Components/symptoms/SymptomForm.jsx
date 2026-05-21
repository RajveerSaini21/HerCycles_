import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { X, Save } from "lucide-react";
import { format } from "date-fns";

const SYMPTOM_TYPES = ["cramps", "bloating", "mood_swings", "headache", "fatigue", "breast_tenderness", "acne", "back_pain", "nausea", "food_cravings", "irritability", "anxiety", "depression", "hot_flashes", "sleep_issues"];
const TIME_OF_DAY = ["morning", "afternoon", "evening", "night"];

export default function SymptomForm({ symptom, onSave, onCancel }) {
  // const [formData, setFormData] = useState({
  //   date: symptom?.date ? symptom.date.split('T')[0] : format(new Date(), 'yyyy-MM-dd'),
  //   symptom_type: symptom?.symptom_type ?? " ",
  //   severity: symptom?.severity ?? 0,
  //   time_of_day: symptom?.time_of_day ?? " ",
  //   notes: symptom?.notes || ''
  // });

  const isEditing = !!symptom;

const [formData, setFormData] = useState({
  date: isEditing
    ? symptom.date.split('T')[0]
    : format(new Date(), 'yyyy-MM-dd'),
  symptom_type: isEditing ? symptom.symptom_type : "",   // 🔥 force blank
  severity: isEditing ? symptom.severity : 0,
  time_of_day: isEditing ? symptom.time_of_day : "",      // 🔥 force blank
  notes: isEditing ? symptom.notes : ""
});


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, severity: Number(formData.severity) });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="border-b border-purple-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {symptom ? 'Edit Symptom' : 'Log New Symptom'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date" className="font-medium">Date *</Label>
            <Input id="date" type="date" value={formData.date} onChange={e => handleChange('date', e.target.value)} required className="border-purple-200 focus:border-purple-400" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptom_type" className="font-medium">Symptom Type *</Label>
            {/* <Select value={formData.symptom_type} onValueChange={value => handleChange('symptom_type', value)} required>
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                <SelectValue placeholder="Select a symptom..." />
              </SelectTrigger>
              <SelectContent>
                {SYMPTOM_TYPES.map(type => (
                  <SelectItem key={type} value={type} className="capitalize">{type.replace(/_/g, ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            <Select
  value={formData.symptom_type}
  onValueChange={value => handleChange('symptom_type', value)}
>
  <SelectTrigger className="border-purple-200 focus:border-purple-400">
    <SelectValue placeholder="Select a symptom..." />  {/* ✅ placeholder visible */}
  </SelectTrigger>
  <SelectContent>
    {SYMPTOM_TYPES.map(type => (
      <SelectItem key={type} value={type} className="capitalize">
        {type.replace(/_/g, ' ')}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

          </div>

          <div className="space-y-2">
            <Label htmlFor="severity" className="font-medium">Severity: {formData.severity}/10</Label>
            <Input id="severity" type="range" min="1" max="10" value={formData.severity} onChange={e => handleChange('severity', e.target.value)} className="accent-purple-500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time_of_day" className="font-medium">Time of Day</Label>
            <Select value={formData.time_of_day} onValueChange={value => handleChange('time_of_day', value)}>
              <SelectTrigger className="border-purple-200 focus:border-purple-400">
                {/* <SelectValue /> */}
                <SelectValue placeholder="Select time of day..." />
              </SelectTrigger>
              <SelectContent>
                {TIME_OF_DAY.map(time => (
                  <SelectItem key={time} value={time} className="capitalize">{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="font-medium">Notes</Label>
            <Textarea id="notes" value={formData.notes} onChange={e => handleChange('notes', e.target.value)} placeholder="Any additional details..." className="border-purple-200 focus:border-purple-400 h-20" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-gray-200">Cancel</Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
              <Save className="w-4 h-4 mr-2" />
              Save Symptom
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}