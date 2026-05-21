import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { X, Save } from "lucide-react";
import { format } from "date-fns";



export default function PeriodForm({ cycle, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    start_date: cycle?.start_date ? cycle.start_date.split('T')[0] : format(new Date(), 'yyyy-MM-dd'),
    end_date: cycle?.end_date ? cycle.end_date.split('T')[0] : '',
    cycle_length: cycle?.cycle_length || '',
    period_length: cycle?.period_length || '',
    flow_intensity: cycle?.flow_intensity || 'moderate',
    notes: cycle?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const cycleData = {
      ...formData,
      cycle_length: formData.cycle_length ? parseInt(formData.cycle_length) : undefined,
      period_length: formData.period_length ? parseInt(formData.period_length) : undefined
    };

    // Remove empty fields
    Object.keys(cycleData).forEach(key => {
      if (cycleData[key] === '' || cycleData[key] === undefined) {
        delete cycleData[key];
      }
    });

    onSave(cycleData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="border-b border-pink-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            {cycle ? 'Edit Cycle' : 'Log New Period'}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date" className="text-sm font-medium">
                Start Date *
              </Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleChange('start_date', e.target.value)}
                required
                className="border-pink-200 focus:border-pink-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => handleChange('end_date', e.target.value)}
                className="border-pink-200 focus:border-pink-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cycle_length" className="text-sm font-medium">
                Cycle Length (days)
              </Label>
              <Input
                id="cycle_length"
                type="number"
                min="20"
                max="45"
                value={formData.cycle_length}
                onChange={(e) => handleChange('cycle_length', e.target.value)}
                placeholder="28"
                className="border-pink-200 focus:border-pink-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period_length" className="text-sm font-medium">
                Period Length (days)
              </Label>
              <Input
                id="period_length"
                type="number"
                min="1"
                max="10"
                value={formData.period_length}
                onChange={(e) => handleChange('period_length', e.target.value)}
                placeholder="5"
                className="border-pink-200 focus:border-pink-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="flow_intensity" className="text-sm font-medium">
              Flow Intensity
            </Label>
            <Select
              value={formData.flow_intensity}
              onValueChange={(value) => handleChange('flow_intensity', value)}
            >
              <SelectTrigger className="border-pink-200 focus:border-pink-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any additional notes about this cycle..."
              className="border-pink-200 focus:border-pink-400 h-20"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Cycle
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}