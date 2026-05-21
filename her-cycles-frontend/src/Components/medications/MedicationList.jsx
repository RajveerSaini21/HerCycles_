// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Pill, Plus, Clock, Edit, Trash2 } from 'lucide-react';
// import { Switch } from '../ui/switch';
// import { Skeleton } from '../ui/skeleton';

// const typeColors = {
//   birth_control_pill: "bg-pink-100 text-pink-700",
//   pain_relief: "bg-blue-100 text-blue-700",
//   supplement: "bg-green-100 text-green-700",
//   hormone_therapy: "bg-purple-100 text-purple-700",
//   other: "bg-gray-100 text-gray-700",
// };

// export default function MedicationList({ medications, onEdit, onDelete, onToggleActive, isLoading, onAdd }) {
//   if (isLoading) {
//     return (
//       <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//         <CardContent className="p-6 space-y-4">
//           {Array(3).fill(0).map((_, i) => (
//             <div key={i} className="p-4 rounded-xl bg-gray-50 flex items-center justify-between">
//               <div className="flex-1 space-y-2">
//                 <Skeleton className="h-5 w-40" />
//                 <Skeleton className="h-4 w-60" />
//               </div>
//               <Skeleton className="h-8 w-20" />
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     );
//   }

//   if (medications.length === 0) {
//     return (
//       <div className="text-center py-20 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50">
//         <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//         <h3 className="text-xl font-semibold text-gray-700">No medications added yet</h3>
//         <p className="text-gray-500 mt-2 mb-6">Keep track of your medications and set reminders.</p>
//         <Button onClick={onAdd} className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg">
//           <Plus className="w-4 h-4 mr-2" />
//           Add Your First Medication
//         </Button>
//       </div>
//     );
//   }

//   const activeMeds = medications.filter(m => m.active);
//   const inactiveMeds = medications.filter(m => !m.active);

//   return (
//     <div className="space-y-6">
//       {activeMeds.length > 0 && (
//         <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//           <CardHeader><CardTitle className="text-lg text-gray-800">Active Medications</CardTitle></CardHeader>
//           <CardContent className="space-y-4">
//             {activeMeds.map(med => (
//               <MedicationItem key={med.id} med={med} onEdit={onEdit} onDelete={onDelete} onToggleActive={onToggleActive} />
//             ))}
//           </CardContent>
//         </Card>
//       )}

//       {inactiveMeds.length > 0 && (
//         <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm opacity-70">
//           <CardHeader><CardTitle className="text-lg text-gray-600">Inactive Medications</CardTitle></CardHeader>
//           <CardContent className="space-y-4">
//             {inactiveMeds.map(med => (
//               <MedicationItem key={med.id} med={med} onEdit={onEdit} onDelete={onDelete} onToggleActive={onToggleActive} />
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

// const MedicationItem = ({ med, onEdit, onDelete, onToggleActive }) => (
//   <div className="p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl group relative">
//     <div className="flex items-start justify-between">
//       <div className="flex-1">
//         <h4 className="font-semibold text-gray-900">{med.name}</h4>
//         <p className="text-sm text-gray-600">{med.dosage}</p>
//         <div className="flex flex-wrap items-center gap-2 mt-2">
//           <Badge className={`${typeColors[med.type] || typeColors.other} font-medium`}>
//           {(med.type || "other").replace(/_/g, ' ')}
//           </Badge>
//           {med.reminder_times?.map((time, i) => (
//             <Badge key={i} variant="outline" className="flex items-center gap-1 border-indigo-200 text-indigo-700">
//               <Clock className="w-3 h-3" /> {time}
//             </Badge>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center gap-3">
//         <Switch checked={med.active} onCheckedChange={() => onToggleActive(med)} />
//       </div>
//     </div>
//     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
//       <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(med)}>
//         <Edit className="w-4 h-4 text-gray-500" />
//       </Button>
//       <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDelete(med.id)}>
//         <Trash2 className="w-4 h-4 text-red-500" />
//       </Button>
//     </div>
//   </div>
// );

