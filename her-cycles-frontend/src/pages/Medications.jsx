// import React, { useState, useEffect } from "react";
// import  Medication  from "../Entities/Medication.json";
// import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
// import { Button } from "../Components/ui/button";
// import { Plus, Pill } from "lucide-react";
// import MedicationForm from "../Components/medications/MedicationForm";
// import MedicationList from "../Components/medications/MedicationList";

// export default function MedicationsPage() {
//   const [medications, setMedications] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedMedication, setSelectedMedication] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadMedications();
//   }, []);

//   const loadMedications = async () => {
//     setIsLoading(true);
//     try {
//       const data = await Medication.list('-created_date');
//       setMedications(data);
//     } catch (error) {
//       console.error("Error loading medications:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSaveMedication = async (medicationData) => {
//     try {
//       if (selectedMedication) {
//         await Medication.update(selectedMedication.id, medicationData);
//       } else {
//         await Medication.create(medicationData);
//       }
//       setShowForm(false);
//       setSelectedMedication(null);
//       loadMedications();
//     } catch (error) {
//       console.error("Error saving medication:", error);
//     }
//   };

//   const handleEditMedication = (medication) => {
//     setSelectedMedication(medication);
//     setShowForm(true);
//   };

//   const handleDeleteMedication = async (medicationId) => {
//     try {
//       await Medication.delete(medicationId);
//       loadMedications();
//     } catch (error) {
//       console.error("Error deleting medication:", error);
//     }
//   };
  
//   const handleToggleActive = async (medication) => {
//     try {
//       await Medication.update(medication.id, { active: !medication.active });
//       loadMedications();
//     } catch (error) {
//       console.error("Error updating medication status:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
//             Medication & Reminders
//           </h1>
//           <p className="text-gray-600 mt-2">Manage your birth control, supplements, and other medications</p>
//         </div>
//         <Button 
//           onClick={() => setShowForm(true)}
//           className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Medication
//         </Button>
//       </div>

//       {/* Medication List */}
//       <MedicationList 
//         medications={medications}
//         onEdit={handleEditMedication}
//         onDelete={handleDeleteMedication}
//         onToggleActive={handleToggleActive}
//         isLoading={isLoading}
//         onAdd={() => setShowForm(true)}
//       />

//       {/* Medication Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <MedicationForm
//               medication={selectedMedication}
//               onSave={handleSaveMedication}
//               onCancel={() => {
//                 setShowForm(false);
//                 setSelectedMedication(null);
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Plus } from "lucide-react";
import MedicationForm from "../Components/medications/MedicationForm";
import MedicationList from "../Components/medications/MedicationList";

const API_BASE = "http://localhost:5001/api/medications";

export default function MedicationsPage() {
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to load medications");
      const data = await res.json();
      setMedications(data);
    } catch (error) {
      console.error("Error loading medications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMedication = async (medicationData) => {
    try {
      if (selectedMedication) {
        // Update existing medication
        await fetch(`${API_BASE}/${selectedMedication._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(medicationData),
        });
      } else {
        // Create new medication
        await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(medicationData),
        });
      }
      setShowForm(false);
      setSelectedMedication(null);
      loadMedications();
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  const handleEditMedication = (medication) => {
    setSelectedMedication(medication);
    setShowForm(true);
  };

  const handleDeleteMedication = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      loadMedications();
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const handleToggleActive = async (medication) => {
    try {
      await fetch(`${API_BASE}/${medication._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !medication.active }),
      });
      loadMedications();
    } catch (error) {
      console.error("Error updating medication status:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Medication & Reminders
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your birth control, supplements, and other medications
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </Button>
      </div>

      {/* Medication List */}
      <MedicationList
        medications={medications}
        onEdit={handleEditMedication}
        onDelete={handleDeleteMedication}
        onToggleActive={handleToggleActive}
        isLoading={isLoading}
        onAdd={() => setShowForm(true)}
      />

      {/* Medication Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <MedicationForm
              medication={selectedMedication}
              onSave={handleSaveMedication}
              onCancel={() => {
                setShowForm(false);
                setSelectedMedication(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}