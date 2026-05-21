import React, { useState, useEffect } from "react";
import Symptom from "../Entities/SymptomService";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Plus, BarChart } from "lucide-react";
import SymptomForm from "../Components/symptoms/SymptomForm";
import SymptomChart from "../Components/symptoms/SymptomChart";
import SymptomLog from "../Components/symptoms/SymptomLog";

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSymptoms();
  }, []);

  const loadSymptoms = async () => {
    setIsLoading(true);
    try {
      const data = await Symptom.list('-date');
      setSymptoms(data);
    } catch (error) {
      console.error("Error loading symptoms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSymptom = async (symptomData) => {
    try {
      if (selectedSymptom) {
        await Symptom.update(selectedSymptom.id, symptomData);
      } else {
        await Symptom.create(symptomData);
      }
      setShowForm(false);
      setSelectedSymptom(null);
      loadSymptoms();
    } catch (error) {
      console.error("Error saving symptom:", error);
    }
  };
  
  const handleEditSymptom = (symptom) => {
    setSelectedSymptom(symptom);
    setShowForm(true);
  };
  
  const handleDeleteSymptom = async (symptomId) => {
    try {
      await Symptom.remove(symptomId);
      loadSymptoms();
    } catch (error)
    {
      console.error("Error deleting symptom", error)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-8 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-lg w-64 mb-6"></div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl"></div>
          <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Symptom Tracker
          </h1>
          <p className="text-gray-600 mt-2">Log daily symptoms to understand your body's patterns</p>
        </div>
        <Button 
  onClick={() => {
    setSelectedSymptom(null); // 💥 reset previous symptom
    setShowForm(true);
  }}
  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg"
>
  <Plus className="w-4 h-4 mr-2" />
  Log Symptom
</Button>

      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Chart */}
        <div className="lg:col-span-3">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart className="w-5 h-5 text-purple-600" />
                Symptom Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SymptomChart symptoms={symptoms} />
            </CardContent>
          </Card>
        </div>

        {/* Symptom Log */}
        <div className="lg:col-span-2">
          <SymptomLog 
            symptoms={symptoms} 
            onEdit={handleEditSymptom} 
            onDelete={handleDeleteSymptom}
            onAdd={() => setShowForm(true)}
          />
        </div>
      </div>

      {/* Symptom Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <SymptomForm
              symptom={selectedSymptom}
              onSave={handleSaveSymptom}
              onCancel={() => {
                setShowForm(false);
                setSelectedSymptom(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}