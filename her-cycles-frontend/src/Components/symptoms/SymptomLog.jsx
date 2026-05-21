import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Activity, Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { format, parseISO } from 'date-fns';

export default function SymptomLog({ symptoms, onEdit, onDelete, onAdd }) {
  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl">
          <span className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            Symptom Log
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {symptoms.length > 0 ? (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {symptoms.map(symptom => (
              <div key={symptom.id} className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl relative group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-800 capitalize">
                      {symptom.symptom_type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(parseISO(symptom.date), 'MMM d, yyyy')} - {symptom.time_of_day}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {symptom.severity}/10
                  </Badge>
                </div>
                {symptom.notes && <p className="text-sm text-gray-600 mt-2 italic">"{symptom.notes}"</p>}
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(symptom)}>
                    <Edit className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDelete(symptom.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-3">No symptoms logged yet</p>
            <Button onClick={onAdd} className="bg-purple-500 hover:bg-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Log Your First Symptom
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}