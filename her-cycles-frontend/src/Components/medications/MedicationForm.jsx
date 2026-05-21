import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { X, Save, PlusCircle, Trash2 } from "lucide-react";

const MEDICATION_TYPES = ["birth_control_pill", "pain_relief", "supplement", "hormone_therapy", "other"];

export default function MedicationForm({ medication, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: medication?.name || '',
    type: medication?.type || '',
    dosage: medication?.dosage || '',
    reminder_times: medication?.reminder_times || ['09:00'],
    start_date: medication?.start_date ? medication.start_date.split('T')[0] : '',
    notes: medication?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleTimeChange = (index, value) => {
    const newTimes = [...formData.reminder_times];
    newTimes[index] = value;
    handleChange('reminder_times', newTimes);
  };

  const addTime = () => {
    handleChange('reminder_times', [...formData.reminder_times, '']);
  };

  const removeTime = (index) => {
    const newTimes = formData.reminder_times.filter((_, i) => i !== index);
    handleChange('reminder_times', newTimes);
  };

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="border-b border-indigo-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {medication ? 'Edit Medication' : 'Add New Medication'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">Medication Name *</Label>
            <Input id="name" value={formData.name} onChange={e => handleChange('name', e.target.value)} required className="border-indigo-200 focus:border-indigo-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="font-medium">Type *</Label>
              <Select value={formData.type} onValueChange={v => handleChange('type', v)} required>
                <SelectTrigger className="border-indigo-200 focus:border-indigo-400"><SelectValue placeholder="Select type..." /></SelectTrigger>
                <SelectContent>
                  {MEDICATION_TYPES.map(type => (
                    <SelectItem key={type} value={type} className="capitalize">{type.replace(/_/g, ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage" className="font-medium">Dosage</Label>
              <Input id="dosage" value={formData.dosage} onChange={e => handleChange('dosage', e.target.value)} placeholder="e.g., 500mg" className="border-indigo-200 focus:border-indigo-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium">Reminder Times</Label>
            <div className="space-y-2">
              {formData.reminder_times.map((time, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input type="time" value={time} onChange={e => handleTimeChange(index, e.target.value)} className="border-indigo-200 focus:border-indigo-400" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeTime(index)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addTime} className="border-indigo-200 text-indigo-600"><PlusCircle className="w-4 h-4 mr-2" /> Add Time</Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start_date" className="font-medium">Start Date</Label>
            <Input id="start_date" type="date" value={formData.start_date} onChange={e => handleChange('start_date', e.target.value)} className="border-indigo-200 focus:border-indigo-400" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="font-medium">Notes</Label>
            <Textarea id="notes" value={formData.notes} onChange={e => handleChange('notes', e.target.value)} placeholder="e.g., Take with food" className="border-indigo-200 focus:border-indigo-400 h-20" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-gray-200">Cancel</Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700">
              <Save className="w-4 h-4 mr-2" />
              Save Medication
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}