import React, { useState } from "react";
import { createPortal } from "react-dom"; import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Pill, Plus, Clock, Edit, Trash2 } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Skeleton } from '../ui/skeleton';

const typeColors = {
  birth_control_pill: "bg-pink-100 text-pink-700",
  pain_relief: "bg-blue-100 text-blue-700",
  supplement: "bg-green-100 text-green-700",
  hormone_therapy: "bg-purple-100 text-purple-700",
  other: "bg-gray-100 text-gray-700",
};

export default function MedicationList({ medications, onEdit, onDelete, onToggleActive, isLoading, onAdd }) {
  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-50 flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (medications.length === 0) {
    return (
      <div className="text-center py-20 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">No medications added yet</h3>
        <p className="text-gray-500 mt-2 mb-6">Keep track of your medications and set reminders.</p>
        <Button onClick={onAdd} className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Add Your First Medication
        </Button>
      </div>
    );
  }

  const activeMeds = medications.filter(m => m.active);
  const inactiveMeds = medications.filter(m => !m.active);

  return (
    <div className="space-y-6">
      {activeMeds.length > 0 && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader><CardTitle className="text-lg text-gray-800">Active Medications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {activeMeds.map(med => (
              <MedicationItem key={med._id || med.id} med={med} onEdit={onEdit} onDelete={onDelete} onToggleActive={onToggleActive} />
            ))}
          </CardContent>
        </Card>
      )}

      {inactiveMeds.length > 0 && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm opacity-70">
          <CardHeader><CardTitle className="text-lg text-gray-600">Inactive Medications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {inactiveMeds.map(med => (
              <MedicationItem key={med._id || med.id} med={med} onEdit={onEdit} onDelete={onDelete} onToggleActive={onToggleActive} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const MedicationItem = ({ med, onEdit, onDelete, onToggleActive }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const id = med._id || med.id;

  // Safe toggle wrapper
  const handleToggle = () => {
    if (typeof onToggleActive === "function") {
      try {
        onToggleActive(med);
      } catch (err) {
        console.error("onToggleActive threw:", err);
      }
    } else {
      console.warn("onToggleActive is not a function");
    }
  };

  return (
    <>
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl group relative pr-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{med.name}</h4>
            <p className="text-sm text-gray-600 truncate">{med.dosage}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge className={`${typeColors[med.type] || typeColors.other} font-medium`}>
                {(med.type || "other").replace(/_/g, ' ')}
              </Badge>
              {med.reminder_times?.map((time, i) => (
                <Badge key={i} variant="outline" className="flex items-center gap-1 border-indigo-200 text-indigo-700">
                  <Clock className="w-3 h-3" /> {typeof time === "string" ? time : new Date(time).toLocaleString()}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Switch
              checked={!!med.active}
              onChange={() => handleToggle()}
              aria-label={med.active ? `Deactivate ${med.name}` : `Activate ${med.name}`}
            />
          </div>
        </div>

        <div className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => typeof onEdit === "function" && onEdit(med)}>
            <Edit className="w-4 h-4 text-gray-500" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setShowConfirm(true)}
            aria-haspopup="dialog"
            aria-expanded={showConfirm}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>

      {showConfirm &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`confirm-delete-${id}`}
            onClick={() => setShowConfirm(false)}
          >
            <div
              className="max-w-md w-full rounded-2xl bg-white shadow-2xl ring-1 ring-black/5
             animate-[modalIn_160ms_ease-out_forwards] transform scale-95 opacity-0
             translate-x-10 sm:translate-x-16 lg:translate-x-20
             transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-none">
                    <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center ring-1 ring-red-100">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 id={`confirm-delete-${id}`} className="text-lg font-semibold text-gray-900">
                      Delete medication?
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Are you sure you want to permanently delete <span className="font-medium">{med.name}</span>? This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setShowConfirm(false)}>
                    Cancel
                  </Button>

                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      if (typeof onDelete === "function") onDelete(id);
                      setShowConfirm(false);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
          </div>,
          document.body
        )
      }
    </>
  );
};